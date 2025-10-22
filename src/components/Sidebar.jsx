import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Handshake,
  Briefcase,
  LogOut,
} from "lucide-react";

const Sidebar = ({ closeDrawer }) => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        className="drawer-overlay"
        onClick={closeDrawer}
      ></label>

      <div className="flex flex-col justify-between h-full w-72 bg-gradient-to-b from-indigo-800 via-indigo-900 to-indigo-950 text-white p-6 rounded-r-3xl shadow-2xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-white/90 p-3 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <img
              src="/demo-logo.webp"
              alt="logo demo"
              className="w-14 h-14 object-cover"
            />
          </div>
        </div>

        {/* Menu Items */}
        <ul className="menu flex-1 space-y-2 text-sm">
          {[
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { to: "/dashboard/users", label: "Users", icon: Users },
            { to: "/dashboard/services", label: "Services", icon: Wrench },
            { to: "/dashboard/partnerships", label: "Partnerships", icon: Handshake },
            { to: "/dashboard/careers", label: "Careers", icon: Briefcase },
          ].map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-white text-indigo-900 font-semibold shadow-md"
                      : "hover:bg-white/10 hover:translate-x-1"
                  }`
                }
              >
                <Icon size={20} /> {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout Section */}
        <div className="mt-8">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white font-medium shadow-lg transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
