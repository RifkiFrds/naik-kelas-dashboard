import React from "react";
import { useUsers } from "../hooks/useUsers";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://thumbs.dreamstime.com/b/print-302238697.jpg";

const Users = () => {
  const {
    users,
    loading,
    newUser,
    setNewUser,
    search,
    setSearch,
    handleAddUser,
    handleDelete,
    handleUpdate,
  } = useUsers();

  // konfirmasi hapus
  const confirmDelete = (id, nama) => {
    Swal.fire({
      title: `Hapus ${nama}?`,
      text: "Aksi ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      background: "#1f2937", // dark gray
      color: "#f9fafb", // text-white
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(id);
        toast.success(`Pengguna ${nama} berhasil dihapus ✅`);
      }
    });
  };

  // konfirmasi jadikan admin
  const confirmMakeAdmin = (id, nama) => {
    Swal.fire({
      title: `Jadikan ${nama} sebagai Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, jadikan Admin",
      cancelButtonText: "Batal",
      background: "#1f2937",
      color: "#f9fafb",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleUpdate(id, "admin");
        toast.success(`${nama} sekarang menjadi Admin 🎉`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold">
          Manajemen Pengguna
        </h1>
        <div className="flex gap-2">
          {/* Search Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-transparent focus:outline-none dark:text-gray-200"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 dark:text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      {/* Form Tambah Admin */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Tambah Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            placeholder="Nama"
            value={newUser.nama}
            onChange={(e) => setNewUser({ ...newUser, nama: e.target.value })}
          />
          <input
            className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <button className="btn btn-primary w-full">+ Tambah Admin</button>
        </div>
      </div>

      {/* Tabel Pengguna */}
      <div className="overflow-x-auto dark:bg-gray-900 rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center text-gray-700 dark:text-gray-300">
            Memuat pengguna...
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th>Nama Pengguna</th>
                <th>Email</th>
                <th>Peran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="dark:text-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user.foto_profil || DEFAULT_AVATAR}
                              alt={user.nama}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.nama}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="capitalize">{user.role}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => confirmMakeAdmin(user.id, user.nama)}
                      >
                        Jadikan Admin
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => confirmDelete(user.id, user.nama)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-700 dark:text-gray-300">
                    Tidak ada pengguna ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
