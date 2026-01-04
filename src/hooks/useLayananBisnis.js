import { useEffect, useState } from "react";
import {
  getLayananBisnis,
  createLayananBisnis,
  updateLayananBisnis,
  deleteLayananBisnis,
} from "../services/layananBisnisService";
import { Toast } from "../components/Toast";

// Schema FINAL
const SCHEMA_FIELDS = {
  trading: [
    "type",
    "tipe_broker",
    "gambar",
    "deskripsi",
    "fitur_unggulan",
    "url_cta",
  ],
  jasa_recruitment: [
    "type",
    "gambar",
    "deskripsi",
    "fitur_unggulan",
    "url_cta",
  ],
  modal_bisnis: [
    "type",
    "gambar",
    "deskripsi",
    "fitur_unggulan",
    "url_cta",
  ],
  webinar: [
    "type",
    "gambar",
    "deskripsi",
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
    tipe_broker: "",
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
            item.tipe_broker?.toLowerCase().includes(q) ||
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
    } catch {
      Toast.error("Gagal memuat layanan ❌");
    } finally {
      setLoading(false);
    }
  };

  // builder FormData
  const buildPayload = (data) => {
    const fields = SCHEMA_FIELDS[data.type];
    if (!fields) return data;

    const formData = new FormData();
    fields.forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null && value !== "") {
        if (key === "gambar") {
          if (value instanceof File) {
            formData.append("gambar", value);
          }
        } else {
          formData.append(key, value);
        }
      }
    });

    return formData;
  };

  // CREATE
  const handleAdd = async () => {
    try {
      if (!newLayanan.type) {
        Toast.error("Pilih type layanan terlebih dahulu!");
        return;
      }

      for (let key of SCHEMA_FIELDS[newLayanan.type]) {
        const value = newLayanan[key];
        if (value === undefined || value === null || value === "") {
          Toast.error(`Field ${key} wajib diisi!`);
          return;
        }
      }

      const payload = buildPayload(newLayanan);

      // DEBUG (hapus setelah yakin)
      console.log("CREATE PAYLOAD:", [...payload.entries()]);

      await createLayananBisnis(payload);

      Toast.success("Layanan bisnis berhasil ditambahkan 🎉");
      setNewLayanan({
        type: "",
        tipe_broker: "",
        gambar: null,
        deskripsi: "",
        fitur_unggulan: "",
        url_cta: "",
      });

      loadLayanan();
    } catch (err) {
      console.error(err);
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
    } catch {
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
