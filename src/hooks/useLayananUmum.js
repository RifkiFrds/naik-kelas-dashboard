import { useEffect, useState } from "react";
import {
  getLayananUmum,
  createLayananUmum,
  updateLayananUmum,
  deleteLayananUmum,
} from "../services/layananUmumService";
import { Toast } from "../components/Toast";

export const useLayananUmum = () => {
  const [layanan, setLayanan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newLayanan, setNewLayanan] = useState({
    judul_layanan: "",
    deskripsi: "",
    gambar: null,
    highlight: "",
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
            item.judul_layanan?.toLowerCase().includes(q) ||
            item.deskripsi?.toLowerCase().includes(q) ||
            item.highlight?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, layanan]);

  const loadLayanan = async () => {
    setLoading(true);
    try {
      const data = await getLayananUmum();
      setLayanan(data);
    } catch (err) {
      Toast.error("Gagal memuat layanan ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      if (!newLayanan.judul_layanan || !newLayanan.deskripsi) {
        Toast.error("Judul dan Deskripsi wajib diisi!");
        return;
      }
      await createLayananUmum(newLayanan);
      Toast.success("Layanan berhasil ditambahkan 🎉");
      setNewLayanan({
        judul_layanan: "",
        deskripsi: "",
        gambar: null,
        highlight: "",
        url_cta: "",
      });
      loadLayanan();
    } catch {
      Toast.error("Gagal menambah layanan ❌");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    try {
      await updateLayananUmum(editing.id, editing);
      Toast.success("Layanan berhasil diperbarui 🎉");
      setEditing(null);
      loadLayanan();
    } catch {
      Toast.error("Gagal update layanan ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLayananUmum(id);
      setLayanan(layanan.filter((x) => x.id !== id));
    } catch {
      Toast.error("Gagal hapus layanan ❌");
    }
  };

  return {
    layanan: filtered,
    loading,
    newLayanan,
    setNewLayanan,
    editing,
    setEditing,
    search,
    setSearch,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
