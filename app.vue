<script setup lang="ts">
	import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>
<template>
	<SpeedInsights />
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>