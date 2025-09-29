import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Droplets, Sun, Wind } from "lucide-react";

const PlantGrowth = () => {
  const [water, setWater] = useState(50);
  const [sunlight, setSunlight] = useState(50);
  const [airQuality, setAirQuality] = useState(50);
  const [growth, setGrowth] = useState(0);
  const [plantStage, setPlantStage] = useState(0);

  const stages = ["🌱", "🌿", "🌾", "🌻", "🌺"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWater(prev => Math.max(0, prev - 1));
      setSunlight(prev => Math.max(0, prev - 0.5));
      setAirQuality(prev => Math.max(0, prev - 0.3));

      const avg = (water + sunlight + airQuality) / 3;
      if (avg > 30) {
        setGrowth(prev => {
          const newGrowth = Math.min(100, prev + 0.2);
          setPlantStage(Math.floor(newGrowth / 20));
          return newGrowth;
        });
      } else {
        setGrowth(prev => Math.max(0, prev - 0.1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [water, sunlight, airQuality]);

  const addWater = () => setWater(prev => Math.min(100, prev + 20));
  const addSunlight = () => setSunlight(prev => Math.min(100, prev + 20));
  const addAir = () => setAirQuality(prev => Math.min(100, prev + 20));

  const renderProgress = (value) => (
    <div className="w-full h-2 bg-panel rounded-full overflow-hidden mt-1">
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-primary mb-2">
          Plant Growth Simulator
        </h1>
        
        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-2xl">
          Help plants grow by providing the right conditions! Manage water, sunlight, and air quality to help your plant thrive through different growth stages.
        </p>

        {/* Plant Display */}
        <div className="mb-8 bg-panel rounded-lg p-8 text-center border-2 border-border">
          <div className="text-9xl mb-6">{stages[plantStage]}</div>
          <div className="w-full max-w-md mx-auto">
            <div className="w-full h-4 bg-background rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${growth}%` }}
              />
            </div>
            <p className="text-lg font-semibold">Growth: {Math.floor(growth)}%</p>
            <p className="text-sm text-textLight/70 mt-1">
              Stage {plantStage + 1} of {stages.length}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid gap-6 mb-8">
          {/* Water */}
          <div className="bg-panel p-6 rounded-lg border-2 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-sky-500" />
                <span className="font-semibold text-lg">Water</span>
              </div>
              <button
                onClick={addWater}
                className="px-4 py-2 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-base font-medium"
              >
                Add Water
              </button>
            </div>
            {renderProgress(water)}
            <p className="text-sm text-textLight/70 mt-2">{Math.floor(water)}% remaining</p>
          </div>

          {/* Sunlight */}
          <div className="bg-panel p-6 rounded-lg border-2 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sun className="h-6 w-6 text-yellow-500" />
                <span className="font-semibold text-lg">Sunlight</span>
              </div>
              <button
                onClick={addSunlight}
                className="px-4 py-2 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-base font-medium"
              >
                Add Sunlight
              </button>
            </div>
            {renderProgress(sunlight)}
            <p className="text-sm text-textLight/70 mt-2">{Math.floor(sunlight)}% remaining</p>
          </div>

          {/* Air Quality */}
          <div className="bg-panel p-6 rounded-lg border-2 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Wind className="h-6 w-6 text-green-500" />
                <span className="font-semibold text-lg">Air Quality</span>
              </div>
              <button
                onClick={addAir}
                className="px-4 py-2 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-base font-medium"
              >
                Add Fresh Air
              </button>
            </div>
            {renderProgress(airQuality)}
            <p className="text-sm text-textLight/70 mt-2">{Math.floor(airQuality)}% remaining</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/games">
            <button className="flex items-center px-6 py-3 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-lg font-semibold">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Games
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PlantGrowth;