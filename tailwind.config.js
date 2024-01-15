/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#4D3688',
        'darkblue':'#11175D',
         white: '#fff',
         'violate':'#e7b4ff',
         'blue' : '#5c61c6',
         'skyblue' : '#07B8FA',
      },
    },
    fontFamily: {
      'nunito': ['Nunito', 'sans-serif'],
      'nova'  :['Nova Square', 'sans-serif']
    },

  },
  plugins: [],
}