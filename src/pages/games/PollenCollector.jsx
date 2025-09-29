import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause } from "lucide-react";

const PollenCollector = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pollens, setPollens] = useState([]);
  const [basketX, setBasketX] = useState(50);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      setPollens(prev => [
        ...prev,
        { id: Date.now(), x: Math.random() * 90, y: 0, speed: 1 + Math.random() * 2 }
      ]);
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const moveInterval = setInterval(() => {
      setPollens(prev => {
        const updated = prev.map(p => ({ ...p, y: p.y + p.speed }));

        const remaining = updated.filter(p => {
          if (p.y > 85 && p.y < 95) {
            if (Math.abs(p.x - basketX) < 8) {
              setScore(s => s + 10);
              return false;
            }
          }
          return p.y < 100;
        });

        return remaining;
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isPlaying, basketX]);

  const handleMouseMove = e => {
    if (!gameRef.current) return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setPollens([]);
      setScore(0);
    }
  };

  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-primary mb-2">
          Pollen Collector
        </h1>
        
        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-2xl">
          Collect falling pollen before it hits the ground! Move your basket left and right to catch as much pollen as possible and learn about the importance of pollination.
        </p>

        {/* Score */}
        <div className="mb-8 text-center">
          <div className="text-3xl font-bold mb-2">Score: {score}</div>
          <div className="text-lg text-textLight/70">
            {isPlaying ? "Game in progress - Move mouse to control basket" : "Click Start to begin playing"}
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={gameRef}
          className="relative h-[500px] overflow-hidden cursor-none bg-gradient-to-b from-sky-200/30 to-green-200/30 rounded-lg border-4 border-border mb-8"
          onMouseMove={handleMouseMove}
        >
          {pollens.map(p => (
            <div
              key={p.id}
              className="absolute text-4xl transition-all duration-50"
              style={{ 
                left: `${p.x}%`, 
                top: `${p.y}%`, 
                transform: 'translate(-50%, -50%)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}
            >
              🌼
            </div>
          ))}

          <div
            className="absolute bottom-4 text-5xl transition-all duration-100 drop-shadow-lg"
            style={{ 
              left: `${basketX}%`, 
              transform: 'translateX(-50%)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
            }}
          >
            🧺
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
            onClick={togglePlay}
            className="flex items-center px-6 py-3 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-lg font-semibold"
          >
            {isPlaying ? (
              <>
                <Pause className="mr-2 w-5 h-5" />
                Stop Game
              </>
            ) : (
              <>
                <Play className="mr-2 w-5 h-5" />
                Start Game
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PollenCollector;