module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      fontFamily : {
        'special' : ['Comforter', 'sans-serif']
      },
      extend : {
        colors : {
          'dark' : '#171738',
          'light' : '#FFFFFF',
          'primary' : '#FF0066',
          'secondary' : '#00BFB3'
        }
      }
  },
  plugins: [],
}

