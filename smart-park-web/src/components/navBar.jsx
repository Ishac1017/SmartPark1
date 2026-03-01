import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton.jsx";
import LogoutButton from "./LogoutButton.jsx";

export default function NavBar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <nav style={{ 
      padding: '0 20px', 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff",
      height: "70px"
    }}>
      <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
        <h2 style={{ margin: 0 }}>Smart Parking</h2>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {isAuthenticated ? (
          <>
            <span style={{ fontWeight: 500 }}>Hello, {user.name}</span>
            <Link to="/dashboard" style={{ color: "#646cff", textDecoration: "none" }}>Dashboard</Link>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
