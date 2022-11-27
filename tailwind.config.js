/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {
			fontFamily: {
				'mono-2': 'old-school-adventures'
			},
			animation: {
				'blink': 'blink 2s linear infinite',
			},
			keyframes: {
				blink: {
					'0%, 50%': { opacity: '0' },

					'51%, 100%': { opacity: '1' },
				}
			}
		},
	},
	plugins: [],
}
