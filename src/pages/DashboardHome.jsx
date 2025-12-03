import React from "react";
import StatCards from "../components/StatsCard";
import { motion } from "framer-motion";
import { Rocket, BarChart3, LineChart as LineChartIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const COLOR = {
  primary: "#FFBC41",
  secondary: "#000B2C",
};

const dataAktivitas = [
  { name: "Sen", value: 30 },
  { name: "Sel", value: 45 },
  { name: "Rab", value: 32 },
  { name: "Kam", value: 60 },
  { name: "Jum", value: 50 },
  { name: "Sab", value: 70 },
  { name: "Min", value: 40 },
];

const DashboardHome = () => {
  return (
    <div className="space-y-10">

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="flex items-center gap-2 text-3xl font-bold mb-2 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${COLOR.primary}, #CB8A23)`,
          }}
        >
          <Rocket className="w-7 h-7" color={COLOR.primary} />
          Selamat Datang, Admin
        </h1>
        <p className="text-gray-600">
          Berikut ringkasan dashboard Anda hari ini.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <StatCards />
      </motion.div>

      {/* Ringkasan Aktivitas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
          <BarChart3 className="w-6 h-6" color={COLOR.primary} />
          Ringkasan Aktivitas
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataAktivitas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar
                dataKey="value"
                fill={COLOR.primary}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Aktivitas Mingguan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
          <LineChartIcon className="w-6 h-6" color={COLOR.primary} />
          Aktivitas Mingguan
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataAktivitas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={COLOR.primary}
                strokeWidth={3}
                dot={{ r: 6, fill: COLOR.secondary, stroke: COLOR.primary, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
