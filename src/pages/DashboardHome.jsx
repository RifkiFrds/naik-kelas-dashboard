import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StatCards from "../components/StatsCard";
import { useDashboard, formatMessageDate } from "../hooks/useDashboard";
import { useContact } from "../hooks/useContact";
import { Layers, PieChart as PieChartIcon, Mail } from "lucide-react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLOR = {
  primary: "#FFBC41",
  secondary: "#000B2C",
  accent: "#10B981",
  danger: "#EF4444",
};

const DashboardHome = () => {
  const {
    loading,
    stats,
    businessTypeData,
    careerStatusData,
    recentMessages,
  } = useDashboard();

  const { totalCount } = useContact();

  const PIE_COLORS = [COLOR.accent, COLOR.danger];

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFBC41] to-[#CB8A23]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">Ringkasan aktivitas platform Anda.</p>
      </motion.div>

      {/* STATS CARDS */}
      <StatCards stats={stats} loading={loading} />

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART: Distribusi Layanan Bisnis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Layers className="w-6 h-6 text-[#FFBC41]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Layanan Bisnis</h2>
              <p className="text-xs text-gray-500">Berdasarkan kategori tipe</p>
            </div>
          </div>

          {businessTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={businessTypeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="value" fill={COLOR.secondary} radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
              <Layers className="w-10 h-10 mb-2 opacity-20" />
              <p>Belum ada data layanan bisnis</p>
            </div>
          )}
        </motion.div>

        {/* CHART: Status Karir */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <PieChartIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Status Lowongan</h2>
              <p className="text-xs text-gray-500">Persentase rekrutmen aktif</p>
            </div>
          </div>

          <div className="flex items-center justify-center h-[300px]">
            {careerStatusData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={careerStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    paddingAngle={5}
                  >
                    {careerStatusData.map((entry, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-400">Belum ada data lowongan</div>
            )}
          </div>
        </motion.div>
      </div>

      {/* PESAN TERBARU */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Pesan Masuk Terbaru</h2>
              {totalCount > 0 ? (
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">{totalCount}</span> pesan dari form kontak
                </p>
              ) : (
                <p className="text-xs text-gray-400 italic">Belum ada pesan</p>
              )}
           </div>
          </div>

          <Link to="/dashboard/contact" className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50">
            Lihat Semua
          </Link>
        </div>

        {/* TABEL PESAN */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <th>Pengirim</th>
                <th>Email</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td className="font-semibold text-gray-700">{msg.nama}</td>
                    <td className="text-gray-500">{msg.email}</td>
                    <td className="text-sm text-gray-500">{formatMessageDate(msg.dikirim)}</td>
                    <td>
                      {msg.dibaca ? (
                        <span className="badge badge-success badge-outline">Dibaca</span>
                      ) : (
                        <span className="badge badge-error badge-outline">Baru</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400 italic">
                    Belum ada pesan masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
