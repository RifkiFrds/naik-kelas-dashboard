import React, { useState } from "react";
import { useCareers } from "../hooks/useCareers";
import { Briefcase, Link2, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const Careers = () => {
  const {
    careers,
    loading,
    search,
    setSearch,
    newCareer,
    setNewCareer,
    handleAdd,
    handleDelete,
    handleToggleStatus,
    handleUpdate,
  } = useCareers();

  const [editCareer, setEditCareer] = useState(null);
  const [form, setForm] = useState({
    posisi: "",
    deskripsi: "",
    url_cta: "",
    status: "dibuka",
  });

  const openEditModal = (career) => {
    setEditCareer(career);
    setForm({
      posisi: career.posisi,
      deskripsi: career.deskripsi,
      url_cta: career.url_cta,
      status: career.status,
    });
    document.getElementById("edit_modal").showModal();
  };

  const submitUpdate = async () => {
    await handleUpdate(editCareer.id, form);
    document.getElementById("edit_modal").close();
  };

  const confirmDelete = (id, posisi) => {
    Swal.fire({
      title: `Hapus lowongan "${posisi}"?`,
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
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2">
         <span className="bg-[#FFBC41] text-white p-2 rounded-xl shadow-lg shadow-orange-200">
          <Briefcase className="w-8 h-8 text-gray-100" /></span>
          Manajemen Lowongan Karir
        </h1>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow bg-transparent"
            placeholder="Cari lowongan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Form Tambah Lowongan */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#FFBC41] rounded-full"></span>
            Tambah Lowongan Kerja
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Posisi */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Posisi Jabatan</label>
            <input
              className="input input-bordered w-full mt-1"
              placeholder="Contoh: Frontend Developer"
              value={newCareer.posisi}
              onChange={(e) => setNewCareer({ ...newCareer, posisi: e.target.value })}
            />
          </div>

          {/* Deskripsi */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Deskripsi Singkat</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Tuliskan tugas, kualifikasi, dll."
              rows={3}
              value={newCareer.deskripsi}
              onChange={(e) => setNewCareer({ ...newCareer, deskripsi: e.target.value })}
            />
          </div>

          {/* CTA Link */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Link Apply (URL CTA)</label>
            <input
              className="input input-bordered w-full mt-1"
              placeholder="https://..."
              value={newCareer.url_cta}
              onChange={(e) => setNewCareer({ ...newCareer, url_cta: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] col-span-2" onClick={handleAdd}>
            + Tambah Lowongan
          </button>

        </div>
      </div>

      {/* Tabel Lowongan */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">Memuat data lowongan...</div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Posisi</th>
                <th>Deskripsi</th>
                <th>Status</th>
                <th>Link</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {careers.length > 0 ? (
                careers.map((career) => (
                  <tr key={career.id}>
                    <td className="font-semibold">{career.posisi}</td>
                    <td className="max-w-xs truncate">{career.deskripsi}</td>

                    {/* Status */}
                    <td>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={career.status === "dibuka"}
                          onChange={() => handleToggleStatus(career)}
                        />
                        <span className="text-sm">
                          {career.status === "dibuka" ? "Dibuka" : "Ditutup"}
                        </span>
                      </label>
                    </td>

                    {/* CTA */}
                    <td>
                      {career.url_cta ? (
                        <a
                          href={career.url_cta}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary flex items-center gap-1"
                        >
                          <Link2 size={16} /> Apply
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Action */}
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-warning flex items-center gap-1"
                        onClick={() => openEditModal(career)}
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error flex items-center gap-1"
                        onClick={() => confirmDelete(career.id, career.posisi)}
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6">Tidak ada lowongan ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Edit */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box space-y-4">
          <h3 className="font-bold text-lg">Edit Lowongan</h3>

          <label className="text-sm font-medium">Posisi Jabatan</label>
          <input
            className="input input-bordered w-full"
            placeholder="Posisi"
            value={form.posisi}
            onChange={(e) => setForm({ ...form, posisi: e.target.value })}
          />

          <label className="text-sm font-medium">Deskripsi</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Deskripsi"
            rows={3}
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          />

          <label className="text-sm font-medium">Link Apply</label>
          <input
            className="input input-bordered w-full"
            placeholder="https://..."
            value={form.url_cta}
            onChange={(e) => setForm({ ...form, url_cta: e.target.value })}
          />

          <label className="text-sm font-medium">Status</label>
          <select
            className="select select-bordered w-full"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="dibuka">Dibuka</option>
            <option value="ditutup">Ditutup</option>
          </select>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={submitUpdate}>Simpan</button>
            <form method="dialog"><button className="btn">Batal</button></form>
          </div>
        </div>
      </dialog>

    </div>
  );
};

export default Careers;
