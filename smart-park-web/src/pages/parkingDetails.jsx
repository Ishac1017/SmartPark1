import React from "react";
import { useParams, Link } from "react-router-dom";
import parkingLots from "../data/parkingLots";

export default function ParkingDetails() {
  const { id } = useParams();
  const garage = parkingLots.find((g) => g.id === parseInt(id));

  if (!garage) return <div>Garage not found.</div>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">Back to Home</Link>
      <h2>{garage.name}</h2>
      <p><strong>Price:</strong> ${garage.price_per_hour}/hr</p>
      <p><strong>Capacity:</strong> {garage.capacity} spots</p>
      <p><strong>Coordinates:</strong> {garage.latitude}, {garage.longitude}</p>
      
      <div style={{ marginTop: 20, padding: 20, background: "#f9f9f9", borderRadius: 10 }}>
        <h3>Reserve a Spot</h3>
        <p>Reservations coming soon!</p>
        <button className="button primary">Book Now</button>
      </div>
    </div>
  );
}
