import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        secondary: "#FFB300",
        cta: "#4CAF50",
        danger: "#D32F2F",
        background: "#F5F5F5",
      },
      fontFamily: {
        ibm: ["var(--font-ibm)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 14px 40px rgba(15, 23, 42, 0.06)",
        premium: "0 24px 70px rgba(15, 23, 42, 0.08)",
        button: "0 12px 32px rgba(46, 125, 50, 0.18)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top right, rgba(46,125,50,0.16), transparent 35%), radial-gradient(circle at bottom left, rgba(255,179,0,0.12), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
