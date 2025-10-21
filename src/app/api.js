// src/app/api.js

import axios from "axios";

const api = axios.create({
  // UPDATE baris ini dengan base URL yang baru
  baseURL: "https://soreweb.sejiwahomecare.com/api/", 
  headers: { "Content-Type": "application/json" }
});

// Interceptor ini sudah benar, tidak perlu diubah.
// Ini akan otomatis melampirkan token ke setiap request SETELAH login berhasil.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;