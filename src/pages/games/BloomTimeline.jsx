import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";

const flowersData = [
  { name: "Snowdrop", emoji: "❄️", season: "Early Spring", order: 1 },
  { name: "Cherry Blossom", emoji: "🌸", season: "Spring", order: 2 },
  { name: "Tulip", emoji: "🌷", season: "Mid Spring", order: 3 },
  { name: "Rose", emoji: "🌹", season: "Summer", order: 4 },
  { name: "Sunflower", emoji: "🌻", season: "Late Summer", order: 5 },
  { name: "Chrysanthemum", emoji: "🌼", season: "Fall", order: 6 },
];

const BloomTimeline = () => {
  const [flowers, setFlowers] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [availableFlowers, setAvailableFlowers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = () => {
    const gameFlowers = [...flowersData].slice(0, 5);
    const shuffled = [...gameFlowers].sort(() => Math.random() - 0.5);
    setFlowers(gameFlowers);
    setAvailableFlowers(shuffled);
    setUserOrder([]);
    setIsComplete(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  const addToTimeline = (flower) => {
    setUserOrder([...userOrder, flower]);
    setAvailableFlowers(availableFlowers.filter(f => f.name !== flower.name));
  };

  const removeFromTimeline = (flower) => {
    setUserOrder(userOrder.filter(f => f.name !== flower.name));
    setAvailableFlowers([...availableFlowers, flower]);
  };

  const checkAnswer = () => {
    const correct = userOrder.every((flower, idx) =>
      flower.order === flowers[idx].order
    );
    setIsCorrect(correct);
    setIsComplete(true);
  };

  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-primary mb-2">
          Bloom Timeline
        </h1>
        
        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-2xl">
          Order flowers by their blooming seasons from earliest to latest. Learn about different flowering patterns and seasonal changes in vegetation!
        </p>

        {/* Timeline Section */}
        <div className="bg-panel rounded-lg p-6 mb-8 border-2 border-border">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Arrange flowers from earliest to latest bloom:
          </h2>
          <div className="flex flex-wrap gap-4 min-h-[120px] justify-center items-center bg-background/50 rounded-lg p-6 border-2 border-dashed border-border">
            {userOrder.length === 0 ? (
              <p className="text-textLight/60 text-lg">Click flowers below to add them to the timeline</p>
            ) : (
              userOrder.map((flower, idx) => (
                <button
                  key={idx}
                  onClick={() => removeFromTimeline(flower)}
                  className="px-4 py-3 border-2 border-primary rounded-lg text-2xl flex flex-col items-center hover:bg-primary/10 transition-all duration-300"
                >
                  <span className="text-4xl mb-1">{flower.emoji}</span>
                  <span className="text-sm font-medium">{flower.name}</span>
                </button>
              ))
            )}
          </div>
          
          {userOrder.length === flowers.length && !isComplete && (
            <button
              onClick={checkAnswer}
              className="w-full max-w-xs mx-auto mt-6 px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/80 transition text-lg"
            >
              Check Answer
            </button>
          )}
          
          {isComplete && (
            <div className={`mt-6 p-4 rounded-lg text-center border-2 ${
              isCorrect ? 'bg-green-500/20 border-green-500 text-green-600' : 'bg-red-500/20 border-red-500 text-red-600'
            }`}>
              {isCorrect ? (
                <div className="flex items-center justify-center gap-3">
                  <Check className="h-6 w-6" />
                  <span className="text-xl font-bold">Perfect! Correct Order! 🎉</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <X className="h-6 w-6" />
                  <span className="text-xl font-bold">Not quite! Try again!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Available Flowers Section */}
        <div className="bg-panel rounded-lg p-6 mb-8 border-2 border-border">
          <h3 className="text-xl font-semibold mb-4 text-center">Available Flowers:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableFlowers.map((flower) => (
              <button
                key={flower.name}
                onClick={() => addToTimeline(flower)}
                className="h-auto py-4 flex flex-col gap-2 border-2 border-primary rounded-lg items-center hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                disabled={isComplete}
              >
                <span className="text-4xl">{flower.emoji}</span>
                <span className="text-sm font-medium">{flower.name}</span>
                <span className="text-xs text-textLight/60">{flower.season}</span>
              </button>
            ))}
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
          
          <button
            onClick={startGame}
            className="px-6 py-3 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-lg font-semibold"
          >
            New Game
          </button>
        </div>

      </div>
    </div>
  );
};

export default BloomTimeline;