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
				'mono-2': 'videotype'
			},
			animation: {
				blink: 'blink 2s linear infinite',
				marquee: 'marquee 45s linear infinite',
				marquee2: 'marquee2 45s linear infinite',
			},
			keyframes: {
				blink: {
					'0%, 50%': { opacity: '0' },

					'51%, 100%': { opacity: '1' },
				},
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				marquee2: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0%)' },
				},
			}
		},
	},
	plugins: [],
}
