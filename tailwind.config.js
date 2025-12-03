/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        naikkelas: {
          "primary": "#FFBC41",
          "primary-focus": "#E5A73A", // sedikit lebih gelap
          "primary-content": "#000B2C",

          "secondary": "#000B2C",
          "secondary-focus": "#0A123D",
          "secondary-content": "#FFBC41",

          "accent": "#FFBC41",
          "neutral": "#1d1d1d",

          "base-100": "#ffffff",
          "info": "#0A123D",
          "success": "#22c55e",
          "warning": "#fbbf24",
          "error": "#ef4444",
        },
      },
      "light",
    ],
  },

  plugins: [require("daisyui")],
};
