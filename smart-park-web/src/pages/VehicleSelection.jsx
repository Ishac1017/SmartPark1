import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function VehicleSelection() {
  const navigate = useNavigate();

  const vehicles = [
    { model: "Honda Civic", plate: "ABC-1234", type: "Sedan" },
    { model: "Tesla Model 3", plate: "EV-9988", type: "Electric" },
    { model: "Ford F-150", plate: "TRK-5566", type: "Truck" },
  ];

  return (
    <main className="screen">
      <NavBar />
      <div className="page-container">
        <section className="panel" style={{ maxWidth: "800px", margin: "40px auto" }}>
          <div className="page-header">
            <div className="brand-chip">
              <div className="brand-icon">🚘</div>
              <span className="brand-text">Your Garage</span>
            </div>
            <h2>Which vehicle are you parking?</h2>
            <p>Select a vehicle to find the best suitable parking spots for its dimensions.</p>
          </div>

          <div style={{ display: "grid", gap: "16px", margin: "32px 0" }}>
            {vehicles.map((v, i) => (
              <div key={i} className="parking-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }} onClick={() => navigate("/search")}>
                <div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>{v.model}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Plate: {v.plate} • {v.type}</div>
                </div>
                <div style={{ color: "#0b8f74", fontWeight: 700 }}>Select →</div>
              </div>
            ))}
          </div>

          <div className="button-row" style={{ marginTop: "32px", borderTop: "1px solid #f1f5f9", paddingTop: "32px" }}>
            <button className="secondary-btn" onClick={() => navigate("/search")}>
              Add New Vehicle
            </button>
            <button className="primary-btn" style={{ marginLeft: "auto" }} onClick={() => navigate("/search")}>
              Skip for Now
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

