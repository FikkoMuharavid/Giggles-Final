/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Sesuaikan dengan struktur proyek Anda
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-gray": "rgba(153, 153, 153, 0.45)",
      },
      textShadow: {
        glow: "0 0 30px rgba(255, 255, 255, 0.3)",
      },
      boxShadow: {
        "custom-inset": "inset 0px 0px 11.6px 0px rgba(0, 0, 0, 0.66)",
      },
    },
  },
  plugins: [],
};