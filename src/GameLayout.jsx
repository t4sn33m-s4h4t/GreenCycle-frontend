import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Calendar, Clock, Droplets, Flower2, Gamepad2, Palette, Sprout } from "lucide-react";

function GameLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const games = [
    {
      name: "Bloom Matcher",
      path: "/games/bloom-matcher",
      icon: Flower2,
      color: "pink",
      description: "Memory card game"
    },
    {
      name: "Pollen Collector",
      path: "/games/pollen-collector",
      icon: Droplets,
      color: "yellow",
      description: "Catch falling pollen"
    },
    {
      name: "Bloom Sequence",
      path: "/games/bloom-sequence",
      icon: Clock,
      color: "purple",
      description: "Remember patterns"
    },
    {
      name: "Plant Growth",
      path: "/games/plant-growth",
      icon: Sprout,
      color: "green",
      description: "Grow virtual plants"
    },
    {
      name: "Flower Color Match",
      path: "/games/flower-match",
      icon: Palette,
      color: "sky",
      description: "Match colors"
    },
    {
      name: "Bloom Timeline",
      path: "/games/bloom-timeline",
      icon: Calendar,
      color: "pink",
      description: "Order by season"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      pink: "bg-pink-500/20 text-pink-500",
      yellow: "bg-yellow-500/20 text-yellow-500",
      purple: "bg-purple-500/20 text-purple-500",
      green: "bg-green-500/20 text-green-500",
      sky: "bg-sky-500/20 text-sky-500"
    };
    return colorMap[color] || "bg-primary/20 text-primary";
  };

  return (
    <div className="flex h-screen  custom-scrollbar bg-background text-textLight font-sans">
      {/* Main Sidebar */}
      <div className={` ${isOpen ? "w-56" : "w-12"} shadow-lg`}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Game Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <Outlet />
          </div>
        </div>

        <>
          {/* Vertical Separator */}
            <div className="w-px bg-gradient-to-b from-gray-600 to-gray-800 hidden lg:block"></div>
          {/* Games Navigation Sidebar */}
          <aside className="w-80 bg-panel border-l border-gray-700 hidden lg:block overflow-y-auto custom-scrollbar">
            <div className="p-5">

              {/* Games List */}
              <div className="space-y-3">
                {games.map((game) => {
                  const IconComponent = game.icon;
                  const isActive = location.pathname === game.path;

                  return (
                    <Link
                      key={game.path}
                      to={game.path}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 group ${isActive
                          ? "bg-primary/10 border-primary shadow-lg scale-[1.02]"
                          : "bg-background/50 border-border hover:border-primary hover:bg-primary/5 hover:shadow-md"
                        }`}
                    >
                      <div className={`w-12 h-12 ${getColorClasses(game.color)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold truncate ${isActive ? "text-primary" : "text-textLight"
                          }`}>
                          {game.name}
                        </h3>
                        <p className="text-xs text-textLight/60 truncate">
                          {game.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  );
                })}
              </div>


            </div>
          </aside>
        </>
      </div>
    </div>
  );
}

export default GameLayout;