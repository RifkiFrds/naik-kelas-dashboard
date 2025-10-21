import React from "react";
import { Menu, Search, Rocket } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ toggleDrawer }) => {
  return (
    <div className="navbar bg-base-100/70 backdrop-blur-md shadow-md sticky top-0 z-50 px-6 rounded-b-xl">
      <div className="flex-1 flex items-center gap-3">
        {/* Hamburger */}
        <button onClick={toggleDrawer} className="btn btn-ghost btn-square">
          <Menu className="w-6 h-6" />
        </button>

        {/* Branding */}
        <span className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          <Rocket className="w-7 h-7 text-primary" />
          Naik Kelas
        </span>
      </div>

      {/* Right Section */}
      <div className="flex-none flex items-center gap-4">
        {/* Search bar */}
        <div className="hidden md:flex items-center bg-base-200 rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Cari..."
            className="bg-transparent outline-none text-sm w-40"
          />
        </div>

        {/* Dark/Light Mode Toggle */}
      <div className="flex-none flex items-center gap-4">
        {/* Panggil komponen Toggle */}
        <ThemeToggle />

        {/* Avatar + Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/50 transition"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-xl w-56"
          >
            <li>
              <a className="justify-between">
                Profile <span className="badge badge-primary">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a className="text-error font-semibold">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
