import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Handshake,
  Briefcase,
  LogOut,
  Layers,
  Mail
} from "lucide-react";

const Sidebar = ({ closeDrawer }) => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        className="drawer-overlay"
        onClick={closeDrawer}
      ></label>

      {/* === SIDEBAR WRAPPER === */}
      <div className="flex flex-col justify-between h-full w-72 
        bg-gradient-to-b from-[#000B2C] via-[#0A123D] to-[#FFBC41] 
        text-white p-6 rounded-r-3xl shadow-2xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-5">
          <div className="bg-white p-3 rounded-2xl transition-transform">
            <img
              src="/logo.png"
              alt="logo"
              className="w-14 h-14 object-cover"
            />
          </div>
        </div>

        {/* DIVIDER — updated palette */}
        <div className="relative my-3 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px 
            bg-gradient-to-r from-transparent via-[#FFBC41]/40 to-transparent">
          </div>
          <span className="relative z-10 px-3 py-1 text-xs uppercase tracking-widest 
            text-[#FFBC41]/70 bg-[#000B2C] rounded-full shadow">
            Menu
          </span>
        </div>

        {/* MENU */}
        <ul className="menu flex-1 space-y-2 text-sm">
          {[
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { to: "/dashboard/users", label: "Users", icon: Users },
            { to: "/dashboard/general", label: "Layanan Umum", icon: Wrench },
            { to: "/dashboard/business", label: "Layanan Bisnis", icon: Layers },
            { to: "/dashboard/partnerships", label: "Kemitraan", icon: Handshake },
            { to: "/dashboard/careers", label: "Karir", icon: Briefcase },
            { to: "/dashboard/contact", label: "Pesan Kontak", icon: Mail },
          ].map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
                   ${
                     isActive
                       ? "bg-[#FFBC41]/30 border-l-4 border-[#FFBC41] text-white font-semibold shadow-sm"
                       : "hover:bg-white/10 hover:text-[#FFBC41]"
                   }`
                }
              >
                <Icon size={20} /> {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        <div className="mt-8">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl 
              hover:bg-white/10 hover:text-gray-800 text-white transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
