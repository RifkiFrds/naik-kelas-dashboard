import React, { useState } from "react";
// eksternal lib
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Toaster } from "react-hot-toast";

// custom hook
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";

const COLOR = {
  primary: "#FFBC41",
  secondary: "#000B2C",
};

export default function Login() {
  const [email, setEmail] = useState("");    
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <>
      <div
        className="flex min-h-screen bg-gradient-to-br from-[#000B20] to-[#000B2C]/80"
      >
        <Toaster position="top-right" reverseOrder={false} />

        {/* Kolom Kiri */}
        <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
          <motion.img
            src="/agency-illustration.jpg"
            alt="Illustration"
            className="w-[90%] h-[80%] object-cover shadow-2xl"
            initial={{
              borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%",
            }}
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 50% 60% 40% 50%",
                "40% 60% 70% 30% / 60% 40% 50% 50%",
                "30% 70% 50% 50% / 40% 60% 70% 30%",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </div>

        {/* Kolom Kanan */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="card w-full max-w-md p-8 rounded-2xl shadow-2xl"
            style={{
              background: "rgba(0, 11, 44, 0.6)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${COLOR.primary}30`,
            }}
          >
            {/* TITLE */}
            <h2
              className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${COLOR.primary}, #CB8A23)`
              }}
            >
              Selamat Datang 👋
            </h2>

            <p className="text-white/70 text-center mb-6">
              Silakan masuk ke akun Anda
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="label font-medium text-white/80">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3" size={18} color={COLOR.primary} />
                  <input
                    type="email"
                    placeholder="Masukkan email"
                    className="input w-full pl-10 bg-white/10 text-white"
                    style={{
                      border: `1px solid ${COLOR.primary}40`,
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label font-medium text-white/80">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3" size={18} color={COLOR.primary} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input w-full pl-10 bg-white/10 text-white"
                    style={{
                      border: `1px solid ${COLOR.primary}40`,
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt"
                    style={{ color: COLOR.primary }}
                  >
                    Lupa password?
                  </a>
                </label>
              </div>

              {/* Tombol */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] w-full gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Sedang masuk...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-6 text-sm text-center text-white/70">
              Belum punya akun?{" "}
              <a href="/register" style={{ color: COLOR.primary }} className="font-medium hover:underline">
                Daftar sekarang
              </a>
            </p>
          </motion.div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#000B20] to-[#000B2C]/80">
        <Footer />
      </div>
    </>
  );
}
