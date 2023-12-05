/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif', 'Arial']
      },
      colors:{
        'slate-gray': '#738290',
        'powder-blue': '#A1B5D8',
        'offwhite': '#FFFCF7',
        'nyanza': '#E4F0D0',
        'tea-green': '#C2D8B9'

      }
    },
  },
  plugins: [],
}

