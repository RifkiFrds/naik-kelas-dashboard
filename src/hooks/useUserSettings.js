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
    foto_profil: null, // default null
    password: "",
    role: "admin",
  });

  // Ambil data user login
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        const userData = res.data?.data;
        if (!userData) throw new Error("Data user tidak ditemukan");

        setUser(userData);
        setForm({
          nama: userData.nama || "",
          email: userData.email || "",
          foto_profil: null, // kosong, user upload baru kalau ganti
          password: "",
          role: userData.role || "admin",
        });
      } catch (err) {
        console.error("Fetch user error:", err.response?.data || err.message);
        toast.error("Gagal memuat data user ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Update user
  const handleUpdate = async () => {
    if (!form.nama || !form.email) {
      toast.error("Nama dan Email wajib diisi ❌");
      return;
    }

    if (form.password && form.password.length < 6) {
      toast.error("Password minimal 6 karakter ❌");
      return;
    }

    try {
      await updateUser(user.id, form);
      toast.success("Profil berhasil diperbarui ");

      // refresh data setelah berhasil update
      const refreshed = await api.get("/user");
      const refreshedUser = refreshed.data?.data;
      setUser(refreshedUser);
      setForm({
        nama: refreshedUser.nama || "",
        email: refreshedUser.email || "",
        foto_profil: null, // reset jadi null
        password: "",
        role: refreshedUser.role || "admin",
      });
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        if (errors) {
          Object.values(errors).forEach((msg) => toast.error(msg[0]));
        } else {
          toast.error("Validasi gagal ❌");
        }
      } else if (err.response?.status === 403) {
        toast.error("Tidak punya izin update ❌");
      } else {
        toast.error("Gagal update profil ❌");
      }
    }
  };

  return { user, form, setForm, loading, handleUpdate };
};
