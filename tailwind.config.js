/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#D13F4A',
          600: '#B8363F',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#450a0a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#204C13',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in-right': 'fade-in-right 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'spice-dance': 'spice-dance 4s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          'from': {
            opacity: '0'
          },
          'to': {
            opacity: '1'
          }
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-right': {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        'spice-dance': {
          '0%, 100%': {
            transform: 'rotate(0deg) scale(1)'
          },
          '25%': {
            transform: 'rotate(5deg) scale(1.1)'
          },
          '75%': {
            transform: 'rotate(-5deg) scale(0.9)'
          }
        }
      }
    },
  },
  plugins: [],
};