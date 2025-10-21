// src/pages/Users.jsx

import React from 'react';

// Data dummy untuk tabel pengguna
const users = [
  { id: 1, name: 'Rifki Firdaus', email: 'rifki@example.com', role: 'Admin', status: 'online', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
  { id: 2, name: 'Budi Doremi', email: 'budi.do@remi.com', role: 'Editor', status: 'offline', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
  { id: 3, name: 'Citra Kirana', email: 'citra.k@web.dev', role: 'Viewer', status: 'online', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi.l@domain.id', role: 'Editor', status: 'offline', avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' },
];

const Users = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Manajemen Pengguna</h1>
        <div className="flex gap-2">
          {/* Search Input */}
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Cari" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
          {/* Tombol Tambah Pengguna */}
          <button className="btn btn-primary">
            + Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Tabel Pengguna */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nama Pengguna</th>
              <th>Peran</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.avatar} alt={`${user.name}'s avatar`} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>
                  <div className={`badge ${user.status === 'online' ? 'badge-success' : 'badge-ghost'}`}>
                    {user.status}
                  </div>
                </td>
                <th className="flex gap-2">
                  <button className="btn btn-ghost btn-xs">Detail</button>
                  <button className="btn btn-error btn-xs">Hapus</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;