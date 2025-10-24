import api from "../app/api";

// GET semua pengguna
export const getUsers = async () => {
  const res = await api.get("/pengguna");
  return res.data.data;
};

// CREATE user baru
export const createUser = async (userData) => {
  const res = await api.post("/pengguna", userData);
  return res.data;
};

// UPDATE user
export const updateUser = async (id, userData) => {
  const data = {
    role: userData.role || "admin",
    nama: userData.nama,
    email: userData.email,
    foto_profil: userData.foto_profil || null,
  };

  if (userData.password && userData.password.length >= 6) {
    data.password = userData.password;
    data.password_confirmation = userData.password; 
  }

  const res = await api.put(`/pengguna/${id}`, data);
  return res.data;
};

// DELETE user
export const deleteUser = async (id) => {
  const res = await api.delete(`/pengguna/${id}`);
  return res.data;
};

// Logout
export const logout = async () => {
  try {
    await api.post("/auth/logout"); 
  } catch (err) {
    console.error("Logout API error:", err);
  }
  localStorage.removeItem("token"); // clear token di frontend
};
