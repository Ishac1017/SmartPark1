import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";

export default function MapView() {
  const { state: spot } = useLocation();
  const navigate = useNavigate();

  if (!spot) return (
    <main className="screen">
      <NavBar />
      <div className="page-container">
        <div className="panel" style={{ textAlign: "center" }}>
          <h2>No spot selected.</h2>
          <button className="primary-btn" onClick={() => navigate("/results")}>Back to List</button>
        </div>
      </div>
    </main>
  );

  // If we have lat/lon from Geoapify, use them. Otherwise fallback to name search.
  const mapUrl = spot.lat && spot.lon 
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${spot.lat},${spot.lon}`
    : `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(spot.name + " " + (spot.address || ""))}`;

  // Since I don't have a Google Maps API Key here, I'll use the search-based embed which doesn't always require a key for basic usage in some contexts, 
  // or use the standard embed with query.
  const simpleMapUrl = `https://maps.google.com/maps?q=${spot.lat || 0},${spot.lon || 0}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="screen">
      <NavBar />
      <div className="page-container">
        <div className="page-header">
          <div className="brand-chip">
            <div className="brand-icon">🚗</div>
            <span className="brand-text">Live Navigation</span>
          </div>
          <h1>Routing to {spot.name}</h1>
          <p>Follow the directions below to reach your reserved parking spot.</p>
        </div>

        <div className="route-grid">
          <section className="panel" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="selected-card">
              <h3 className="selected-name">{spot.name}</h3>
              <p style={{ color: "#6b7280" }}>{spot.address || "123 Destination Way"}</p>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 12px", color: "#111827" }}>Quick Stats</h4>
              <div className="metric-row" style={{ borderBottom: "1px solid #e5ebf3", padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Walking Distance</span>
                <strong style={{ color: "#0b8f74" }}>{spot.travelTime} mins</strong>
              </div>
              <div className="metric-row" style={{ borderBottom: "1px solid #e5ebf3", padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Distance</span>
                <strong style={{ color: "#f59e0b" }}>{spot.distance} mi</strong>
              </div>
              <div className="metric-row" style={{ borderBottom: "1px solid #e5ebf3", padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Hourly Rate</span>
                <strong>${spot.price}/hr</strong>
              </div>
            </div>

            <div className="button-row" style={{ marginTop: "auto", display: "grid", gap: "12px" }}>
              <button className="primary-btn" style={{ width: "100%" }} onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lon}`, "_blank")}>
                Open in Google Maps
              </button>
              <button className="secondary-btn" style={{ width: "100%" }} onClick={() => navigate("/results", { state: { lat: spot.lat, lon: spot.lon, name: "Previous Location" } })}>
                Change Destination
              </button>
            </div>
          </section>

          <div className="map-card" style={{ height: "100%", minHeight: "400px", borderRadius: "24px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
            <iframe
              title="Parking Map"
              src={simpleMapUrl}
              allowFullScreen
              loading="lazy"
              style={{ width: "100%", height: "100%", border: 0 }}
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}

