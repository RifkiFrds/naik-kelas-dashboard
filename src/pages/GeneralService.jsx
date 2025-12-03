import React from "react";
import { useLayananUmum } from "../hooks/useLayananUmum";
import { Wrench, Link2, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Toast } from "../components/Toast";

const GeneralService = () => {
  const {
    layanan,
    loading,
    newLayanan,
    setNewLayanan,
    search,
    setSearch,
    editing,
    setEditing,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useLayananUmum();

  // 🔹 Konfirmasi hapus pakai SweetAlert
  const confirmDelete = (id, judul) => {
    Swal.fire({
      title: `Hapus layanan "${judul}"?`,
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
        await handleDelete(id);
        Toast.success(`Layanan "${judul}" berhasil dihapus`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="w-8 h-8 text-[#FFBC41]" /> Manajemen Layanan Umum
        </h1>
        <div className="flex gap-2">
          {/* Search Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-transparent focus:outline-none dark:text-gray-200"
              placeholder="Cari layanan umum..."
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

      {/* Form Tambah Layanan */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Tambah Layanan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            placeholder="Judul Layanan"
            value={newLayanan.judul_layanan}
            onChange={(e) =>
              setNewLayanan({ ...newLayanan, judul_layanan: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full"
            placeholder="Highlight"
            value={newLayanan.highlight}
            onChange={(e) =>
              setNewLayanan({ ...newLayanan, highlight: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full md:col-span-2"
            placeholder="Link CTA"
            value={newLayanan.url_cta}
            onChange={(e) =>
              setNewLayanan({ ...newLayanan, url_cta: e.target.value })
            }
          />
          <textarea
            className="textarea textarea-bordered md:col-span-2"
            placeholder="Deskripsi"
            rows={3}
            value={newLayanan.deskripsi}
            onChange={(e) =>
              setNewLayanan({ ...newLayanan, deskripsi: e.target.value })
            }
          />
          <button className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] md:col-span-2" onClick={handleAdd}>
            + Tambah Layanan
          </button>
        </div>
      </div>

      {/* Tabel Layanan */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">Memuat data layanan...</div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th>Highlight</th>
                <th>Link</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {layanan.length > 0 ? (
                layanan.map((item) => (
                  <tr key={item.id}>
                    <td className="font-semibold">{item.judul_layanan}</td>
                    <td className="max-w-xs truncate">{item.deskripsi}</td>
                    <td className="truncate max-w-xs">{item.highlight || "-"}</td>
                    <td>
                      {item.url_cta ? (
                        <a
                          href={item.url_cta}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary flex items-center gap-1"
                        >
                          <Link2 size={16} /> Link
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-warning flex items-center gap-1"
                        onClick={() => setEditing(item)}
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error flex items-center gap-1"
                        onClick={() =>
                          confirmDelete(item.id, item.judul_layanan)
                        }
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6">
                    Tidak ada layanan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Edit */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">Edit Layanan</h2>
            <input
              className="input input-bordered w-full"
              placeholder="Judul Layanan"
              value={editing.judul_layanan}
              onChange={(e) =>
                setEditing({ ...editing, judul_layanan: e.target.value })
              }
            />
            <input
              className="input input-bordered w-full"
              placeholder="Highlight"
              value={editing.highlight}
              onChange={(e) =>
                setEditing({ ...editing, highlight: e.target.value })
              }
            />
            <input
              className="input input-bordered w-full"
              placeholder="Link CTA"
              value={editing.url_cta}
              onChange={(e) =>
                setEditing({ ...editing, url_cta: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Deskripsi"
              value={editing.deskripsi}
              onChange={(e) =>
                setEditing({ ...editing, deskripsi: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralService;
