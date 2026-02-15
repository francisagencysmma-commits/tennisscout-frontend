/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          neon: '#cdff00',
          bright: '#d4ff1a',
          glow: '#e0ff4d',
        },
        dark: {
          deepest: '#0a0a0a',
          deep: '#141414',
          base: '#1a1a1a',
          light: '#2a2a2a',
          lighter: '#3a3a3a',
        },
        cream: {
          50: '#fefef8',
          100: '#fdfdf0',
          200: '#fcfce8',
          300: '#fafad8',
        },
        forest: {
          dark: '#1e3a1e',
          base: '#2d5a2d',
          light: '#3d6a3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(205, 255, 0, 0.5)',
        'neon-lg': '0 0 40px rgba(205, 255, 0, 0.6)',
        'dark': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}