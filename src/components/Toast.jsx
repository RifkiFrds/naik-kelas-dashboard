import toast from "react-hot-toast";

export const Toast = {
  success: (message) =>
    toast.success(message, {
      style: {
        borderRadius: "10px",
        background: "#1f2937", // gray-800
        color: "#fff",
        padding: "12px 16px",
        fontSize: "14px",
      },
      iconTheme: {
        primary: "#4ade80", // green-400
        secondary: "#1f2937",
      },
    }),

  error: (message) =>
    toast.error(message, {
      style: {
        borderRadius: "10px",
        background: "#1f2937",
        color: "#fff",
        padding: "12px 16px",
        fontSize: "14px",
      },
      iconTheme: {
        primary: "#f87171", // red-400
        secondary: "#1f2937",
      },
    }),

  info: (message) =>
    toast(message, {
      style: {
        borderRadius: "10px",
        background: "#2563eb", // blue-600
        color: "#fff",
        padding: "12px 16px",
        fontSize: "14px",
      },
    }),
};
