import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 text-center px-6">
      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-gray-800 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-500 mb-6">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>
        <Link
          to="/dashboard"
          className="btn btn-primary w-full shadow-lg hover:scale-105 transition-transform"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
