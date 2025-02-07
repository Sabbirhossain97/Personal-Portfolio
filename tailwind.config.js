/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'custom': '920px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'sans': ['Poppins'],
      }
    },
    backgroundSize: {
      '6rem-4rem': '2rem 2rem',
      '16px-16px': '16px 16px'
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
