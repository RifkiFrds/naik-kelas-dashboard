import api from "../api/api";

// GET semua layanan umum
export const getLayananUmum = async () => {
  const res = await api.get("/layanan-umum");
  return res.data.data; // sesuai response { message, data: [...] }
};

// CREATE layanan umum (multipart)
export const createLayananUmum = async (data) => {
  const form = new FormData();
  form.append("judul_layanan", data.judul_layanan);
  form.append("deskripsi", data.deskripsi);
  form.append("url_cta", data.url_cta);
  form.append("highlight", data.highlight ?? "");
  form.append("gambar", data.gambar); // wajib ada untuk create

  const res = await api.post("/layanan-umum", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// UPDATE layanan umum (multipart + _method=PUT)
export const updateLayananUmum = async (id, data) => {
  const form = new FormData();
  form.append("_method", "PUT");
  form.append("judul_layanan", data.judul_layanan);
  form.append("deskripsi", data.deskripsi);
  form.append("url_cta", data.url_cta);
  form.append("highlight", data.highlight ?? "");

  // hanya kirim gambar bila user upload file baru
  if (data.gambar instanceof File) {
    form.append("gambar", data.gambar);
  }

  const res = await api.post(`/layanan-umum/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// DELETE layanan umum
export const deleteLayananUmum = async (id) => {
  const res = await api.delete(`/layanan-umum/${id}`);
  return res.data;
};
