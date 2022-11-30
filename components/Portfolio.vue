<template>
    <div class="grid grid-gap-sm grid-cols-4 lg:grid-cols-5 p-4">
        <a v-for="item in portfolio_items" :key="item.id"
            :href="item.link"
            class="portfolio-item flex flex-col items-center mx-2 cursor-pointer focus:outline-0"
            target="_blank"
        >
            <svg 
                width="90px" height="90px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" 
                :fill="item.folder_colour ?? 'black'"
            >
                <g>
                    <path d="m69 24v52h-38v-38.133h3.4531v3.4648h13.723v-13.867h-3.457v-3.4648zm-13.816 44.867v-3.4648h-17.273v3.4648zm6.9062-6.832v-3.4688h-24.18v3.4688zm0-6.9336v-3.4688h-24.18v3.4688zm0-6.9336v-3.4688h-24.18v3.4688zm-0.097656-6.9336v-3.4648h-10.363v3.4648zm0-6.8359v-3.4648h-10.363v3.4648z" fill-rule="evenodd"/>
                    <path d="m44.719 37.77h-10.266v-3.3711h3.457v-3.4648h3.4531v-3.4688h3.3555z"/>
                </g>
            </svg>
            <p class="text-xs text-center -mt-4 p-1">{{ item.title }}</p>
        </a>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        portfolio_items: PortfilioItem[]
    }>()
</script>
<style>
    .portfolio-item > svg {
        border: 2px solid transparent;
    }
    .portfolio-item:hover > svg {
        border-style: dashed;
        border-color: black;
    }
    .portfolio-item:hover > p {
        color: white;
        background-color: #4e3d99;
    }
    .portfolio-item:focus > svg {
        border-style: dashed;
        border-color: black;
    }
    .portfolio-item:focus > p {
        color: white;
        background-color: #4e3d99;
    }
</style>