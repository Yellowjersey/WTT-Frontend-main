/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xsm: "420px",
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
      '3xl': '1640px',
      // '4xl': '1860px'
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: 12,
          sm: 16,
          md: 24,
        },
      },
      colors: {
        gray: {
          800: '#B4B5B7',
          700: '#EDEDED',
          600: '#656363'
        },
        dark: '#232325',
        danger: '#EC1D25',
        card: '#303030'
      },
      fontWeight: {
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800"
      },
      borderRadius: {
        xs: '8px',
        ss: '10px',
        sm: '14px',
        md: '16px',
        lg: '20px'
      },
      fontFamily: {
        Grotesk: ["Clash Grotesk"],
      },
      boxShadow:{
        theam: "0px 1px 25px 17px rgb(255 0 0 / 30%)",
        menu: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
     },
    },
  },
  plugins: [],
};
