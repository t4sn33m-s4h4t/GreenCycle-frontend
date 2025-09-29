
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-50"> 
      <div className="w-64 bg-white shadow-lg">
        <Sidebar />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
