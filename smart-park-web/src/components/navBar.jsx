
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth0();
  const activeSession = localStorage.getItem("activeParkingSession");

  return (
    <header className="nav-header">
      <nav style={{ display: "flex", gap: "16px", alignItems: "center", marginLeft: "auto" }}>
        {isAuthenticated ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "4px 12px", background: "rgba(255,255,255,0.5)", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-main)" }}>{user?.name}</span>
              </div>
              <img
                src={user?.picture}
                alt={user?.name}
                style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid var(--border)" }}
              />
            </div>
            <button
              className="secondary-btn"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              style={{ padding: "8px 16px", fontSize: "0.85rem", borderRadius: "8px" }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/auth" className="primary-btn" style={{ padding: "10px 20px", fontSize: "0.85rem", textDecoration: "none", borderRadius: "8px" }}>
            Get Started
          </Link>
        )}
      </nav>
    </header>
  );
}
