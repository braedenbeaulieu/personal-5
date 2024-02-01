<template>
    <header class="font-mono-2 text-gray-800 w-full border-2 border-black bg-gray-300">
        <div class="max-w-6xl mx-auto py-2 px-4 flex justify-between items-center">
            <NuxtLink to="/" class="h1 text-3xl font-bold pt-1 pb-2">bb</NuxtLink>
            <div class="flex justify-end items-center">
                <p class="flex items-center" v-html="date_str"></p>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
    // Date Functionality
    let date = ref(new Date())
    let refresh_date = () => date.value = new Date()

    let date_str = ref('')
    let refresh_date_string = () => {
        let minutes: string = date.value.getMinutes().toString()
        if(date.value.getMinutes() < 10) {
            minutes = `0${date.value.getMinutes().toString()}`
        }

        let hours: string|number = date.value.getHours() % 12 || 12
        hours = hours < 10 ? `0${hours.toString()}` : hours.toString()

        let meridian = date.value.toLocaleTimeString('en-US').slice(-2)

        date_str.value = `${date.value.getDate()}/${date.value.getMonth() + 1}/${date.value.getFullYear()} @ ${hours} <span class="animate-blink">:</span> ${minutes}${meridian}-05:00`
    }

    onMounted(() => {
        let minute_interval: NodeJS.Timer
        let milliseconds_until_minute_end = ref()
        let refresh_milliseconds_until_minute_end = () => {
            clearInterval(minute_interval)
            milliseconds_until_minute_end.value = (60 - date.value.getSeconds()) * 1000
            minute_interval = setInterval(() => {
                update_date_loop()
            }, milliseconds_until_minute_end.value)
        }
        let update_date_loop = () => {
            refresh_date()
            refresh_date_string()
            refresh_milliseconds_until_minute_end()
        }
        update_date_loop()
    })


    // Weather functionality
    // const { data: weather, pending: pending_weather } = await useFetch('/api/weather')
</script>