import React, { useState } from "react";
import parkingLots from "../data/parkingLots";
import ParkingCard from "../components/parkingCard";
import Filters from "../components/Filters";

export default function Home() {
  const [garages, setGarages] = useState(parkingLots);

  const sortByPrice = () => {
    setGarages([...garages].sort((a, b) => a.price - b.price));
  };

  const sortByDistance = () => {
    setGarages([...garages].sort((a, b) => a.distance - b.distance));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Nearby Parking</h2>

      <Filters
        sortByPrice={sortByPrice}
        sortByDistance={sortByDistance}
      />

      {garages.map((g) => (
        <ParkingCard key={g.id} garage={g} />
      ))}
    </div>
  );
}
