import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";

export default function VehicleSelection() {
  const navigate = useNavigate();
  
  // Initialize vehicles from localStorage or use defaults if empty
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem("savedVehicles");
    const parsedSaved = saved ? JSON.parse(saved) : [];
    
    const defaults = [
      { model: "Honda Civic", plate: "ABC-1234", type: "Sedan", isDefault: true },
      { model: "Tesla Model 3", plate: "EV-9988", type: "Electric", isDefault: true },
      { model: "Ford F-150", plate: "TRK-5566", type: "Truck", isDefault: true },
    ];

    // Combine: User's saved vehicles first, then defaults
    const combined = [...parsedSaved, ...defaults];
    
    // Filter by plate to avoid showing defaults if user has added their own with same plate
    return combined.filter((v, index, self) =>
      index === self.findIndex((t) => t.plate === v.plate)
    );
  });

  const handleDelete = (e, plate) => {
    e.stopPropagation(); // Don't trigger the select action
    const updated = vehicles.filter(v => v.plate !== plate);
    setVehicles(updated);
    
    // Also update localStorage (only save non-defaults)
    const toSave = updated.filter(v => !v.isDefault);
    localStorage.setItem("savedVehicles", JSON.stringify(toSave));
  };

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
              <div 
                key={v.plate || i} 
                className="parking-card" 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "20px",
                  border: v.isDefault ? "1px solid #f1f5f9" : "2px solid #0b8f74" 
                }} 
                onClick={() => navigate("/search")}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>{v.model}</div>
                    {!v.isDefault && (
                      <span style={{ 
                        fontSize: "0.7rem", 
                        background: "#0b8f74", 
                        color: "white", 
                        padding: "2px 8px", 
                        borderRadius: "10px",
                        textTransform: "uppercase",
                        fontWeight: 700
                      }}>Your Vehicle</span>
                    )}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>Plate: {v.plate} • {v.type}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {!v.isDefault && (
                    <button 
                      onClick={(e) => handleDelete(e, v.plate)}
                      style={{ 
                        background: "none", 
                        border: "none", 
                        color: "#ef4444", 
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        padding: "8px"
                      }}
                    >
                      Remove
                    </button>
                  )}
                  <div style={{ color: "#0b8f74", fontWeight: 700 }}>Select →</div>
                </div>
              </div>
            ))}
          </div>

          <div className="button-row" style={{ marginTop: "32px", borderTop: "1px solid #f1f5f9", paddingTop: "32px" }}>
            <button className="secondary-btn" onClick={() => navigate("/add-vehicle")}>
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

