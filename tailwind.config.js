/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        finternet: {
          primary: "#0ea5e9",
          secondary: "#8b5cf6",
          accent: "#10b981",
          dark: "#0f172a",
          card: "#1e293b",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
