/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Parkinsans: 'Parkinsans',
        Poppins: 'Poppins'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

