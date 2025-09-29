import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";

const flowers = ["🌸", "🌺", "🌻", "🌷", "🌹", "🏵️", "🌼", "💐"];

const BloomMatcher = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [wins, setWins] = useState(0);

  const initGame = () => {
    const gameFlowers = flowers.slice(0, 6);
    const doubled = [...gameFlowers, ...gameFlowers];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    setCards(shuffled.map((flower, id) => ({ id, flower, flipped: false, matched: false })));
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].flower === cards[second].flower) {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) => 
            idx === first || idx === second ? { ...card, matched: true } : card
          ));
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) => 
            idx === first || idx === second ? { ...card, flipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setWins(prev => prev + 1);
    }
  }, [cards]);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return;

    setCards(prev => prev.map((card, idx) => 
      idx === id ? { ...card, flipped: true } : card
    ));
    setFlippedCards(prev => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-primary mb-2">
          Bloom Matcher
        </h1>
        
        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-2xl">
          Match pairs of blooming flowers in this memory card game. Test your memory and learn about different flower types!
        </p>

        {/* Stats */}
        <div className="mb-8 text-center">
          <span className="text-xl font-semibold">Moves: {moves}</span>
          <span className="mx-4 text-textLight/50">|</span>
          <span className="text-xl font-semibold">Wins: {wins}</span>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square flex items-center justify-center text-6xl cursor-pointer transition-all duration-300 rounded-lg border-2
                ${card.matched 
                  ? "bg-green-500/20 border-green-500 opacity-70" 
                  : card.flipped
                  ? "bg-panel border-primary transform scale-105"
                  : "bg-panel border-border hover:border-primary hover:scale-105"
                }`
              }
            >
              {card.flipped || card.matched ? card.flower : "🌿"}
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
            onClick={initGame}
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

export default BloomMatcher;