import { useEffect, useState } from "react";
import {
  getPartnerships,
  createPartnership,
  updatePartnership,
  deletePartnership,
} from "../services/partnershipService";
import { Toast } from "../components/Toast";

// schema field wajib
const SCHEMA_FIELDS = ["nama_paket", "gambar", "deskripsi", "fitur_unggulan", "harga", "url_cta"];

export const usePartnership = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);

  const [newPartnership, setNewPartnership] = useState({
    nama_paket: "",
    gambar: null,
    deskripsi: "",
    fitur_unggulan: "",
    harga: "",
    url_cta: "",
  });

  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPartnerships();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(partnerships);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        partnerships.filter(
          (p) =>
            p.nama_paket?.toLowerCase().includes(q) ||
            p.deskripsi?.toLowerCase().includes(q) ||
            p.fitur_unggulan?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, partnerships]);

  // builder → selalu FormData
  const buildPayload = (data) => {
    const formData = new FormData();
    SCHEMA_FIELDS.forEach((key) => {
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

  // GET
  const loadPartnerships = async () => {
    setLoading(true);
    try {
      const data = await getPartnerships();
      setPartnerships(data);
      setFiltered(data);
    } catch (err) {
      Toast.error("Gagal memuat paket kemitraan ❌");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleAdd = async () => {
    try {
      for (let key of SCHEMA_FIELDS) {
        if (!newPartnership[key]) {
          Toast.error(`Field ${key} wajib diisi!`);
          return;
        }
      }

      const payload = buildPayload(newPartnership);
      await createPartnership(payload);

      Toast.success("Paket berhasil ditambahkan 🎉");
      setNewPartnership({
        nama_paket: "",
        gambar: null,
        deskripsi: "",
        fitur_unggulan: "",
        harga: "",
        url_cta: "",
      });
      loadPartnerships();
    } catch (err) {
      console.error("Add error:", err.response?.data || err);
      Toast.error("Gagal menambah paket ❌");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      const payload = buildPayload(editing);
      await updatePartnership(editing.id, payload);
      Toast.success("Paket berhasil diperbarui ✨");
      setEditing(null);
      loadPartnerships();
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
      Toast.error("Gagal update paket ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deletePartnership(id);
      setPartnerships(partnerships.filter((p) => p.id !== id));
    } catch (err) {
      Toast.error("Gagal hapus paket ❌");
    }
  };

  return {
    partnerships: filtered,
    loading,
    newPartnership,
    setNewPartnership,
    editing,
    setEditing,
    search,
    setSearch,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
