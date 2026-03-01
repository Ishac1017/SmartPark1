import React, { useState } from "react";
import parkingLots from "../data/parkingLots";
import ParkingCard from "../components/parkingCard";
import Filters from "../components/Filters";

export default function Home() {
  const [garages, setGarages] = useState(parkingLots);

  const sortByPrice = () => {
    setGarages([...garages].sort((a, b) => a.price_per_hour - b.price_per_hour));
  };

  // Note: Simple alphabetical sort as a placeholder since 'distance' is now based on lat/lng
  const sortByName = () => {
    setGarages([...garages].sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Nearby Parking</h2>

      <Filters
        sortByPrice={sortByPrice}
        sortByDistance={sortByName} 
      />

      {garages.map((g) => (
        <ParkingCard key={g.id} garage={g} />
      ))}
    </div>
  );
}
