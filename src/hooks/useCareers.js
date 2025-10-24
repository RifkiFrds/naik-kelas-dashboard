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
    status: "dibuka", 
    deskripsi: "",
    url_cta: "",
  });

  useEffect(() => {
    loadCareers();
  }, []);

  // seacrh carreers
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search.trim()) {
      setCareers(careers);
    } else {
      const q = search.toLowerCase();
      setCareers(
        careers.filter(
          (item) =>
            item.posisi?.toLowerCase().includes(q) ||
            item.deskripsi?.toLowerCase().includes(q) ||
            item.status?.toLowerCase().includes(q)
        )
      );
    };
  }, [search, careers]);

  // GET
  const loadCareers = async () => {
    setLoading(true);
    try {
      const data = await getCareers();
      setCareers(data);
    } catch (err) {
      console.error(err);
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
      setNewCareer({
        posisi: "",
        status: "dibuka",
        deskripsi: "",
        url_cta: "",
      });
      loadCareers();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Gagal menambah lowongan ❌");
    }
  };

  // TOGGLE STATUS
  const handleToggleStatus = async (career) => {
    try {
      const newStatus = career.status === "dibuka" ? "ditutup" : "dibuka";
      await updateCareer(career.id, { ...career, status: newStatus });
      toast.success(`Status diubah menjadi ${newStatus.toUpperCase()} ✅`);
      loadCareers();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Gagal mengubah status ❌");
    }
  };

  // UPDATE (Edit)
  const handleUpdate = async (id, data) => {
    try {
      await updateCareer(id, data);
      toast.success("Lowongan berhasil diperbarui ✨");
      loadCareers();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Gagal update lowongan ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteCareer(id);
      toast.success("Lowongan berhasil dihapus 🗑️");
      setCareers(careers.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Gagal hapus lowongan ❌");
    }
  };

  return {
    careers,
    loading,
    newCareer,
    setNewCareer,
    search,
    setSearch,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleToggleStatus,
  };
};
