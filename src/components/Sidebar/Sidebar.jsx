import { useState, useEffect } from "react";
import {
  Home,
  Map,
  Sliders,
  BarChart2,
  Info,
  Phone,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // default collapsed on mobile
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true); // force open on desktop
      } else {
        setIsOpen(false); // collapsed on mobile
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "dashboard", icon: <Home size={20} />, active: true },
    { name: "Map", icon: <Map size={20} />, active: false },
    { name: "Filtering Data", icon: <Sliders size={20} />, active: false },
    { name: "Graph-Chart", icon: <BarChart2 size={20} />, active: false },
  ];

  const supportItems = [
    { name: "AboutUs", icon: <Info size={20} />, active: false },
    { name: "Contact", icon: <Phone size={20} />, active: false },
  ];

  return (
    <div
      className={`h-full bg-panel text-textLight border-r border-gray-700 transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-700">
        {isOpen && (
          <span className="font-heading text-lg text-textLight">
            BloomWatch
          </span>
        )}
        {!isDesktop && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-primary/20 transition-colors"
          >
            <Menu size={22} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col justify-between h-full">
        <div className="mt-4">
          {isOpen && (
            <p className="px-4 mb-2 text-xs uppercase tracking-wider text-gray-400">
              Main Navigation
            </p>
          )}

          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md cursor-pointer transition-colors
                ${item.active ? "bg-primary/20 text-primary" : "hover:bg-gray-700"}`}
            >
              {/* ✅ Fix: Icons always visible */}
              <div className="flex-shrink-0">{item.icon}</div>
              {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </div>
          ))}

          {isOpen && (
            <p className="px-4 mt-6 mb-2 text-xs uppercase tracking-wider text-gray-400">
              Support
            </p>
          )}
          {supportItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-2 my-1 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
