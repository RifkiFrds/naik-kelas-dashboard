import axios from "axios";

const api = axios.create({
  // base url
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: { "Content-Type": "application/json" }
});

// Interceptor 
// Ini akan otomatis melampirkan token ke setiap request SETELAH login berhasil.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;