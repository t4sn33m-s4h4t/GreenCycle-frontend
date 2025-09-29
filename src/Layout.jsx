
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen bg-background text-textLight font-sans"> 
      <div className={` ${isOpen ? "w-56" : "w-12"} shadow-lg`}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
