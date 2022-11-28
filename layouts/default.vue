<template>
    <main class="font-mono-2 text-gray-800">
        <Header />
        <div class="max-w-6xl mx-auto">
            <slot />
        </div>
    </main>
</template>
<style>
    html {
        background-color: #9fa6d7;
        background-image: radial-gradient(black 2.5px, transparent 0), radial-gradient(black 2.5px, transparent 0);
        background-size: 15px 15px;
        background-position: 0 0, 7.5px 7.5px;
    }

    body {
        cursor: url('~/assets/img/pixel-pointer.png'), auto;
    }
</style>