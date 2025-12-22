import { useEffect, useState } from "react";
import {
  getArtikel,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from "../services/ArtikelService";
import { Toast } from "../components/Toast";

export const useArtikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  
  const [newArtikel, setNewArtikel] = useState({
    judul: "",
    excerpt: "",
    content: "",
    tanggal_terbit: "",
    url_cta: "",
    gambar: null,
  });

  const loadArtikel = async () => {
    setLoading(true);
    try {
      const data = await getArtikel();
      setArtikel(data);
    } catch {
      Toast.error("Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtikel();
  }, []);

  console.log("CONTENT HTML:", newArtikel.content);

  const handleAdd = async () => {
    try {
      await createArtikel(newArtikel);
      Toast.success("Artikel berhasil ditambahkan");
      setNewArtikel({
        judul: "",
        excerpt: "",
        content: "",
        tanggal_terbit: "",
        url_cta: "",
        gambar: null,
      });
      loadArtikel();
    } catch {
      Toast.error("Gagal menambah artikel");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      await updateArtikel(editing.id, editing);
      Toast.success("Artikel berhasil diperbarui");
      setEditing(null);
      loadArtikel();
    } catch {
      Toast.error("Gagal update artikel");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArtikel(id);
      Toast.success("Artikel berhasil dihapus");
      loadArtikel();
    } catch {
      Toast.error("Gagal hapus artikel");
    }
  };

  return {
    artikel,
    loading,
    newArtikel,
    setNewArtikel,
    editing,
    setEditing,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
