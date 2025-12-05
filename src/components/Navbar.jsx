import React from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useUserSettings } from "../hooks/useUserSettings";

const DEFAULT_AVATAR = "https://thumbs.dreamstime.com/b/print-302238697.jpg";

const Navbar = ({ toggleDrawer }) => {
  const { user, loading } = useUserSettings();

  const avatar = !loading && user?.foto_profil
    ? user.foto_profil_url 
    : DEFAULT_AVATAR;

  return (
    <div className="navbar bg-base-100/70 backdrop-blur-md shadow-md sticky top-0 z-50 px-6 rounded-b-xl">
      {/* Left side */}
      <div className="flex-1 flex items-center gap-3">
        <button onClick={toggleDrawer} className="btn btn-ghost btn-square">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex-none flex items-center gap-4">
        <ThemeToggle />

        {/* Avatar */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={avatar}
                alt="User Avatar"
                className="object-cover"
              />
            </div>
          </div>

          {/* Menu Dropdown */}
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-xl w-56 shadow-lg mt-3">
            <li className="px-3 py-2 text-sm font-semibold text-primary">
              {user?.nama ?? "User"}
            </li>
            <li>
              <Link to="/dashboard/settings">Profile & Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
