import parkingLots from "../data/parkingLots";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const DEFAULT_RADIUS = 4828; // 3 miles in meters
const RADIUS = import.meta.env.VITE_SEARCH_RADIUS || DEFAULT_RADIUS;

// Helper to calculate distance in miles between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getWalkingTimes(sourceLat, sourceLon, targets) {
  if (!targets || targets.length === 0) return [];

  const body = {
    mode: 'walk',
    sources: [{ location: [sourceLon, sourceLat] }],
    targets: targets.map(t => ({ location: [t.lon, t.lat] }))
  };

  const url = `https://api.geoapify.com/v1/routematrix?apiKey=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      console.error(`Matrix API failed with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (data.sources_to_targets && data.sources_to_targets[0]) {
      return data.sources_to_targets[0].map(result => ({
        time: result.time ? Math.round(result.time / 60) : 0, // minutes
        distance: result.distance || 0 // meters
      }));
    }
  } catch (error) {
    console.error("Matrix API error:", error);
  }
  return null;
}

export async function geocodeAddress(address) {
  if (!address) return null;

  const query = address.toLowerCase();
  const isSTL = query.includes("st louis") || query.includes("st. louis") || query.includes("stl");

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Geocoding failed: ${response.status}`);
    
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lon, lat, name: data.features[0].properties.formatted };
    }
    
    // Fallback for STL if geocoding fails
    if (isSTL) {
      return { lon: -90.1994, lat: 38.6270, name: "Downtown St. Louis, MO" };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    if (isSTL) {
      return { lon: -90.1994, lat: 38.6270, name: "Downtown St. Louis, MO" };
    }
  }
  return null;
}

export async function getParkingGarages(lon, lat) {
  // First, get hardcoded STL garages and calculate their distance from current search
  const stlGarages = parkingLots.map(lot => {
    const distance = calculateDistance(lat, lon, lot.lat, lot.lon);
    return {
      ...lot,
      distance: distance.toFixed(1),
      travelTime: Math.round(distance * 12)
    };
  });

  try {
    // Using a broader category 'parking' to ensure we find results
    const categories = 'parking';
    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${RADIUS}&bias=proximity:${lon},${lat}&limit=20&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Geoapify Places API Error:", errorData);
      throw new Error(`Places API failed: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    let apiGarages = data.features ? data.features.map(feature => {
      const props = feature.properties;
      const distanceMiles = props.distance / 1609.34;
      return {
        id: props.place_id,
        name: props.name || props.street || "Public Parking",
        address: props.address_line2 || props.formatted || "Address not available",
        distance: distanceMiles.toFixed(1), // miles
        travelTime: Math.round(distanceMiles * 15), // roughly 15 min per mile walk
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        price: Math.floor(Math.random() * 15) + 5,
        capacity: Math.floor(Math.random() * 100) + 10
      };
    }) : [];

    // Combine both
    let combined = [...stlGarages, ...apiGarages]
      .filter(g => parseFloat(g.distance) <= RADIUS / 1609.34)
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      .slice(0, 20);

    // Fetch accurate walking times for the top 10 results
    if (combined.length > 0) {
      const topResults = combined.slice(0, 10);
      const walkingTimes = await getWalkingTimes(lat, lon, topResults);
      
      if (walkingTimes) {
        combined = combined.map((garage, index) => {
          if (index < walkingTimes.length && walkingTimes[index]) {
            return {
              ...garage,
              travelTime: walkingTimes[index].time,
              distance: (walkingTimes[index].distance / 1609.34).toFixed(1)
            };
          }
          return garage;
        });
      }
    }

    return combined;
    
  } catch (error) {
    console.error("Places API error, falling back to local data:", error);
    return stlGarages
      .filter(g => parseFloat(g.distance) <= RADIUS / 1000)
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  }
}