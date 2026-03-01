import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.webp";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <main className="screen" style={{ 
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      margin: 0,
      padding: 0,
      overflow: "hidden"
    }}>
      <section style={{ 
        textAlign: "center",
        zIndex: 2,
        width: "100%",
        maxWidth: "480px",
        padding: "0 24px"
      }}>
        <img 
          src={logo} 
          alt="SmartPark Logo" 
          style={{ 
            width: "200px", 
            height: "auto", 
            marginBottom: "32px",
            borderRadius: "24px",
            objectFit: "contain",
            margin: "0 auto 32px"
          }} 
        />
        <div className="page-header" style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ 
            fontSize: "3.5rem", 
            marginBottom: "16px", 
            fontFamily: "'Space Grotesk', sans-serif",
            background: "linear-gradient(to right, #1e40af, #2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.04em",
            fontWeight: 800
          }}>Login</h1>
          <p style={{ 
            margin: "0 auto", 
            fontSize: "1.2rem", 
            color: "#475569", 
            lineHeight: "1.6",
            maxWidth: "360px",
            fontWeight: 500
          }}>Access your Smart Parking account</p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", width: "100%" }}>
          <button className="primary-btn" style={{ width: "100%", maxWidth: "280px", padding: "16px", fontSize: "1.1rem" }} onClick={() => loginWithRedirect()}>
            Login with Auth0
          </button>
        </div>
      </section>

      <p style={{ 
        position: "absolute", 
        bottom: "32px", 
        width: "100%", 
        textAlign: "center", 
        fontSize: "0.85rem", 
        color: "#64748b", 
        fontWeight: 500,
        padding: "0 24px",
        zIndex: 2
      }}>
        By continuing, you agree to our <span style={{ color: "#2563eb", cursor: "pointer", fontWeight: 700 }}>Terms of Service</span> and <span style={{ color: "#2563eb", cursor: "pointer", fontWeight: 700 }}>Privacy Policy</span>.
      </p>
    </main>
  );
}
