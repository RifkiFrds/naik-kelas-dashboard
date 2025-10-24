import React, { useEffect, useState } from "react";
import { updateUser } from "../services/userService";
import api from "../app/api";
import toast from "react-hot-toast";
import { UserCog } from "lucide-react";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        const res = await api.get("/user");
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

    setSaving(true);
    try {
      await updateUser(user.id, form);
      toast.success("Profil berhasil diperbarui ✅");

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
      toast.error("Gagal update profil ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Memuat data akun...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b text-gray-700 dark:text-gray-700 pb-4">
        <UserCog className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Pengaturan Akun</h1>
      </div>

      {/* Profil Section */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24">
          <img
            src={form.foto_profil || "/default-avatar.png"}
            alt="Foto Profil"
            className="w-24 h-24 rounded-full object-cover border shadow text-gray-700 dark:text-gray-700"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-700">{form.nama}</h2>
          <p className="text-sm text-gray-500">{form.email}</p>
          <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700">
            {form.role}
          </span>
        </div>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          className="input input-bordered w-full md:col-span-2"
          placeholder="Foto Profil URL"
          value={form.foto_profil}
          onChange={(e) => setForm({ ...form, foto_profil: e.target.value })}
        />
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
          className="input input-bordered w-full md:col-span-2"
          placeholder="Password baru (opsional, min 6)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {/* Action */}
      <button
        className={`btn btn-primary w-full ${saving ? "loading" : ""}`}
        onClick={handleUpdate}
        disabled={saving}
      >
        {saving ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </div>
  );
}
