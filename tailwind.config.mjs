/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F39200', // Naranja Logo [cite: 366]
          primaryDark: '#D47F00', // Para accesibilidad 
        },
        neutral: {
          deep: '#1A202C', // Slate Grey [cite: 367]
          surface: '#F7FAFC', // Off-white [cite: 368]
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Body [cite: 372]
        display: ['Montserrat', 'sans-serif'], // Headings [cite: 371]
      },
      spacing: {
        '8pt': '8px', // 8pt Grid 
      },
      borderRadius: {
        'brand': '4px', // Precisión [cite: 374]
      }
    },
  },
  plugins: [],
}