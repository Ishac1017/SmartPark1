import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ParkingCard from "../components/parkingCard";
import FilterBar from "../components/FilterBar";
import NavBar from "../components/navBar";
import { getParkingGarages } from "../services/geoapify";

export default function Results() {
  const navigate = useNavigate();
  const { state: destination } = useLocation();
  const [sort, setSort] = useState("");
  const [spots, setSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (destination?.lon && destination?.lat) {
        const garages = await getParkingGarages(destination.lon, destination.lat);
        setSpots(garages);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [destination]);

  const sorted = [...spots].sort((a, b) => {
    if (sort === "price") return (a.price || 0) - (b.price || 0);
    if (sort === "distance") return (parseFloat(a.distance) || 0) - (parseFloat(b.distance) || 0);
    return 0;
  });

  const handleSelect = (spot) => {
    navigate("/map", { state: spot });
  };

  return (
    <main className="screen" style={{ 
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      minHeight: "100vh"
    }}>
      <NavBar />
      <div className="page-container" style={{ zIndex: 2 }}>
        <div className="results-layout" style={{ display: "grid", gap: "24px" }}>
          <div className="page-header" style={{ marginBottom: 0, paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
            <div className="brand-chip" style={{ marginBottom: "16px" }}>
              <div className="brand-icon">📶</div>
              <span className="brand-text">Live Node Data</span>
            </div>
            <h1 style={{ fontSize: "2.25rem" }}>Optimal Spots near {destination?.name || "Target"}</h1>
            {isLoading ? (
              <p style={{ fontWeight: 500 }}>Analyzing nearby parking availability...</p>
            ) : (
              <p style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                <span style={{ 
                  width: "8px", 
                  height: "8px", 
                  background: sorted.length > 0 ? "var(--success)" : "var(--danger)", 
                  borderRadius: "50%",
                  display: "inline-block",
                  boxShadow: `0 0 10px ${sorted.length > 0 ? 'var(--success)' : 'var(--danger)'}`
                }}></span>
                {sorted.length} premium nodes detected within your arrival zone.
              </p>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {!isLoading && <FilterBar currentSort={sort} setSort={setSort} />}
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
               <div className="loader" style={{ 
                  width: "48px", 
                  height: "48px", 
                  border: "4px solid var(--border)", 
                  borderTop: "4px solid var(--primary)", 
                  borderRadius: "50%", 
                  margin: "0 auto 32px",
                  animation: "spin 1s linear infinite" 
               }}></div>
               <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", fontWeight: 600, fontFamily: "var(--font-display)" }}>Syncing with Urban Smart Grid...</p>
            </div>
          ) : (
            <div className="three-col-layout" style={{ marginTop: 0 }}>
              {sorted.length > 0 ? (
                sorted.map((s, i) => (
                  <ParkingCard key={s.id || i} garage={s} onSelect={handleSelect} />
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "32px" }}>🏙️</div>
                  <h3 style={{ marginBottom: "16px", fontSize: "1.75rem" }}>No Optimal Nodes Detected</h3>
                  <p style={{ color: "var(--text-muted)", marginBottom: "40px", maxWidth: "520px", margin: "0 auto 40px", fontSize: "1.1rem", fontWeight: 500 }}>
                    We couldn't find any smart parking garages within your immediate vicinity. Try searching for a broader area.
                  </p>
                  <button className="primary-btn" onClick={() => navigate("/search")} style={{ padding: "16px 40px", borderRadius: "12px" }}>Return to Node Hub</button>
                </div>
              )}
            </div>
          )}
        </div>
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
