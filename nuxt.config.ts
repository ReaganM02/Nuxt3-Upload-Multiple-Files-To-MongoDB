// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt'
    ],
    nitro: {
        plugins: ['~/server/database.ts'],
        serverAssets: [
            {
                baseName: '',
                dir: 'assets',
            },
        ],
    },
    runtimeConfig: {
        apiSecret: {
            MONGO_URL: process.env.MONGO_URL
        }
    },
})
