import api from "../api/api";

// GET semua layanan umum
export const getLayananUmum = async () => {
  const res = await api.get("/layanan-umum");
  return res.data.data; // sesuai response { message, data: [...] }
};

// CREATE layanan umum
export const createLayananUmum = async (data) => {
  const res = await api.post("/layanan-umum", data);
  return res.data;
};

// UPDATE layanan umum
export const updateLayananUmum = async (id, data) => {
  const res = await api.put(`/layanan-umum/${id}`, data);
  return res.data;
};

// DELETE layanan umum
export const deleteLayananUmum = async (id) => {
  const res = await api.delete(`/layanan-umum/${id}`);
  return res.data;
};
