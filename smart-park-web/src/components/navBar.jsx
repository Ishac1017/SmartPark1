import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton.jsx";
import LogoutButton from "./LogoutButton.jsx";

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
        <>
          <span>Hello, {user.name}</span>
          <LogoutButton />
          <Link to="/dashboard">Dashboard</Link>
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
