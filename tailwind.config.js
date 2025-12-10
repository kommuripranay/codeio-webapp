/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Main text font
        sans: ['Inter', 'sans-serif'],
        // Futuristic accent font (Orbitron is a free alternative to Bitcount for this demo)
        tech: ['Orbitron', 'sans-serif'], 
      },
      colors: {
        // A flat, deep futuristic palette
        cyber: {
          black: '#0a0a0a',
          dark: '#121212',
          gray: '#2a2a2a',
          text: '#e5e5e5',
          accent: '#ffffff', // Pure white for high contrast "less is more"
        }
      }
    },
  },
  plugins: [],
}