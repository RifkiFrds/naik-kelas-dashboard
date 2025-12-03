import toast from "react-hot-toast";

const COLOR = {
  primary: "#FFBC41",
  secondary: "#000B2C",
};

export const Toast = {
  success: (message) =>
    toast.success(message, {
      style: {
        borderRadius: "10px",
        background: COLOR.primary,     // gold
        color: COLOR.secondary,        // navy text
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
      },
      iconTheme: {
        primary: COLOR.secondary,      // navy icon bg
        secondary: COLOR.primary,      // gold icon symbol
      },
    }),

  error: (message) =>
    toast.error(message, {
      style: {
        borderRadius: "10px",
        background: COLOR.secondary,    // navy background
        color: "#fff",                  // bright white text
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
      },
      iconTheme: {
        primary: "#ff4d4d",             // red semi-gold blend
        secondary: COLOR.secondary,     // navy circle
      },
    }),

  info: (message) =>
    toast(message, {
      style: {
        borderRadius: "10px",
        background: "#0A123D",          // darker version of secondary
        color: COLOR.primary,           // gold text
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
        borderLeft: `4px solid ${COLOR.primary}`, // gold marker accent
      },
      iconTheme: {
        primary: COLOR.primary,
        secondary: "#0A123D",
      },
    }),
};
