/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bd-background': 'var(--background)',
        'bd-background-alt': 'var(--background-alt)',
        'bd-highlight': 'var(--highlight)',
        'bd-text-primary': 'var(--text-primary)',
        'bd-text-secondary': 'var(--text-secondary)',
        'bd-border': 'var(--border)',
      },
      fontFamily: {
        primary: ['Anaheim', 'sans-serif'],
        display: ['Courier Prime', 'monospace'],
      },
    },
  },
  plugins: [],
}; 