/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'black': '#0F0F0F',
        'white': '#f5f5f5',
        'light-gray': '#aaaaaa',
        'dark-gray': '#606060',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

