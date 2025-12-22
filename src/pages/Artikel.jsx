import React, { useState } from "react";
import { useArtikel } from "../hooks/useArtikel";
import { FileText, Edit3, Trash2, Calendar } from "lucide-react";
import Swal from "sweetalert2";
import TrixEditor from "../components/TrixEditor";

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

  const [openContentId, setOpenContentId] = useState(null);

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

  /* ======================
     PREVIEW TEXT (excerpt -> content)
  ====================== */
  const getPreviewText = (excerpt, content, limit = 140) => {
    if (excerpt && excerpt.trim()) return excerpt;
    if (!content) return "";

    const temp = document.createElement("div");
    temp.innerHTML = content;
    const text = temp.textContent || temp.innerText || "";

    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <span className="bg-[#FFBC41] text-white p-2 rounded-xl">
          <FileText className="w-8 h-8" />
        </span>
        Manajemen Artikel
      </h1>

      {/* ======================
         FORM CREATE
      ====================== */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-bold text-lg">Tambah Artikel</h2>

        <input
          className="input input-bordered w-full"
          placeholder="Judul Artikel"
          value={newArtikel.judul}
          onChange={(e) =>
            setNewArtikel({ ...newArtikel, judul: e.target.value })
          }
        />

        <textarea
          className="textarea textarea-bordered w-full"
          rows={2}
          placeholder="Excerpt / ringkasan artikel"
          value={newArtikel.excerpt}
          onChange={(e) =>
            setNewArtikel({ ...newArtikel, excerpt: e.target.value })
          }
        />

        {/* CONTENT (TRIX) */}
        <TrixEditor
          initialValue={newArtikel.content}
          onChange={(html) =>
            setNewArtikel((prev) => ({ ...prev, content: html }))
          }
        />

        <input
          type="date"
          className="input input-bordered w-full"
          value={newArtikel.tanggal_terbit}
          onChange={(e) =>
            setNewArtikel({ ...newArtikel, tanggal_terbit: e.target.value })
          }
        />

        <input
          className="input input-bordered w-full"
          placeholder="URL CTA (opsional)"
          value={newArtikel.url_cta}
          onChange={(e) =>
            setNewArtikel({ ...newArtikel, url_cta: e.target.value })
          }
        />

        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={(e) =>
            setNewArtikel({ ...newArtikel, gambar: e.target.files[0] })
          }
        />

        <button
          className="btn bg-[#FFBC41] w-full"
          onClick={handleAdd}
        >
          Tambah Artikel
        </button>
      </div>

      {/* ======================
         LIST ARTIKEL
      ====================== */}
      {loading ? (
        <p className="text-gray-400">Memuat...</p>
      ) : (
        <div className="space-y-4">
          {artikel.map((a) => (
            <article
              key={a.id}
              className="bg-white rounded-xl border shadow-sm flex overflow-hidden"
            >
              <img
                src={a.gambar_url}
                alt={a.judul}
                className="w-48 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">{a.judul}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(a)}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => confirmDelete(a.id, a.judul)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* PREVIEW */}
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {getPreviewText(a.excerpt, a.content)}
                </p>

                {/* TOGGLE CONTENT */}
                <button
                  onClick={() =>
                    setOpenContentId(openContentId === a.id ? null : a.id)
                  }
                  className="mt-2 text-xs font-semibold text-[#FFBC41] hover:underline w-fit"
                >
                  {openContentId === a.id ? "Tutup Konten" : "Lihat Konten"}
                </button>

                {/* FULL CONTENT */}
                {openContentId === a.id && (
                 <div
                  className="
                    prose prose-sm max-w-none
                    prose-ul:list-disc prose-ol:list-decimal
                    prose-p:my-2
                    whitespace-pre-wrap break-words
                    mt-3 border-t pt-3
                  "
                  dangerouslySetInnerHTML={{ __html: a.content }}
                />

                )}

                <div className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(a.tanggal_terbit).toLocaleDateString("id-ID")}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ======================
         MODAL EDIT
      ====================== */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
            <h2 className="font-bold text-lg">Edit Artikel</h2>

            <input
              className="input input-bordered w-full"
              value={editing.judul}
              onChange={(e) =>
                setEditing({ ...editing, judul: e.target.value })
              }
            />

            <textarea
              className="textarea textarea-bordered w-full"
              value={editing.excerpt}
              onChange={(e) =>
                setEditing({ ...editing, excerpt: e.target.value })
              }
            />

            {/* TRIX EDIT MODE (INITIAL VALUE!) */}
           <TrixEditor
  key={editing.id}   
  initialValue={editing.content}
  onChange={(html) =>
    setEditing({ ...editing, content: html })
  }
/>


            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(null)}>Batal</button>
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
