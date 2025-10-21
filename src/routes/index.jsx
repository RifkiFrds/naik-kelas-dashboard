import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHome from "../pages/DashboardHome";
import Careers from "../pages/Careers";
import Login from "../pages/Login";
import Users from "../pages/Users"; 
// import Services from "../pages/Services";
// import Partnerships from "../pages/Partnerships"; 
import Settings from "../pages/Settings"; 

// Komponen untuk proteksi route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // return token ? children : <Navigate to="/login" />;
  return children; // Bypass untuk development
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Rute di dalam Dashboard yang diproteksi */}
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
          {/* <Route path="services" element={<Services />} />  */}
          {/* <Route path="partnerships" element={<Partnerships />} /> */}
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}