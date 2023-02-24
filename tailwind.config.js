/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        drblue: {
          500: "#22577A",
        },
        topaz: {
          500: "#38A3A5",
        },
        emerald: {
          500: "#57CC99",
        },
        forest: {
          500: "#80ED99",
        },
        kiwi: {
          500: "#C7F9CC",
        },
      },
      fontFamily: {
        chuckfive: ["Chuckfive", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      spacing: {
        80: "28rem",
        100: "33rem",
      },
      backgroundImage: {
        "title-back": "url('img/title_back.png')",
      },
    },
  },
  plugins: [],
};
