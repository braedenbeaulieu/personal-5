// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            meta: [
                {
                    'name': 'viewport',
                    'content': 'width=device-width, initial-scale=1'
                },
                {
                    'charset': 'utf-8'
                }
            ],
            title: 'braedenbeaulieu',
            script: [{ src:'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js' }]
        }
    }
})
