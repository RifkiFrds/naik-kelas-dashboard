import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://thumbs.dreamstime.com/b/print-302238697.jpg";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [newUser, setNewUser] = useState({
    nama: "",
    email: "",
    password: "",
    role: "admin",
    foto_profil: DEFAULT_AVATAR,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (u) =>
            u.nama.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      toast.error("Gagal memuat pengguna ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.nama || !newUser.email || !newUser.password) {
        toast.error("Semua field wajib diisi!");
        return;
      }
      await createUser(newUser);
      toast.success("Admin berhasil ditambahkan 🎉");
      setNewUser({
        nama: "",
        email: "",
        password: "",
        role: "admin",
        foto_profil: DEFAULT_AVATAR,
      });
      loadUsers();
    } catch (err) {
      toast.error("Gagal menambahkan admin ❌");
      console.error(err.response?.data || err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await deleteUser(id);
      toast.success("Pengguna dihapus ✅");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      toast.error("Gagal hapus pengguna ❌");
    }
  };

  const handleUpdate = async (id, role) => {
    try {
      await updateUser(id, { role });
      toast.success("Role berhasil diperbarui 🔧");
      loadUsers();
    } catch (err) {
      toast.error("Gagal update pengguna ❌");
    }
  };

  return {
    users: filteredUsers,
    loading,
    newUser,
    setNewUser,
    search,
    setSearch,
    handleAddUser,
    handleDelete,
    handleUpdate,
  };
};
