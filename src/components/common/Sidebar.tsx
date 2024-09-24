import { useState } from "react";
import {
  Home,
  LucideIcon,
  Menu,
  X,
  FacebookIcon,
  InstagramIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface SidebarItem {
  name: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: Home, color: "#4F46E5", href: "/dashboard" },
  {
    name: "Facebook",
    icon: FacebookIcon,
    color: "#3B82F6",
    href: "/facebook",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    color: "#E1306C",
    href: "/instagram",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 bg-white p-2 rounded-full shadow-lg"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      <motion.div
        className={`fixed top-0 left-0 min-h-screen bg-white shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-20 transition-transform duration-300 ease-in-out`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex flex-col items-center mt-4 space-y-4 lg:space-y-2">
          <div className="lg:flex items-center justify-center py-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-700 lg:hidden"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
          {sidebarItems.map((item) => (
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
              key={item.name}
              className={`relative rounded-full ${
                pathname === item.href ? "bg-cyan-200" : ""
              } group`}
            >
              <Link
                to={item.href}
                className="flex items-center justify-center h-14 w-16 cursor-pointer p-3"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-200 shadow hover:bg-gray-700 transition-colors duration-100"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="h-6 w-6" />
                </div>
              </Link>
              <motion.div
                className={`absolute ${
                  isCollapsed ? "opacity-0" : "opacity-100"
                } left-16 top-1/2 transform -translate-y-1/2 ml-3 w-max rounded-md bg-gray-700 p-1 text-xs text-white transition-opacity duration-200 z-50`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{ zIndex: 1000 }}
              >
                {item.name}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto my-4 w-5 border-t border-solid border-gray-400"></div>
      </motion.div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
