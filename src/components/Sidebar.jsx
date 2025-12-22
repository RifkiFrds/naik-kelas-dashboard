import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Handshake,
  Briefcase,
  LogOut,
  Calendar,
  Layers,
  Newspaper,
  Mail,
  ChevronDown
} from "lucide-react";

const Sidebar = ({ closeDrawer }) => {
  const location = useLocation();
  const [openService, setOpenService] = useState(
    location.pathname.includes("/dashboard/general") ||
    location.pathname.includes("/dashboard/business") ||
    location.pathname.includes("/dashboard/partnerships")
  );

  const linkClass = (isActive) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
     ${
       isActive
         ? "bg-[#FFBC41]/30 border-l-4 border-[#FFBC41] text-white font-semibold"
         : "hover:bg-white/10 hover:text-[#FFBC41]"
     }`;

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        className="drawer-overlay"
        onClick={closeDrawer}
      />

      <div className="flex flex-col justify-between h-full w-72
        bg-gradient-to-b from-[#000B2C] via-[#0A123D] to-[#FFBC41]
        text-white p-6 rounded-r-3xl shadow-2xl">

        {/* LOGO */}
        <div className="flex flex-col items-center">
          <div className="bg-white/20 p-3 rounded-lg">
            <img src="/logo.png" alt="logo" className="w-19 h-16 object-cover drop-shadow-[0_1px_8px_rgba(255,255,255,0.25)]" />
          </div>
        </div>

        {/* MENU */}
        <ul className="menu flex-1 space-y-2 text-sm mt-4">

          {/* DASHBOARD */}
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => linkClass(isActive)}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/users" className={({ isActive }) => linkClass(isActive)}>
              <Users size={20} /> Users
            </NavLink>
          </li>

          {/* DROPDOWN LAYANAN */}
          <li>
            <button
              onClick={() => setOpenService(!openService)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                hover:bg-white/10 transition"
            >
              <span className="flex items-center gap-3">
                <Wrench size={20} />
                Layanan
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform ${openService ? "rotate-180" : ""}`}
              />
            </button>

            {openService && (
              <ul className="mt-2 ml-6 space-y-1 border-l border-white/20 pl-4">
                <li>
                  <NavLink
                    to="/dashboard/general"
                    className={({ isActive }) => linkClass(isActive)}
                    onClick={closeDrawer}
                  >
                    Layanan Umum
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/business"
                    className={({ isActive }) => linkClass(isActive)}
                    onClick={closeDrawer}
                  >
                    Layanan Bisnis
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/partnerships"
                    className={({ isActive }) => linkClass(isActive)}
                    onClick={closeDrawer}
                  >
                    Kemitraan
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/dashboard/events" className={({ isActive }) => linkClass(isActive)}>
              <Calendar size={20} /> Acara
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/artikel" className={({ isActive }) => linkClass(isActive)}>
              <Newspaper size={20} /> Artikel
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/careers" className={({ isActive }) => linkClass(isActive)}>
              <Briefcase size={20} /> Karir
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/contact" className={({ isActive }) => linkClass(isActive)}>
              <Mail size={20} /> Pesan Kontak
            </NavLink>
          </li>
        </ul>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl
            hover:bg-white/10 transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
