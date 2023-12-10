/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        'darkPurple': '#2A294D',
        'lightPurple': '#3C3B6E',
        'lightGrey': '#B6BBC4',
      },
    }
  }
}

