import api from "../app/api";

// GET semua layanan bisnis
export const getLayananBisnis = async () => {
  const res = await api.get("/layanan-bisnis");
  return res.data.data; // sesuai response { message, data: [...] }
}

// CREATE layanan bisnis
export const createLayananBisnis = async (data) => {
  const res = await api.post("/layanan-bisnis", data);
  return res.data;
}

// UPDATE layanan bisnis    
export const updateLayananBisnis = async (id, data) => {
  const res = await api.put(`/layanan-bisnis/${id}`, data);
  return res.data;
};

// DELETE layanan bisnis
export const deleteLayananBisnis = async (id) => {
  const res = await api.delete(`/layanan-bisnis/${id}`);
  return res.data;
}