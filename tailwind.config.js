/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: '#00FF00',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const topUtilities = {};
      const bottomUtilities = {}
      const leftUtilities = {};
      const rightUtilities={};

      for (let i = 0; i <= 1000; i++) {
        topUtilities[`.pxt-${i}`] = { top: `${i}px` };
      }
      for (let i = 0; i <= 1000; i++) {
        bottomUtilities[`.pxb-${i}`] = { bottom: `${i}px` };
      }
      for (let i = 0; i <= 1000; i++) {
        leftUtilities[`.pxl-${i}`] = { left: `${i}%` };
      }
      for (let i = 0; i <= 1000; i++) {
        rightUtilities[`.pxr-${i}`] = { right: `${i}%` };
      }

      addUtilities(topUtilities, ['responsive']);
      addUtilities(bottomUtilities, ['responsive']);
      addUtilities(leftUtilities, ['responsive']);
      addUtilities(rightUtilities, ['responsive']);
    },
    function ({ addUtilities }) {
      const widthUtilities = {};

      for (let i = 0; i <= 1000; i++) {
        widthUtilities[`.wpx-${i}`] = { width: `${i}px` };
      }
      addUtilities(widthUtilities, ['responsive']);
    },
    function ({ addUtilities }) {
      const heightUtilities = {};
      for (let i = 0; i <= 1000; i++) {
        heightUtilities[`.hpx-${i}`] = { height: `${i}px` };
      }

      addUtilities(heightUtilities, ['responsive']);
    },
    // Other plugins if you have...
  ],
};
