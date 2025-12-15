import React from "react";
import { useEvent } from "../hooks/useEvent";
import { Calendar, Edit3, Clock, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Toast } from "../components/Toast";

const EventPage = () => {
  const {
    events,
    loading,
    search,
    setSearch,
    newEvent,
    setNewEvent,
    editing,
    setEditing,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useEvent();

  const confirmDelete = (id, judul) => {
    Swal.fire({
      title: `Hapus event "${judul}"?`,
      text: "Aksi ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      background: "#1f2937",
      color: "#f9fafb",
    }).then(async (res) => {
      if (res.isConfirmed) handleDelete(id);
    });
  };

  const formatDateBadge = (dateString) => {
    if (!dateString) return "-";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
      return `${parts[2]} ${months[parseInt(parts[1]) - 1]}`;
    }
    return "-";
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span className="bg-[#FFBC41] text-white p-2 rounded-xl shadow-lg shadow-orange-200">
          <Calendar className="w-8 h-8 text-gray-100" /></span>
          Manajemen Event
        </h1>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow bg-transparent focus:outline-none dark:text-gray-200"
            placeholder="Cari event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Form Tambah */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#FFBC41] rounded-full"></span>
            Tambah Event
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input input-bordered w-full" placeholder="Judul Event" value={newEvent.judul} onChange={(e) => setNewEvent({ ...newEvent, judul: e.target.value })} />
          <input type="date" className="input input-bordered w-full" value={newEvent.tanggal_mulai} onChange={(e) => setNewEvent({ ...newEvent, tanggal_mulai: e.target.value })} />
          <input type="time" className="input input-bordered w-full" value={newEvent.waktu_mulai} onChange={(e) => setNewEvent({ ...newEvent, waktu_mulai: e.target.value })} />

          <select className="select select-bordered w-full" value={newEvent.status} onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}>
            <option value="buka">Buka</option>
            <option value="tutup">Tutup</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            <option value="umum">Umum</option>
            <option value="acara">Acara</option>
          </select>

          <input
            className="input input-bordered w-full"
            placeholder="URL CTA (opsional)"
            value={newEvent.url_cta}
            onChange={(e) => setNewEvent({ ...newEvent, url_cta: e.target.value })}
          />

          <textarea className="textarea textarea-bordered w-full sm:col-span-2" rows={3} placeholder="Deskripsi Event..." value={newEvent.deskripsi} onChange={(e) => setNewEvent({ ...newEvent, deskripsi: e.target.value })} />
          <input type="file" className="file-input file-input-bordered w-full sm:col-span-2" onChange={(e) => setNewEvent({ ...newEvent, gambar_poster: e.target.files[0] })} />
        </div>

        <button className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] w-full" onClick={handleAdd}>+ Tambah Event</button>
      </div>

      {/* Card Grid */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <span className="loading loading-dots loading-lg text-[#FFBC41]"></span>
            <p className="text-sm mt-2 font-medium text-gray-400">Memuat data event...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
            {events.map((item) => {
              return (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10 opacity-70 group-hover:opacity-50 transition-opacity"></div>

                    {item.gambar_url ? (
                      <img src={item.gambar_url} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={item.judul} loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-medium">No Image</div>
                    )}

                    {/* Floating Glass Info Bar */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] py-2 px-3 rounded-xl flex justify-between items-center backdrop-blur-md bg-white/20 border border-white/60 shadow-sm text-white text-xs font-semibold">
                      <span>{formatDateBadge(item.tanggal_mulai)}</span>
                      <span className={`${item.status === "buka" ? "text-green-500" : "text-red-500"} uppercase`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Hover Buttons */}
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button onClick={() => setEditing(item)} className="bg-white/90 text-gray-700 p-2 rounded-full shadow-lg hover:bg-[#FFBC41] hover:text-white transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => confirmDelete(item.id, item.judul)} className="bg-white/90 text-gray-700 p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight group-hover:text-[#FFBC41] transition-colors line-clamp-1">
                      {item.judul}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{item.deskripsi}</p>

                    <div className="mt-auto border-t border-gray-100 pt-3 flex items-center text-gray-400 text-xs font-medium gap-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#FFBC41]" />
                        <span className="text-gray-600">{item.waktu_mulai} WIB</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Belum ada event yang dibuat.</p>
          </div>
        )}
      </div>

      {/* Modal Edit */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">Edit Event</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="input input-bordered" value={editing.judul} onChange={(e) => setEditing({ ...editing, judul: e.target.value })} />
              <input type="date" className="input input-bordered" value={editing.tanggal_mulai} onChange={(e) => setEditing({ ...editing, tanggal_mulai: e.target.value })} />
              <input type="time" className="input input-bordered" value={editing.waktu_mulai} onChange={(e) => setEditing({ ...editing, waktu_mulai: e.target.value })} />

              <select className="select select-bordered" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                <option value="buka">Buka</option>
                <option value="tutup">Tutup</option>
              </select>

              <select
                className="select select-bordered w-full"
                value={editing.type}
                onChange={(e) => setEditing({ ...editing, type: e.target.value })}
              >
                <option value="umum">Umum</option>
                <option value="internal">Aacara</option>
              </select>

              <input
                className="input input-bordered w-full"
                placeholder="URL CTA (opsional)"
                value={editing.url_cta}
                onChange={(e) => setEditing({ ...editing, url_cta: e.target.value })}
              />

              <textarea className="textarea textarea-bordered w-full sm:col-span-2" rows={3} value={editing.deskripsi} onChange={(e) => setEditing({ ...editing, deskripsi: e.target.value })} />
              <input type="file" className="file-input file-input-bordered w-full sm:col-span-2" onChange={(e) => setEditing({ ...editing, gambar_poster: e.target.files[0] })} />
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Batal</button>
              <button className="btn btn-primary" onClick={handleUpdate}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
