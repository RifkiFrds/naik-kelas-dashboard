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
    foto_profil: null,
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
          foto_profil: null, // hanya diisi kalau upload baru
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
      toast.success("Profil berhasil diperbarui");

      const refreshed = await api.get("/user");
      const refreshedUser = refreshed.data?.data;
      setUser(refreshedUser);
      setForm({
        nama: refreshedUser.nama || "",
        email: refreshedUser.email || "",
        foto_profil: null,
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
      } else {
        toast.error("Gagal update profil ❌");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Memuat data akun...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-4 text-gray-700">
        <UserCog className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Pengaturan Akun</h1>
      </div>

      {/* Profil Section */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24">
          <img
            src={user?.foto_profil_url || "/default-avatar.png"}
            alt="Foto Profil"
            className="w-24 h-24 rounded-full object-cover border shadow"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{form.nama}</h2>
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
          type="file"
          className="file-input file-input-bordered w-full md:col-span-2"
          onChange={(e) =>
            setForm({ ...form, foto_profil: e.target.files[0] || null })
          }
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
