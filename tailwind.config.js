/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: "#121212",
        smoke: "whitesmoke",
        secondary: "#1D1D1D",
        white: "#FFFFFF",
        grayLight: "#C4C5C5",
        blue: "#0077FF",
        indigo: "#5453E0",
        green: "#20BD5F",
        red: "#F44336",
        pink: "#E91E63",
        grayDark: "#323232",
        grayDarker: "#262626",
      },
    },
  },
  plugins: [],
};
