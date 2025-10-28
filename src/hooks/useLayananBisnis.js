import { useEffect, useState } from "react";
import {
  getLayananBisnis,
  createLayananBisnis,
  updateLayananBisnis,
  deleteLayananBisnis,
} from "../services/layananBisnisService";
import { Toast } from "../components/Toast";

// Semua type punya gambar
const SCHEMA_FIELDS = {
  trading: [
    "type",
    "tipe_broker",
    "judul_bisnis",
    "gambar",
    "deskripsi",
    "fitur_unggulan",
    "url_cta",
  ],
  reseller: [
    "type",
    "judul_bisnis",
    "gambar",
    "deskripsi",
    "fitur_unggulan",
    "url_cta",
  ],
  "modal bisnis": [
    "type",
    "judul_bisnis",
    "gambar",
    "deskripsi",
    "fitur_unggulan",
    "url_cta",
  ],
  webinar: [
    "type",
    "judul_bisnis",
    "gambar",
    "deskripsi",
    "tanggal_acara",
    "waktu_mulai",
    "nama_mentor",
    "fitur_unggulan",
    "url_cta",
  ],
};

export const useLayananBisnis = () => {
  const [layanan, setLayanan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newLayanan, setNewLayanan] = useState({
    type: "",
    judul_bisnis: "",
    gambar: null,
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

  // utility builder: selalu FormData
  const buildPayload = (data) => {
    const fields = SCHEMA_FIELDS[data.type];
    if (!fields) return data;

    const formData = new FormData();
    fields.forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        if (key === "gambar") {
          if (data[key] instanceof File) {
            formData.append("gambar", data[key]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    return formData;
  };

  // CREATE
  const handleAdd = async () => {
    try {
      if (!newLayanan.type) {
        Toast.error("Pilih Type layanan terlebih dahulu!");
        return;
      }

      for (let key of SCHEMA_FIELDS[newLayanan.type]) {
        if (!newLayanan[key]) {
          Toast.error(`Field ${key} wajib diisi!`);
          return;
        }
      }

      const payload = buildPayload(newLayanan);
      await createLayananBisnis(payload);

      Toast.success("Layanan bisnis berhasil ditambahkan 🎉");
      setNewLayanan({
        type: "",
        judul_bisnis: "",
        gambar: null,
        deskripsi: "",
        fitur_unggulan: "",
        url_cta: "",
      });
      loadLayanan();
    } catch (err) {
      Toast.error("Gagal menambah layanan bisnis ❌");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      const payload = buildPayload(editing);
      await updateLayananBisnis(editing.id, payload);
      Toast.success("Layanan bisnis berhasil diperbarui ✨");
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
