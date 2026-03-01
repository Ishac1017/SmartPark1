
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
    <main className="screen" style={{
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      minHeight: "100vh"
    }}>
      <NavBar />
      <div className="page-container" style={{ justifyContent: "center", minHeight: "calc(100vh - 80px)", zIndex: 2 }}>
        <section style={{ maxWidth: "640px", margin: "0 auto", padding: "56px" }}>
          <div className="page-header" style={{ marginBottom: "40px", textAlign: "center" }}>
            <div className="brand-chip" style={{ margin: "0 auto 24px" }}>
              <div className="brand-icon">📍</div>
              <span className="brand-text">Urban Node</span>
            </div>
            <h2 style={{ fontSize: "2.25rem" }}>Where are you heading?</h2>
            <p style={{ margin: "12px auto 0" }}>Enter your destination to find optimal parking spots near your arrival point.</p>
          </div>

          <div className="form-grid">
            <label style={{ gap: "10px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Destination Address</span>
              <div style={{ position: "relative" }}>
                <input
                  placeholder="e.g. 5th Ave, New York, NY"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  style={{
                    width: "100%",
                    fontSize: "1.1rem",
                    padding: "18px 24px",
                    borderRadius: "14px",
                    border: "1px solid var(--border)",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
                  }}
                />
                {isLoading && (
                  <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)" }}>
                    <div className="spinner-small" style={{ width: "20px", height: "20px", border: "2px solid var(--border)", borderTop: "2px solid var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="button-row" style={{ marginTop: "32px" }}>
            <button
              className="primary-btn"
              onClick={() => handleSearch()}
              disabled={isLoading}
              style={{ width: "100%", padding: "18px", fontSize: "1rem", borderRadius: "14px" }}
            >
              {isLoading ? "Searching Grid..." : "Find Parking"}
            </button>
          </div>

          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px", textAlign: "center" }}>Suggested Hubs</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              {["Downtown", "Central Park", "Airport", "Business District"].map(loc => (
                <button
                  key={loc}
                  onClick={() => handleSearch(loc)}
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid var(--border)",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    color: "var(--text-main)",
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "var(--transition)"
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "#fff"; e.target.style.borderColor = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.6)"; e.target.style.borderColor = "var(--border)"; }}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}