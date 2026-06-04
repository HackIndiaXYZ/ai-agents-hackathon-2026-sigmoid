import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        // Design tokens mapped to CSS vars
        void: "#060714",
        surface: "#101426",
        elevated: "#181d33",

        // Brand
        brand: {
          cyan: "#00E5FF",
          purple: "#7C4DFF",
          accent: "#16F2B3",
        },

        // Status
        status: {
          success: "#00E676",
          warning: "#FFB300",
          danger: "#FF5252",
        },

        // Glass border
        "glass-border": "rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-surface": "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        "aurora-glow": "radial-gradient(ellipse at center, rgba(124,77,255,0.15) 0%, transparent 60%)",
        "danger-glow": "radial-gradient(ellipse at center, rgba(255,82,82,0.2) 0%, transparent 70%)",
        "cyan-glow": "radial-gradient(ellipse at center, rgba(0,229,255,0.15) 0%, transparent 60%)",
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "emergency-flash": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,82,82,0.4), inset 0 0 20px rgba(255,82,82,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(255,82,82,0.7), inset 0 0 40px rgba(255,82,82,0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "sos-ring": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(3.5)", opacity: "0" },
        },
        "border-emergency": {
          "0%, 100%": { borderColor: "rgba(255,82,82,0.4)" },
          "50%": { borderColor: "rgba(255,82,82,0.9)" },
        },
        "scan-line": {
          "0%": { top: "-2px" },
          "100%": { top: "100%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "emergency-flash": "emergency-flash 0.8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 1.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "sos-ring": "sos-ring 2s ease-out infinite",
        "border-emergency": "border-emergency 1s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      boxShadow: {
        "cyan-glow": "0 0 30px rgba(0,229,255,0.3)",
        "purple-glow": "0 0 30px rgba(124,77,255,0.3)",
        "red-glow": "0 0 30px rgba(255,82,82,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "glass-lg": "0 16px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      backdropBlur: {
        xs: "4px",
        "2xl": "40px",
        "3xl": "60px",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
