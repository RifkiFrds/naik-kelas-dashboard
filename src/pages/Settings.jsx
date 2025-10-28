import React from "react";
import { useUserSettings } from "../hooks/useUserSettings";
import { UserCog } from "lucide-react";

export default function Settings() {

  const { loading, saving, user, form, setForm, handleUpdate } = useUserSettings();

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
        <div className="w-24 h-24 text-gray-700">
          <img
            src={user?.foto_profil_url || "/default-avatar.png"}
            alt="Foto Profil"
            className="w-24 h-24 rounded-full object-cover border shadow"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{form.nama}</h2>
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
