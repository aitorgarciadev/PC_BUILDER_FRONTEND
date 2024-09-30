/** @type {import('tailwindcss').Config} */

import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
      variants: {},
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#edfbff",
          100: "#d6f4ff",
          200: "#b6edff",
          300: "#83e4ff",
          400: "#49d2ff",
          500: "#1fb5ff",
          600: "#0798ff",
          700: "#017ced",
          800: "#0865c5",
          900: "#0e569a",
          950: "#0e345d",
        },
        dark: {
          50: "#0A0A0A",
        },
      },
    },
    plugins: [aspectRatio, forms],
  },
};
