/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#b3e0ff',
          200: '#80caff',
          300: '#4db4ff',
          400: '#1a9eff',
          500: '#0088e6',
          600: '#006bb3',
          700: '#004f80',
          800: '#00334d',
          900: '#00171a',
        },
        accent: {
          50: '#ffe6e6',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#ff1a1a',
          500: '#e60000',
          600: '#b30000',
          700: '#800000',
          800: '#4d0000',
          900: '#1a0000',
        },
        success: {
          500: '#00e676',
        },
        warning: {
          500: '#ffb300',
        },
        error: {
          500: '#ff1744',
        },
        background: {
          dark: '#0a0e17',
          card: 'rgba(16, 20, 30, 0.75)',
        },
        severity: {
          critical: '#ff1744',
          high: '#ff9100',
          medium: '#ffea00',
          low: '#00b0ff',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #0088e6, 0 0 15px #0088e6',
        'neon-red': '0 0 5px #ff1744, 0 0 15px #ff1744',
        'neon-yellow': '0 0 5px #ffea00, 0 0 15px #ffea00',
        'neon-orange': '0 0 5px #ff9100, 0 0 15px #ff9100',
      },
      animation: {
        'glow-pulse-critical': 'glow-pulse-red 2s infinite',
        'glow-pulse-high': 'glow-pulse-orange 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse-red': {
          '0%, 100%': { boxShadow: '0 0 5px #ff1744, 0 0 15px #ff1744' },
          '50%': { boxShadow: '0 0 15px #ff1744, 0 0 25px #ff1744' },
        },
        'glow-pulse-orange': {
          '0%, 100%': { boxShadow: '0 0 5px #ff9100, 0 0 10px #ff9100' },
          '50%': { boxShadow: '0 0 10px #ff9100, 0 0 20px #ff9100' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'cyber-grid': "url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg')",
      },
    },
  },
  plugins: [],
};