import api from "../app/api";

// GET - ambil daftar career (admin)
export const getCareers = async () => {
  const res = await api.get("/admin/career");
  return res.data;
};

// POST - tambah career
export const createCareer = async (careerData) => {
  const formData = new FormData();
  formData.append("category_id", careerData.category_id);
  formData.append("title", careerData.title);
  formData.append("description", careerData.description);

  const res = await api.post("/career", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// PUT - update career
export const updateCareer = async (id, careerData) => {
  const formData = new FormData();
  formData.append("category_id", careerData.category_id);
  formData.append("title", careerData.title);
  formData.append("description", careerData.description);

  const res = await api.post(`/career/${id}?_method=PUT`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE - hapus career
export const deleteCareer = async (id) => {
  const res = await api.delete(`/career/${id}`);
  return res.data;
};
