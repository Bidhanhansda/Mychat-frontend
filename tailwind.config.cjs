/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        'appBackground': '#4D3B64',
        'componentBackground': '#3B2D4D',
        'selectSidebar': '#7B4F8E',
        'siebarText' : '#ffdeff',
        'date' : '#ab7cbe',
        'loginBG' : '#7B4F8E',

      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        home:['Kanit', 'sans-serif'],
        homeButton:['Poppins', "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
    
  },
  plugins: [],
};