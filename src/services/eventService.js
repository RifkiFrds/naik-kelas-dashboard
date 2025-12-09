import api from "../api/api";

const fixDate = (tanggal) => {
  if (!tanggal) return "";
  const [year, month, day] = tanggal.split("-");
  return `${day}-${month}-${year}`;
};

const formatTime = (time) => {
  if (!time) return "";
  return time.slice(0, 5); // ambil hanya HH:mm
};

// GET semua event
export const getEvent = async () => {
  const res = await api.get("/event");
  return res.data.data;
};

// CREATE event (multipart form)
export const createEvent = async (data) => {
  const form = new FormData();
  form.append("judul", data.judul);
  form.append("deskripsi", data.deskripsi);
  form.append("tanggal_mulai", fixDate(data.tanggal_mulai));
  form.append("waktu_mulai", formatTime(data.waktu_mulai));
  form.append("status", data.status);
  form.append("gambar_poster", data.gambar_poster);

  return await api.post("/event", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// UPDATE event (multipart + method POST/PUT)
export const updateEvent = async (id, data) => {
  const form = new FormData();

  form.append("judul", data.judul);
  form.append("deskprisi", data.deskripsi); 
  form.append("tanggal_mulai", fixDate(data.tanggal_mulai));
  form.append("waktu_mulai", formatTime(data.waktu_mulai));
  form.append("status", data.status);

  if (data.gambar_poster instanceof File) {
    form.append("gambar_poster", data.gambar_poster);
  }

    return await api.post(`/event/${id}`, form);
};



// DELETE event
export const deleteEvent = async (id) => {
  return await api.delete(`/event/${id}`);
};