/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      variants: {},

      fontFamily: {
        gloria: ["Gloria Hallelujah", "cursive"],
        nunito: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      colors: {
        dark: "#131313",
        secondary: "#99e1d9",
        light: "#fcfcfc",
        primary: "#70abaf",
        terciary: "#705d56",
        navy: "#c518bd",
      },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
  },
};
