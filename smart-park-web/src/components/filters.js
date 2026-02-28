import React from "react";

export default function Filters({ sortByPrice, sortByDistance }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={sortByPrice} style={{ marginRight: 10 }}>
        Sort by Cheapest
      </button>
      <button onClick={sortByDistance}>
        Sort by Distance
      </button>
    </div>
  );
}
