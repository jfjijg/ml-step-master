import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        mist: "#f5f8f7",
        leaf: "#0f9f8f",
        coral: "#ff6f61",
        sky: "#4678f6",
        gold: "#f4b63f"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 33, 43, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
