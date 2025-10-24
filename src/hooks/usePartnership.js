import { useEffect, useState } from "react";
import {
  getPartnerships,
  createPartnership,
  updatePartnership,
  deletePartnership,
} from "../services/partnershipService";
import { Toast } from "../components/Toast";

export const usePartnership = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);

  // form tambah paket
  const [newPartnership, setNewPartnership] = useState({
    nama_paket: "",
    gambar: "",
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

  // GET
  const loadPartnerships = async () => {
    setLoading(true);
    try {
      const data = await getPartnerships();
      setPartnerships(data);
    } catch (err) {
      Toast.error("Gagal memuat paket kemitraan ❌");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleAdd = async () => {
    try {
      if (!newPartnership.nama_paket || !newPartnership.deskripsi) {
        Toast.error("Nama Paket dan Deskripsi wajib diisi!");
        return;
      }
      await createPartnership(newPartnership);
      Toast.success("Paket berhasil ditambahkan 🎉");
      setNewPartnership({
        nama_paket: "",
        gambar: "",
        deskripsi: "",
        fitur_unggulan: "",
        harga: "",
        url_cta: "",
      });
      loadPartnerships();
    } catch (err) {
      Toast.error("Gagal menambah paket ❌");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      await updatePartnership(editing.id, editing);
      Toast.success("Paket berhasil diperbarui ✅");
      setEditing(null);
      loadPartnerships();
    } catch (err) {
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
