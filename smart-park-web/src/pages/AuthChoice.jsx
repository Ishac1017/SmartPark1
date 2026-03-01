import { useNavigate } from "react-router-dom";

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <main className="screen splash-screen">
      <section className="splash-card">
        <div className="logo-circle">🔑</div>
        <div className="page-header" style={{ marginBottom: "32px" }}>
          <h1>Welcome to SmartPark</h1>
          <p>The smartest way to find and book your parking spot.</p>
        </div>
        
        <div style={{ display: "grid", gap: "16px" }}>
          <button className="primary-btn" style={{ width: "100%", padding: "16px" }} onClick={() => navigate("/login")}>
            Sign In to Your Account
          </button>
          <button className="secondary-btn" style={{ width: "100%", padding: "16px" }} onClick={() => navigate("/signup")}>
            Create New Account
          </button>
        </div>
        
        <p style={{ marginTop: "24px", fontSize: "0.85rem", color: "#6b7280" }}>
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </section>
    </main>
  );
}

