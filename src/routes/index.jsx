import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Import pages
import DashboardHome from "../pages/DashboardHome";
import Users from "../pages/Users";
import Services from "../pages/Services";
import Partnerships from "../pages/Partnerships";
import Careers from "../pages/Careers";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="services" element={<Services />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="careers" element={<Careers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
