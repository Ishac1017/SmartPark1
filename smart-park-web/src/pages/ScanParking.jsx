import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/navBar";
import parkingLots from "../data/parkingLots";

export default function ScanParking() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isExit = location.search.includes("mode=exit");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(result) {
      scanner.clear();
      setScanResult(result);
      
      if (isExit) {
        // Handle Exit Scan
        const savedSession = localStorage.getItem("activeParkingSession");
        if (savedSession) {
          const session = JSON.parse(savedSession);
          const garage = parkingLots.find(g => g.id === session.garageId || g.name === session.garageId) || { price: 15 };
          const startTime = new Date(session.startTime).getTime();
          const endTime = new Date().getTime();
          const durationSeconds = Math.floor((endTime - startTime) / 1000);
          const finalCharge = ((durationSeconds / 3600) * garage.price).toFixed(2);
          
          const completedSession = {
            ...session,
            endTime: new Date().toISOString(),
            finalCharge,
            status: "completed"
          };
          
          localStorage.setItem("lastParkingSession", JSON.stringify(completedSession));
          localStorage.removeItem("activeParkingSession");
          
          setTimeout(() => {
            alert(`Payment Successful! Total Charge: $${finalCharge}`);
            navigate("/search");
          }, 1000);
        } else {
          navigate("/search");
        }
      } else {
        // Handle Entry Scan
        const session = {
          garageId: result,
          startTime: new Date().toISOString(),
          status: "active"
        };
        
        localStorage.setItem("activeParkingSession", JSON.stringify(session));
        
        setTimeout(() => {
          navigate("/receipt");
        }, 1500);
      }
    }

    function onScanError(err) {
      // console.warn(err);
    }

    return () => {
      scanner.clear();
    };
  }, [navigate, isExit]);

  return (
    <main className="screen">
      <NavBar />
      <div className="page-container">
        <div className="page-header">
          <div className="brand-chip">
            <div className="brand-icon">P</div>
            <span className="brand-text">{isExit ? "Check-Out Scanner" : "Check-In Scanner"}</span>
          </div>
          <h1>{isExit ? "Scan Exit QR" : "Scan Garage QR"}</h1>
          <p>
            {isExit 
              ? "Point your camera at the QR code at the exit gate to finish your session and pay." 
              : "Point your camera at the QR code located at the garage entrance to start your session."}
          </p>
        </div>

        <section className="panel" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {!scanResult ? (
            <div id="reader" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}></div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ 
                width: "64px", 
                height: "64px", 
                background: "var(--success)", 
                borderRadius: "50%", 
                display: "grid", 
                placeItems: "center", 
                margin: "0 auto 24px",
                color: "white",
                fontSize: "24px"
              }}>
                ✓
              </div>
              <h2 style={{ marginBottom: "8px" }}>Scan Successful!</h2>
              <p style={{ color: "var(--text-muted)" }}>Initializing your digital receipt for <strong>{scanResult}</strong>...</p>
            </div>
          )}
        </section>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button className="secondary-btn" onClick={() => navigate("/search")}>
            Cancel and Return
          </button>
        </div>
      </div>
      
      <style>{`
        #reader__scan_region {
          background: white !important;
        }
        #reader__dashboard_section_csr button {
          background: var(--primary) !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          margin: 10px 0 !important;
        }
        #reader__dashboard_section_csr span {
          display: none !important;
        }
        #reader video {
          border-radius: 12px !important;
        }
      `}</style>
    </main>
  );
}
