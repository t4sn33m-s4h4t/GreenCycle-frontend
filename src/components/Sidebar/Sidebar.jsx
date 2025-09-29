import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ Import for navigation
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
  const [isOpen, setIsOpen] = useState(false); // collapsed by default (mobile)
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
    { name: "Filtering Data", path: "/filtering", icon: <Sliders size={20} /> },
    { name: "Graph-Chart", path: "/graph-chart", icon: <BarChart2 size={20} /> },
  ];

  const supportItems = [
    { name: "About Us", path: "/about-us", icon: <Info size={20} /> },
    { name: "Contact", path: "/contact-us", icon: <Phone size={20} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-panel text-textLight border-r border-gray-700 transition-all duration-300 ease-in-out z-50
        ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-700">
        {/* ✅ BloomWatch logo redirects to home */}
        {isOpen && (
          <Link
            to="/"
            className="font-heading text-lg text-textLight hover:text-primary transition-colors"
          >
            BloomWatch
          </Link>
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
