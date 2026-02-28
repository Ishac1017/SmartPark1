import React from "react";
import { useParams } from "react-router-dom";
import parkingLots from "../data/parkingLots";

export default function ParkingDetails() {
  const { id } = useParams();
  const spot = parkingLots.find((p) => p.id == id);

  return (
    <div style={{ padding: 20 }}>
      <h2>{spot.name}</h2>
      <p>Price per hour: ${spot.price}</p>
      <p>Distance: {spot.distance} min walk</p>
      <p>Capacity left: {spot.capacity}</p>

      <h3>Check In</h3>
      <p>
        When you arrive at this garage, scan the QR code at the entrance to check in.
      </p>
    </div>
  );
}
