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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2">
          <span className="bg-[#FFBC41] text-white p-2 rounded-xl shadow-lg shadow-orange-200">
          <Wrench className="w-8 h-8 text-gray-100" /> 
          </span>
          Manajemen Layanan Umum
        </h1>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow bg-transparent focus:outline-none dark:text-gray-200"
            placeholder="Cari layanan umum..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Form Tambah */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
         <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#FFBC41] rounded-full"></span>
            Tambah Layanan
        </h2>

        <div className="space-y-4">

          {/* Judul */}
          <div>
            <label className="font-medium text-sm">Judul Layanan</label>
            <input
              className="input input-bordered w-full mt-1"
              placeholder="Judul Layanan"
              value={newLayanan.judul_layanan}
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, judul_layanan: e.target.value })
              }
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="font-medium text-sm">Deskripsi</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Deskripsi"
              rows={3}
              value={newLayanan.deskripsi}
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, deskripsi: e.target.value })
              }
            />
          </div>

          {/* Highlight */}
          <div>
            <label className="font-medium text-sm">Highlight</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Highlight"
              rows={2}
              value={newLayanan.highlight}
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, highlight: e.target.value })
              }
            />
          </div>

          {/* Gambar */}
          <div>
            <label className="font-medium text-sm">Upload Gambar</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mt-1"
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, gambar: e.target.files[0] })
              }
            />
          </div>

          {/* CTA */}
          <div>
            <label className="font-medium text-sm">Link CTA</label>
            <input
              className="input input-bordered w-full mt-1"
              placeholder="https://..."
              value={newLayanan.url_cta}
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, url_cta: e.target.value })
              }
            />
          </div>

          <button
            className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] w-full"
            onClick={handleAdd}
          >
            + Tambah Layanan
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">Memuat data layanan...</div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Gambar</th>
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
                     <td>
                      {item.gambar_url ? (
                        <img src={item.gambar_url} className="w-16 h-16 object-cover rounded" />
                      ) : "-"}
                    </td>
                    <td className="max-w-xs truncate">{item.deskripsi}</td>
                    <td className="max-w-xs truncate">
                      {item.highlight || "-"}
                    </td>
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
                  <td colSpan="6" className="text-center p-6">
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

            {/* Judul */}
            <div>
              <label className="font-medium text-sm">Judul Layanan</label>
              <input
                className="input input-bordered w-full mt-1"
                value={editing.judul_layanan}
                onChange={(e) =>
                  setEditing({ ...editing, judul_layanan: e.target.value })
                }
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="font-medium text-sm">Deskripsi</label>
              <textarea
                className="textarea textarea-bordered w-full mt-1"
                rows={3}
                value={editing.deskripsi}
                onChange={(e) =>
                  setEditing({ ...editing, deskripsi: e.target.value })
                }
              />
            </div>

            {/* Highlight */}
            <div>
              <label className="font-medium text-sm">Highlight</label>
              <textarea
                className="textarea textarea-bordered w-full mt-1"
                rows={2}
                value={editing.highlight}
                onChange={(e) =>
                  setEditing({ ...editing, highlight: e.target.value })
                }
              />
            </div>

            {/* Gambar */}
            <div>
              <label className="font-medium text-sm">Upload Gambar Baru</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full mt-1"
                onChange={(e) =>
                  setEditing({ ...editing, gambar: e.target.files[0] })
                }
              />
            </div>

            {/* CTA */}
            <div>
              <label className="font-medium text-sm">Link CTA</label>
              <input
                className="input input-bordered w-full mt-1"
                value={editing.url_cta}
                onChange={(e) =>
                  setEditing({ ...editing, url_cta: e.target.value })
                }
              />
            </div>

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
