<template>
    <div class="p-4" v-show="selectedTitle === props.title">
        <slot />
    </div>
</template>
<script setup lang="ts">
    const props = defineProps<{
        title: string
    }>()

    // const selectedTitle = 'inject'
    const selectedTitle = inject('selectedTitle')
</script>