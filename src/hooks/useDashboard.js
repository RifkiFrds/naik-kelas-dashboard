import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { getCareers } from "../services/careersService";
import { getPartnerships } from "../services/partnershipService";
import { getLayananUmum } from "../services/layananUmumService";
import { getLayananBisnis } from "../services/layananBisnisService";
import { getPesanKontak } from "../services/contactService";
import { getEvent } from "../services/eventService"; 

// Format nama type layanan
const formatTypeName = (raw) =>
  !raw
    ? "Lainnya"
    : raw
        .replace(/_/g, " ")
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

// Format tanggal pesan / event
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

  // ⬇️ NEW STATE FOR EVENTS
  const [upcomingEvent, setUpcomingEvent] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        users,
        careers,
        partnerships,
        layUmum,
        layBisnis,
        contacts,
        events,
      ] = await Promise.all([
        getUsers().catch(() => []),
        getCareers().catch(() => []),
        getPartnerships().catch(() => []),
        getLayananUmum().catch(() => []),
        getLayananBisnis().catch(() => []),
        getPesanKontak().catch(() => []),
        getEvent().catch(() => []), 
      ]);

      // -------------------------
      // STATS CARD TOTALS
      // -------------------------
      setStats({
        users: users?.length || 0,
        careers: careers?.length || 0,
        partnerships: partnerships?.length || 0,
        services: (layUmum?.length || 0) + (layBisnis?.length || 0),
      });

      // -------------------------
      // CHART LAYANAN BISNIS
      // -------------------------
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

      // -------------------------
      // CHART STATUS KARIR
      // -------------------------
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

      // -------------------------
      // PESAN KONTAK TERBARU (LIMIT 5)
      // -------------------------
      if (contacts?.length > 0) {
        const sorted = [...contacts].sort((a, b) => b.id - a.id);
        setRecentMessages(sorted.slice(0, 5));
      }

      // -------------------------
      // UPCOMING EVENTS (LIMIT 3)
      // -------------------------
      if (events?.length > 0) {
        const sorted = [...events].sort(
          (a, b) => new Date(a.tanggal_mulai) - new Date(b.tanggal_mulai)
        );
        setUpcomingEvent(sorted.slice(0, 3));
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
    upcomingEvent, // ⬅️ Jangan lupa return
    formatMessageDate,
  };
};
