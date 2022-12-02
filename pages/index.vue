<template>
    <section class="bg-gray-200 p-4 m-4 border-2 border-black col-span-12">
        <div class="m-4 border-2 border-black border-r-4 border-b-4 bg-white flex overflow-x-hidden relative">
            <div class="animate-marquee whitespace-nowrap p-4">
                <h2 class="text-xl md:text-3xl text-center">Website Developer | WordPress Expert | Website Developer | WordPress Expert | Dog Walker |</h2>
            </div>
            <div class="animate-marquee2 whitespace-nowrap absolute top-0 p-4">
                <h2 class="text-xl md:text-3xl text-center">Website Developer | WordPress Expert | Website Developer | WordPress Expert | Dog Walker |</h2>
            </div>
        </div>
    </section>
    <div class="grid grid-cols-6 md:grid-cols-12 gap-4 m-4">
        <section class="bg-gray-200 p-4 border-2 border-black col-span-6 md:col-span-4 grid content-end">
            <div class="speech-bubble p-4 justify-self-center">
                <h2 class="text-xl">Hello!</h2>
                <p class="text-sm">I'm Braeden, a Web Developer at Elev8 Web Studio. Take a look at some of the website projects I've created for clients in and around around Windsor & Essex County!</p>
            </div>
            <div class="max-w-sm justify-self-center"><img class="max-w-full" src="~/assets/img/super-mario.gif" alt="Mario"></div>
        </section>

        <section class="bg-gray-200 border-2 border-black col-span-6 md:col-span-8">
            <div class="border-b-2 border-black">
                <h2 class="h-16 mx-4 px-2 text-xl text-center uppercase flex items-center justify-between">
                    Portfolio Data
                    <svg class="-mr-1" width="28px" height="28px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="m74.801 84.102h6.1992v6.1992h-6.1992z"/>
                            <path d="m68.602 9.6016h6.1992v6.1992h-6.1992z"/>
                            <path d="m81 77.898v6.2031h6.1992v-12.402h-6.1992z"/>
                            <path d="m87.199 65.5v6.1992h6.3008v-12.398h-6.3008z"/>
                            <path d="m93.5 46.898h-6.1992v-24.797h-6.3008v-6.1992h-6.1992v6.1992h-12.398v-6.1992l-0.003906-6.3008h6.1992l0.003906-6.2031h-43.398v6.1992l-6.2031 0.003906h-6.1992v18.598h-6.3008v6.1992h-6.1992v55.793h6.1992v6.1992h6.1992l6.3008 0.007813h55.797v-6.1992h-61.996v-6.1992h-6.3008v-43.395h6.1992v43.395h6.3008v-12.398h6.1992v-12.398l-6.1992-0.003906v-43.395h6.1992v43.395h6.1992v-6.1992h62v6.1992h6.1992v-12.398h-6.0977zm-18.699 0h-43.398v-30.996l-0.003906-6.3008h24.801v18.598h24.801v18.598l-6.1992 0.003906z"/>
                        </g>
                    </svg>
                </h2>
            </div>
            <Portfolio 
                v-if="portfolio_items"
                :portfolio_items="portfolio_items"
                class="flex"
            />
        </section>
        
        <section class="bg-gray-200 border-2 border-black col-span-6">
            <div class="border-b-2 border-black">
                <h2 class="h-16 mx-4 px-2 text-xl text-center uppercase flex items-center justify-between">
                    User Data
                    <svg class="-mr-5" width="50px" height="50px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="m36 25h3.8438v15.277h-3.8438z"/>
                            <path d="m44 25h3.7461v15.277h-3.7461z"/>
                            <path d="m52 25v15.277h3.8438v-15.277z"/>
                            <path d="m63.211 51.785h7.7891v15.477h-7.6914v3.8711h-3.8438v3.8672h-26.621v-3.8672h-3.8438v-23.215h34.211zm3.8438 11.508v-7.7383h-3.8438v7.7383z" fill-rule="evenodd"/>
                        </g>
                    </svg>

                </h2>
            </div>
            <div class="m-4 p-4 border-2 border-black border-r-4 border-b-4 bg-white">
                <Tabs>
                    <Tab active="true" title="About">
                        I am a full stack web developer! I have been building things on the web for over 6 years working extensively with PHP and Javascript.
                        My favourite frameworks to build projects with are Nuxt.js and WordPress.
                    </Tab>
                    <Tab title="Work">
                        I have a full time job as a WordPress developer, developing and maintaining custom themes and plugins for several clients.
                    </Tab>
                    <Tab title="Play">
                        Outside of work I can be found walking my dog and playing music.
                    </Tab>
                </Tabs>
            </div>
        </section>
        
        <section class="bg-gray-200 border-2 border-black col-span-6">
            <div class="border-b-2 border-black">
                <h2 class="h-16 mx-4 px-2 text-xl text-center uppercase flex items-center justify-between">
                    Communication
                    <svg class="-mr-5" width="50px" height="50px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="m32 34h36v4h-4v4h-4v4h-4v4h-4v4h-4v-4h-4v-4h-4v-4h-4v-4h-4zm0 4v4h4v4h4v4h4v4h4v4h4v-4h4v-4h4v-4h4v-4h4v-4h4v28h-44v-28z" fill-rule="evenodd"/>
                    </svg>
                </h2>
            </div>
            <div class="m-4 p-4 border-2 border-black border-r-4 border-b-4 bg-white">
                <form @submit.prevent="false">
                    <fieldset class="border-2 border-solid border-gray-900 p-3">
                        <legend class="text-lg mb-2 px-2">Contact Method</legend>
                        <CustomDropdown
                            :items="contact_methods"
                            :default="'go'"
                            class="select mb-4"
                            @input="dropdown_input" 
                        />
                        <a :href="contact_button_url" target="_blank" class="block text-center relative w-36 h-12 bg-black z-10 ml-1 mt-1"><div class="w-full h-full leading-7 bg-white hover:bg-gray-200 absolute z-0 border-2 border-black p-2 -top-1 -left-1 hover:top-0 hover:left-0">Go!</div></a>
                    </fieldset>
                </form>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
    const { data: portfolio_items } = useFetch('/api/portfolio')

    let contact_button_url = ref('https://twitter.com/braedenbeaulieu')
    let contact_methods = [
        {
            name: 'Twitter',
            value: 'https://twitter.com/braedenbeaulieu',
            selected: true,
        },
        {
            name: 'Github',
            value: 'https://github.com/braedenbeaulieu',
            selected: false,
        },
    ]
    
    let dropdown_input = (method: any) => {
        contact_button_url.value = method.value
    }
</script>
<style>
    .speech-bubble {
        position: relative;
        background: #ffffff;
        border-radius: 0;
        max-width: 320px;
        height: auto;
        /* margin-left: 8px; */
        border: 2px solid black;
    }
    
    .speech-bubble::before {
        content: '';
        position: absolute;
        bottom: -4px;
        left: calc(50% - 2px);
        top: unset;
        width: 0;
        height: 0;
        border: 24px solid transparent;
        border-top-color: black;
        border-bottom: 0;
        border-right: 0;
        margin-left: -10px;
        margin-bottom: -20px;
    }

    .speech-bubble::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        top: unset;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-top-color: white;
        border-bottom: 0;
        border-right: 0;
        margin-left: -10px;
        margin-bottom: -20px;
    }
</style>