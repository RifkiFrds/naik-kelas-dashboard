import api from "../app/api";

// GET semua layanan bisnis
export const getLayananBisnis = async () => {
  const res = await api.get("/layanan-bisnis");
  return res.data.data;
};

// CREATE
export const createLayananBisnis = async (data) => {
  const res = await api.post("/layanan-bisnis", data); 
  return res.data;
};

// UPDATE
export const updateLayananBisnis = async (id, data) => {
  const res = await api.post(`/layanan-bisnis/${id}`, data); 
  return res.data;
};

// DELETE
export const deleteLayananBisnis = async (id) => {
  const res = await api.delete(`/layanan-bisnis/${id}`);
  return res.data;
};
