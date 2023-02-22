/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/tailvue/dist/tailvue.es.js',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
  safelist: [
    'w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10', 'w-11', 'w-12', 'w-14', 'w-16',
    'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-11', 'h-12', 'h-14', 'h-16',
    '-left-1', '-left-2', '-left-3', '-left-4', '-left-5', '-left-6', '-left-7', '-left-8', '-left-9', '-left-10', '-left-12', '-left-14',
  ],
}
