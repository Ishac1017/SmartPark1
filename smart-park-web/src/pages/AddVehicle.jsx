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
    
    // Check if plate already exists to avoid duplicates
    const alreadyExists = savedVehicles.some(v => v.plate === formData.plate);
    
    if (!alreadyExists) {
      localStorage.setItem("savedVehicles", JSON.stringify([...savedVehicles, formData]));
    } else {
      // Update existing if it matches plate
      const updated = savedVehicles.map(v => v.plate === formData.plate ? formData : v);
      localStorage.setItem("savedVehicles", JSON.stringify(updated));
    }
    
    navigate("/vehicle");
  };

  return (
    <main className="screen">
      <NavBar />
      <div className="page-container">
        <section className="panel" style={{ maxWidth: "600px", margin: "40px auto" }}>
          <div className="page-header">
            <div className="brand-chip">
              <div className="brand-icon">➕</div>
              <span className="brand-text">New Vehicle</span>
            </div>
            <h2>Add Vehicle Details</h2>
            <p>Enter your vehicle's information to help us find the perfect parking spot.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Vehicle Model
              <input 
                type="text" 
                name="model" 
                placeholder="e.g. Honda Civic" 
                value={formData.model}
                onChange={handleChange}
                required 
              />
            </label>

            <label>
              License Plate
              <input 
                type="text" 
                name="plate" 
                placeholder="e.g. ABC-1234" 
                value={formData.plate}
                onChange={handleChange}
                required 
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              Vehicle Type
              <select 
                name="type" 
                value={formData.type}
                onChange={handleChange}
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  font: "inherit",
                  fontSize: "1rem",
                  background: "white",
                  width: "100%",
                  maxWidth: "200px"
                }}
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Electric">Electric</option>
                <option value="Van">Van</option>
              </select>
            </label>

            <div className="button-row" style={{ marginTop: "32px" }}>
              <button type="button" className="secondary-btn" onClick={() => navigate("/vehicle")}>
                Cancel
              </button>
              <button type="submit" className="primary-btn" style={{ marginLeft: "auto" }}>
                Save Vehicle
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
