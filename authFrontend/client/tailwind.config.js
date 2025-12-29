/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true, // centers container automatically
      padding: {
        DEFAULT: "1rem", // mobile default
        sm: "2rem", // ≥640px
        lg: "4rem", // ≥1024px
        xl: "5rem", // ≥1280px
        "2xl": "6rem", // ≥1536px
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#9333EA",
        accent: "#F59E0B",
      },
      fontFamily: {
        outfit: ["Outfit", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
