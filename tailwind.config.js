/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    container: {
      padding: {
        DEFAULT: "30px",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#00407d",
        accent: "#ECB119",
        secondary: "#001f4f",
        primary_light: "#2B5491",
        secondary_light: "#2971c4",
      },
      backgroundImage: {
        hero: "url('./assets/img/bg.jpg')",
      },
    },
  },
  plugins: [],
};
