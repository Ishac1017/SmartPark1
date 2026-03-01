import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="screen splash-screen">
      <section className="splash-card">
        <div className="logo-circle">🚗</div>
        <h1>SmartPark</h1>
        <p>Premium Parking, Simplified.</p>
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", gap: "8px" }}>
          <div className="loading-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0b8f74", animation: "pulse 1.5s infinite" }}></div>
          <div className="loading-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0b8f74", animation: "pulse 1.5s infinite 0.2s" }}></div>
          <div className="loading-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0b8f74", animation: "pulse 1.5s infinite 0.4s" }}></div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </main>
  );
}

