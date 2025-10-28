import React from "react";
import { useContact } from "../hooks/useContact";
import { Eye, Trash2, Mail, MailOpen } from "lucide-react";
import Swal from "sweetalert2";
import { Toast } from "../components/Toast";

const ContactMessage = () => {
  const {
    pesan,
    loading,
    selected,
    setSelected,
    handleRead,
    handleDelete,
  } = useContact();

  const confirmDelete = (id, nama) => {
    Swal.fire({
      title: `Hapus pesan dari ${nama}?`,
      text: "Aksi ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      background: "#1f2937",
      color: "#f9fafb",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(id);
        Toast.success(`Pesan dari ${nama} dihapus 🗑️`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Mail className="w-8 h-8 text-primary inline-block mr-2" /> Manajemen Pesan Kontak
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daftar Pesan */}
        <div className="col-span-1 bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
          {loading ? (
            <p className="text-center text-gray-500">Memuat pesan...</p>
          ) : pesan.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {pesan.map((item) => (
                <li
                  key={item.id}
                  className={`p-3 cursor-pointer flex justify-between items-center rounded-lg transition ${
                    item.dibaca
                      ? "hover:bg-gray-50 dark:hover:bg-gray-800"
                      : "bg-indigo-50 dark:bg-indigo-900"
                  }`}
                  onClick={() => handleRead(item)}
                >
                  <div>
                    <p className="font-semibold text-gray-700">{item.nama}</p>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {item.dibaca ? (
                      <MailOpen className="text-green-500" size={18} />
                    ) : (
                      <Mail className="text-red-500" size={18} />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(item.id, item.nama);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Tidak ada pesan</p>
          )}
        </div>

        {/* Detail Pesan */}
        <div className="col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow min-h-[300px]">
          {selected ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <h2 className="text-xl font-semibold text-gray-700">Detail Pesan</h2>
                <Eye className="text-primary" />
              </div>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Nama:</span> {selected.nama}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {selected.email}
                </p>
                {selected.nomor_telepon && (
                  <p>
                    <span className="font-medium">Telepon:</span>{" "}
                    {selected.nomor_telepon}
                  </p>
                )}
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="whitespace-pre-line">{selected.pesan}</p>
                </div>
              </div>
              {selected.dibaca ? (
                <span className="text-xs text-green-500">
                  Dibaca pada: {new Date(selected.dibaca).toLocaleString()}
                </span>
              ) : (
                <span className="text-xs text-red-500">Belum dibaca</span>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-20">
              Pilih pesan untuk melihat detail 📩
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessage;
