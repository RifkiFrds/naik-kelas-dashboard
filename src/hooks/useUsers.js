import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { Toast } from "../components/Toast";

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
      Toast.error("Gagal memuat pengguna ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.nama || !newUser.email || !newUser.password) {
        Toast.error("Semua field wajib diisi!");
        return;
      }
      await createUser(newUser);
      Toast.success("Admin berhasil ditambahkan 🎉");
      setNewUser({
        nama: "",
        email: "",
        password: "",
        role: "admin",
        foto_profil: DEFAULT_AVATAR,
      });
      loadUsers();
    } catch (err) {
      Toast.error("Gagal menambahkan admin ❌");
      console.error(err.response?.data || err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      Toast.success("Pengguna dihapus ✅");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      Toast.error("Gagal hapus pengguna ❌");
    }
  };

  const handleUpdate = async (id, role) => {
    try {
      await updateUser(id, { role });
      Toast.success("Role berhasil diperbarui 🔧");
      loadUsers();
    } catch (err) {
      Toast.error("Gagal update pengguna ❌");
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
