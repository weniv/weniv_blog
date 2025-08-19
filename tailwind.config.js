// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F8EF7",
        background: "#F5F7FA",
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        soft: "8px 8px 16px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.9)",
        glow: "0 4px 12px rgba(79,142,247,0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-6px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: ".8" },
        },
      },
      animation: {
        float:     "float 4s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
