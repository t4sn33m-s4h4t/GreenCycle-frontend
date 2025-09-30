import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Thermometer, Droplets, Sun, Wind, CloudRain, Calendar, Sprout, AlertCircle, RefreshCw, MapPin, Info, Download, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CropPrediction = () => {
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!place.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/crops/crops?place=${encodeURIComponent(place)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Service temporarily unavailable. Please try again later or contact support.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        } else {
          throw new Error('Failed to get crop prediction. Please try again.');
        }
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message || "Failed to get crop prediction. Please try again.");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSuitabilityColor = (score) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-green-400";
    if (score >= 70) return "text-yellow-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  const getSuitabilityBg = (score) => {
    if (score >= 90) return "bg-green-500/20 border-green-500";
    if (score >= 80) return "bg-green-400/20 border-green-400";
    if (score >= 70) return "bg-yellow-500/20 border-yellow-500";
    if (score >= 60) return "bg-orange-500/20 border-orange-500";
    return "bg-red-500/20 border-red-500";
  };

  const getSuitabilityLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Moderate";
    return "Low";
  };

  const getBarColor = (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 80) return "#34d399";
    if (score >= 70) return "#f59e0b";
    if (score >= 60) return "#f97316";
    return "#ef4444";
  };

  // Prepare data for charts
  const getCropSuitabilityData = () => {
    if (!prediction?.crops) return [];
    return prediction.crops.map(crop => ({
      name: crop.name,
      suitability: crop.suitability,
      fill: getBarColor(crop.suitability)
    }));
  };

  const getClimatePieData = () => {
    if (!prediction?.climateData) return [];
    return [
      { name: 'Temperature', value: prediction.climateData.temperature_avg, color: '#ef4444' },
      { name: 'Precipitation', value: prediction.climateData.precipitation, color: '#3b82f6' },
      { name: 'Humidity', value: prediction.climateData.humidity, color: '#10b981' },
      { name: 'Solar Radiation', value: prediction.climateData.solar_radiation, color: '#f59e0b' }
    ];
  };

  const exportData = () => {
    if (!prediction) return;

    const dataStr = JSON.stringify(prediction, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crop-prediction-${prediction.place}.json`;
    link.click();
  };

  const retryWithSampleLocation = () => {
    setPlace("Dhaka, Bangladesh");
    setTimeout(() => {
      const submitEvent = new Event('submit', { cancelable: true });
      document.querySelector('form').dispatchEvent(submitEvent);
    }, 100);
  };

  return (
    <div className="flex flex-1 h-full">
      {/* Main Content */}
      <main className="flex-1 custom-scrollbar p-6 overflow-y-auto bg-background text-textLight">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Crop Prediction</h1>
              <p className="text-lg text-textLight/70">
                Get AI-powered crop recommendations based on climate data
              </p>
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-panel rounded-xl p-6 mb-8 border-2 border-border">
            <form onSubmit={handlePredict} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textLight/50 w-5 h-5" />
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="Enter location (e.g., Dhaka, Bangladesh)"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition text-textLight"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !place.trim()}
                className="px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Sprout className="w-5 h-5" />
                    Predict Crops
                  </>
                )}
              </button>
            </form>

            {/* Quick Location Suggestions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-textLight/60 text-sm">Try:</span>
              {["Khulna, Bangladesh", "Dhaka, Bangladesh", "Delhi, India", "Bangkok, Thailand"].map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => setPlace(location)}
                  className="text-xs px-3 py-1 border border-border rounded-full hover:bg-primary/10 hover:border-primary transition"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">{error}</p>
                  <p className="text-sm mt-1 text-red-400">
                    This might be due to API rate limits. You can try:
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={retryWithSampleLocation}
                      className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500 rounded text-sm hover:bg-red-500/30 transition"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Try Sample Location
                    </button>
                    <button
                      onClick={() => setError("")}
                      className="px-3 py-1 border border-border rounded text-sm hover:bg-panel transition"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prediction Results */}
          {prediction && (
            <div className="space-y-8">
              {/* Location Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-textLight mb-2 flex items-center justify-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Crop Recommendations for {prediction.place}
                </h2>
                {prediction.coordinates?.displayName && (
                  <p className="text-textLight/70 text-sm mb-2">
                    {prediction.coordinates.displayName}
                  </p>
                )}
                <p className="text-textLight/70">
                  Prediction for {new Date(prediction.date).toLocaleDateString()}
                </p>
              </div>

              {/* Climate Data */}
              <div className="bg-panel rounded-xl p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-textLight mb-6 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  Climate Conditions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-red-400" />
                      <span className="font-semibold">Temperature</span>
                    </div>
                    <p className="text-2xl font-bold">{prediction.climateData.temperature_avg?.toFixed(1)}°C</p>
                    <p className="text-sm text-textLight/60">
                      Max: {prediction.climateData.temperature_max?.toFixed(1)}°C • Min: {prediction.climateData.temperature_min?.toFixed(1)}°C
                    </p>
                  </div>

                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <CloudRain className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold">Precipitation</span>
                    </div>
                    <p className="text-2xl font-bold">{prediction.climateData.precipitation?.toFixed(1)}mm</p>
                    <p className="text-sm text-textLight/60 capitalize">
                      {prediction.climateData.precipitationLevel?.toLowerCase()} level
                    </p>
                  </div>

                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-4 h-4 text-yellow-400" />
                      <span className="font-semibold">Solar Radiation</span>
                    </div>
                    <p className="text-2xl font-bold">{prediction.climateData.solar_radiation?.toFixed(1)}</p>
                    <p className="text-sm text-textLight/60">MJ/m²</p>
                  </div>

                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-4 h-4 text-green-400" />
                      <span className="font-semibold">Humidity</span>
                    </div>
                    <p className="text-2xl font-bold">{prediction.climateData.humidity?.toFixed(1)}%</p>
                    <p className="text-sm text-textLight/60">
                      Wind: {prediction.climateData.wind_speed?.toFixed(1)} m/s
                    </p>
                  </div>
                </div>
              </div>

              {/* Suitability Chart */}
              <div className="bg-panel rounded-xl p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-textLight mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Crop Suitability Scores
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getCropSuitabilityData()} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={100}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Suitability']}
                        labelFormatter={(label) => `Crop: ${label}`}
                      />
                      <Bar
                        dataKey="suitability"
                        radius={[0, 4, 4, 0]}
                      >
                        {getCropSuitabilityData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Crop Recommendations */}
              <div className="bg-panel rounded-xl p-6 border-2 border-border">
                <h3 className="text-xl font-bold text-textLight mb-6 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-primary" />
                  Recommended Crops
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {prediction.crops?.map((crop, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${getSuitabilityBg(crop.suitability)}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-textLight">{crop.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className={`text-lg font-bold ${getSuitabilityColor(crop.suitability)}`}>
                              {crop.suitability}%
                            </span>
                            <div className="text-xs text-textLight/60 capitalize">
                              {getSuitabilityLabel(crop.suitability)}
                            </div>
                          </div>
                          <div className="w-12 h-2 bg-background/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${crop.suitability >= 90 ? "bg-green-500" :
                                  crop.suitability >= 80 ? "bg-green-400" :
                                    crop.suitability >= 70 ? "bg-yellow-500" :
                                      crop.suitability >= 60 ? "bg-orange-500" : "bg-red-500"
                                }`}
                              style={{ width: `${crop.suitability}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <p className="text-textLight/80 mb-3">{crop.reason}</p>

                      <div className="flex items-center gap-2 text-sm text-textLight/60">
                        <Calendar className="w-4 h-4" />
                        Ideal Season: {crop.ideal_season}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-center text-textLight/60 text-sm">
                <p>
                  Predictions are based on current climate data and historical patterns.
                  Always consult with local agricultural experts for final decisions.
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!prediction && !loading && !error && (
            <div className="text-center py-12">
              <Sprout className="w-16 h-16 text-textLight/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-textLight/60 mb-2">
                Enter a location to get crop predictions
              </h3>
              <p className="text-textLight/50 mb-4">
                Get AI-powered recommendations for the best crops to grow in your area
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <span className="text-textLight/60">Popular locations:</span>
                {["Khulna, Bangladesh", "Dhaka, Bangladesh", "Delhi, India"].map((location) => (
                  <button
                    key={location}
                    onClick={() => setPlace(location)}
                    className="text-primary hover:underline"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="w-px bg-gradient-to-b from-gray-600 to-gray-800 hidden lg:block"></div>

      {/* Right Sidebar */}
     <aside className="w-80 bg-panel border-l border-gray-700 p-6 hidden lg:block text-textLight custom-scrollbar-sidebar overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Analysis Tools
        </h2>

        {/* Climate Distribution */}
        {prediction && (
          <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Climate Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getClimatePieData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getClimatePieData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Suitability Legend */}
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
          <h3 className="font-medium mb-3">Suitability Scale</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-green-500">90-100%</span>
              <span>Excellent</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-400">80-89%</span>
              <span>Very Good</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-yellow-500">70-79%</span>
              <span>Good</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-orange-500">60-69%</span>
              <span>Moderate</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-500">Below 60%</span>
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={exportData}
              disabled={!prediction}
              className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button
              onClick={retryWithSampleLocation}
              className="w-full flex items-center gap-2 px-3 py-2 bg-green-600 rounded text-white hover:bg-green-700 text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Sample Location
            </button>
          </div>
        </div>

        {/* Prediction Info */}
        {prediction && (
          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <h3 className="font-medium mb-2">Prediction Info</h3>
            <div className="text-xs space-y-1 text-textLight/60">
              <p className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Location: {prediction.coordinates?.lat?.toFixed(4)}, {prediction.coordinates?.lon?.toFixed(4)}</span>
              </p>
              <p className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Date: {new Date(prediction.date).toLocaleDateString()}</span>
              </p>
              <p className="flex items-center gap-1">
                <Sprout className="w-3 h-3" />
                <span>Crops Analyzed: {prediction.crops?.length || 0}</span>
              </p>
              <p className="flex items-center gap-1">
                <Thermometer className="w-3 h-3" />
                <span>Avg Temp: {prediction.climateData.temperature_avg?.toFixed(1)}°C</span>
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CropPrediction;