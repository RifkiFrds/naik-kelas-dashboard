import React from 'react';
import { Users, Briefcase, Handshake, Layers } from "lucide-react";

const StatCards = ({ stats, loading }) => {
  // Tampilkan loading state jika data belum siap
  if (loading) {
    return (
      <div className="w-full p-4 text-center bg-white rounded-2xl shadow border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  // Pastikan stats memiliki default value jika null/undefined
  const { 
    users = 0, 
    careers = 0, 
    partnerships = 0, 
    services = 0 
  } = stats || {};

  return (
    <div className="stats shadow w-full bg-white text-gray-700 border border-gray-100 overflow-hidden">
      
      {/* USER STATS */}
      <div className="stat place-items-center sm:place-items-start hover:bg-gray-50 transition-colors">
        <div className="stat-figure text-primary">
          <Users className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title text-gray-500 font-medium">Total Users</div>
        <div className="stat-value text-primary text-3xl">{users}</div>
        <div className="stat-desc text-xs text-gray-400">Admin & Super Admin</div>
      </div>

      {/* CAREER STATS */}
      <div className="stat place-items-center sm:place-items-start hover:bg-gray-50 transition-colors border-l border-gray-100">
        <div className="stat-figure text-secondary">
          <Briefcase className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title text-gray-500 font-medium">Lowongan Karir</div>
        <div className="stat-value text-secondary text-3xl">{careers}</div>
        <div className="stat-desc text-xs text-gray-400">Posisi tersedia</div>
      </div>

      {/* PARTNERSHIP STATS */}
      <div className="stat place-items-center sm:place-items-start hover:bg-gray-50 transition-colors border-l border-gray-100">
        <div className="stat-figure text-[#10B981]"> {/* Emerald color manually applied */}
          <Handshake className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title text-gray-500 font-medium">Mitra</div>
        <div className="stat-value text-[#10B981] text-3xl">{partnerships}</div>
        <div className="stat-desc text-xs text-gray-400">Paket Kemitraan</div>
      </div>

      {/* SERVICE STATS (Gabungan Umum + Bisnis) */}
      <div className="stat place-items-center sm:place-items-start hover:bg-gray-50 transition-colors border-l border-gray-100">
        <div className="stat-figure text-info">
          <Layers className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title text-gray-500 font-medium">Total Layanan</div>
        <div className="stat-value text-info text-3xl">{services}</div>
        <div className="stat-desc text-xs text-gray-400">Umum & Bisnis</div>
      </div>

    </div>
  );
};

export default StatCards;