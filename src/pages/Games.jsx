import React from "react";
import { Flower2, Droplets, Clock, Sprout, Palette, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const games = [
  {
    id: "bloom-matcher",
    title: "Bloom Matcher",
    description: "Match pairs of blooming flowers in this memory card game",
    icon: Flower2,
    colorClass: "bg-pink-500",
    route: "/games/bloom-matcher"
  },
  {
    id: "pollen-collector",
    title: "Pollen Collector",
    description: "Collect falling pollen before it hits the ground",
    icon: Droplets,
    colorClass: "bg-yellow-500",
    route: "/games/pollen-collector"
  },
  {
    id: "bloom-sequence",
    title: "Bloom Sequence",
    description: "Remember and repeat the blooming flower patterns",
    icon: Clock,
    colorClass: "bg-purple-500",
    route: "/games/bloom-sequence"
  },
  {
    id: "plant-growth",
    title: "Plant Growth Simulator",
    description: "Help plants grow by providing the right conditions",
    icon: Sprout,
    colorClass: "bg-green-500",
    route: "/games/plant-growth"
  },
  {
    id: "flower-match",
    title: "Flower Color Match",
    description: "Match flowers by their blooming colors",
    icon: Palette,
    colorClass: "bg-sky-500",
    route: "/games/flower-match"
  },
  {
    id: "bloom-timeline",
    title: "Bloom Timeline",
    description: "Order flowers by their blooming seasons",
    icon: Calendar,
    colorClass: "bg-pink-500",
    route: "/games/bloom-timeline"
  }
];

const Games = () => {
  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
    
        {/* Header - Following About page structure */}
        <h1 className="text-4xl font-bold text-primary mb-6">
          BloomWatch Games
        </h1>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-4xl">
          Explore plant phenology through interactive games inspired by NASA's Earth observation missions. 
          These educational games help you understand flowering patterns, pollination, and seasonal changes 
          in vegetation around the world.
        </p>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Link key={game.id} to={game.route}>
                <div className="h-full bg-panel rounded-lg shadow-lg hover:shadow-xl border-2 border-transparent hover:border-primary transition cursor-pointer flex flex-col">
                  <div className="p-4 flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${game.colorClass}/20`}>
                      <Icon className={`w-6 h-6 ${game.colorClass}`} />
                    </div>
                    <h2 className="text-xl font-semibold">{game.title}</h2>
                  </div>
                  <p className="px-4 pb-4 text-textLight/80 flex-grow">{game.description}</p>
                  <div className="px-4 pb-4">
                    <button className={`w-full py-2 rounded ${game.colorClass} text-white font-semibold hover:opacity-90 transition`}>
                      Play Now
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center">
          <Link to="/">
            <button className="px-6 py-3 border border-primary rounded-lg hover:bg-primary hover:text-background transition text-lg font-semibold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Games;