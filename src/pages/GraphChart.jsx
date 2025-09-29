// src/pages/Charts.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import { Calendar, MapPin, RefreshCw, BarChart3 } from "lucide-react";

const Charts = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(23.8041);
  const [longitude, setLongitude] = useState(90.4152);
  const [startDate, setStartDate] = useState("2023-04-01");
  const [endDate, setEndDate] = useState("2023-04-03");
  const [chartType, setChartType] = useState("temperature"); // temperature | rainfall | solar

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/weather`,
        {
          params: { latitude, longitude, startDate, endDate },
        }
      );
      setWeatherData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // prepare chart data
  const getChartData = () => {
    if (!weatherData) return [];
    if (chartType === "temperature") {
      return weatherData.temperature.hourly_data.map(d => ({
        time: d.timestamp,
        value: d.value,
      }));
    }
    if (chartType === "rainfall") {
      return weatherData.rainfall.daily_data.map(d => ({
        time: d.date,
        value: d.rainfall,
      }));
    }
    if (chartType === "solar") {
      return weatherData.solar_radiation.hourly_data.map(d => ({
        time: d.timestamp,
        value: d.value,
      }));
    }
    return [];
  };

  return (
    <div className="flex flex-1">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-background text-textLight">
        <h2 className="text-xl font-bold mb-4">Weather Analytics</h2>
        {loading && <p>Loading charts...</p>}

        {!loading && weatherData && (
          <ResponsiveContainer width="100%" height={400}>
            {chartType === "temperature" || chartType === "solar" ? (
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4CAF50" />
              </LineChart>
            ) : (
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF9800" />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-panel border-l border-gray-700 p-6 hidden lg:block text-textLight">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" /> Controls
        </h2>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm mb-1 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Latitude
          </label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full p-2 rounded bg-background border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Longitude</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full p-2 rounded bg-background border border-gray-600"
          />
        </div>

        {/* Date range */}
        <div className="mb-4">
          <label className="block text-sm mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 rounded bg-background border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 rounded bg-background border border-gray-600"
          />
        </div>

        {/* Chart Type */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full p-2 rounded bg-background border border-gray-600"
          >
            <option value="temperature">Temperature</option>
            <option value="rainfall">Rainfall</option>
            <option value="solar">Solar Radiation</option>
          </select>
        </div>

        {/* Refresh */}
        <button
          onClick={fetchWeather}
          className="flex items-center gap-2 px-4 py-2 bg-primary rounded text-white hover:bg-green-600"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Data
        </button>
      </aside>
    </div>
  );
};

export default Charts;
