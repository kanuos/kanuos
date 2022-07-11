module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  images: {
    domains: ["images.unsplash.com", "i.ibb.co"],
  },
  theme: {
    extend: {
      colors: {
        dark: "#171738",
        dark__light: "hsl(240, 30%, 25%)",
        light: "#FFFFFF",
        primary: "#FF0066",
        secondary: "#00BFB3",
      },
      fontFamily: {
        title: ["Cabin Sketch", "monospace"],
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
