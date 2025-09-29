// src/pages/Charts.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, ComposedChart, 
  PieChart, Pie, Cell, Legend
} from "recharts";
import { 
  Calendar, MapPin, RefreshCw, Download, 
  Thermometer, Droplets, Sun, BarChart3, Info 
} from "lucide-react";

// Import components/charts
import Modal from "../components/charts/Modal";
import ChartCard from "../components/charts/ChartCard";
import { validateInputs } from "../components/charts/ValidationUtils";

const Charts = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(23.8041);
  const [longitude, setLongitude] = useState(90.4152);
  const [startDate, setStartDate] = useState("2025-09-18");
  const [endDate, setEndDate] = useState("2025-09-27");
  const [showGuidelines, setShowGuidelines] = useState(false);

  // Color schemes
  const colors = {
    temperature: "#ef4444",
    rainfall: "#3b82f6", 
    solar: "#f59e0b",
    comparison: "#10b981"
  };

  const fetchWeather = async () => {
    // Validate inputs before making API call
    const errors = validateInputs(latitude, longitude, startDate, endDate);
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/weather`,
        {
          params: { latitude, longitude, startDate, endDate },
        }
      );
      setWeatherData(res.data.data);
      toast.success('Weather data loaded successfully!');
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      toast.error('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Chart data preparation functions
  const getTemperatureData = () => {
    if (!weatherData) return [];
    return weatherData.temperature.hourly_data.slice(0, 24).map(d => ({
      time: d.timestamp,
      temperature: d.value,
      name: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  };

  const getRainfallData = () => {
    if (!weatherData) return [];
    return weatherData.rainfall.daily_data.map(d => ({
      time: d.date,
      rainfall: d.rainfall,
      name: new Date(d.date).toLocaleDateString()
    }));
  };

  const getSolarData = () => {
    if (!weatherData) return [];
    return weatherData.solar_radiation.hourly_data.slice(0, 24).map(d => ({
      time: d.timestamp,
      solar: d.value,
      name: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  };

  const getComparisonData = () => {
    if (!weatherData) return [];
    const tempData = weatherData.temperature.hourly_data.slice(0, 24);
    const solarData = weatherData.solar_radiation.hourly_data.slice(0, 24);
    
    return tempData.map((temp, index) => ({
      time: temp.timestamp,
      temperature: temp.value,
      solar: solarData[index]?.value || 0,
      name: new Date(temp.timestamp).toLocaleTimeString([], { hour: '2-digit' })
    }));
  };

 const getSummaryData = () => {
  if (!weatherData) return [];
  
  const tempValue = Math.round(weatherData.summary.temperature.daily_average * 100) / 100;
  const rainValue = Math.round(weatherData.summary.rainfall.total * 100) / 100;
  const solarValue = Math.round(weatherData.summary.solar_radiation.daily_average * 1000) / 1000;

  // Ensure minimum values to prevent pie chart issues
  const data = [
    { 
      name: 'Temperature', 
      value: Math.max(tempValue, 0.1), // Minimum 0.1 to prevent chart issues
      actualValue: tempValue,
      unit: '°C'
    },
    { 
      name: 'Rainfall', 
      value: Math.max(rainValue, 0.1), // Minimum 0.1
      actualValue: rainValue,
      unit: 'mm'
    },
    { 
      name: 'Solar', 
      value: Math.max(solarValue, 0.001), // Minimum 0.001 for solar
      actualValue: solarValue,
      unit: 'MJ/hr'
    }
  ];

  // Filter out any invalid data and ensure we have at least one valid entry
  const validData = data.filter(item => !isNaN(item.value) && isFinite(item.value));
  
  return validData.length > 0 ? validData : [
    { name: 'No Data', value: 1, actualValue: 0, unit: '' }
  ];
};

  const PIE_COLORS = [colors.temperature, colors.rainfall, colors.solar];

  const exportData = () => {
    if (!weatherData) {
      toast.warning('No data available to export');
      return;
    }
    
    try {
      const dataStr = JSON.stringify(weatherData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `weather-data-${latitude}-${longitude}.json`;
      link.click();
      toast.success('Data exported successfully!');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  // Guidelines content
  const guidelinesContent = (
    <div className="space-y-4">
      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <h3 className="font-semibold text-blue-400 mb-2">📊 Temperature Chart</h3>
        <p className="text-sm">Shows hourly temperature variations in Celsius (°C). Red line indicates temperature trends throughout the day.</p>
      </div>
      
      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <h3 className="font-semibold text-blue-400 mb-2">🌧️ Rainfall Chart</h3>
        <p className="text-sm">Displays daily rainfall accumulation in millimeters (mm). Blue bars show rainfall amounts for each day.</p>
      </div>
      
      <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
        <h3 className="font-semibold text-yellow-400 mb-2">☀️ Solar Radiation Chart</h3>
        <p className="text-sm">Illustrates solar energy received per hour in MegaJoules per hour (MJ/hr). Yellow area shows solar intensity patterns.</p>
      </div>
      
      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
        <h3 className="font-semibold text-green-400 mb-2">📈 Temperature vs Solar</h3>
        <p className="text-sm">Compares temperature (line) and solar radiation (bars) to show their relationship throughout the day.</p>
      </div>
      
      <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <h3 className="font-semibold text-purple-400 mb-2">🥧 Data Distribution</h3>
        <p className="text-sm">Pie chart showing proportional distribution of average temperature, total rainfall, and solar radiation values.</p>
      </div>
      
      <div className="mt-4 p-3 bg-gray-500/10 rounded-lg">
        <h4 className="font-semibold mb-2">💡 Tips:</h4>
        <ul className="text-sm space-y-1">
          <li>• Hover over charts to see detailed values</li>
          <li>• Use date range to analyze different periods</li>
          <li>• Compare charts to understand weather patterns</li>
          <li>• Export data for further analysis</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="flex flex-1 h-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {/* Main Content with Custom Scrollbar */}
      <main className="flex-1 p-6 overflow-y-auto bg-background text-textLight custom-scrollbar">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Weather Analytics Dashboard</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowGuidelines(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700 text-sm transition-colors"
            >
              <Info className="w-4 h-4" /> Chart Guidelines
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 text-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Export Data
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading weather data...</span>
          </div>
        )}

        {!loading && weatherData && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-lg border border-red-500/20 hover:bg-red-500/15 transition-colors">
                <Thermometer className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">Avg Temperature</p>
                  <p className="text-xl font-bold">{weatherData.summary.temperature.daily_average}°C</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
                <Droplets className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Rainfall</p>
                  <p className="text-xl font-bold">{weatherData.summary.rainfall.total}mm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/15 transition-colors">
                <Sun className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Avg Solar</p>
                  <p className="text-xl font-bold">{weatherData.summary.solar_radiation.daily_average} MJ/hr</p>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Temperature Chart */}
              <ChartCard
                title="Temperature (°C)"
                icon={<Thermometer className="w-5 h-5 text-red-400" />}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getTemperatureData()}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      fontSize={11}
                      interval="preserveStartEnd"
                    />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke={colors.temperature}
                      strokeWidth={2}
                      dot={{ fill: colors.temperature, r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Rainfall Chart */}
              <ChartCard
                title="Rainfall (mm)"
                icon={<Droplets className="w-5 h-5 text-blue-400" />}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getRainfallData()}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      fontSize={11}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="rainfall" fill={colors.rainfall} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Solar Radiation Chart */}
              <ChartCard
                title="Solar Radiation (MJ/hr)"
                icon={<Sun className="w-5 h-5 text-yellow-400" />}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getSolarData()}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      fontSize={11}
                      interval="preserveStartEnd"
                    />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area 
                      type="monotone"
                      dataKey="solar" 
                      stroke={colors.solar}
                      fill={colors.solar}
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Comparison Chart */}
              <ChartCard
                title="Temperature vs Solar"
                icon={<BarChart3 className="w-5 h-5 text-green-400" />}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={getComparisonData()}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis yAxisId="left" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone"
                      dataKey="temperature" 
                      stroke={colors.temperature}
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="solar" 
                      fill={colors.solar}
                      fillOpacity={0.6}
                      name="Solar Radiation"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Summary Pie Chart */}
              <ChartCard
                title="Data Distribution"
                className="lg:col-span-2"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getSummaryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getSummaryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Value']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        )}
      </main>

      {/* Custom Scrollbar Divider */}
      <div className="w-px bg-gradient-to-b from-gray-600 to-gray-800 hidden lg:block"></div>

      {/* Right Sidebar with Custom Scrollbar */}
      <aside className="w-80 bg-panel border-l border-gray-700 p-6 hidden lg:block text-textLight custom-scrollbar-sidebar">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Location Controls
        </h2>

        {/* Location Section */}
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-gray-600/50">
          <h3 className="font-medium mb-3">Coordinates</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                className="w-full p-2 rounded bg-background border border-gray-600 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                min="-90"
                max="90"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                className="w-full p-2 rounded bg-background border border-gray-600 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                min="-180"
                max="180"
              />
            </div>
          </div>
        </div>

        {/* Date Range Section */}
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-gray-600/50">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Date Range
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 rounded bg-background border border-gray-600 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 rounded bg-background border border-gray-600 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchWeather}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 rounded text-white hover:bg-green-700 font-medium transition-colors shadow-lg hover:shadow-green-500/25"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Data
        </button>

        {/* Data Summary */}
        {weatherData && (
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-gray-600/50">
            <h3 className="font-medium mb-2">Data Summary</h3>
            <div className="text-xs space-y-1 text-gray-400">
              <p className="flex items-center gap-1">📍 <span>Location: {weatherData.location.latitude}, {weatherData.location.longitude}</span></p>
              <p className="flex items-center gap-1">📅 <span>Period: {weatherData.period.requested}</span></p>
              <p className="flex items-center gap-1">📊 <span>Days: {weatherData.period.days_covered}</span></p>
              <p className="flex items-center gap-1">🏔️ <span>Elevation: {weatherData.location.elevation}m</span></p>
            </div>
          </div>
        )}
      </aside>

      {/* Guidelines Modal */}
      <Modal
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
        title="📊 Chart Guidelines & Information"
      >
        {guidelinesContent}
      </Modal>
    </div>
  );
};

export default Charts;