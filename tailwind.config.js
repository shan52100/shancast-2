/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-blue': {
          light: '#0ea5e9',
          dark: '#0c4a6e',
        },
        'theme-gold': {
          light: '#fbbf24',
          dark: '#92400e',
        },
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(to right, #000000, #0ea5e9)',
        'gradient-gold': 'linear-gradient(to right, #000000, #fbbf24)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};