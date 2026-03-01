import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";

export default function AddVehicle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    model: "",
    plate: "",
    type: "Sedan"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedVehicles = JSON.parse(localStorage.getItem("savedVehicles") || "[]");
    const alreadyExists = savedVehicles.some(v => v.plate === formData.plate);
    if (!alreadyExists) {
      localStorage.setItem("savedVehicles", JSON.stringify([...savedVehicles, formData]));
    } else {
      const updated = savedVehicles.map(v => v.plate === formData.plate ? formData : v);
      localStorage.setItem("savedVehicles", JSON.stringify(updated));
    }
    navigate("/vehicle");
  };

  return (
    <main className="screen" style={{
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      minHeight: "100vh"
    }}>
      <NavBar />
      <div className="page-container" style={{ justifyContent: "center", minHeight: "calc(100vh - 80px)", zIndex: 2 }}>
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "56px" }}>
          <div className="page-header" style={{ marginBottom: "40px", textAlign: "center" }}>
            <div className="brand-chip" style={{ margin: "0 auto 24px" }}>
            </div>
            <h2 style={{ fontSize: "2.25rem" }}>Register Vehicle</h2>
            <p style={{ margin: "12px auto 0" }}>Input your vehicle data for precise parking matching.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.9rem", padding: "0 9px 8px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Manufacturer & Model</span>
              <input
                type="text"
                name="model"
                placeholder="e.g. Tesla Model Y"
                value={formData.model}
                onChange={handleChange}
                style={{ padding: "16px 20px", borderRadius: "12px", border: "1px solid var(--border)" }}
                required
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
              <span style={{ fontSize: "0.9rem", padding: "0 9px 8px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>License Plate</span>
              <input
                type="text"
                name="plate"
                placeholder="e.g. SKY-7788"
                value={formData.plate}
                onChange={handleChange}
                style={{ padding: "16px 20px", borderRadius: "12px", border: "1px solid var(--border)" }}
                required
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  font: "inherit",
                  fontSize: "1rem",
                  background: "white",
                  width: "100%",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 20px top 50%",
                  backgroundSize: "12px auto",
                  transition: "var(--transition)"
                }}
              >
                <option value="Sedan">Standard Sedan</option>
                <option value="SUV">SUV / Crossover</option>
                <option value="Truck">Utility Truck</option>
                <option value="Electric">Electric Vehicle (EV)</option>
                <option value="Van">Delivery / Cargo Van</option>
              </select>
            </label>

            <div className="button-row" style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid var(--border)"  }}>
              <button type="button" className="secondary-btn" onClick={() => navigate("/vehicle")} style={{ padding: "16px 32px", borderRadius: "12px" }}>
                Discard
              </button>
              <button type="submit" className="primary-btn" style={{ marginLeft: "auto", padding: "16px 48px", borderRadius: "12px" }}>
                Confirm
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
