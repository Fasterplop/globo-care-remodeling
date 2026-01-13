// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#F39200', // Naranja Logo
				'primary-dark': '#d98200', // Hover state (calculado)
				neutral: {
					deep: '#1A202C', // Slate Grey (Hero BG)
					light: '#F7FAFC', // Off-white (Fondos generales)
				},
				status: {
					success: '#38A169',
					warning: '#D69E2E',
					error: '#E53E3E',
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'], // Body text
				heading: ['Montserrat', 'sans-serif'], // H1-H6
			},
			backgroundImage: {
				'hero-pattern': "url('/images/hero-bg-overlay.png')", // Placeholder para futuro
			}
		},
	},
	plugins: [],
}