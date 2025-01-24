/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
            100: "#eeeeef",
            200: "#e6e9ed",
            600: "#95989c",
            300: '#C2C8E1'
        },
        purple : {
          300: "#d9ddee",
          500: "#9492db",
          600: "#7164c0"
        }
      }
    },
  },
  plugins: [],
}