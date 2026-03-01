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
      </div>

      <h3 style={{ margin: "0 0 4px", fontSize: "1.2rem", color: "#111827" }}>{garage.name}</h3>
      <p style={{ margin: "0 0 12px", color: "#6b7280", fontSize: "0.9rem" }}>{garage.address || "Walking distance to destination"}</p>

      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px", 
        fontSize: "0.9rem",
        color: "#64748b",
        marginBottom: "8px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontWeight: 600, color: "#334155" }}>{garage.travelTime} min</span>
          <span>walk</span>
        </div>
        <span style={{ color: "#cbd5e1" }}>•</span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontWeight: 600, color: "#334155" }}>{garage.distance} mi</span>
        </div>
        <span style={{ color: "#cbd5e1" }}>•</span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontWeight: 600, color: "#334155" }}>{garage.capacity}</span>
          <span>spots</span>
        </div>
        <span style={{ color: "#cbd5e1" }}>•</span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontWeight: 700, color: "#0b8f74" }}>${garage.price}/hr</span>
        </div>
      </div>
      
      <button className="primary-btn" style={{ width: "100%", marginTop: "16px", padding: "12px" }}>
        Select This Spot
      </button>
    </div>
  );
}

