import api from "../app/api";

// GET semua pesan
export const getPesanKontak = async () => {
  const res = await api.get("/kontak");
  return res.data.data;
};

// Tandai pesan sebagai dibaca
export const markAsRead = async (id) => {
  const res = await api.put(`/kontak/${id}/baca`);
  return res.data; // misal API balikin { status: success, data: {...} }
};

// Hapus pesan
export const deletePesanKontak = async (id) => {
  const res = await api.delete(`/kontak/${id}`);
  return res.data;
};
