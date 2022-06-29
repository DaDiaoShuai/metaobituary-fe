<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import FooterComp from "./components/FooterComp.vue";
const HeadComp = () => import("./components/HeadComp.vue");

const route = useRoute();
</script>

<template>
	<div id="appMain" class="container pt-14 px-3 flex-1 max-w-7xl mx-auto">
		<HeadComp v-if="!route.meta.hiddenHead" />
		<RouterView />
	</div>
</template>

<style>
@import "@/assets/base.css";

/* #appMain {
	font-weight: normal;
} */
</style>
