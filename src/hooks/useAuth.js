import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Login berhasil 🎉");
        setTimeout(() => navigate("/dashboard"), 1200);
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

  return { handleLogin, loading };
};
