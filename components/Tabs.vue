<template>
    <div class="border-2 border-black">
        <ul class="flex justify-between cursor-pointer">
            <li 
                v-for="title in tabTitles" 
                :key="title"
                class="tabs-header-item p-2 border-b-2 border-black grid content-center flex-1 bg-gray-300 relative"
                :class="{ selected: selectedTitle === title}"
                @click="selectedTitle = title"
            >
                {{ title }}
                <div class="custom-select-toggle"></div>
            </li>
        </ul>

        <slot />
    </div>
</template>

<script setup>
    // import { useSlots, ref , provide} from 'vue'
    const slots = useSlots()
    const tabTitles = ref(slots.default().map(tab => tab.props.title))
    const selectedTitle = ref(tabTitles.value[0])
    provide('selectedTitle', selectedTitle)
</script>

<style>
.tabs-header-item {
    width: 33%;
}

.tabs-header-item.selected {
    background-color: white;
    border-bottom: 0;
    position: relative;
}

.tabs-header-item.selected::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 2px solid black;
    border-left: 2px solid black;
}

.tabs-header-item:first-child.selected::after {
    border-left: 0;
}

.tabs-header-item:last-child.selected::after {
    border-right: 0;
}

.tabs-header-item.selected:first-child {
    border-left-color: transparent;
}

.tabs-header-item.selected:last-child {
    border-right-color: transparent;
}

.custom-select-toggle {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    width: 30px;
    height: calc(100% + 4px);
    background-color: transparent;
}
.custom-select-toggle::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 12px;
    width: 12px;
    height: 12px;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    transform: rotate(45deg);
}

.tabs-header-item.selected .custom-select-toggle {
    animation: bounce 1s ease infinite;
}

@keyframes bounce {
	0%, 50% {
        transform: translateY(-2px);
    }
	51%, 100% {
        transform: translateY(2px);
    }
}
</style>