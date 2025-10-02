// src/components/map/Sidebar.jsx
import React from "react";
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  Sprout,
  Calendar,
  MapPin,
  Info
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Sidebar = ({ selectedRegion, mapData, timeRange, loading, onExport, onRefresh }) => {
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

  // Prepare data for vegetation distribution chart
  const getVegetationDistributionData = () => {
    if (!mapData?.data) return [];
    
    const distribution = {
      'No Vegetation': 0,
      'Sparse': 0,
      'Low': 0,
      'Moderate': 0,
      'Healthy': 0,
      'Dense': 0
    };

    mapData.data.forEach(item => {
      if (item.ndvi < 0.1) distribution['No Vegetation']++;
      else if (item.ndvi < 0.2) distribution['Sparse']++;
      else if (item.ndvi < 0.3) distribution['Low']++;
      else if (item.ndvi < 0.4) distribution['Moderate']++;
      else if (item.ndvi < 0.5) distribution['Healthy']++;
      else distribution['Dense']++;
    });

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
      color: ndviColorScale.find(scale => scale.label === name)?.color || '#CCCCCC'
    }));
  };

  // Prepare data for time series chart
  const getTimeSeriesData = () => {
    if (!mapData?.data) return [];
    
    return mapData.data
      .filter(item => item.year === parseInt(timeRange))
      .map(item => ({
        date: item.date,
        ndvi: item.ndvi,
        quality: item.ndviQuality
      }));
  };

  return (
    <aside className="w-80 bg-panel border-l border-gray-700 p-6 hidden lg:block text-textLight custom-scrollbar-sidebar overflow-y-auto">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" /> Vegetation Analysis
      </h2>

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

      {/* Vegetation Distribution */}
      {mapData && (
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Sprout className="w-4 h-4" /> Vegetation Distribution
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getVegetationDistributionData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getVegetationDistributionData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Time Series Chart */}
      {mapData && (
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> NDVI Trend {timeRange}
          </h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getTimeSeriesData()}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={40}
                />
                <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
                <Tooltip 
                  formatter={(value) => [value.toFixed(3), 'NDVI']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar 
                  dataKey="ndvi" 
                  fill="#10b981"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {mapData && (
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
          <h3 className="font-medium mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-textLight/70">Regions</span>
              <span>{mapData.metadata.regions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-textLight/70">Data Points</span>
              <span>{mapData.metadata.totalDataPoints}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-textLight/70">Time Range</span>
              <span>{mapData.metadata.timeRange.durationDays} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-textLight/70">Satellite</span>
              <span>{mapData.metadata.parameters.satellite}</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
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

      {/* Data Source Info */}
      <div className="p-4 bg-background/50 rounded-lg border border-border">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Data Source
        </h3>
        <div className="text-xs space-y-1 text-textLight/60">
          <p>NASA GLAM API</p>
          <p>MODIS Satellite</p>
          <p>Collection 6.1</p>
          <p>Updated: {mapData ? new Date().toLocaleDateString() : 'Loading...'}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;