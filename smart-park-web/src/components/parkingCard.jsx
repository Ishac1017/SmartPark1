
import React from "react";

export default function ParkingCard({ garage, onSelect }) {
  const isFillingUp = garage.capacity < 10;

  return (
    <div className="parking-card" onClick={() => onSelect(garage)}>
      <div className="card-status-row" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "20px" }}>
        <div className={`status-badge ${isFillingUp ? 'status-danger' : 'status-success'}`} style={{
          background: isFillingUp ? "rgba(239, 68, 68, 0.08)" : "rgba(16, 185, 129, 0.08)",
          color: isFillingUp ? "var(--danger)" : "var(--success)",
          padding: "5px 12px",
          borderRadius: "999px",
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          border: `1px solid ${isFillingUp ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'}`
        }}>
          {isFillingUp ? "Limited Space" : "Available"}
        </div>
      </div>

      <h3 style={{ margin: "0 0 4px", fontSize: "1.25rem", color: "var(--text-main)", fontWeight: 700 }}>{garage.name}</h3>
      <p style={{ margin: "0 0 20px", color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.4, fontWeight: 500 }}>
        {garage.address || "Walking distance to destination"}
      </p>

      <div className="card-metrics" style={{
        display: "flex",
        gap: "12px",
        padding: "12px 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", borderRight: "1px solid var(--border)", paddingRight: "12px" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Price</span>
          <span style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "0.85rem" }}>${garage.price}<span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-muted)" }}>/hr</span></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", borderRight: "1px solid var(--border)", paddingRight: "12px" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Dist</span>
          <span style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "0.85rem" }}>{garage.distance}<span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-muted)" }}>mi</span></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", borderRight: "1px solid var(--border)", paddingRight: "12px" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Walk</span>
          <span style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "0.85rem" }}>{garage.travelTime}<span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-muted)" }}>min</span></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Spots</span>
          <span style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "0.85rem" }}>{garage.capacity}</span>
        </div>
      </div>
     
      <button className="primary-btn" style={{ width: "100%", padding: "12px", fontSize: "0.9rem", borderRadius: "10px" }}>
        Find Destination
      </button>
    </div>
  );
}
