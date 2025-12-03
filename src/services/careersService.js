import api from "../api/api";

// GET semua lowongan
export const getCareers = async () => {
  const res = await api.get("/lowongan-karir");
  return res.data.data; // { message, data: [...] }
};

// CREATE lowongan
export const createCareer = async (careerData) => {
  const res = await api.post("/lowongan-karir", careerData);
  return res.data;
};

// UPDATE lowongan
export const updateCareer = async (id, careerData) => {
  const res = await api.put(`/lowongan-karir/${id}`, careerData);
  return res.data;
};

// DELETE lowongan
export const deleteCareer = async (id) => {
  const res = await api.delete(`/lowongan-karir/${id}`);
  return res.data;
};
