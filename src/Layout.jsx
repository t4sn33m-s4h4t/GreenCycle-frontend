
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-50"> 
      <div className="w-56 bg-white shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
