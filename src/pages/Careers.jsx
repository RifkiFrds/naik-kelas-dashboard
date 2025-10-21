import React, { useEffect, useState } from "react";
import {
  getCareers,
  createCareer,
  deleteCareer,
} from "../services/careersService";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJob, setNewJob] = useState({
    category_id: "",
    title: "",
    description: "",
  });

  // Ambil data dari API saat load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getCareers();
        setJobs(data.data || []); // sesuaikan struktur respons API
      } catch (error) {
        console.error("Gagal mengambil data careers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Tambah career
  const addJob = async () => {
    if (!newJob.category_id || !newJob.title || !newJob.description) {
      alert("Semua field wajib diisi!");
      return;
    }
    try {
      const created = await createCareer(newJob);
      setJobs([created.data, ...jobs]); // update state
      setNewJob({ category_id: "", title: "", description: "" });
    } catch (error) {
      console.error("Gagal tambah career:", error);
      alert("Gagal menambahkan lowongan. Cek console.");
    }
  };

  // Hapus career
  const removeJob = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?"))
      return;
    try {
      await deleteCareer(id);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Gagal hapus career:", error);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Memuat data lowongan...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manajemen Karir</h1>

      {/* Form tambah lowongan */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Tambah Lowongan Baru</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border p-2 rounded-md"
            placeholder="Category ID"
            value={newJob.category_id}
            onChange={(e) =>
              setNewJob({ ...newJob, category_id: e.target.value })
            }
          />
          <input
            className="border p-2 rounded-md"
            placeholder="Judul Posisi"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          />
          <input
            className="border p-2 rounded-md col-span-2"
            placeholder="Deskripsi"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition col-span-full"
            onClick={addJob}
          >
            Tambah Lowongan
          </button>
        </div>
      </div>

      {/* Tabel daftar lowongan */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Kategori</th>
              <th className="p-3 border-b">Judul</th>
              <th className="p-3 border-b">Deskripsi</th>
              <th className="p-3 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{job.id}</td>
                  <td className="p-3 border-b">{job.category_id}</td>
                  <td className="p-3 border-b font-medium">{job.title}</td>
                  <td className="p-3 border-b text-gray-600">
                    {job.description}
                  </td>
                  <td className="p-3 border-b flex justify-center gap-2">
                    <button className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Edit
                    </button>
                    <button
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => removeJob(job.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  Tidak ada data lowongan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
