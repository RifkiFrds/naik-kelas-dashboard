import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import { getEvent, createEvent, updateEvent, deleteEvent } from "../services/eventService";

export const useEvent = () => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const [newEvent, setNewEvent] = useState({
    judul: "",
    deskripsi: "",
    tanggal_mulai: "",
    waktu_mulai: "",
    gambar_poster: null,
    status: "buka",
  });

  useEffect(() => {
    loadEvent();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(events);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        events.filter(
          (item) =>
            item.judul?.toLowerCase().includes(q) ||
            item.deskripsi?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, events]);

  const loadEvent = async () => {
    setLoading(true);
    try {
      const data = await getEvent();
      setEvents(data);
    } catch (error) {
      console.error(error);
      Toast.error("Gagal memuat event ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newEvent.judul || !newEvent.deskripsi) return Toast.error("Judul & Deskripsi wajib!");
    if (!newEvent.tanggal_mulai) return Toast.error("Tanggal wajib diisi!");
    if (!newEvent.gambar_poster) return Toast.error("Poster wajib diupload!");

    try {
      await createEvent(newEvent);
      Toast.success("Event berhasil ditambahkan 🎉");
      setNewEvent({
        judul: "",
        deskripsi: "",
        tanggal_mulai: "",
        waktu_mulai: "",
        gambar_poster: null,
        status: "buka",
      });
      loadEvent();
    } catch (error) {
      console.error(error);
      Toast.error("Gagal menambahkan event ❌");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    
    // Validasi sederhana
    if (!editing.judul || !editing.tanggal_mulai) {
        return Toast.error("Data tidak boleh kosong!");
    }

    try {
      // Kirim id dan object editing (yang berisi data terbaru dari modal)
      await updateEvent(editing.id, editing);
      
      Toast.success("Event berhasil diperbarui 🎉");
      setEditing(null); // Tutup modal
      loadEvent(); // Refresh data
    } catch (error) {
      console.error(error);
      // Cek jika error dari backend ada pesannya
      const msg = error.response?.data?.message || "Gagal update event ❌";
      Toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      loadEvent();
    } catch (error) {
      console.error(error);
      Toast.error("Gagal menghapus event ❌");
    }
  };

  return {
    events: filtered,
    loading,
    search,
    setSearch,
    newEvent,
    setNewEvent,
    editing,
    setEditing,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};