import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { getCareers } from "../services/careersService";
import { getPartnerships } from "../services/partnershipService";
import { getLayananUmum } from "../services/layananUmumService";
import { getLayananBisnis } from "../services/layananBisnisService";
import { getPesanKontak } from "../services/contactService";

// Format nama type layanan
const formatTypeName = (raw) =>
  !raw
    ? "Lainnya"
    : raw
        .replace(/_/g, " ")
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

// Format tanggal pesan
export const formatMessageDate = (date) => {
  if (!date) return "-";
  try {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "-";
  }
};

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    careers: 0,
    partnerships: 0,
    services: 0,
  });

  const [businessTypeData, setBusinessTypeData] = useState([]);
  const [careerStatusData, setCareerStatusData] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [users, careers, partnerships, layUmum, layBisnis, contacts] =
        await Promise.all([
          getUsers().catch(() => []),
          getCareers().catch(() => []),
          getPartnerships().catch(() => []),
          getLayananUmum().catch(() => []),
          getLayananBisnis().catch(() => []),
          getPesanKontak().catch(() => []),
        ]);

      setStats({
        users: users?.length || 0,
        careers: careers?.length || 0,
        partnerships: partnerships?.length || 0,
        services: (layUmum?.length || 0) + (layBisnis?.length || 0),
      });

      // Chart Layanan
      if (layBisnis?.length > 0) {
        const typeCounts = layBisnis.reduce((acc, curr) => {
          const name = formatTypeName(curr.type);
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});
        setBusinessTypeData(
          Object.keys(typeCounts).map((key) => ({
            name: key,
            value: typeCounts[key],
          }))
        );
      }

      // Chart Karir
      if (careers?.length > 0) {
        const opened = careers.filter((c) => c.status === "dibuka").length;
        const closed = careers.length - opened;
        setCareerStatusData(
          opened || closed
            ? [
                { name: "Dibuka", value: opened },
                { name: "Ditutup", value: closed },
              ]
            : []
        );
      }

      // Pesan Terbaru
      if (contacts?.length > 0) {
        const sorted = [...contacts].sort((a, b) => b.id - a.id);
        setRecentMessages(sorted.slice(0, 5));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    stats,
    businessTypeData,
    careerStatusData,
    recentMessages,
    formatMessageDate,
  };
};
