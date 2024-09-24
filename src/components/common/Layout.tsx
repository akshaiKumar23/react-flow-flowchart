import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
