/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Inter para texto corrido, Space Grotesk para titulos: la segunda tiene
        // mucha mas personalidad, pero cansa en parrafos largos.
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk Variable"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        // Capas de color del fondo tipo aurora del layout.
        "pulse-slow": "pulse-slow 9s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        // Cursor del bloque de codigo del hero.
        blink: "blink 1.1s step-end infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-40px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
