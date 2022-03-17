module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend : {
        colors : {
          'dark' : '#171738',
          'light' : '#FFFFFF',
          'primary' : '#FF0066',
          'secondary' : '#00BFB3'
        }
      }
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}

