/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        'cream-dark': '#F5EDE0',
        gold: '#B8860B',
        'gold-light': '#E8D5A3',
        'gold-muted': '#C8A24E',
        sage: '#8FA89D',
        'sage-light': '#D4E0DB',
        ink: '#2d2d2d',
        'ink-light': '#6b6b6b',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
