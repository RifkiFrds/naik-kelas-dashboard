import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  // Cek ukuran layar saat load/resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true); // Desktop selalu terbuka
      } else {
        setIsOpen(false); // Mobile default tertutup
      }
    };

    handleResize(); // panggil saat pertama render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => {
    if (window.innerWidth < 1024) {
      // hanya auto-close kalau mobile
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`drawer ${isOpen ? "drawer-open" : ""} min-h-screen bg-base-200`}
    >
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={toggleDrawer}
      />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        <Navbar toggleDrawer={toggleDrawer} />

        <main className="flex-1 p-6 lg:p-8 bg-base-100 rounded-tl-2xl shadow-inner">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Sidebar */}
      <Sidebar closeDrawer={closeDrawer} />
    </div>
  );
}
