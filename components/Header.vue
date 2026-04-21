<style>
[v-cloak] {
  visibility: hidden;
}</style>
<template>
    <header class="font-mono-2 text-gray-800 w-full border-2 border-black bg-gray-300">
        <div class="max-w-6xl mx-auto py-2 px-4 flex justify-between items-center">
            <h1>
                <NuxtLink
                    to="/"
                    class="h1 text-3xl font-bold pt-1 pb-2 flex items-center"
                    :aria-label="a11yTitle"
                >
                    <span v-cloak aria-hidden="true">{{ title }}</span>
                    <span v-cloak aria-hidden="true" class="animate-blink ml-1">|</span>
                </NuxtLink>
            </h1>
            <div class="flex justify-end items-center">
                <p class="flex items-center" v-html="date_str"></p>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">

    const a11yTitle = ref('braedenbeaulieu.ca')
    const title = ref('')

    // ---------- utils ----------
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))
    const random = (base: number, variance: number) =>
        base + Math.random() * variance

    // keyboard proximity map (very simplified QWERTY neighbors)
    const keyMap: Record<string, string[]> = {
        b: ['v', 'n'],
        r: ['e', 't', 'f'],
        a: ['s', 'q', 'z'],
        e: ['w', 'r', 'd'],
        d: ['s', 'f', 'e'],
        n: ['b', 'm'],
        ' ': [' '] // no mistake on space
    }

    // get a nearby wrong key
    const getMistakeChar = (char: string) => {
        const lower = char.toLowerCase()
        // if (!keyMap[lower] || Math.random() < 0) return char // most of the time correct

        const options = keyMap[lower] ?? ''
        return options[Math.floor(Math.random() * options.length)]
    }

    // ---------- typing ----------
    const typeHuman = async (text: string) => {
        for (let i = 0; i < text.length; i++) {
            const correctChar = text[i] ?? ' '

            // randomly decide to make a mistake
            const shouldMistake = Math.random() < 0.10 && correctChar !== ' '

            if (shouldMistake) {
                const wrongChar = getMistakeChar(correctChar)

                // type wrong key
                title.value += wrongChar
                await sleep(random(140, 120))

                // pause like "hmm that's wrong"
                await sleep(random(120, 140))

                // backspace mistake
                title.value = title.value.slice(0, -1)
                await sleep(random(80, 80))
            }

            // type correct key
            title.value += correctChar
            await sleep(random(90, 90))
        }
    }

    // ---------- main animation ----------
    const runTypingAnimation = async () => {
        title.value = ''

        // slower, unsure start
        await typeHuman('braeden')

        // slight pause before last name (very human)
        await sleep(400)
        
        // faster finish (confidence)
        await typeHuman('beaulieu')
        await sleep(200)
        await typeHuman('.ca')
    }

    onMounted(async () => {
        const seen = localStorage.getItem('bb-title-animated')

        if (!seen) {
            await runTypingAnimation()
            localStorage.setItem('bb-title-animated', 'true')
        } else {
            // instant visual fallback
            // title.value = 'braeden beaulieu'
        }

        // accessibility stays constant always
        a11yTitle.value = 'Braeden Beaulieu'
    })

    runTypingAnimation()


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