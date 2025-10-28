import { useEffect, useState } from "react";
import { getPesanKontak, markAsRead, deletePesanKontak } from "../services/contactService";
import { Toast } from "../components/Toast";

export const useContact = () => {
  const [pesan, setPesan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // pesan detail

  const loadPesan = async () => {
    setLoading(true);
    try {
      const data = await getPesanKontak();
      setPesan(data);
    } catch (err) {
      Toast.error("Gagal memuat pesan ❌");
    } finally {
      setLoading(false);
    }
  };

   const handleRead = async (item) => {
    try {
      if (!item.dibaca) {
        await markAsRead(item.id);
        setPesan((prev) =>
          prev.map((p) =>
            p.id === item.id ? { ...p, dibaca: new Date().toISOString() } : p
          )
        );
      }
      setSelected(item);
    } catch (err) {
      Toast.error("Gagal update status baca ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePesanKontak(id);
      setPesan((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      Toast.error("Gagal hapus pesan ❌");
    }
  };

  useEffect(() => {
    loadPesan();
  }, []);

  return { pesan, loading, selected, setSelected, handleRead, handleDelete };
};
