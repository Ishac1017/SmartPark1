import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";

export default function VehicleSelection() {
  const navigate = useNavigate();
  
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem("savedVehicles");
    const parsedSaved = saved ? JSON.parse(saved) : [];
    
    const defaults = [
      { model: "Honda Civic", plate: "ABC-1234", type: "Sedan", isDefault: true, icon: "🚗" },
      { model: "Tesla Model 3", plate: "EV-9988", type: "Electric", isDefault: true, icon: "⚡" },
      { model: "Ford F-150", plate: "TRK-5566", type: "Truck", isDefault: true, icon: "🛻" },
    ];

    const combined = [...parsedSaved.map(v => ({ ...v, icon: "🚙" })), ...defaults];
    
    return combined.filter((v, index, self) =>
      index === self.findIndex((t) => t.plate === v.plate)
    );
  });

  const handleDelete = (e, plate) => {
    e.stopPropagation();
    const updated = vehicles.filter(v => v.plate !== plate);
    setVehicles(updated);
    const toSave = updated.filter(v => !v.isDefault);
    localStorage.setItem("savedVehicles", JSON.stringify(toSave));
  };

  return (
    <main className="screen" style={{ 
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      minHeight: "100vh"
    }}>
      <NavBar />
      <div className="page-container" style={{ zIndex: 2 }}>
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "48px" }}>
          <div className="page-header" style={{ marginBottom: "32px" }}>
            <div className="brand-chip">
              <div className="brand-icon">🚗</div>
              <span className="brand-text">Active Fleet</span>
            </div>
            <h2 style={{ fontSize: "2rem" }}>Select Your Vehicle</h2>
            <p>Choose a vehicle from your smart garage for tailored parking dimensions and access.</p>
          </div>

          <div style={{ display: "grid", gap: "16px", margin: "32px 0" }}>
            {vehicles.map((v, i) => (
              <div 
                key={v.plate || i} 
                className="parking-card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "row",
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "20px 24px",
                  border: v.isDefault ? "1px solid var(--border)" : "2px solid var(--primary)",
                  background: v.isDefault ? "white" : "rgba(37, 99, 235, 0.02)",
                  borderRadius: "16px"
                }} 
                onClick={() => navigate("/search")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ 
                    width: "52px", 
                    height: "52px", 
                    background: v.isDefault ? "var(--bg-main)" : "var(--primary-glow)", 
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "1.4rem"
                  }}>
                    {v.icon}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)" }}>{v.model}</span>
                      {!v.isDefault && (
                        <span style={{ 
                          fontSize: "0.6rem", 
                          background: "var(--primary)", 
                          color: "white", 
                          padding: "3px 8px", 
                          borderRadius: "999px",
                          textTransform: "uppercase",
                          fontWeight: 800,
                          letterSpacing: "0.04em"
                        }}>Personal</span>
                      )}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "2px", fontWeight: 500 }}>
                      <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{v.plate}</span> • {v.type}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button 
                    onClick={(e) => handleDelete(e, v.plate)}
                    style={{ 
                      background: "transparent", 
                      border: "none", 
                      color: "var(--danger)", 
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      padding: "8px",
                      transition: "opacity 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = 0.7}
                    onMouseLeave={(e) => e.target.style.opacity = 1}
                  >
                    Delete
                  </button>
                  <div style={{ 
                    color: "var(--primary)", 
                    fontWeight: 700, 
                    background: "var(--primary-glow)", 
                    padding: "8px 16px", 
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    transition: "var(--transition)"
                  
                  
                  }}>
                    Select
                  </div>
                </div>

                
              </div>
            ))}
          </div>

          <div className="button-row" style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
            <button className="secondary-btn" onClick={() => navigate("/add-vehicle")} style={{ padding: "12px 24px", borderRadius: "10px" }}>
              + Register Vehicle
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
