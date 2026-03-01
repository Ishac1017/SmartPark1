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
    if (sort === "price") return a.price - b.price;
    if (sort === "distance") return a.distance - b.distance;
    return 0;
  });

  const handleSelect = (spot) => {
    navigate("/map", { state: spot });
  };

  return (
    <main className="screen">
      <NavBar />
      <div className="page-container">
        <div className="page-header">
          <div className="brand-chip">
            <div className="brand-icon">✨</div>
            <span className="brand-text">Available Now</span>
          </div>
          <h1>Best Parking Spots Near {destination?.name || "You"}</h1>
          {isLoading ? (
            <p>Searching for the best spots nearby...</p>
          ) : (
            <p>We found {sorted.length} spots within walking distance of your destination.</p>
          )}
        </div>

        <FilterBar setSort={setSort} />

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
             <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Searching for spots...</p>
          </div>
        ) : (
          <div className="three-col-layout">
            {sorted.length > 0 ? (
              sorted.map((s, i) => (
                <ParkingCard key={s.id || i} garage={s} onSelect={handleSelect} />
              ))
            ) : (
              <div className="panel" style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                <p>No parking garages found within 3 miles of this location.</p>
                <button className="primary-btn" onClick={() => navigate("/search")}>Try another location</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

