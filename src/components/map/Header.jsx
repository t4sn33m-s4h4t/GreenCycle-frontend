// src/components/map/Header.jsx
import React from "react";

const Header = ({ timeRange, setTimeRange, mapData }) => {
  return (
    <header className="bg-panel border-b border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Vegetation Health Map
          </h1>
          <p className="text-textLight/70 mt-1">
            Real-time NDVI data from NASA satellites
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-background border border-gray-600 rounded-lg text-white"
          >
            {mapData?.metadata?.years?.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;