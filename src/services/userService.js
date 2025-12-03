import api from "../api/api";

// GET semua pengguna (Aman)
export const getUsers = async () => {
  const res = await api.get("/pengguna");
  // Pastikan data ada di res.data.data
  return res.data?.data || []; // Tambahkan fallback array kosong
};

// CREATE user baru (Aman)
export const createUser = async (userData) => {
  const formData = new FormData();
  formData.append("nama", userData.nama);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("role", userData.role);
  
  if (userData.foto_profil instanceof File) { // Pastikan hanya File yang di-append
    formData.append("foto_profil", userData.foto_profil);
  }

  // Kirim ke endpoint /pengguna/admin
  const res = await api.post("/pengguna/admin", formData, {
    headers: { "Content-Type": null } 
  });
  return res.data;
};

// UPDATE user
export const updateUser = async (id, userData) => {
  const formData = new FormData();

  Object.keys(userData).forEach((key) => {
    const value = userData[key];

    if (value === null || value === undefined) return;

    // Skip password kosong
    if (key === "password" && value === "") return;
    if (key === "password_confirmation" && userData["password"] === "") return;

    // Foto profil hanya dikirim kalau File
    if (key === "foto_profil") {
      if (value instanceof File) {
        formData.append("foto_profil", value);
      }
      return;
    }

    formData.append(key, value);
  });

  const res = await api.post(`/pengguna/${id}`, formData); 
  return res.data;
};


// DELETE user (Aman)
export const deleteUser = async (id) => {
  const res = await api.delete(`/pengguna/${id}`);
  return res.data;
};

// Logout (Aman)
export const logout = async () => {
  try {
    await api.post("/auth/logout"); 
  } catch (err) {
    console.error("Logout API error:", err);
  }
  localStorage.removeItem("token");
};

