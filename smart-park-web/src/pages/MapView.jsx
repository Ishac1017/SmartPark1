import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

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
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Estimated Arrival</span>
                <strong style={{ color: "#0b8f74" }}>4 mins</strong>
              </div>
              <div className="metric-row" style={{ borderBottom: "1px solid #e5ebf3", padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Traffic Level</span>
                <strong style={{ color: "#f59e0b" }}>Moderate</strong>
              </div>
              <div className="metric-row" style={{ borderBottom: "1px solid #e5ebf3", padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Hourly Rate</span>
                <strong>${spot.price}/hr</strong>
              </div>
            </div>

            <div className="button-row" style={{ marginTop: "auto", display: "grid", gap: "12px" }}>
              <button className="primary-btn" style={{ width: "100%" }} onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${spot.name}`, "_blank")}>
                Open in Google Maps
              </button>
              <button className="secondary-btn" style={{ width: "100%" }} onClick={() => navigate("/results")}>
                Change Destination
              </button>
            </div>
          </section>

          <div className="map-card" style={{ height: "100%", borderRadius: "24px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
            <iframe
              title="Parking Map"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1!5m2!1sen!2sus`}
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

