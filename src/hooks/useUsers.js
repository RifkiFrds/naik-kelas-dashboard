import { useState, useEffect } from "react";
import api from "../api/api"; 
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

const DEFAULT_AVATAR = "https://thumbs.dreamstime.com/b/print-302238697.jpg";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState(null); // State untuk role user login

  const [newUser, setNewUser] = useState({
    nama: "",
    email: "",
    password: "",
    role: "admin",
    foto_profil: null,
  });

  useEffect(() => {
    loadUsersAndCurrentUser(); 
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

  // Fungsi baru untuk load users dan role user login
  const loadUsersAndCurrentUser = async () => {
    setLoading(true);
    try {
      // Ambil data user login
      const userRes = await api.get("/user"); 
      setCurrentUserRole(userRes.data?.data?.role); // Simpan role user login

      // Ambil list semua pengguna
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error("Gagal memuat data:", err); 
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.nama || !newUser.email || !newUser.password) {
       console.error("Semua field wajib diisi!");
       return false; // Return false jika gagal
    }
    try {
      await createUser(newUser);
      setNewUser({
        nama: "", email: "", password: "", role: "admin", foto_profil: null,
      });
      loadUsersAndCurrentUser(); // Reload data
      return true; // Return true jika sukses
    } catch (err) {
      console.error("Gagal menambahkan admin:", err.response?.data || err);
      return false; // Return false jika gagal
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      loadUsersAndCurrentUser(); // Reload data
      return true; // Return true jika sukses
    } catch (err) {
      console.error("Gagal hapus pengguna:", err);
      return false; // Return false jika gagal
    }
  };

  // Ganti nama fungsi agar lebih spesifik
  const handleUpdateRole = async (id, role) => { 
    try {
      await updateUser(id, { role }); // Hanya kirim role
      loadUsersAndCurrentUser(); // Reload data
      return true; // Return true jika sukses
    } catch (err) {
      console.error("Gagal update role:", err);
      return false; // Return false jika gagal
    }
  };

  return {
    users: filteredUsers,
    loading,
    newUser,
    setNewUser,
    search,
    setSearch,
    currentUserRole, // Kirim role user login ke komponen
    handleAddUser,
    handleDelete,
    handleUpdateRole, // Kirim fungsi update role
  };
};