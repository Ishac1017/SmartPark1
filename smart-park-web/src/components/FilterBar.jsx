import React from "react";

export default function FilterBar({ setSort }) {
  return (
    <div className="button-row">
      <button className="secondary-btn" onClick={() => setSort("price")}>
        Sort by Cheapest
      </button>
      <button className="secondary-btn" onClick={() => setSort("distance")}>
        Sort by Distance
      </button>
    </div>
  );
}
