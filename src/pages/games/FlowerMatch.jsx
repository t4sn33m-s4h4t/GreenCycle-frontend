import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";

const colors = [
  { name: "Pink", hsl: "330 81% 60%", emoji: "🌸" },
  { name: "Purple", hsl: "280 65% 60%", emoji: "🌺" },
  { name: "Yellow", hsl: "48 96% 53%", emoji: "🌻" },
  { name: "Red", hsl: "0 84% 60%", emoji: "🌹" },
  { name: "Orange", hsl: "25 95% 53%", emoji: "🌼" },
  { name: "Blue", hsl: "220 90% 56%", emoji: "💐" },
];

const FlowerMatch = () => {
  const [targetColor, setTargetColor] = useState(colors[0]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");

  const generateRound = () => {
    const target = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(target);

    const shuffled = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffled.includes(target)) shuffled[0] = target;
    setOptions(shuffled.sort(() => Math.random() - 0.5));
    setFeedback("");
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleGuess = (color) => {
    if (color.name === targetColor.name) {
      setScore(prev => prev + 10 + streak * 5);
      setStreak(prev => prev + 1);
      setFeedback("Correct! 🎉");
      setTimeout(generateRound, 1000);
    } else {
      setStreak(0);
      setFeedback("Try again! ❌");
    }
  };

  const reset = () => {
    setScore(0);
    setStreak(0);
    generateRound();
  };

  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-primary mb-2">
          Flower Color Match
        </h1>
        
        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-2xl">
          Match flowers by their blooming colors! Test your color recognition skills and learn about different flower varieties and their characteristic colors.
        </p>

        {/* Stats */}
        <div className="mb-8 text-center">
          <div className="text-2xl font-bold mb-2">Score: {score}</div>
          <div className="text-lg text-textLight/70 mb-4">Streak: {streak}x</div>
          {feedback && (
            <div className={`text-xl font-bold mt-2 ${
              feedback.includes("Correct") ? "text-green-500" : "text-red-500"
            }`}>
              {feedback}
            </div>
          )}
        </div>

        {/* Target Flower */}
        <div className="bg-panel rounded-lg p-8 mb-8 text-center border-2 border-border">
          <p className="text-xl mb-4 text-textLight/70">Find the {targetColor.name} flower:</p>
          <div className="text-9xl mb-6">{targetColor.emoji}</div>
          <div
            className="w-32 h-32 rounded-full mx-auto border-4 border-textLight/30 shadow-lg"
            style={{ backgroundColor: `hsl(${targetColor.hsl})` }}
          />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {options.map((color) => (
            <button
              key={color.name}
              onClick={() => handleGuess(color)}
              className="p-6 bg-panel rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 text-center flex flex-col items-center border-2 border-border hover:border-primary"
            >
              <div className="text-6xl mb-4">{color.emoji}</div>
              <div
                className="w-20 h-20 rounded-full mb-3 border-2 border-textLight/30 shadow-md"
                style={{ backgroundColor: `hsl(${color.hsl})` }}
              />
              <p className="font-semibold text-lg">{color.name}</p>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/games">
            <button className="flex items-center px-6 py-3 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-lg font-semibold">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Games
            </button>
          </Link>
          
          <button
            onClick={reset}
            className="flex items-center px-6 py-3 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-lg font-semibold"
          >
            <RotateCcw className="mr-2 w-5 h-5" />
            Reset Game
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlowerMatch;