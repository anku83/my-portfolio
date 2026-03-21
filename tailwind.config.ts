import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0C",
        surface: "#111113",
        card: "#151518",
        border: "#232326",
        borderHover: "#2E2E32",
        primaryText: "#FAFAFA",
        secondaryText: "#A1A1AA",
        accent: "#E11D48",
        accentHover: "#BE123C",
        accentAlt: "#F59E0B",
        tagText: "#D4D4D8"
      },
      boxShadow: {
        glass: "0 4px 20px rgba(0,0,0,0.4)",
        glow: "0 6px 18px rgba(225,29,72,0.18)",
        ember: "0 4px 20px rgba(0,0,0,0.4)"
      },
      backgroundImage: {
        "hero-radial":
          "linear-gradient(to bottom, #0B0B0C, #0E0E11)"
      },
      borderRadius: {
        "4xl": "2rem",
        glass: "14px"
      },
      fontFamily: {
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Georgia", "serif"],
        body: ["Aptos", "Segoe UI Variable", "Trebuchet MS", "Verdana", "sans-serif"]
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 6px 18px rgba(225,29,72,0.12)" },
          "50%": { boxShadow: "0 6px 18px rgba(225,29,72,0.18)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
