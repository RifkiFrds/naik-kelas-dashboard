import React from "react";
import { useCareers } from "../hooks/useCareers";

const Careers = () => {
  const {
    careers,
    loading,
    newCareer,
    setNewCareer,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useCareers();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Manajemen Lowongan Karir</h1>

      {/* Form tambah */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tambah Lowongan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full"
            placeholder="Posisi"
            value={newCareer.posisi}
            onChange={(e) =>
              setNewCareer({ ...newCareer, posisi: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full"
            placeholder="URL CTA"
            value={newCareer.url_cta}
            onChange={(e) =>
              setNewCareer({ ...newCareer, url_cta: e.target.value })
            }
          />
          <textarea
            className="textarea textarea-bordered col-span-full"
            placeholder="Deskripsi"
            value={newCareer.deskripsi}
            onChange={(e) =>
              setNewCareer({ ...newCareer, deskripsi: e.target.value })
            }
          />
          <button className="btn btn-primary col-span-full" onClick={handleAdd}>
            + Tambah Lowongan
          </button>
        </div>
      </div>

      {/* Tabel data */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">Memuat lowongan...</div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Posisi</th>
                <th>Deskripsi</th>
                <th>Status</th>
                <th>CTA</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {careers.length > 0 ? (
                careers.map((job) => (
                  <tr key={job.id}>
                    <td className="font-bold">{job.posisi}</td>
                    <td className="max-w-xs truncate">{job.deskripsi}</td>
                    <td>
                      <span
                        className={`badge ${
                          job.status === 1
                            ? "badge-success"
                            : "badge-ghost"
                        }`}
                      >
                        {job.status === 1 ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td>
                      <a
                        href={job.url_cta}
                        target="_blank"
                        rel="noreferrer"
                        className="link link-primary"
                      >
                        Apply
                      </a>
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleUpdate(job.id, { ...job, status: job.status === 1 ? 0 : 1 })
                        }
                      >
                        {job.status === 1 ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(job.id)}
                      >
                        Hapus
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
    </div>
  );
};

export default Careers;
