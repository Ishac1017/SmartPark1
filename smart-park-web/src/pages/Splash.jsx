import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 3200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="screen splash-screen">
      <section className="splash-card">
        <div className="logo-glow" style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "160px", height: "160px", background: "var(--primary-glow)", filter: "blur(50px)", borderRadius: "50%", zIndex: -1, animation: "pulse 3s infinite" }}></div>
        <div className="logo-circle">🅿</div>
        <div className="brand-content" style={{ marginTop: "32px" }}>
          <div className="brand-chip" style={{ marginBottom: "16px" }}>
            <span className="brand-icon">S</span>
            <span className="brand-text">Urban Systems</span>
          </div>
          <h1 style={{ marginBottom: "8px", fontWeight: 800, fontSize: "3rem" }}>SmartPark</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", fontWeight: 500 }}>Next-Gen Urban Mobility.</p>
        </div>

        <div className="loading-container" style={{ marginTop: "56px", width: "100%", height: "6px", background: "rgba(37, 99, 235, 0.08)", borderRadius: "3px", overflow: "hidden" }}>
          <div className="loading-bar" style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, var(--primary), var(--accent))", animation: "loadingBar 2.8s cubic-bezier(0.65, 0, 0.35, 1) forwards" }}></div>
        </div>
      </section>

      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        @keyframes pulse {
          0% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
          100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
        }
      `}</style>
    </main>
  );
}
