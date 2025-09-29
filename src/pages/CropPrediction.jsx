import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Thermometer, Droplets, Sun, Wind, CloudRain, Calendar, Sprout, AlertCircle, RefreshCw, MapPin } from "lucide-react";

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
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getSuitabilityBg = (score) => {
    if (score >= 80) return "bg-green-500/20 border-green-500";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500";
    return "bg-red-500/20 border-red-500";
  };

  const retryWithSampleLocation = () => {
    setPlace("Dhaka, Bangladesh");
    // Auto-submit after setting the location
    setTimeout(() => {
      const submitEvent = new Event('submit', { cancelable: true });
      document.querySelector('form').dispatchEvent(submitEvent);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-6xl mx-auto px-6 py-12">

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
            {["Dhaka, Bangladesh", "Delhi, India", "Bangkok, Thailand", "Jakarta, Indonesia"].map((location) => (
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
                        <span className={`text-lg font-bold ${getSuitabilityColor(crop.suitability)}`}>
                          {crop.suitability}%
                        </span>
                        <div className="w-12 h-2 bg-background/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              crop.suitability >= 80 ? "bg-green-500" : 
                              crop.suitability >= 60 ? "bg-yellow-500" : "bg-red-500"
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
              {["Dhaka, Bangladesh", "Delhi, India", "Bangkok, Thailand"].map((location) => (
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
    </div>
  );
};

export default CropPrediction;