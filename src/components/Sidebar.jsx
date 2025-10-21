import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Handshake,
  Briefcase,
  Settings,
} from "lucide-react";

const Sidebar = ({ closeDrawer }) => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        className="drawer-overlay"
        onClick={closeDrawer}
      ></label>

      <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="/demo-logo.webp"
            alt="logo demo"
            className="rounded-full w-20 h-20 md:w-24 md:h-24 object-cover shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Divider */}
        <div className="divider my-2"></div>

        {/* Menu Items */}
        <li>
          <Link to="/dashboard" onClick={closeDrawer}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/users" onClick={closeDrawer}>
            <Users size={20} /> Users
          </Link>
        </li>
        <li>
          <Link to="/dashboard/services" onClick={closeDrawer}>
            <Wrench size={20} /> Services
          </Link>
        </li>
        <li>
          <Link to="/dashboard/partnerships" onClick={closeDrawer}>
            <Handshake size={20} /> Partnerships
          </Link>
        </li>
        <li>
          <Link to="/dashboard/careers" onClick={closeDrawer}>
            <Briefcase size={20} /> Careers
          </Link>
        </li>
        <li>
          <Link to="/dashboard/settings" onClick={closeDrawer}>
            <Settings size={20} /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
