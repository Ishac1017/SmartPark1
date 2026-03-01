import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";

export default function Search() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  return (
    <main className="screen">
      <NavBar />
      <div className="page-container">
        <section className="panel" style={{ maxWidth: "800px", margin: "40px auto" }}>
          <div className="page-header">
            <div className="brand-chip">
              <div className="brand-icon">📍</div>
              <span className="brand-text">Destination</span>
            </div>
            <h2>Where do you want to go?</h2>
            <p>Enter your destination to find the most convenient parking spots near you.</p>
          </div>

          <div className="form-grid">
            <label>
              Your Destination
              <input
                placeholder="e.g. Times Square, New York"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
          </div>

          <div className="button-row">
            <button className="primary-btn" onClick={() => navigate("/results")}>
              Find Parking Spots
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

