/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  // plugins: [],
  plugins: [require("daisyui")],
};
