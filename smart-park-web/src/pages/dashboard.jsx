import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CarRegistration } from "../components/carRegistration";

export default function Dashboard() {
  const { user } = useAuth0();

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Dashboard</h2>
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Register a New Car</h3>
        <CarRegistration />
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Your Parking History</h3>
        <p>Coming soon!</p>
      </div>
    </div>
  );
}
