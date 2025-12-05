import React, { useEffect, useState } from "react";
import StatCards from "../components/StatsCard";
import { motion } from "framer-motion";
import { Mail, Layers, PieChart as PieChartIcon } from "lucide-react";
import toast from "react-hot-toast";

// Import Semua Service API
import { getUsers } from "../services/userService";
import { getCareers } from "../services/careersService";
import { getPartnerships } from "../services/partnershipService";
import { getLayananUmum } from "../services/layananUmumService";
import { getLayananBisnis } from "../services/layananBisnisService";
import { getPesanKontak } from "../services/contactService";

// Import Grafik
import {
  XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell, Legend,
} from "recharts";

// Palet Warna
const COLOR = {
  primary: "#FFBC41",
  accent: "#10B981",
  danger: "#EF4444",
  gray: "#E5E7EB",
};

const DashboardHome = () => {
  // State Utama
  const [stats, setStats] = useState({ users: 0, careers: 0, partnerships: 0, services: 0 });

  // State Grafik & Pesan
  const [businessTypeData, setBusinessTypeData] = useState([]);
  const [careerStatusData, setCareerStatusData] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  // Loading
  const [loading, setLoading] = useState(true);

  // Fetch Semua Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, careers, partnerships, layUmum, layBisnis, contacts] =
          await Promise.all([
            getUsers(),
            getCareers(),
            getPartnerships(),
            getLayananUmum(),
            getLayananBisnis(),
            getPesanKontak(),
          ]);

        // >>> 1. Statistik
        setStats({
          users: users?.length || 0,
          careers: careers?.length || 0,
          partnerships: partnerships?.length || 0,
          services: (layUmum?.length || 0) + (layBisnis?.length || 0),
        });

        // >>> 2. Grafik Layanan Bisnis
        if (Array.isArray(layBisnis)) {
          const typeCounts = layBisnis.reduce((acc, curr) => {
            const type = (curr.type || "Lainnya");
            const name = type.charAt(0).toUpperCase() + type.slice(1);
            acc[name] = (acc[name] || 0) + 1;
            return acc;
          }, {});
          setBusinessTypeData(Object.entries(typeCounts).map(([name, value]) => ({ name, value })));
        }

        // >>> 3. Grafik Lowongan
        if (Array.isArray(careers)) {
          const opened = careers.filter((x) => x.status === "dibuka").length;
          const closed = careers.filter((x) => x.status !== "dibuka").length;
          if (opened + closed > 0) {
            setCareerStatusData([
              { name: "Dibuka", value: opened },
              { name: "Ditutup", value: closed }
            ]);
          }
        }

        // >>> 4. Pesan Terbaru (Dinamis 5, Prioritas Belum Dibaca)
        if (Array.isArray(contacts)) {
          const sorted = [...contacts].sort((a, b) => {
            if (!a.dibaca && b.dibaca) return -1;
            if (a.dibaca && !b.dibaca) return 1;
            const tA = new Date(a.created_at || a.dibaca || 0).getTime();
            const tB = new Date(b.created_at || b.dibaca || 0).getTime();
            return tB - tA;
          });
          setRecentMessages(sorted.slice(0, 5));
        }

      } catch (err) {
        toast.error("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const PIE_COLORS = [COLOR.accent, COLOR.danger];

  const renderDate = (val) => {
    if (!val) return <span className="italic text-gray-400 text-xs">-</span>;
    try {
      return new Date(val).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return <span className="text-red-500 text-xs">Invalid</span>;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFBC41] to-[#CB8A23]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">Ringkasan aktivitas platform Anda hari ini.</p>
      </motion.div>

      {/* Statistik */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
        <StatCards stats={stats} loading={loading} />
      </motion.div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Grafik 1 */}
        <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{delay:.2}}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100">
              <Layers className="w-6 h-6 text-[#FFBC41]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Layanan Bisnis</h2>
              <p className="text-xs text-gray-500">Distribusi berdasarkan kategori</p>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            {loading ? (
              <span className="loading loading-spinner text-warning"></span>
            ) : businessTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={businessTypeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fill:'#6B7280',fontSize:12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill:'#6B7280',fontSize:12}} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill={COLOR.primary} radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">Belum ada data layanan bisnis</p>
            )}
          </div>
        </motion.div>

        {/* Grafik 2 */}
        <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{delay:.3}}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 rounded-lg border border-green-100">
              <PieChartIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Status Lowongan</h2>
              <p className="text-xs text-gray-500">Persentase rekrutmen aktif</p>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            {loading ? (
              <span className="loading loading-spinner text-success"></span>
            ) : careerStatusData.length > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={careerStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                    {careerStatusData.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">Belum ada data lowongan</p>
            )}
          </div>
        </motion.div>

      </div>

      {/* Pesan Terbaru */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.4}}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Pesan Masuk Terbaru</h2>
              {recentMessages.length > 0 ? (
                <p className="text-xs text-gray-500">{recentMessages.length} pesan terakhir dari form kontak</p>
              ) : (
                <p className="text-xs text-gray-400 italic">Belum ada pesan dari form kontak</p>
              )}
            </div>
          </div>

          <a href="/dashboard/contact" className="btn btn-sm btn-ghost text-primary hover:bg-yellow-50">
            Lihat Semua →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                <th>Pengirim</th>
                <th>Email</th>
                <th>Tanggal</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-10"><span className="loading loading-dots"></span></td></tr>
              ) : recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50 border-b last:border-none">
                    <td className="font-semibold">{msg.nama}</td>
                    <td className="text-gray-500">{msg.email}</td>
                    <td className="text-gray-500 font-mono text-xs">
                      {renderDate(msg.created_at || msg.dibaca)}
                    </td>
                    <td className="text-center">
                      {msg.dibaca ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                          Sudah Dibaca
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 animate-pulse">
                          Baru
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center py-12 text-gray-400 italic">Belum ada pesan masuk.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
