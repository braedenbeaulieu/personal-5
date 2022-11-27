<template>
    <header class="w-full border-2 border-black bg-gray-300">
        <div class="max-w-6xl mx-auto py-2 px-4 flex justify-between items-center">
            <NuxtLink to="/" class="h1 text-3xl font-bold pt-1 pb-2">bb</NuxtLink>
            <div class="flex justify-end items-center">
                <p class="flex items-center" v-html="date_str"></p>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
    let date = ref(new Date())
    // let date_str = ref(date.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}))
    let date_str = ref('')

    let refresh_date_string = () => {
        date.value = new Date()

        let minutes: string = date.value.getMinutes().toString()
        if(date.value.getMinutes() < 10) {
            minutes = `0${date.value.getMinutes().toString()}`
        }

        let meridian = date.value.toLocaleTimeString('en-US').slice(-2)

        date_str.value = `${date.value.getDate()}/${date.value.getMonth() + 1} / ${date.value.getFullYear()} 
               @ ${date.value.getHours()} 
               <span class="animate-blink">:</span> ${minutes} ${meridian}`
    }
    refresh_date_string()

    // every 5 seconds? check the time
    let five_second_interval = setInterval(() => {
        refresh_date_string()
    }, 5000)
</script>