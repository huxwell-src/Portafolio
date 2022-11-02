/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
     colors: {
      'dark-blue' : '#2C3E50',
      'light-blue' : '#3498DB',
      'hyper-light-blue' : '#25A6FC',
      'hyper-dark-blue' : '#101A32',
      'light-gray' : '#F3F3F3',
      'white' : '#FFF'
     },
     extend: {
      height: {
        'header': '85vh',
      },
      fontFamily: {
        'poppins' : 'Poppins',
        'roboto' : 'Roboto'
      }
     }
   },
   plugins: [],
 };
