import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/navBar";
import { geocodeAddress } from "../services/geoapify";

export default function Search() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    const query = searchQuery || location;
    if (!query.trim()) return;
    setIsLoading(true);
    const result = await geocodeAddress(query);
    setIsLoading(false);
    
    if (result) {
      navigate("/results", { state: { ...result, query } });
    } else {
      alert("Address not found. Please try again.");
    }
  };

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
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </label>
          </div>

          <div className="button-row">
            <button
              className="primary-btn"
              onClick={() => handleSearch()}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Find Parking Spots"}
            </button>
          </div>
          </section>      </div>
    </main>
  );
}

