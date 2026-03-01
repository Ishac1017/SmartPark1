import React from "react";

export default function FilterBar({ currentSort, setSort }) {
  return (
    <div className="filter-bar" style={{ 
      display: "flex", 
      gap: "8px", 
      marginBottom: "24px",
      background: "rgba(255, 255, 255, 0.4)",
      padding: "6px",
      borderRadius: "14px",
      width: "fit-content",
      border: "1px solid var(--border)",
      backdropFilter: "blur(10px)"
    }}>
      <button 
        className="secondary-btn" 
        style={{ 
          padding: "8px 16px", 
          fontSize: "0.8rem", 
          border: currentSort === "price" ? "1px solid var(--primary)" : "none", 
          boxShadow: currentSort === "price" ? "var(--shadow-sm)" : "none", 
          borderRadius: "10px", 
          background: currentSort === "price" ? "#fff" : "transparent",
          color: currentSort === "price" ? "var(--primary)" : "var(--text-main)",
          fontWeight: currentSort === "price" ? 700 : 500,
          transition: "all 0.2s ease"
        }}
        onClick={() => setSort("price")}
      >
        <span style={{ marginRight: "6px" }}>💰</span> Cheapest
      </button>
      <button 
        className="secondary-btn" 
        style={{ 
          padding: "8px 16px", 
          fontSize: "0.8rem", 
          border: currentSort === "distance" ? "1px solid var(--primary)" : "none", 
          boxShadow: currentSort === "distance" ? "var(--shadow-sm)" : "none", 
          borderRadius: "10px", 
          background: currentSort === "distance" ? "#fff" : "transparent",
          color: currentSort === "distance" ? "var(--primary)" : "var(--text-main)",
          fontWeight: currentSort === "distance" ? 700 : 500,
          transition: "all 0.2s ease"
        }}
        onClick={() => setSort("distance")}
      >
        <span style={{ marginRight: "6px" }}>📍</span> Nearest
      </button>
      <button 
        className="secondary-btn" 
        style={{ 
          padding: "8px 16px", 
          fontSize: "0.8rem", 
          border: "none", 
          boxShadow: "none", 
          borderRadius: "10px", 
          background: "transparent", 
          color: "var(--text-muted)",
          opacity: currentSort ? 1 : 0.5,
          cursor: currentSort ? "pointer" : "default",
          transition: "all 0.2s ease"
        }}
        onClick={() => setSort("")}
        disabled={!currentSort}
      >
        <span style={{ marginRight: "6px" }}>🔄</span> Reset
      </button>
    </div>
  );
}
