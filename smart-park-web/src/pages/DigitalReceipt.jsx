
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import NavBar from "../components/navBar";
import parkingLots from "../data/parkingLots";

export default function DigitalReceipt() {
  const [session, setSession] = useState(null);
  const [duration, setDuration] = useState(0); // in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const savedSession = localStorage.getItem("activeParkingSession");
    if (!savedSession) {
      navigate("/search");
      return;
    }

    const parsedSession = JSON.parse(savedSession);
    // Find the garage details
    const garage = parkingLots.find(g => g.id === parsedSession.garageId || g.name === parsedSession.garageId);
   
    const sessionWithGarage = {
      ...parsedSession,
      garage: garage || { name: parsedSession.garageId, price: 15, address: "St. Louis, MO" }
    };
   
    setSession(sessionWithGarage);

    const interval = setInterval(() => {
      const start = new Date(sessionWithGarage.startTime).getTime();
      const now = new Date().getTime();
      setDuration(Math.floor((now - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (!session) return null;

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentCharge = ((duration / 3600) * session.garage.price).toFixed(2);
  const qrData = JSON.stringify({
    sessionId: session.startTime,
    userId: "user_123", // Placeholder
    garageId: session.garage.id
  });

  const handleScanExit = () => {
    navigate("/scan?mode=exit");
  };

  return (
    <main className="screen">
      <NavBar />
      <div className="page-container" style={{ maxWidth: "500px" }}>
        <div className="page-header" style={{ textAlign: "center" }}>
          <div className="brand-chip" style={{ margin: "0 auto 20px" }}>
            <div className="brand-icon">P</div>
            <span className="brand-text">Active Session</span>
          </div>
          <h1>Digital Receipt</h1>
          <p>Keep this page open. Your session is active.</p>
        </div>

        <section className="panel" style={{ textAlign: "center", padding: "32px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ margin: "0 0 8px" }}>{session.garage.name}</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{session.garage.address}</p>
          </div>

          <div style={{
            background: "rgba(37, 99, 235, 0.04)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
            border: "1px dashed var(--primary)"
          }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", marginBottom: "8px" }}>
              Time Parked
            </div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text-main)" }}>
              {formatDuration(duration)}
            </div>
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "24px" }}>
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Rate</div>
                <div style={{ fontWeight: 700 }}>${session.garage.price}/hr</div>
              </div>
              <div style={{ width: "1px", background: "var(--border)" }}></div>
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Current Cost</div>
                <div style={{ fontWeight: 700, color: "var(--success)" }}>${currentCharge}</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <div style={{
              background: "white",
              padding: "16px",
              borderRadius: "16px",
              display: "inline-block",
              boxShadow: "var(--shadow-md)",
              border: "1px solid var(--border)"
            }}>
              <QRCodeSVG value={qrData} size={180} />
            </div>
            <p style={{ marginTop: "16px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Show this QR code at the exit gate machine
            </p>
          </div>

          <button className="primary-btn" style={{ width: "100%", padding: "16px" }} onClick={handleScanExit}>
            Scan QR at Exit to Pay
          </button>
         
          <p style={{ marginTop: "20px", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            By scanning at the exit, your session will conclude and your default payment method will be charged.
          </p>
        </section>
      </div>
    </main>
  );
}
