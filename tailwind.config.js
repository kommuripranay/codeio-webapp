/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // UPDATED: Now points to the correct Google Font name
        tech: ['"Bitcount Grid Double"', 'system-ui', 'sans-serif'], 
      },
      colors: {
        cyber: {
          black: '#0a0a0a',
          dark: '#121212',
          gray: '#2a2a2a',
          text: '#e5e5e5',
          accent: '#ffffff', 
        }
      }
    },
  },
  plugins: [],
}