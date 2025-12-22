import api from "../api/api";

const fixDate = (date) => {
  if (!date) return "";

  // jika ISO string
  if (date.includes("T")) {
    date = date.split("T")[0];
  }

  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};


/* =========================
   GET
========================= */
export const getArtikel = async () => {
  const res = await api.get("/artikel");
  return res.data.data;
};

/* =========================
   CREATE
========================= */
export const createArtikel = async (data) => {
  const form = new FormData();

  form.append("judul", data.judul);
  form.append("deskripsi", data.deskripsi);
  form.append("tanggal_terbit", fixDate(data.tanggal_terbit));
  form.append("url_cta", data.url_cta || "");

  if (data.gambar instanceof File) {
    form.append("gambar", data.gambar);
  }

  // DEBUG PAYLOAD
  console.group("📤 CREATE ARTIKEL PAYLOAD");
  for (const pair of form.entries()) {
    console.log(pair[0], ":", pair[1]);
  }
  console.groupEnd();

  try {
    const res = await api.post("/artikel", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("❌ CREATE ARTIKEL ERROR", err.response?.data || err);
    throw err;
  }
};

/* =========================
   UPDATE
========================= */
export const updateArtikel = async (id, data) => {
  const form = new FormData();

  form.append("judul", data.judul);
  form.append("deskripsi", data.deskripsi);
  form.append("tanggal_terbit", fixDate(data.tanggal_terbit));
  form.append("url_cta", data.url_cta || "");

  if (data.gambar instanceof File) {
    form.append("gambar", data.gambar);
  }

  // DEBUG PAYLOAD
  console.group("📦 UPDATE ARTIKEL PAYLOAD");
  console.log("ID:", id);
  for (const pair of form.entries()) {
    console.log(pair[0], ":", pair[1]);
  }
  console.groupEnd();

  try {
    const res = await api.post(`/artikel/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("❌ UPDATE ARTIKEL ERROR", err.response?.data || err);
    throw err;
  }
};

/* =========================
   DELETE
========================= */
export const deleteArtikel = async (id) => {
  const res = await api.delete(`/artikel/${id}`);
  return res.data;
};
