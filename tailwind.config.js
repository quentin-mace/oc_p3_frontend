/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sepia: {
          50: "#fbf6ec",
          100: "#f5ead1",
          200: "#e9d3a6",
          300: "#d8b57a",
          400: "#c69759",
          500: "#a97a3f",
          600: "#8a5f30",
          700: "#6b4823",
          800: "#4c3319",
          900: "#2e1e0f",
        },
      },
    },
  },
  plugins: [],
}