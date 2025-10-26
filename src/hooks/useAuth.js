import { useState } from "react";
import { login } from "../services/authService";
import { logout as logoutService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
        toast.success("Login berhasil 🎉");
      setTimeout(() => {
        toast.dismiss(); 
        navigate("/dashboard");
      }, 1200);
      } else {
        toast.error("Login berhasil, tapi token tidak diterima.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login gagal, periksa kembali email & password Anda!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutService();
    toast.success("Berhasil logout 👋");
    navigate("/login");
  };

  return { handleLogin, handleLogout, loading };
};
