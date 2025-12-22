import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHome from "../pages/DashboardHome";
import Careers from "../pages/Careers";
import Login from "../pages/Login";
import Users from "../pages/Users";
import GeneralService from "../pages/GeneralService";
import BusinessService from "../pages/BusinessService";
import Partnerships from "../pages/Partnerships";
import Events from "../pages/Events";
import Artikel from "../pages/Artikel";
import ContactMessage from "../pages/ContactMessage";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

// Komponen untuk proteksi route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Jika token tidak ada, arahkan ke login
  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard - proteksi */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="careers" element={<Careers />} />
          <Route path="users" element={<Users />} />
          <Route path="general" element={<GeneralService />} />
          <Route path="business" element={<BusinessService />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="events" element={<Events />} />
          <Route path="artikel" element={<Artikel />} />
          <Route path="contact" element={<ContactMessage />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* NotFound jika route tidak ada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
