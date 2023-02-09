const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Yu Gothic"', ...defaultTheme.fontFamily.sans],
    },
    //Google FontsにはYu Gothic medium/Yu Gothic/YuGothicは含まれないのでいれるかどうかは検討
    fontWeight: {
      light: 300,
      normal: 400,
      bold: 600,
      extrabold: 700,
    },
    colors: {
      primary: {
        50: '#F6FAF9',
        100: '#E2F1EC',
        200: '#CDE6DE',
        500: '#7FC0AA',
        800: '#47746A',
        900: '#2A443E',
      },
      gray: {
        50: '#F9F9F9',
        100: '#EDEDEE',
        200: '#E0E1E1',
        500: '#B2B3B5',
        800: '#6A6C70',
        900: '#3C4044',
      },
      orange: '#F2994A',
      yellow: '#F2C94C',
      black: '#3C4044',
      white: '#F9F9F9',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.5rem',
      xl: '1.875rem',
      '2xl': '2.25rem',
    },
    extend: {},
  },
  plugins: [],
};
