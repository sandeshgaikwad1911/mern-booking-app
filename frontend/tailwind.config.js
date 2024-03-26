
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},

    // our custom css on container class
    container: {
      padding: {
        md: "2rem"
      }, 
    }

  },
  plugins: [],
}
