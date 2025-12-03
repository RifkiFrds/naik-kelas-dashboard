import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor request → otomatis tambahin token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // jika data berupa FormData → jangan set Content-Type
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"]; 
  } else {
    // jika tidak Default request lain pakai JSON
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;
