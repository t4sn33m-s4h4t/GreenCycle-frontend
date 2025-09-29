import { useState } from "react";
import {
  Home,
  BarChart2,
  MessageSquare,
  Calendar,
  Image as ImageIcon,
  Settings,
  BookOpen,
  HelpCircle,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, active: false },
    { name: "The Project", icon: <BarChart2 size={20} />, active: true },
    { name: "Globe", icon: <MessageSquare size={20} />, active: false },
    { name: "Visual map", icon: <Calendar size={20} />, active: false },
    { name: "Solution", icon: <ImageIcon size={20} />, active: false },
    { name: "Resources", icon: <Settings size={20} />, active: false },
  ];

  const supportItems = [
    { name: "Contributors", icon: <BookOpen size={20} />, active: false },
    { name: "Help", icon: <HelpCircle size={20} />, active: false },
  ];

  return (
    <div className="flex">
      {/* Header with Hamburger */}
      <div className="fixed top-0 left-0 h-14 w-full flex items-center bg-panel text-textLight shadow-md px-4 z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-primary/20 transition-colors"
        >
          <Menu size={22} />
        </button>
        <h1 className="ml-3 font-heading text-lg text-textLight">BloomWatch</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-14 left-0 h-full bg-panel text-textLight border-r border-gray-700 transition-all duration-300 ease-in-out ${
          isOpen ? "w-56" : "w-16"
        }`}
      >
        <nav className="flex flex-col justify-between h-full">
          <div className="mt-6">
            {/* Main Navigation */}
            <p
              className={`px-4 mb-2 text-xs uppercase tracking-wider text-gray-400 transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Main Navigation
            </p>
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md cursor-pointer transition-colors ${
                  item.active
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span
                  className={`whitespace-nowrap transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}

            {/* Support */}
            <p
              className={`px-4 mt-6 mb-2 text-xs uppercase tracking-wider text-gray-400 transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Support
            </p>
            {supportItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-2 my-1 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
              >
                {item.icon}
                <span
                  className={`whitespace-nowrap transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
