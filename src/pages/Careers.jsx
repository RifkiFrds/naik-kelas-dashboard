import React, { useState } from "react";
import { useCareers } from "../hooks/useCareers";
import { Briefcase, Link2, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Toast } from "../components/Toast"; 

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
  const [form, setForm] = useState({ posisi: "", deskripsi: "", url_cta: "", status: "dibuka" });

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

  // 🔹 konfirmasi hapus
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
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-[#FFBC41]" /> Manajemen Lowongan Karir
        </h1>
        <div className="flex gap-2">
          {/* Search Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-transparent focus:outline-none dark:text-gray-200"
              placeholder="Cari layanan bisnis..."
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

      {/* Form Tambah Lowongan */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tambah Lowongan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            placeholder="Posisi Jabatan"
            value={newCareer.posisi}
            onChange={(e) => setNewCareer({ ...newCareer, posisi: e.target.value })}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Link Apply (URL CTA)"
            value={newCareer.url_cta}
            onChange={(e) => setNewCareer({ ...newCareer, url_cta: e.target.value })}
          />
          <textarea
            className="textarea textarea-bordered md:col-span-2"
            placeholder="Deskripsi Singkat"
            rows={3}
            value={newCareer.deskripsi}
            onChange={(e) => setNewCareer({ ...newCareer, deskripsi: e.target.value })}
          />
          <button className="btn bg-[#FFBC41] text-black hover:bg-[#E5A73A] md:col-span-2" onClick={handleAdd}>
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
                  <td colSpan="5" className="text-center p-6">
                    Tidak ada lowongan ditemukan.
                  </td>
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
          <input
            className="input input-bordered w-full"
            placeholder="Posisi"
            value={form.posisi}
            onChange={(e) => setForm({ ...form, posisi: e.target.value })}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Link Apply"
            value={form.url_cta}
            onChange={(e) => setForm({ ...form, url_cta: e.target.value })}
          />
          <select
            className="select select-bordered w-full"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="dibuka">Dibuka</option>
            <option value="ditutup">Ditutup</option>
          </select>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={submitUpdate}>
              Simpan
            </button>
            <form method="dialog">
              <button className="btn">Batal</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Careers;
