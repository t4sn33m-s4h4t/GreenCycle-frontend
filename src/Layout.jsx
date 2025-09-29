
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen bg-background text-textLight font-sans"> 
      <div className="w-56 shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
