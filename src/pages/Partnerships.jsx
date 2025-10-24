import React from "react";
import { usePartnership } from "../hooks/usePartnership";
import { Handshake, Link2, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Toast } from "../components/Toast";

const Partnerships = () => {
  const {
    partnerships,
    loading,
    newPartnership,
    setNewPartnership,
    editing,
    setEditing,
    search,
    setSearch,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = usePartnership();

  const confirmDelete = (id, nama) => {
    Swal.fire({
      title: `Hapus paket "${nama}"?`,
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
        Toast.success(`Paket "${nama}" berhasil dihapus ✅`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Handshake className="w-8 h-8 text-primary" /> Manajemen Kemitraan
        </h1>
        {/* Search */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow bg-transparent focus:outline-none dark:text-gray-200"
            placeholder="Cari paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Form Tambah Paket */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Tambah Paket Kemitraan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            placeholder="Nama Paket"
            value={newPartnership.nama_paket}
            onChange={(e) =>
              setNewPartnership({ ...newPartnership, nama_paket: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full"
            placeholder="Gambar (URL)"
            value={newPartnership.gambar}
            onChange={(e) =>
              setNewPartnership({ ...newPartnership, gambar: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full"
            placeholder="Fitur Unggulan"
            value={newPartnership.fitur_unggulan}
            onChange={(e) =>
              setNewPartnership({
                ...newPartnership,
                fitur_unggulan: e.target.value,
              })
            }
          />
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Harga"
            value={newPartnership.harga}
            onChange={(e) =>
              setNewPartnership({ ...newPartnership, harga: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full md:col-span-2"
            placeholder="Link CTA"
            value={newPartnership.url_cta}
            onChange={(e) =>
              setNewPartnership({ ...newPartnership, url_cta: e.target.value })
            }
          />
          <textarea
            className="textarea textarea-bordered md:col-span-2"
            placeholder="Deskripsi"
            rows={3}
            value={newPartnership.deskripsi}
            onChange={(e) =>
              setNewPartnership({ ...newPartnership, deskripsi: e.target.value })
            }
          />
          <button className="btn btn-primary md:col-span-2" onClick={handleAdd}>
            + Tambah Paket
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">Memuat paket kemitraan...</div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Nama Paket</th>
                <th>Deskripsi</th>
                <th>Fitur</th>
                <th>Harga</th>
                <th>CTA</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {partnerships.length > 0 ? (
                partnerships.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama_paket}</td>
                    <td className="max-w-xs truncate">{item.deskripsi}</td>
                    <td className="max-w-xs truncate">{item.fitur_unggulan}</td>
                    <td>Rp {Number(item.harga).toLocaleString()}</td>
                    <td>
                      <a
                        href={item.url_cta}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-blue-600"
                      >
                        <Link2 size={14} /> Link
                      </a>
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-warning flex items-center gap-1"
                        onClick={() => setEditing(item)}
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error flex items-center gap-1"
                        onClick={() => confirmDelete(item.id, item.nama_paket)}
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Tidak ada paket kemitraan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Edit */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl space-y-4">
            <h2 className="text-xl font-semibold">Edit Paket</h2>
            <input
              className="input input-bordered w-full"
              placeholder="Nama Paket"
              value={editing.nama_paket}
              onChange={(e) =>
                setEditing({ ...editing, nama_paket: e.target.value })
              }
            />
            <input
              className="input input-bordered w-full"
              placeholder="Gambar"
              value={editing.gambar}
              onChange={(e) => setEditing({ ...editing, gambar: e.target.value })}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Fitur Unggulan"
              value={editing.fitur_unggulan}
              onChange={(e) =>
                setEditing({ ...editing, fitur_unggulan: e.target.value })
              }
            />
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Harga"
              value={editing.harga}
              onChange={(e) =>
                setEditing({ ...editing, harga: e.target.value })
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
              <button className="btn" onClick={() => setEditing(null)}>
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partnerships;
