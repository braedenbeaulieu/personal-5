<script setup lang="ts">
    const route = useRoute()
    const slug = route.params.slug[0]

    let title = 'Error 404'
    if(slug) {
        const { data } = await useAsyncData('blog', () => queryContent(`/blog/${slug}`).findOne())
        if(data.value && data.value.hasOwnProperty('title')) {
            title = data.value.title ? data.value.title : 'Error 404'
        }
    }
</script>
<template>
    <main>
        <section class="bg-gray-200 border-2 border-black col-span-6 md:col-span-8 m-4">
            <div class="border-b-2 border-black">
                <h1 class="h-16 mx-4 text-xl text-center uppercase flex items-center justify-between">
                    {{ title }}
                    <svg class="-mr-1" width="28px" height="28px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="m74.801 84.102h6.1992v6.1992h-6.1992z"/>
                            <path d="m68.602 9.6016h6.1992v6.1992h-6.1992z"/>
                            <path d="m81 77.898v6.2031h6.1992v-12.402h-6.1992z"/>
                            <path d="m87.199 65.5v6.1992h6.3008v-12.398h-6.3008z"/>
                            <path d="m93.5 46.898h-6.1992v-24.797h-6.3008v-6.1992h-6.1992v6.1992h-12.398v-6.1992l-0.003906-6.3008h6.1992l0.003906-6.2031h-43.398v6.1992l-6.2031 0.003906h-6.1992v18.598h-6.3008v6.1992h-6.1992v55.793h6.1992v6.1992h6.1992l6.3008 0.007813h55.797v-6.1992h-61.996v-6.1992h-6.3008v-43.395h6.1992v43.395h6.3008v-12.398h6.1992v-12.398l-6.1992-0.003906v-43.395h6.1992v43.395h6.1992v-6.1992h62v6.1992h6.1992v-12.398h-6.0977zm-18.699 0h-43.398v-30.996l-0.003906-6.3008h24.801v18.598h24.801v18.598l-6.1992 0.003906z"/>
                        </g>
                    </svg>
                </h1>
            </div>
            <main class="mx-4 my-8">
                <ContentDoc>
                    <template #not-found>
                        Post not found.
                    </template>
                </ContentDoc>
            </main>
        </section>
    </main>
</template>
<style>
    h1 {
        font-size: 2.5rem;
        margin: 2.5rem 0 1.5rem 0;
        font-weight: 700;
    }

    h2 {
        font-size: 2rem;
        margin: 2.5rem 0 1.5rem 0;
        line-height: 1.25;
        font-weight: 700;
    }

    h3 {
        font-size: 1.6rem;
        margin: 2.5rem 0 1.5rem 0;
        line-height: 1.25;
        font-weight: 600;
    }

    h4 {
        font-size: 1.3rem;
        margin: 2.5rem 0 1.5rem 0;
        line-height: 1.25;
        font-weight: 600;
    }

    p {
        font-size: 1rem;
        margin-bottom: 1rem;
        font-weight: 400;
    }

    ul {
        margin-bottom: 1rem;
    }
</style>