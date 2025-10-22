import { useEffect, useState } from "react";
import {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} from "../services/careersService";
import toast from "react-hot-toast";

export const useCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCareer, setNewCareer] = useState({
    posisi: "",
    status: 1,
    deskripsi: "",
    url_cta: "",
  });

  useEffect(() => {
    loadCareers();
  }, []);

  // GET
  const loadCareers = async () => {
    setLoading(true);
    try {
      const data = await getCareers();
      setCareers(data);
    } catch (err) {
      toast.error("Gagal memuat lowongan ❌");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleAdd = async () => {
    try {
      if (!newCareer.posisi || !newCareer.deskripsi) {
        toast.error("Posisi dan Deskripsi wajib diisi!");
        return;
      }
      await createCareer(newCareer);
      toast.success("Lowongan berhasil ditambahkan 🎉");
      setNewCareer({ posisi: "", status: 1, deskripsi: "", url_cta: "" });
      loadCareers();
    } catch (err) {
      toast.error("Gagal menambah lowongan ❌");
    }
  };

  // UPDATE
  const handleUpdate = async (id, data) => {
    try {
      await updateCareer(id, data);
      toast.success("Lowongan berhasil diperbarui ✅");
      loadCareers();
    } catch (err) {
      toast.error("Gagal update lowongan ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus lowongan ini?")) return;
    try {
      await deleteCareer(id);
      toast.success("Lowongan berhasil dihapus 🗑️");
      setCareers(careers.filter((c) => c.id !== id));
    } catch (err) {
      toast.error("Gagal hapus lowongan ❌");
    }
  };

  return {
    careers,
    loading,
    newCareer,
    setNewCareer,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
