import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";

const flowers = ["🌸", "🌺", "🌻", "🌷"];

const BloomSequence = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [highlighted, setHighlighted] = useState(null);

  const startGame = () => {
    setLevel(1);
    setGameOver(false);
    setUserSequence([]);
    const newSequence = [Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    showSequence(newSequence);
  };

  const showSequence = async (seq) => {
    setIsShowingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(r => setTimeout(r, 500));
      setHighlighted(seq[i]);
      await new Promise(r => setTimeout(r, 500));
      setHighlighted(null);
    }
    setIsShowingSequence(false);
  };

  const handleFlowerClick = (index) => {
    if (isShowingSequence || gameOver) return;

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    if (sequence[newUserSequence.length - 1] !== index) {
      setGameOver(true);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setTimeout(() => {
        const nextSequence = [...sequence, Math.floor(Math.random() * 4)];
        setSequence(nextSequence);
        setUserSequence([]);
        setLevel(prev => prev + 1);
        showSequence(nextSequence);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-primary mb-2">
          Bloom Sequence
        </h1>
        
        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-2xl">
          Remember and repeat the blooming flower patterns. Watch carefully as the flowers bloom in sequence, then replicate the pattern to advance to the next level!
        </p>

        {/* Stats */}
        <div className="mb-8 text-center">
          <div className="text-2xl font-bold mb-4">Level: {level}</div>
          {gameOver && (
            <div className="text-xl text-destructive font-semibold mb-4">
              Game Over! Final Level: {level}
            </div>
          )}
          {isShowingSequence && (
            <div className="text-lg text-textLight/70 mb-4">
              Watch the sequence carefully...
            </div>
          )}
        </div>

        {/* Flowers Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8">
          {flowers.map((flower, index) => (
            <div
              key={index}
              onClick={() => handleFlowerClick(index)}
              className={`aspect-square flex items-center justify-center text-8xl cursor-pointer transition-all duration-300 rounded-lg border-2
                ${highlighted === index 
                  ? "ring-4 ring-primary scale-110 bg-yellow-500/20 border-primary" 
                  : "bg-panel border-border hover:border-primary hover:scale-105"
                } 
                ${isShowingSequence ? "pointer-events-none" : ""}
                ${gameOver ? "opacity-70" : ""}`
              }
            >
              {flower}
            </div>
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
            onClick={startGame}
            className="flex items-center px-6 py-3 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-lg font-semibold"
          >
            <Play className="mr-2 w-5 h-5" />
            {sequence.length === 0 ? "Start Game" : "New Game"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default BloomSequence;