import axios from "axios";

const api = axios.create({
  baseURL: "https://lightyellow-kingfisher-686522.hostingersite.com/api/", 
  headers: { "Content-Type": "application/json" }
});

// kalau butuh auth token, tinggal tambahin interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
