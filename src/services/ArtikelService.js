import api from "../api/api";

const fixDate = (date) => {
  if (!date) return "";
  if (date.includes("T")) date = date.split("T")[0];
  const [y, m, d] = date.split("-");
  return `${d}-${m}-${y}`;
};

export const getArtikel = async () => {
  const res = await api.get("/artikel");
  return res.data.data;
};

export const createArtikel = async (data) => {
  const form = new FormData();

  form.append("judul", data.judul);
  form.append("excerpt", data.excerpt);
  form.append("content", data.content);
  form.append("tanggal_terbit", fixDate(data.tanggal_terbit));
  form.append("url_cta", data.url_cta || "");

  if (data.gambar instanceof File) {
    form.append("gambar", data.gambar);
  }

  /* ======================
     DEBUG PAYLOAD
  ====================== */
  console.group("📤 CREATE ARTIKEL PAYLOAD");
  for (const [key, value] of form.entries()) {
    console.log(key, "=>", value);
  }
  console.groupEnd();

  try {
    const res = await api.post("/artikel", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.group("❌ CREATE ARTIKEL ERROR");
    console.log("STATUS:", err.response?.status);
    console.log("MESSAGE:", err.response?.data?.message);
    console.log("ERRORS:", err.response?.data?.errors);
    console.log("FULL RESPONSE:", err.response?.data);
    console.groupEnd();
    throw err;
  }
};

export const updateArtikel = async (id, data) => {
  const form = new FormData();

  form.append("judul", data.judul);
  form.append("excerpt", data.excerpt);
  form.append("content", data.content);
  form.append("tanggal_terbit", fixDate(data.tanggal_terbit));
  form.append("url_cta", data.url_cta || "");

  if (data.gambar instanceof File) {
    form.append("gambar", data.gambar);
  }

  console.group("📦 UPDATE ARTIKEL PAYLOAD");
  console.log("ID:", id);
  for (const [key, value] of form.entries()) {
    console.log(key, "=>", value);
  }
  console.groupEnd();

  try {
    const res = await api.post(`/artikel/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.group("❌ UPDATE ARTIKEL ERROR");
    console.log("STATUS:", err.response?.status);
    console.log("MESSAGE:", err.response?.data?.message);
    console.log("ERRORS:", err.response?.data?.errors);
    console.log("FULL RESPONSE:", err.response?.data);
    console.groupEnd();
    throw err;
  }
};


export const deleteArtikel = async (id) => {
  const res = await api.delete(`/artikel/${id}`);
  return res.data;
};
