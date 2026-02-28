import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const { user } = useAuth0();

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Dashboard</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Your Parking History will appear here soon.</p>
    </div>
  );
}
