import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/search");
  }

  return (
    <main className="screen splash-screen" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" }}>
      <section className="splash-card" style={{ border: "none", boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.15)" }}>
        <div className="logo-circle" style={{ 
          marginBottom: "40px", 
          background: "linear-gradient(135deg, #2563eb, #06b6d4)",
          transform: "rotate(0deg)",
          boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
        }}>🚀</div>
        
        <div className="page-header" style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            marginBottom: "12px", 
            fontFamily: "'Space Grotesk', sans-serif",
            background: "linear-gradient(to right, #1e40af, #2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>Sign Up</h1>
          <p style={{ margin: "0 auto", color: "#64748b" }}>Create your Smart Parking account</p>
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <button className="primary-btn" style={{ width: "100%", maxWidth: "280px" }} onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}>
            Sign Up with Auth0
          </button>
        </div>
      </section>
    </main>
  );
}
