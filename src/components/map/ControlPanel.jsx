// src/components/map/ControlPanel.jsx
import React from "react";
import { 
  Layers, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  MapPin,
  BarChart3
} from "lucide-react";

const ControlPanel = ({ 
  formData, 
  onFormSubmit, 
  onFormChange, 
  loading, 
  selectedRegion,
  timeRange,
  mapData,
  onExport,
  onRefresh
}) => {
  // NDVI color scale
  const ndviColorScale = [
    { min: -1.0, max: 0.1, color: '#8B4513', label: 'No Vegetation' },
    { min: 0.1, max: 0.2, color: '#D2B48C', label: 'Sparse' },
    { min: 0.2, max: 0.3, color: '#9ACD32', label: 'Low' },
    { min: 0.3, max: 0.4, color: '#32CD32', label: 'Moderate' },
    { min: 0.4, max: 0.5, color: '#228B22', label: 'Healthy' },
    { min: 0.5, max: 1.0, color: '#006400', label: 'Dense' }
  ];

  // Get color for NDVI value
  const getColorForNdvi = (ndvi) => {
    const range = ndviColorScale.find(r => ndvi >= r.min && ndvi <= r.max);
    return range ? range.color : '#CCCCCC';
  };

  return (
    <aside className="w-80 bg-panel border-l border-gray-700 p-6 hidden lg:block text-textLight custom-scrollbar-sidebar overflow-y-auto">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" /> Map Controls
      </h2>
      
      {/* Region Selection Form */}
      <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4" /> Region Settings
        </h3>
        <form onSubmit={onFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textLight mb-2">
              Region IDs
            </label>
            <input
              type="text"
              name="ids"
              value={formData.ids}
              onChange={onFormChange}
              className="w-full px-3 py-2 bg-background border border-gray-600 rounded-lg text-white"
              placeholder="110955,110961"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textLight mb-2">
                Start Month
              </label>
              <select
                name="start_month"
                value={formData.start_month}
                onChange={onFormChange}
                className="w-full px-3 py-2 bg-background border border-gray-600 rounded-lg text-white"
              >
                {Array.from({length: 12}, (_, i) => (
                  <option key={i+1} value={i+1}>
                    {new Date(0, i).toLocaleString('en', {month: 'short'})}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-textLight mb-2">
                Duration
              </label>
              <select
                name="num_months"
                value={formData.num_months}
                onChange={onFormChange}
                className="w-full px-3 py-2 bg-background border border-gray-600 rounded-lg text-white"
              >
                {Array.from({length: 12}, (_, i) => (
                  <option key={i+1} value={i+1}>
                    {i+1}m
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-black py-2 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Map'}
          </button>
        </form>
      </div>

      {/* Selected Region Info */}
      {selectedRegion && (
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Selected Region
          </h3>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-primary">{selectedRegion.name}</p>
              <p className="text-sm text-textLight/60">ID: {selectedRegion.id}</p>
            </div>
            
            {selectedRegion.data[timeRange] && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg NDVI:</span>
                  <span className="font-bold text-lg" style={{ 
                    color: getColorForNdvi(selectedRegion.data[timeRange].averageNdvi) 
                  }}>
                    {selectedRegion.data[timeRange].averageNdvi}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trend:</span>
                  <span className={`flex items-center gap-1 text-sm ${
                    selectedRegion.data[timeRange].trend === 'increasing' ? 'text-green-400' :
                    selectedRegion.data[timeRange].trend === 'decreasing' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${
                      selectedRegion.data[timeRange].trend === 'decreasing' ? 'rotate-180' : ''
                    }`} />
                    {selectedRegion.data[timeRange].trend}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-background rounded">
                    <div>Max</div>
                    <div className="font-semibold">{selectedRegion.data[timeRange].maxNdvi}</div>
                  </div>
                  <div className="text-center p-2 bg-background rounded">
                    <div>Min</div>
                    <div className="font-semibold">{selectedRegion.data[timeRange].minNdvi}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
        <h4 className="font-medium text-textLight mb-3">NDVI Legend</h4>
        <div className="space-y-2">
          {ndviColorScale.map((range, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: range.color }}
              />
              <span className="text-sm text-textLight/80">
                {range.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-background/50 rounded-lg border border-border">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={onExport}
            disabled={!mapData}
            className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="w-full flex items-center gap-2 px-3 py-2 bg-green-600 rounded text-white hover:bg-green-700 disabled:opacity-50 text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;