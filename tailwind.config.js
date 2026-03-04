/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0B0F19",
        electric: "#2563EB",
        ai: "#7C3AED",
        cyansoft: "#67E8F9",
        mist: "#94A3B8",
        snow: "#F8FAFC"
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Syne", "sans-serif"],
        display: ["Bodoni Moda", "serif"],
        script: ["Great Vibes", "cursive"]
      },
      boxShadow: {
        glowBlue: "0 0 42px rgba(37, 99, 235, 0.28)",
        glowPurple: "0 0 48px rgba(124, 58, 237, 0.24)"
      },
      backgroundImage: {
        heroGlow:
          "radial-gradient(40% 40% at 50% 45%, rgba(37, 99, 235, 0.42) 0%, rgba(124, 58, 237, 0.20) 42%, rgba(11, 15, 25, 0) 100%)"
      }
    }
  },
  plugins: []
};
