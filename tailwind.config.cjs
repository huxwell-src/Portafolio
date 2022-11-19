/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
     colors: {
      'dark-blue' : '#2C3E50',
      'light-blue' : '#3498DB',
      'hyper-light-blue' : '#25A6FC',
      'hyper-dark-blue' : '#101A32',
      'light-gray' : '#F3F3F3',
      'gray' : "#ECF0F1",
      'white' : '#FFF',
      'day' : '#f39c12'
     },
     backgroundImage: {
      'sun': "url('src/assets/img/sun.svg')",
      'moon': "url('src/assets/img/moon.svg')"
    },
    backgroundSize: {
      '75%': '75%',
    },
     extend: {
      height: {
        'header': '85vh',
      },
      spacing: {
        '2.5px': '2.5px',
      },
      backgroundImage: {
        'logo': "url('./src/assets/img/logo.svg')",
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      fontFamily: {
        'poppins' : 'Poppins',
        'roboto' : 'Roboto'
      }
     }
   },
   plugins: [],
 });
