/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        primary: '#39FF14',
        secondary: '#FF6F31',
        surface: '#2A2A2E',
        'surface-dark': '#1E1E20',
        'text-light': '#EAEAEA',
        'text-dark': '#CCCCCC',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '64': '64px',
      },
      borderRadius: {
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
      },
    },
  },
  plugins: [],
};