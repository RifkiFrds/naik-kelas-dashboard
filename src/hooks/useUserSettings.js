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
        const res = await api.get("/user");
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

  // Update user
  const handleUpdate = async () => {
    if (!form.nama || !form.email) {
      toast.error("Nama dan Email wajib diisi ❌");
      return;
    }

    try {
      await updateUser(user.id, form);
      toast.success("Profil berhasil diperbarui ✅"); // toast sukses

      // refresh data setelah berhasil update
      const refreshed = await api.get("/user");
      setUser(refreshed.data);
      setForm({
        nama: refreshed.data.nama,
        email: refreshed.data.email,
        foto_profil: refreshed.data.foto_profil,
        password: "",
      });
    } catch (err) {
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
