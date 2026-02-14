/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#09090b',
          100: '#18181b',
          200: '#27272a',
          300: '#3f3f46',
          400: '#52525b',
          500: '#71717a',
          600: '#a1a1aa',
          700: '#d4d4d8',
          800: '#e4e4e7',
          900: '#fafafa',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          purple: '#a78bfa',
          blue: '#60a5fa',
          cyan: '#22d3ee',
          pink: '#f472b6',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 30px rgba(34, 197, 94, 0.4)',
        'premium': '0 10px 50px rgba(0, 0, 0, 0.5), 0 5px 25px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '20px',
        lg: '40px',
      },
    },
  },
  plugins: [],
}