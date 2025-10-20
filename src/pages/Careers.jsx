import React from "react";
import { useEffect, useState } from "react";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // state untuk tambah data
  const [newJob, setNewJob] = useState({
    posisi: "",
    deskripsi: "",
    status: 1,
    url_cta: ""
  });

  // GET all jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch("https://lightyellow-kingfisher-686522.hostingersite.com/api/kategori-bisnis");
      const data = await res.json();
      console.log("API response:", data);

      if (Array.isArray(data)) {
        setJobs(data);
      } else if (data.data && Array.isArray(data.data)) {
        setJobs(data.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // POST new job
  const addJob = async () => {
    try {
      await fetch("https://lightyellow-kingfisher-686522.hostingersite.com/api/kategori-bisnis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      setNewJob({ posisi: "", deskripsi: "", status: 1, url_cta: "" });
      fetchJobs(); // refresh list
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  // DELETE job
  const deleteJob = async (id) => {
    try {
      await fetch(`https://lightyellow-kingfisher-686522.hostingersite.com/api/kategori-bisnis${id}`, {
        method: "DELETE",
      });
      fetchJobs(); // refresh list
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Lowongan Karir</h2>

      {/* Form tambah lowongan */}
      <div className="mb-6 flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Posisi"
          value={newJob.posisi}
          onChange={(e) => setNewJob({ ...newJob, posisi: e.target.value })}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Deskripsi"
          value={newJob.deskripsi}
          onChange={(e) => setNewJob({ ...newJob, deskripsi: e.target.value })}
        />
        <input
          className="border p-2 flex-1"
          placeholder="URL CTA"
          value={newJob.url_cta}
          onChange={(e) => setNewJob({ ...newJob, url_cta: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={addJob}
        >
          Tambah
        </button>
      </div>

      {/* Tabel daftar lowongan */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Posisi</th>
            <th className="border p-2">Deskripsi</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td className="border p-2">{job.id}</td>
                <td className="border p-2">{job.posisi}</td>
                <td className="border p-2">{job.deskripsi}</td>
                <td className="border p-2">
                  {job.status === 1 ? "Aktif" : "Nonaktif"}
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1"
                    onClick={() => deleteJob(job.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                Tidak ada lowongan tersedia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
