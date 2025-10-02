import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ Import for navigation
import {
  Home,
  Map,
  Gamepad2,
  Sliders,
  BarChart2,
  Info,
  Phone,
  Menu,
  Sprout,
  Users,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const location = useLocation(); // ✅ lets us detect the active route

  // Handle responsive sidebar (desktop always open, mobile collapses by default)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true); // always open on desktop
      } else {
        setIsOpen(false); // collapsed on mobile
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Navigation items (with route paths)
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Map", path: "/map", icon: <Map size={20} /> }, 
    { name: "Graph-Chart", path: "/graph-chart", icon: <BarChart2 size={20} /> },
    { name: "Predict Crop", path: "/predict-crop", icon: <Sprout size={20} /> },
    { name: "Games", path: "/games", icon: <Gamepad2  size={20} /> },
    { name: "Solutions", path: "/solutions", icon: <Sliders size={20} /> },
  ];

  const supportItems = [
    { name: "About Us", path: "/about-us", icon: <Info size={20} /> },
    { name: "Team", path: "/team", icon: <Users size={20} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-panel text-textLight border-r border-gray-700 transition-all duration-300 ease-in-out z-50
        ${isOpen ? "w-56" : "w-12"}`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-700">
        {/* ✅ BloomWatch logo redirects to home */}
        {isOpen && (
          <Link
            to="/"
            className="font-heading mx-auto mt-6 text-textLight hover:text-primary transition-colors"
          >
             <h3 className="text-2xl font-bold text-textLight mb-6">
              Bloom
              <span className="text-primary"> Watch</span>
            </h3>
          </Link>
        )}
        {!isDesktop && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md hover:bg-primary/20 transition-colors"
          >
            <Menu size={22} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col justify-between h-full overflow-y-auto">
        <div className="mt-4">
          {isOpen && (
            <p className="px-4 mb-2 text-xs uppercase tracking-wider text-gray-400">
              Main Navigation
            </p>
          )}

          {/* ✅ Main Navigation */}
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md cursor-pointer transition-colors
                ${
                  location.pathname === item.path
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-gray-700"
                }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </Link>
          ))}

          {isOpen && (
            <p className="px-4 mt-6 mb-2 text-xs uppercase tracking-wider text-gray-400">
              Support
            </p>
          )}

          {/* ✅ Support Items */}
          {supportItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md cursor-pointer transition-colors
                ${
                  location.pathname === item.path
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-gray-700"
                }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
