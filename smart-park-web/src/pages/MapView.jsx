
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

  // Since I don't have a Google Maps API Key here, I'll use the search-based embed which doesn't always require a key for basic usage in some contexts,
  // or use the standard embed with query.
  const simpleMapUrl = `https://maps.google.com/maps?q=${spot.lat || 0},${spot.lon || 0}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="screen" style={{
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      minHeight: "100vh"
    }}>
      <NavBar />
      <div className="page-container" style={{ zIndex: 2 }}>
        <div className="page-header">
          <div className="brand-chip">
            <div className="brand-icon">🚗</div>
            <span className="brand-text">Live Navigation</span>
          </div>
          <h1>Routing to {spot.name}</h1>
          <p>Follow the directions below to reach your reserved parking spot.</p>
        </div>

        <div className="route-grid">
          <section style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px" }}>
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
          </section>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "40px", paddingBottom: "40px" }}>
            <button className="primary-btn" style={{ minWidth: "240px", padding: "18px", fontSize: "1rem", borderRadius: "14px" }} onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lon}`, "_blank")}>
              Open in Google Maps
            </button>
            <button className="secondary-btn" style={{ minWidth: "240px", padding: "18px", fontSize: "1rem", borderRadius: "14px" }} onClick={() => navigate("/results", { state: { lat: spot.lat, lon: spot.lon, name: "Previous Location" } })}>
              Change Destination
            </button>
          </div>

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