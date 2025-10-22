import { useState, useEffect } from "react";
import api from "../app/api";
import { updateUser } from "../services/userService";
import toast from "react-hot-toast";

export const useUserSettings = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    foto_profil: "",
    password: "",
  });

  // Ambil data user login
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/"); 
        setUser(res.data);
        setForm({
          nama: res.data.nama || "",
          email: res.data.email || "",
          foto_profil: res.data.foto_profil || "",
          password: "",
        });
      } catch (err) {
        toast.error("Gagal memuat data user ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
  try {
    await updateUser(user.id, form);
    toast.success("Profil berhasil diperbarui ✅");
  } catch (err) {
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      Object.values(errors).forEach((msg) => toast.error(msg[0]));
    } else {
      toast.error("Update gagal ❌");
    }
  }
};

  return { user, form, setForm, loading, handleUpdate };
};
