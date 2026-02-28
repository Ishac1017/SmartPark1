import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div style={{ 
      padding: 20, 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      borderBottom: "1px solid #ddd"
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2>Smart Parking</h2>
      </Link>

      {isAuthenticated ? (
        <div style={{ display: "flex", gap: 15 }}>
          <span>Hello, {user.name}</span>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>
          Log In / Sign Up
        </button>
      )}
    </div>
  );
}
