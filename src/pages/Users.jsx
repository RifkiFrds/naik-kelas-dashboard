import React from "react";
import { useUsers } from "../hooks/useUsers";
import Swal from "sweetalert2";
import { Plus, UserCog } from "lucide-react";
import { Toast } from "../components/Toast";

const DEFAULT_AVATAR = "https://thumbs.dreamstime.com/b/print-302238697.jpg";

const Users = () => {
  const {
    users,
    loading,
    newUser,
    setNewUser,
    search,
    setSearch,
    currentUserRole, 
    handleAddUser,
    handleDelete,
    handleUpdateRole, 
  } = useUsers();

  const submitAddUser = async () => {
    if (!newUser.nama || !newUser.email || !newUser.password) {
      Toast.error("Nama, Email, dan Password wajib diisi!");
      return;
    }
    const success = await handleAddUser();
    success
      ? Toast.success("Admin berhasil ditambahkan 🎉")
      : Toast.error("Gagal menambahkan admin ❌");
  };

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
      background: "#1f2937",
      color: "#f9fafb",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await handleDelete(id);
        success
          ? Toast.success(`Pengguna ${nama} berhasil dihapus`)
          : Toast.error("Gagal menghapus pengguna ❌");
      }
    });
  };

  // ✅ Konfirmasi naikkan role
  const confirmMakeSuperAdmin = (id, nama) => {
    Swal.fire({
      title: `Jadikan ${nama} sebagai Super Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, jadikan Super Admin",
      cancelButtonText: "Batal",
      background: "#1f2937",
      color: "#f9fafb",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await handleUpdateRole(id, "super_admin");
        success
          ? Toast.success(`${nama} sekarang menjadi Super Admin 🎉`)
          : Toast.error("Gagal menjadikan Super Admin ❌");
      }
    });
  };

  // ✅ Konfirmasi turunkan role
  const confirmDemoteToAdmin = (id, nama) => {
    Swal.fire({
      title: `Turunkan ${nama} menjadi Admin biasa?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b7280",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Ya, turunkan jadi Admin",
      cancelButtonText: "Batal",
      background: "#1f2937",
      color: "#f9fafb",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await handleUpdateRole(id, "admin");
        success
          ? Toast.success(`${nama} diturunkan jadi Admin `)
          : Toast.error("Gagal menurunkan ke Admin ❌");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCog className="w-8 h-8 text-[#FFBC41]" />
          Manajemen Pengguna
        </h1>
        <div className="flex gap-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-transparent focus:outline-none dark:text-gray-200"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) =>
              setNewUser({ ...newUser, foto_profil: e.target.files[0] })
            }
          />
          {newUser.foto_profil && newUser.foto_profil instanceof File && (
            <div className="col-span-2 flex items-center gap-3">
              <img
                src={URL.createObjectURL(newUser.foto_profil)}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <span className="text-sm text-gray-500">Preview Foto Profil</span>
            </div>
          )}
          <button
            className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] w-full flex items-center justify-center gap-2 md:col-span-2"
            onClick={submitAddUser}
          >
            <Plus size={18} /> Tambah Admin
          </button>
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
                <th>Peran</th>
                <th className="text-center">Aksi</th>
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
                              src={user.foto_profil_url || DEFAULT_AVATAR}
                              alt={user.nama}
                              className="object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = DEFAULT_AVATAR;
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.nama}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="capitalize font-medium">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          user.role === "super_admin"
                            ? "bg-red-200 text-red-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {user.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center gap-2">
                        {currentUserRole === "super_admin" && (
                          <>
                            {user.role === "admin" && (
                              <button
                                className="btn btn-sm btn-active btn-info"
                                onClick={() =>
                                  confirmMakeSuperAdmin(user.id, user.nama)
                                }
                              >
                                Jadikan Super Admin
                              </button>
                            )}
                            {user.role === "super_admin" && user.id !== users.id && (
                              <button
                                className="btn btn-sm btn-active btn-error"
                                onClick={() =>
                                  confirmDemoteToAdmin(user.id, user.nama)
                                }
                              >
                                Turunkan jadi Admin
                              </button>
                            )}
                          </>
                        )}
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => confirmDelete(user.id, user.nama)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-700 dark:text-gray-300"
                  >
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
