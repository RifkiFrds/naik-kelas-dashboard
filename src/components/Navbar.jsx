import React, { useEffect, useState } from "react";
import { Menu, Rocket } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import api from "../app/api"; // buat fetch user login
import toast from "react-hot-toast";

const Navbar = ({ toggleDrawer }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user"); // endpoint sanctum: api/user
        setUser(res.data);
      } catch (err) {
        toast.error("Gagal memuat data user ❌");
      }
    };
    fetchUser();
  }, []);

  const avatarUrl =
    user?.foto_profil ||
    "https://thumbs.dreamstime.com/b/print-302238697.jpg"; // fallback default

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
        {/* Dark/Light Mode Toggle */}
        <ThemeToggle />

        {/* Avatar + Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/50 transition"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img alt="User Avatar" src={avatarUrl} />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-xl w-56 shadow-lg mt-3">
            <li>
              <Link to="/dashboard/settings">
                Profile & Settings
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="text-error"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
