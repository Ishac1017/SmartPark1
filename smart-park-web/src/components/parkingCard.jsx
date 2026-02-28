import React from "react";
import { Link } from "react-router-dom";

export default function ParkingCard({ garage }) {
  return (
    <div style={{
      padding: 20,
      border: "1px solid #ccc",
      borderRadius: 10,
      marginBottom: 20
    }}>
      <h3>{garage.name}</h3>
      <p>Price: ${garage.price}/hr</p>
      <p>Distance: {garage.distance} mins walk</p>
      <Link to={`/parking/${garage.id}`}>View Details</Link>
    </div>
  );
}
