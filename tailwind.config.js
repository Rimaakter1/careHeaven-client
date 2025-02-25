import { CgDarkMode } from 'react-icons/cg';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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

