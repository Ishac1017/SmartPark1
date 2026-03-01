import React from "react";

export default function ParkingCard({ garage, onSelect }) {
  const isFillingUp = garage.capacity < 10;

  return (
    <div className="parking-card" onClick={() => onSelect(garage)}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ 
          background: isFillingUp ? "#fee2e2" : "#dcfce7", 
          color: isFillingUp ? "#991b1b" : "#166534",
          padding: "4px 12px",
          borderRadius: "999px",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase"
        }}>
          {isFillingUp ? "Filling Up" : "Available"}
        </div>
        <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827" }}>
          ${garage.price}<span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 500 }}>/hr</span>
        </div>
      </div>

      <h3 style={{ margin: "0 0 4px", fontSize: "1.2rem", color: "#111827" }}>{garage.name}</h3>
      <p style={{ margin: "0 0 16px", color: "#6b7280", fontSize: "0.9rem" }}>{garage.address || "Walking distance to destination"}</p>

      <div style={{ display: "flex", gap: "20px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>Distance</span>
          <span style={{ fontWeight: 700, color: "#334155" }}>{garage.distance} miles</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>Spots Left</span>
          <span style={{ fontWeight: 700, color: "#334155" }}>{garage.capacity}</span>
        </div>
      </div>
      
      <button className="primary-btn" style={{ width: "100%", marginTop: "24px", padding: "12px" }}>
        Select This Spot
      </button>
    </div>
  );
}

