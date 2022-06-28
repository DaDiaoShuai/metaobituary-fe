<script setup>
// import { reactive } from "vue";
const props = defineProps({
	loading: {
		type: Boolean,
		default: true,
	},
});
</script>
<template>
	<el-skeleton animated :throttle="800" :loading="props.loading">
		<template #template>
			<div v-for="item of 5" class="ob-item flex p-1.5 mb-4 items-center">
				<el-skeleton-item
					variant="image"
					style="width: 160px; height: 140px"
				/>
				<div style="padding: 14px; width: 100%">
					<el-skeleton-item variant="h3" style="width: 30%" />
					<div>
						<el-skeleton-item variant="text" style="width: 60%" />
						<el-skeleton-item variant="text" style="width: 60%" />
						<el-skeleton-item variant="text" style="width: 60%" />
						<el-skeleton-item variant="text" style="width: 60%" />
					</div>
				</div>
			</div>
		</template>
		<template #default>
			<slot></slot>
		</template>
	</el-skeleton>
</template>
