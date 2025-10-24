import { useEffect, useState } from "react";
import {
  getLayananBisnis,
  createLayananBisnis,
  updateLayananBisnis,
  deleteLayananBisnis,
} from "../services/layananBisnisService";
import { Toast } from "../components/Toast";

// mapping field wajib per type
const SCHEMA_FIELDS = {
  trading: ["type", "tipe_broker", "judul_bisnis", "deskripsi", "fitur_unggulan", "url_cta"],
  reseller: ["type", "judul_bisnis", "gambar", "deskripsi", "fitur_unggulan", "url_cta"],
  "modal bisnis": ["type", "judul_bisnis", "gambar", "deskripsi", "fitur_unggulan", "url_cta"],
  webinar: ["type", "judul_bisnis", "deskripsi", "tanggal_acara", "waktu_mulai", "nama_mentor", "fitur_unggulan", "url_cta"],
};

export const useLayananBisnis = () => {
  const [layanan, setLayanan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newLayanan, setNewLayanan] = useState({
    type: "",
    judul_bisnis: "",
    deskripsi: "",
    fitur_unggulan: "",
    url_cta: "",
  });

  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLayanan();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(layanan);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        layanan.filter(
          (item) =>
            item.judul_bisnis?.toLowerCase().includes(q) ||
            item.deskripsi?.toLowerCase().includes(q) ||
            item.type?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, layanan]);

  // GET
  const loadLayanan = async () => {
    setLoading(true);
    try {
      const data = await getLayananBisnis();
      setLayanan(data);
      setFiltered(data);
    } catch (err) {
      Toast.error("Gagal memuat layanan ❌");
    } finally {
      setLoading(false);
    }
  };

  const filterByType = (data) => {
    const fields = SCHEMA_FIELDS[data.type];
    if (!fields) return data;
    return Object.fromEntries(Object.entries(data).filter(([key]) => fields.includes(key)));
  };

  // CREATE
  const handleAdd = async () => {
    try {
      if (!newLayanan.type) {
        Toast.error("Pilih Type layanan terlebih dahulu!");
        return;
      }
      const payload = filterByType(newLayanan);

      for (let key of SCHEMA_FIELDS[newLayanan.type]) {
        if (!payload[key]) {
          Toast.error(`Field ${key} wajib diisi!`);
          return;
        }
      }

      await createLayananBisnis(payload);
      Toast.success("Layanan bisnis berhasil ditambahkan 🎉");
      setNewLayanan({ type: "", judul_bisnis: "", deskripsi: "", fitur_unggulan: "", url_cta: "" });
      loadLayanan();
    } catch (err) {
      Toast.error("Gagal menambah layanan bisnis ❌");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      const payload = filterByType(editing);
      await updateLayananBisnis(editing.id, payload);
      Toast.success("Layanan bisnis berhasil diperbarui ✅");
      setEditing(null);
      loadLayanan();
    } catch (err) {
      Toast.error("Gagal update layanan bisnis ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteLayananBisnis(id);
      loadLayanan();
    } catch (err) {
      Toast.error("Gagal menghapus layanan bisnis ❌");
    }
  };

  return {
    layanan: filtered,
    loading,
    newLayanan,
    setNewLayanan,
    editing,
    setEditing,
    handleAdd,
    handleUpdate,
    handleDelete,
    search,
    setSearch,
  };
};
