import React from "react";
import { useArtikel } from "../hooks/useArtikel";
import { FileText, Edit3, Trash2, Calendar } from "lucide-react";
import Swal from "sweetalert2";

const ArtikelPage = () => {
  const {
    artikel,
    loading,
    newArtikel,
    setNewArtikel,
    editing,
    setEditing,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useArtikel();

  const confirmDelete = (id, judul) => {
    Swal.fire({
      title: `Hapus artikel "${judul}"?`,
      text: "Aksi ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      background: "#1f2937",
      color: "#f9fafb",
    }).then((res) => {
      if (res.isConfirmed) handleDelete(id);
    });
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span className="bg-[#FFBC41] text-white p-2 rounded-xl shadow-lg shadow-orange-200">
            <FileText className="w-8 h-8 text-gray-100" />
          </span>
          Manajemen Artikel
        </h1>
      </div>

      {/* ===== FORM TAMBAH (STYLE SAMA EVENT) ===== */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#FFBC41] rounded-full"></span>
          Tambah Artikel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input
            className="input input-bordered w-full"
            placeholder="Judul Artikel"
            value={newArtikel.judul}
            onChange={(e) =>
              setNewArtikel({ ...newArtikel, judul: e.target.value })
            }
          />

          <input
            type="date"
            className="input input-bordered w-full"
            value={newArtikel.tanggal_terbit}
            onChange={(e) =>
              setNewArtikel({
                ...newArtikel,
                tanggal_terbit: e.target.value,
              })
            }
          />

          <input
            className="input input-bordered w-full sm:col-span-2"
            placeholder="URL CTA (https://...)"
            value={newArtikel.url_cta}
            onChange={(e) =>
              setNewArtikel({ ...newArtikel, url_cta: e.target.value })
            }
          />

          <textarea
            className="textarea textarea-bordered w-full sm:col-span-2"
            rows={3}
            placeholder="Deskripsi artikel..."
            value={newArtikel.deskripsi}
            onChange={(e) =>
              setNewArtikel({ ...newArtikel, deskripsi: e.target.value })
            }
          />

          <input
            type="file"
            className="file-input file-input-bordered w-full sm:col-span-2"
            onChange={(e) =>
              setNewArtikel({ ...newArtikel, gambar: e.target.files[0] })
            }
          />
        </div>

        <button
          className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] w-full"
          onClick={handleAdd}
        >
          + Tambah Artikel
        </button>
      </div>

      {/* ===== LIST ARTIKEL (BLOG STYLE, TETAP) ===== */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <span className="loading loading-dots loading-lg text-[#FFBC41]"></span>
            <p className="text-sm mt-2 font-medium text-gray-400">
              Memuat data artikel...
            </p>
          </div>
        ) : artikel.length > 0 ? (
          <div className="space-y-6">
            {artikel.map((a) => (
              <article
                key={a.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-72 h-48 overflow-hidden">
                  <img
                    src={a.gambar_url}
                    alt={a.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-xl leading-snug line-clamp-2">
                      {a.judul}
                    </h3>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditing(a)}
                        className="bg-white/90 text-gray-700 p-2 rounded-full shadow hover:bg-[#FFBC41] hover:text-white transition"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(a.id, a.judul)}
                        className="bg-white/90 text-gray-700 p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mt-2">
                    {a.deskripsi}
                  </p>

                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={14} />
                    {new Date(a.tanggal_terbit).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              Belum ada artikel yang dibuat.
            </p>
          </div>
        )}
      </div>

      {/* ===== MODAL EDIT (TETAP) ===== */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">Edit Artikel</h2>

            <input
              className="input input-bordered w-full"
              value={editing.judul}
              onChange={(e) =>
                setEditing({ ...editing, judul: e.target.value })
              }
            />

            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              value={editing.deskripsi}
              onChange={(e) =>
                setEditing({ ...editing, deskripsi: e.target.value })
              }
            />

            <input
              type="date"
              className="input input-bordered w-full"
              value={editing.tanggal_terbit?.split("T")[0]}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  tanggal_terbit: e.target.value,
                })
              }
            />

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) =>
                setEditing({ ...editing, gambar: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>
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

export default ArtikelPage;
