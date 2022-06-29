<script setup>
import { LINKS } from "@/utils/constants";
</script>
<template>
	<section id="footer" class="footer py-28 px-3 bg-bg-soft">
		<div class="footer-inner container max-w-7xl mx-auto">
			<div>
				<h4 class="text-[2.2em] font-bold">Contributors:</h4>
			</div>
			<div class="links mt-[2.2em]">
				<a
					:href="url"
					class="mr-5 text-font-light underline"
					v-for="({ title, url }, idx) of LINKS"
					:key="idx"
					target="_blank"
					>{{ title }}</a
				>
			</div>
		</div>
	</section>
</template>
