import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard/users">Users</Link>
          <Link to="/dashboard/services">Services</Link>
          <Link to="/dashboard/partnerships">Partnerships</Link>
          <Link to="/dashboard/careers">Careers</Link>
          <Link to="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
