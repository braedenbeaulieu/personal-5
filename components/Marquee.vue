<template>
    <div class="m-2 border-2 border-black border-r-4 border-b-4 bg-white flex overflow-x-hidden relative">
        <div class="animate-marquee whitespace-nowrap py-4 pr-[9px] pl-0">
            <h2 class="text-xl md:text-3xl text-center">{{ props.message }}</h2>
        </div>
        <div class="animate-marquee2 whitespace-nowrap absolute top-0 p-4 pr-[9px] pl-0">
            <h2 class="text-xl md:text-3xl text-center">{{ props.message }}</h2>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        message: string
    }>()
</script>