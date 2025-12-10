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
        tech: ['"Bitcount Grid Double"', 'system-ui', 'sans-serif'], 
      },
      colors: {
        cyber: {
          black: '#0a0a0a', // Deepest black
          dark: '#121212',  // Surface black
          gray: '#2a2a2a',  // Borders
          text: '#e5e5e5',  // Main text
          accent: '#818cf8', // NEW: Indigo-Violet
        }
      }
    },
  },
  plugins: [],
}