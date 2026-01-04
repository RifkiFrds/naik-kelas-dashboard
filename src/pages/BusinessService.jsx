import React from "react";
import { useLayananBisnis } from "../hooks/useLayananBisnis";
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

  /* ================= DELETE CONFIRM ================= */
  const confirmDelete = (item) => {
    const label =
      item.type === "trading"
        ? `Broker ${item.tipe_broker}`
        : item.judul_bisnis;

    Swal.fire({
      title: `Hapus layanan "${label}"?`,
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
        await handleDelete(item.id);
        Toast.success(`Layanan "${label}" berhasil dihapus`);
      }
    });
  };

  /* ================= DYNAMIC FORM FIELD ================= */
  const renderFields = (state, setState) => {
    if (state.type === "trading") {
      return (
        <div className="col-span-2">
          <label className="text-sm font-medium">Tipe Broker</label>
          <select
            className="select select-bordered w-full mt-1"
            value={state.tipe_broker || ""}
            onChange={(e) =>
              setState({ ...state, tipe_broker: e.target.value })
            }
          >
            <option value="">-- Pilih --</option>
            <option value="internasional">Internasional</option>
            <option value="lokal">Lokal</option>
          </select>
        </div>
      );
    }
    return null;
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "trading":
        return "Broker Trading";
      case "jasa_recruitment":
        return "Jasa Recruitment";
      case "modal_bisnis":
        return "Modul Bisnis";
      case "webinar":
        return "Webinar";
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2">
          <span className="bg-[#FFBC41] text-white p-2 rounded-xl shadow-lg">
            <Wrench className="w-8 h-8" />
          </span>
          Manajemen Layanan Bisnis
        </h1>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow bg-transparent"
            placeholder="Cari layanan bisnis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* ================= FORM CREATE ================= */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-1 h-6 bg-[#FFBC41] rounded-full"></span>
          Tambah Layanan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* TYPE */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Pilih Tipe Layanan</label>
            <select
              className="select select-bordered w-full mt-1"
              value={newLayanan.type}
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, type: e.target.value })
              }
            >
              <option value="">-- Pilih --</option>
              <option value="trading">Broker Trading</option>
              <option value="jasa_recruitment">Jasa Recruitment</option>
              <option value="modal_bisnis">Modul Bisnis</option>
              <option value="webinar">Webinar</option>
            </select>
          </div>

          {/* DYNAMIC FIELD */}
          {renderFields(newLayanan, setNewLayanan)}

          {/* JUDUL (NON-TRADING ONLY) */}
          {newLayanan.type && newLayanan.type !== "trading" && (
            <div className="col-span-2">
              <label className="text-sm font-medium">Judul</label>
              <input
                className="input input-bordered w-full mt-1"
                value={newLayanan.judul_bisnis || ""}
                onChange={(e) =>
                  setNewLayanan({
                    ...newLayanan,
                    judul_bisnis: e.target.value,
                  })
                }
              />
            </div>
          )}

          {/* DESKRIPSI */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Deskripsi</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              rows={3}
              value={newLayanan.deskripsi || ""}
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, deskripsi: e.target.value })
              }
            />
          </div>

          {/* FITUR */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Fitur Unggulan</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              rows={3}
              value={newLayanan.fitur_unggulan || ""}
              onChange={(e) =>
                setNewLayanan({
                  ...newLayanan,
                  fitur_unggulan: e.target.value,
                })
              }
            />
          </div>

          {/* GAMBAR */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Upload Gambar</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mt-1"
              onChange={(e) =>
                setNewLayanan({
                  ...newLayanan,
                  gambar: e.target.files[0],
                })
              }
            />
          </div>

          {/* CTA */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Link CTA</label>
            <input
              className="input input-bordered w-full mt-1"
              value={newLayanan.url_cta || ""}
              onChange={(e) =>
                setNewLayanan({ ...newLayanan, url_cta: e.target.value })
              }
            />
          </div>

          <button
            className="btn bg-[#FFBC41] text-black col-span-2"
            onClick={handleAdd}
          >
            + Tambah Layanan
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">Memuat data...</div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Type</th>
                <th>Nama / Tipe</th>
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
                    <td>{getTypeLabel(item.type)}</td>
                    <td>
                      {item.type === "trading"
                        ? item.tipe_broker
                        : item.judul_bisnis}
                    </td>
                    <td>
                      {item.gambar_url ? (
                        <img
                          src={item.gambar_url}
                          className="w-14 h-14 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="truncate max-w-xs">{item.deskripsi}</td>
                    <td className="truncate max-w-xs">
                      {item.fitur_unggulan}
                    </td>
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
                        className="btn btn-sm btn-warning"
                        onClick={() => setEditing(item)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => confirmDelete(item)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL EDIT ================= */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl space-y-4">
            <h2 className="text-xl font-bold">Edit Layanan</h2>

            <input
              className="input input-bordered w-full bg-gray-100"
              value={getTypeLabel(editing.type)}
              disabled
            />

            {editing.type === "trading" ? (
              <select
                className="select select-bordered w-full"
                value={editing.tipe_broker}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    tipe_broker: e.target.value,
                  })
                }
              >
                <option value="internasional">Internasional</option>
                <option value="lokal">Lokal</option>
              </select>
            ) : (
              <input
                className="input input-bordered w-full"
                value={editing.judul_bisnis || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    judul_bisnis: e.target.value,
                  })
                }
              />
            )}

            <textarea
              className="textarea textarea-bordered w-full"
              value={editing.deskripsi || ""}
              onChange={(e) =>
                setEditing({ ...editing, deskripsi: e.target.value })
              }
            />

            <textarea
              className="textarea textarea-bordered w-full"
              value={editing.fitur_unggulan || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  fitur_unggulan: e.target.value,
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

            <input
              className="input input-bordered w-full"
              value={editing.url_cta || ""}
              onChange={(e) =>
                setEditing({ ...editing, url_cta: e.target.value })
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

export default BusinessService;
