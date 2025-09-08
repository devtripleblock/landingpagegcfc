/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // base
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // brand colors
        brand: {
          navy:   '#0B2E6B', // primary
          red:    '#E10600', // secondary
          orange: '#F36C21', // hover / active
          light:  '#E8EEF8',
          dark:   '#082250',
        },
      },
      boxShadow: {
        soft: '0 6px 24px rgba(11,46,107,.12)',
      },
    },
  },
  plugins: [],
}
