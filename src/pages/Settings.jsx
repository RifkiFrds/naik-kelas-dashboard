// src/pages/Settings.jsx

import React from 'react';

const Settings = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Pengaturan</h1>

      {/* Card untuk Pengaturan Profil */}
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Pengaturan Profil</h2>
          <div className="divider"></div>
          <div className="form-control">
            <label className="label"><span className="label-text">Nama Lengkap</span></label>
            <input type="text" placeholder="Nama Anda" className="input input-bordered w-full max-w-xs" defaultValue="Admin Utama" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" defaultValue="superadmin@gmail.com" />
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Simpan Perubahan</button>
          </div>
        </div>
      </div>

      {/* Card untuk Pengaturan Aplikasi */}
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Pengaturan Aplikasi</h2>
          <div className="divider"></div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">Aktifkan Notifikasi</span>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="label cursor-pointer">
              <span className="label-text">Mode Gelap Otomatis</span>
              <input type="checkbox" className="toggle toggle-primary" />
            </label>
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label"><span className="label-text">Bahasa Tampilan</span></label>
            <select className="select select-bordered">
              <option>Bahasa Indonesia</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;