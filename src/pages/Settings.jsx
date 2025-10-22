import React, { useEffect, useState } from "react";
import { updateUser } from "../services/userService";
import api from "../app/api";
import toast from "react-hot-toast";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    foto_profil: "",
    password: "",
    role: "admin",
  });

  // 🔹 Ambil data user login
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user"); // endpoint user login
        setUser(res.data);
        setForm({
          nama: res.data.nama || "",
          email: res.data.email || "",
          foto_profil: res.data.foto_profil || "",
          password: "",
          role: res.data.role || "admin",
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
      toast.success("Profil berhasil diperbarui ✅");

      // refresh data setelah berhasil update
      const refreshed = await api.get("/user");
      setUser(refreshed.data);
      setForm({
        nama: refreshed.data.nama,
        email: refreshed.data.email,
        foto_profil: refreshed.data.foto_profil,
        password: "",
        role: refreshed.data.role,
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

  if (loading) return <div className="p-6">Memuat data akun...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg space-y-4">
      <h1 className="text-2xl font-bold mb-4">Pengaturan Akun</h1>

      <input
        className="input input-bordered w-full"
        placeholder="Nama"
        value={form.nama}
        onChange={(e) => setForm({ ...form, nama: e.target.value })}
      />
      <input
        className="input input-bordered w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="input input-bordered w-full"
        placeholder="Foto Profil URL"
        value={form.foto_profil}
        onChange={(e) => setForm({ ...form, foto_profil: e.target.value })}
      />

      {/* Role hanya bisa diubah oleh super_admin */}
      {user?.role === "super_admin" && (
        <select
          className="select select-bordered w-full"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      )}

      <input
        type="password"
        className="input input-bordered w-full"
        placeholder="Password baru (opsional, min 6)"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="btn btn-primary w-full" onClick={handleUpdate}>
        Simpan Perubahan
      </button>
    </div>
  );
}
