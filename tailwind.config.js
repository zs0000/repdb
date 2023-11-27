/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";
export default withUt( {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      screens: {
        'xs': '200px',
        // => @media (min-width: 640px) { ... }
  
        'sm': '400px',
        'md': '666px',
        // => @media (min-width: 1024px) { ... }
  
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1920px',
        '3xl': '1999px',
        // => @media (min-width: 1280px) { ... }
      },
      colors:{
        'primary':'#3d7245',
        'secondary':'#c86733',
        'accent':'#f0c05a'
      }
    },
  },
  plugins: [],
}
)