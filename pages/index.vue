<template>
    <div class="grid grid-cols-4 gap-4 m-4">
        <section class="bg-gray-200 p-4 border-2 border-black">
            <div class="speech-bubble p-4">
                <h2 class="text-xl">Welcome!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </section>

        <section class="bg-gray-200 border-2 border-black col-span-3">
            <div class="border-b-2 border-black">
                <h2 class="m-4 p-2 text-center uppercase">Portfolio Data</h2>
            </div>
            <div class="m-4 p-4 border-2 border-black border-r-4 border-b-4 bg-white">
                <a href="https://recipes.braedenbeaulieu.ca/" class="block text-blue-700 underline mb-2">Recipe website</a>
                <p>This is my personal collection of recipes.</p>
            </div>
            <div class="m-4 p-4 border-2 border-black border-r-4 border-b-4 bg-white">
                <a href="https://www.braedenbeaulieu.ca/" class="block text-blue-700 underline mb-2">Portfolio website</a>
                <p>This is my personal portfolio website.</p>
            </div>
        </section>
        
        <section class="bg-gray-200 border-2 border-black col-span-2">
            <div class="border-b-2 border-black">
                <h2 class="m-4 p-2 text-center uppercase">Skills</h2>
            </div>
            <div class="m-4 p-4 border-2 border-black border-r-4 border-b-4 bg-white">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </section>
        
        <section class="bg-gray-200 border-2 border-black col-span-2">
            <div class="border-b-2 border-black">
                <h2 class="m-4 p-2 text-center uppercase">Contact</h2>
            </div>
            <div class="m-4 p-4 border-2 border-black border-r-4 border-b-4 bg-white">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </section>
    </div>
</template>
<style>
    .speech-bubble {
        position: relative;
        background: #ffffff;
        border-radius: 0;
        max-width: 320px;
        height: auto;
        margin-left: 8px;
        border: 2px solid black;
    }

    .speech-bubble::before {
        content: '';
        position: absolute;
        left: -4px;
        top: 50%;
        width: 0;
        height: 0;
        border: 24px solid transparent;
        border-right-color: #000000;
        border-left: 0;
        border-bottom: 0;
        margin-top: -10px;
        margin-left: -20px;
    }

    .speech-bubble::after {
        content: '';
        position: absolute;
        left: -4px;
        top: 50%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-right-color: #ffffff;
        border-left: 0;
        border-bottom: 0;
        margin-top: -7.5px;
        margin-left: -16px;
    }
</style>