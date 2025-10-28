import React from 'react';
import { useLayananBisnis } from '../hooks/useLayananBisnis';
import { Wrench, Link2, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Toast } from "../components/Toast";

const BusinessService = () => {
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
  } = useLayananBisnis();

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

  // render field dinamis selain gambar
  const renderFields = (state, setState) => {
    switch (state.type) {
      case "trading":
        return (
          <input
            className="input input-bordered w-full"
            placeholder="Tipe Broker"
            value={state.tipe_broker || ""}
            onChange={(e) => setState({ ...state, tipe_broker: e.target.value })}
          />
        );
      case "webinar":
        return (
          <>
            <input
              type="date"
              className="input input-bordered w-full"
              value={state.tanggal_acara || ""}
              onChange={(e) => setState({ ...state, tanggal_acara: e.target.value })}
            />
            <input
              type="time"
              className="input input-bordered w-full"
              value={state.waktu_mulai || ""}
              onChange={(e) => setState({ ...state, waktu_mulai: e.target.value })}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Nama Mentor"
              value={state.nama_mentor || ""}
              onChange={(e) => setState({ ...state, nama_mentor: e.target.value })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="w-8 h-8 text-primary" /> Manajemen Layanan Bisnis
        </h1>
         <div className="flex gap-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-transparent focus:outline-none dark:text-gray-200"
              placeholder="Cari layanan bisnis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Form tambah layanan bisnis */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tambah Layanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="select select-bordered w-full"
            value={newLayanan.type}
            onChange={(e) => setNewLayanan({ ...newLayanan, type: e.target.value })}
          >
            <option value="">-- Pilih Type --</option>
            <option value="trading">Trading</option>
            <option value="reseller">Reseller</option>
            <option value="modal bisnis">Modal Bisnis</option>
            <option value="webinar">Webinar</option>
          </select>

          {renderFields(newLayanan, setNewLayanan)}

          <input
            className="input input-bordered w-full"
            placeholder="Judul Bisnis"
            value={newLayanan.judul_bisnis}
            onChange={(e) => setNewLayanan({ ...newLayanan, judul_bisnis: e.target.value })}
          />

          {/* 🔹 Upload Gambar (universal) */}
          <input 
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setNewLayanan({ ...newLayanan, gambar: e.target.files[0] })}
          />

          {/* 🔹 Preview Gambar */}
          {newLayanan.gambar && (
            <div className="col-span-2 flex items-center gap-3">
              <img
                src={URL.createObjectURL(newLayanan.gambar)}
                alt="Preview"
                className="w-20 h-20 rounded object-cover border"
              />
              <span className="text-sm text-gray-500">Preview Gambar</span>
            </div>
          )}

          <input
            className="input input-bordered w-full"
            placeholder="Fitur Unggulan"
            value={newLayanan.fitur_unggulan}
            onChange={(e) => setNewLayanan({ ...newLayanan, fitur_unggulan: e.target.value })}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Link CTA"
            value={newLayanan.url_cta}
            onChange={(e) => setNewLayanan({ ...newLayanan, url_cta: e.target.value })}
          />
          <textarea
            className="textarea textarea-bordered md:col-span-2"
            placeholder="Deskripsi"
            rows={3}
            value={newLayanan.deskripsi}
            onChange={(e) => setNewLayanan({ ...newLayanan, deskripsi: e.target.value })}
          />
          <button className="btn btn-primary md:col-span-2" onClick={handleAdd}>
            + Tambah Layanan
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">Memuat data layanan bisnis...</div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
                <tr>
                  <th>Type</th>
                  <th>Judul Bisnis</th>
                  <th>Gambar</th>
                  <th>Deskripsi</th>
                  <th>Fitur</th>
                  <th>CTA</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {layanan.length > 0 ? (
                  layanan.map((item) => (
                    <tr key={item.id}>
                      <td>{item.type}</td>
                      <td>{item.judul_bisnis}</td>
                      <td>
                        {item.gambar_url ? (
                          <img
                            src={item.gambar_url}
                            alt={item.judul_bisnis}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="truncate max-w-xs">{item.deskripsi}</td>
                      <td className="truncate max-w-xs">{item.fitur_unggulan}</td>
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
                          onClick={() => confirmDelete(item.id, item.judul_bisnis)}
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Tidak ada data layanan bisnis.
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
            <h2 className="text-xl font-semibold">Edit Layanan</h2>

            <select
              className="select select-bordered w-full"
              value={editing.type}
              onChange={(e) => setEditing({ ...editing, type: e.target.value })}
            >
              <option value="trading">Trading</option>
              <option value="reseller">Reseller</option>
              <option value="modal bisnis">Modal Bisnis</option>
              <option value="webinar">Webinar</option>
            </select>

            {renderFields(editing, setEditing)}

            <input
              className="input input-bordered w-full"
              placeholder="Judul Bisnis"
              value={editing.judul_bisnis}
              onChange={(e) => setEditing({ ...editing, judul_bisnis: e.target.value })}
            />

            {/* 🔹 Upload Gambar Baru */}
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setEditing({ ...editing, gambar: e.target.files[0] })}
            />

            {/* 🔹 Preview Gambar */}
            <div className="flex items-center gap-3">
              <img
                src={
                  editing.gambar instanceof File
                    ? URL.createObjectURL(editing.gambar)
                    : editing.gambar || "/default.jpg"
                }
                alt="Preview"
                className="w-20 h-20 rounded object-cover border"
              />
              <span className="text-sm text-gray-500">Preview Gambar</span>
            </div>

            <input
              className="input input-bordered w-full"
              placeholder="Fitur Unggulan"
              value={editing.fitur_unggulan}
              onChange={(e) => setEditing({ ...editing, fitur_unggulan: e.target.value })}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Link CTA"
              value={editing.url_cta}
              onChange={(e) => setEditing({ ...editing, url_cta: e.target.value })}
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Deskripsi"
              value={editing.deskripsi}
              onChange={(e) => setEditing({ ...editing, deskripsi: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setEditing(null)}>Batal</button>
              <button className="btn btn-primary" onClick={handleUpdate}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessService;
