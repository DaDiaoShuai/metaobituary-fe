<script setup>
import { RouterLink, RouterView } from "vue-router";
import HeadComp from "./components/HeadComp.vue";
import FooterComp from "./components/FooterComp.vue";
import { Suspense } from "vue";
</script>

<template>
	<div id="appMain" class="container pt-14 px-3 flex-1 max-w-7xl mx-auto">
		<HeadComp />
		<Suspense>
			<RouterView />
			<template #fallback> Loading... </template>
		</Suspense>
	</div>
	<FooterComp />
</template>

<style>
@import "@/assets/base.css";

/* #appMain {
	font-weight: normal;
} */
</style>
