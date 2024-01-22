/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 100: "#4B485Bff", 200: "#2A2738ff", 300: "#262333ff", 400: "#1A1B27ff" },
      },
    },
  },
  plugins: [],
};
