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

  // form tambah layanan
  const [newLayanan, setNewLayanan] = useState({
    judul_layanan: "",
    deskripsi: "",
    highlight: "",
    url_cta: "",
  });

  // modal edit
  const [editing, setEditing] = useState(null);

  // search state
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLayanan();
  }, []);

  // 🔍 Filter layanan sesuai search
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

  // GET
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

  // CREATE
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
        highlight: "",
        url_cta: "",
      });
      loadLayanan();
    } catch (err) {
      Toast.error("Gagal menambah layanan ❌");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      await updateLayananUmum(editing.id, editing);
      Toast.success("Layanan berhasil diperbarui 🎉");
      setEditing(null);
      loadLayanan();
    } catch (err) {
      Toast.error("Gagal update layanan ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteLayananUmum(id);
      setLayanan(layanan.filter((l) => l.id !== id));
    } catch (err) {
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
