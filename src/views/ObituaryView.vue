<script setup>
import altPic from "@/assets/logo.png";
import { mobContract } from "@/utils/contract/contract";
import { ref } from "vue";
import SkeletonComp from "@/components/SkeletonComp.vue";

const datas = ref([]);

const fetchExploreData = async () => {
	try {
		const myContract = mobContract();
		const methods = myContract.methods;
		let totalSupplyCount = await methods.totalSupply().call();
		totalSupplyCount = totalSupplyCount > 10 ? 10 : totalSupplyCount;
		for (let i = totalSupplyCount - 1; i >= 0; i--) {
			const token = await methods.tokenByIndex(i).call();
			const uri = await methods.tokenURI(token).call();
			const fetchData = await fetch(uri);
			const _data = await fetchData.json();
			datas.value.push(_data);
		}
		// methods
		// 	.totalSupply()
		// 	.call()
		// 	.then((res) => {
		// 		res = res > 10 ? 10 : res;
		// 		for (let i = 0; i < res; i++) {
		// 			methods
		// 				.tokenByIndex(i)
		// 				.call()
		// 				.then((token) => {
		// 					methods
		// 						.tokenURI(token)
		// 						.call()
		// 						.then((uri) => {
		// 							fetch(uri)
		// 								.then((d) => d.json())
		// 								.then((d) => {
		// 									datas.value.push(d);
		// 								});
		// 						});
		// 				});
		// 		}
		// 	});
	} catch (error) {
		console.log(error);
	}
};
fetchExploreData();

const formatUTCDate = (date) => {
	const d = new Date(date || new Date());
	return d.getUTCMonth() + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
};
</script>
<template>
	<div class="ob-list p-8">
		<h1 class="text-2xl mb-4">Obituary List</h1>
		<SkeletonComp :loading="!(datas && datas.length > 0)">
			<div
				v-for="item of datas"
				class="ob-item flex p-1.5 mb-4 items-center transition-all ease-linear hover:scale-[1.01] hover:shadow-2xl"
			>
				<div
					class="pic-box lg:w-40 sm:w-60 w-64 mr-1.5 sm:mr-2.5 md:mr-5"
				>
					<img :src="item.image || altPic" alt="altPic" />
				</div>
				<div class="ob-content">
					<div>
						<h3
							class="text-2xl mr-1.5 font-medium mb-2 inline-block italic"
						>
							{{ item.name }}
						</h3>
						<p class="inline-block mb-1.5">
							<span>{{ formatUTCDate(item.brith) }}</span
							><i>-</i
							><span>{{ formatUTCDate(item.death) }}</span>
						</p>
						<p class="inline-block mb-1.5 sm:ml-1.5">
							{{ item.careOf }}
						</p>
					</div>
					<p class="break-all">
						{{ item.description }}
					</p>
				</div>
			</div>
		</SkeletonComp>
	</div>
</template>
<style lang="scss" scoped>
h3 {
	font-family: "MrsEaves-Italic", Georgia, "Times New Roman", serif;
}
</style>
