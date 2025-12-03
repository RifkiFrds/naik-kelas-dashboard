import api from "../api/api";

// GET semua paket kemitraan
export const getPartnerships = async () => {
  const res = await api.get("/paket-kemitraan");
  return res.data.data;
};

// CREATE
export const createPartnership = async (data) => {
  const res = await api.post("/paket-kemitraan", data); 
  return res.data;
};

// UPDATE
export const updatePartnership = async (id, data) => {
  const res = await api.post(`/paket-kemitraan/${id}`, data); 
  return res.data;
};

// DELETE
export const deletePartnership = async (id) => {
  const res = await api.delete(`/paket-kemitraan/${id}`);
  return res.data;
};
