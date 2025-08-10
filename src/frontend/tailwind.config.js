/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        pinkish: "#f3b1fa",
        greenish: "#133317",
        grayish: "#f5f5f5"
      }
    }
  }
};
