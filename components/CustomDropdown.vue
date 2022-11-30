<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
        <div class="selected" :class="{ open: open }" @click="open = !open">
            {{ selected?.name }}
            <div class="custom-select-toggle"></div>
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div
                v-for="(item, i) of items"
                :key="item.value"
                @click="
                    selected = item;
                    open = false;
                    $emit('input', item);
                "
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    defineEmits(['input'])
    const props = defineProps<{
        items: {
            name: string,
            value: string,
            selected?: boolean,
        }[],
        default: string,
        tabindex?: number
    }>()
    let selected = ref(props.items.find(item => item.selected === true))
    let open = ref(false)
</script>

<style scoped>
.custom-select {
    position: relative;
    z-index: 12;
    width: 100%;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;
}

.custom-select .selected {
    background-color: #e5e7eb;
    border-radius: 0;
    border: 2px solid #666666;
    color: #1f2937;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
}

.custom-select .selected.open {
    border: 2px solid #696d73;
    border-radius: 0;
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
    background-color: white;
    border: 2px solid black;
}

.custom-select-toggle::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    width: 12px;
    height: 12px;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    transform: rotate(45deg);
}

.custom-select .selected.open .custom-select-toggle::after {
    margin-top: 20px;
    transform: rotate(225deg);
}

.custom-select .items {
    color: #1f2937;
    border-radius: 0;
    overflow: hidden;
    border-right: 2px solid #696d73;
    border-left: 2px solid #696d73;
    border-bottom: 2px solid #696d73;
    position: absolute;
    background-color: #e5e7eb;
    left: 0;
    right: 0;
    z-index: 1;
}

.custom-select .items div {
    color: #1f2937;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
}

.custom-select .items div:hover {
    background-color: #696d73;
    color: white;
}

.selectHide {
    display: none;
}
</style>
