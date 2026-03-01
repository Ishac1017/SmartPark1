import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParkingCard from "../components/ParkingCard";
import FilterBar from "../components/FilterBar";
import NavBar from "../components/NavBar";

export default function Results() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("");

  const [spots] = useState([
    { name: "Downtown Plaza Parking", distance: 0.2, price: 12, capacity: 45, address: "123 Main St" },
    { name: "Harbor View Garage", distance: 0.5, price: 8, capacity: 12, address: "456 Bay Ave" },
    { name: "Central Park East Lot", distance: 0.8, price: 15, capacity: 5, address: "789 Park Rd" },
    { name: "Skyline Tower Parking", distance: 1.1, price: 10, capacity: 80, address: "101 High St" },
    { name: "Grand Station Garage", distance: 1.4, price: 6, capacity: 25, address: "202 Rail Blvd" },
    { name: "Boutique Hotel Valet", distance: 1.6, price: 20, capacity: 3, address: "303 Luxury Ln" },
  ]);

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
          <h1>Best Parking Spots Near You</h1>
          <p>We found {sorted.length} spots within walking distance of your destination.</p>
        </div>

        <FilterBar setSort={setSort} />

        <div className="three-col-layout">
          {sorted.map((s, i) => (
            <ParkingCard key={i} garage={s} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </main>
  );
}

