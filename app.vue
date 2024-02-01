<script setup lang="ts">
	import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>
<template>
	<SpeedInsights />
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>