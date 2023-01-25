/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2b2b2b',
        reverse: '#d8d2c3',
        lighttext: '#515151',
        card: '#d4ccbd',
        borders: '#a19a8f70',
        darkborder: '#beb6a9',
      },
    },
  },
  plugins: [],
};
