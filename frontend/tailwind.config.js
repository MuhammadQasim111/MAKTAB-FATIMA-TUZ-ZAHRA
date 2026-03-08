/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        deep: '#0D0A06',
        rust: '#8B3A2A',
        cream: '#F5EDD9',
        warm: '#E8D9BF',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        ibm: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
