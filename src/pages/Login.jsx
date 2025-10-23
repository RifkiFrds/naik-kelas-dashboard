import React, { useState } from "react";
import loginImage from "../assets/agency-illustration.jpg";

// eksternal lib
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Toaster } from "react-hot-toast";

// custom hook
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";

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
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Kolom Kiri - Ilustrasi dengan animasi blob */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
        <motion.img
          src={loginImage}
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

      {/* Kolom Kanan - Form Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="card w-full max-w-md bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Selamat Datang 👋
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Silakan masuk ke akun Anda
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label font-medium">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Masukkan email"
                  className="input input-bordered w-full pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Lupa password?
                </a>
              </label>
            </div>

            {/* Tombol */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full gap-2"
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

          <p className="mt-6 text-sm text-center text-gray-600">
            Belum punya akun?{" "}
            <a href="/register" className="link link-primary font-medium">
              Daftar sekarang
            </a>
          </p>
        </motion.div>
      </div>
    </div>
    <Footer />
    </>
  );
}
