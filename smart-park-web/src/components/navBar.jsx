import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <header className="nav-header">
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="brand-icon" style={{ width: "32px", height: "32px", fontSize: "16px" }}>P</div>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#111827" }}>SmartPark</span>
          </div>
        </Link>
        
        <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>{user?.name}</span>
              </div>
              <button
                className="secondary-btn"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                style={{ padding: "10px 20px" }}
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/auth" className="primary-btn" style={{ textDecoration: "none" }}>
              Get Started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

