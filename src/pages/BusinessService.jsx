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

  /** 🔧 Dynamic Input Berdasarkan Type */
  const renderFields = (state, setState) => {
    switch (state.type) {
      case "trading":
        return (
          <div className="col-span-2">
            <label className="text-sm font-medium">Tipe Broker</label>
            <select
              className="select select-bordered w-full mt-1"
              value={state.tipe_broker || ""}
              onChange={(e) => setState({ ...state, tipe_broker: e.target.value })}
            >
              <option value="">-- Pilih --</option>
              <option value="Internasional">Internasional</option>
              <option value="Nasional">Nasional</option>
            </select>
          </div>
        );

      case "webinar":
        return (
          <>
            <div>
              <label className="text-sm font-medium">Tanggal Event</label>
              <input
                type="date"
                className="input input-bordered w-full mt-1"
                value={state.tanggal_acara || ""}
                onChange={(e) => setState({ ...state, tanggal_acara: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Waktu</label>
              <input
                type="time"
                className="input input-bordered w-full mt-1"
                value={state.waktu_mulai || ""}
                onChange={(e) => setState({ ...state, waktu_mulai: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Harga</label>
              <input
                type="number"
                className="input input-bordered w-full mt-1"
                placeholder="Contoh: 100000"
                value={state.harga || ""}
                onChange={(e) => setState({ ...state, harga: e.target.value })}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
  switch (type) {
    case "trading":
      return "Broker Trading";
    case "jasa_recruitment":
      return "Jasa Recruitment";
    case "modul_bisnis":
      return "Modul Bisnis";
    case "webinar":
      return "Webinar / Workshop";
    default:
      return type;
  }
};


  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2">
          <Wrench className="w-8 h-8 text-[#FFBC41]" /> Manajemen Layanan Bisnis
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

      {/* Form Tambah */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Tambah Layanan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Tipe */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Pilih Tipe Layanan</label>
            <select
              className="select select-bordered w-full mt-1"
              value={newLayanan.type}
              onChange={(e) => setNewLayanan({ ...newLayanan, type: e.target.value })}
            >
              <option value="">-- Pilih --</option>
              <option value="trading">Broker Trading</option>
              <option value="jasa_recruitment">Jasa Recruitment</option>
              <option value="modal_bisnis">Modul Bisnis</option>
              <option value="webinar">Webinar / Workshop</option>
            </select>
          </div>

          {renderFields(newLayanan, setNewLayanan)}

          {/* Judul */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Judul</label>
            <input
              className="input input-bordered w-full mt-1"
              value={newLayanan.judul_bisnis || ""}
              placeholder="Masukkan Judul"
              onChange={(e) => setNewLayanan({ ...newLayanan, judul_bisnis: e.target.value })}
            />
          </div>

          {/* Deskripsi */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Deskripsi</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              rows={3}
              placeholder="Deskripsi singkat..."
              value={newLayanan.deskripsi || ""}
              onChange={(e) => setNewLayanan({ ...newLayanan, deskripsi: e.target.value })}
            />
          </div>

          {/* Fitur */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Fitur Unggulan (Pisahkan Enter)</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              rows={3}
              placeholder={`Contoh:\n✔ Bonus $50\n✔ Legal Resmi\n✔ Platform MT4`}
              value={newLayanan.fitur_unggulan || ""}
              onChange={(e) => setNewLayanan({ ...newLayanan, fitur_unggulan: e.target.value })}
            />
          </div>

          {/* Upload */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Upload Gambar</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mt-1"
              onChange={(e) => setNewLayanan({ ...newLayanan, gambar: e.target.files[0] })}
            />
          </div>

          {/* CTA Link */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Link CTA</label>
            <input
              className="input input-bordered w-full mt-1"
              placeholder="https://..."
              value={newLayanan.url_cta || ""}
              onChange={(e) => setNewLayanan({ ...newLayanan, url_cta: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] col-span-2" onClick={handleAdd}>
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
                <th>Judul</th>
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
                    <td>{item.judul_bisnis}</td>
                    <td>
                      {item.gambar_url ? (
                        <img src={item.gambar_url} className="w-16 h-16 object-cover rounded" />
                      ) : "-"}
                    </td>
                    <td className="truncate max-w-xs">{item.deskripsi}</td>
                    <td className="truncate max-w-xs">{item.fitur_unggulan}</td>
                    <td>
                      <a href={item.url_cta} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600">
                        <Link2 size={14} /> Link
                      </a>
                    </td>
                    <td className="flex gap-2">
                      <button className="btn btn-sm btn-warning flex items-center gap-1" onClick={() => setEditing(item)}>
                        <Edit2 size={14} /> Edit
                      </button>
                      <button className="btn btn-sm btn-error flex items-center gap-1" onClick={() => confirmDelete(item.id, item.judul_bisnis)}>
                        <Trash2 size={14} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">Tidak ada data layanan bisnis.</td>
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

            {/* Tipe */}
            <label className="text-sm font-medium">Pilih Tipe</label>
            <select
              className="select select-bordered w-full"
              value={editing.type}
              onChange={(e) => setEditing({ ...editing, type: e.target.value })}
            >
              <option value="trading">Trading</option>
              <option value="jasa_recruitment">Jasa Recruitment</option>
              <option value="modal_bisnis">Modul Bisnis</option>
              <option value="webinar">Webinar</option>
            </select>

            {renderFields(editing, setEditing)}

            <input
              className="input input-bordered w-full"
              placeholder="Judul Bisnis"
              value={editing.judul_bisnis}
              onChange={(e) => setEditing({ ...editing, judul_bisnis: e.target.value })}
            />

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Deskripsi"
              rows={3}
              value={editing.deskripsi}
              onChange={(e) => setEditing({ ...editing, deskripsi: e.target.value })}
            />

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Fitur Unggulan"
              rows={3}
              value={editing.fitur_unggulan}
              onChange={(e) => setEditing({ ...editing, fitur_unggulan: e.target.value })}
            />

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setEditing({ ...editing, gambar: e.target.files[0] })}
            />

            <div className="flex items-center gap-3">
              <img
                src={
                  editing.gambar instanceof File
                    ? URL.createObjectURL(editing.gambar)
                    : editing.gambar_url || "/default.jpg"
                }
                className="w-20 h-20 rounded object-cover border"
              />
              <span className="text-sm text-gray-500">Preview Gambar</span>
            </div>

            <input
              className="input input-bordered w-full"
              placeholder="CTA Link"
              value={editing.url_cta}
              onChange={(e) => setEditing({ ...editing, url_cta: e.target.value })}
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
