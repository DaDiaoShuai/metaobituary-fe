<script setup>
import Logo from "@/assets/logo.png";
import { RouterLink, useRoute } from "vue-router";
import { onConnect, onDisconnect } from "@/utils/web3/web3modal";
import { ref, computed, watch } from "vue";
import { useClipboard, useStorage, StorageSerializers } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { useConnectStore } from "@/stores/connect";

import { cloneDeep } from "lodash-es";

const route = useRoute();
const connectStore = useConnectStore();

const currentRoute = computed(() => route.path);

const _userAccount = useStorage("userAccount", null, undefined, {
	serializer: StorageSerializers.object,
});

const userData = computed(() => connectStore.userData);
const hasUserInfo = computed(() => connectStore.isConnected);

if (_userAccount && _userAccount.value) {
	connectStore.setUserData(cloneDeep(_userAccount.value));
	connectStore.connect(true);
}

const connectHandler = async () => {
	const res = await onConnect();
	if (!res) return;
	connectStore.setUserData(res[0]);
	connectStore.connect(res[1]);
};

const disconnectHandler = () => {
	const res = onDisconnect();
	connectStore.setUserData(res[0]);
	connectStore.connect(res[1]);
};

const clipString = (str) => str && `${str.substr(0, 6)}...${str.substr(-5)}`;

const { isSupported, copy, text } = useClipboard();

const copyHandler = () => {
	isSupported && copy(userData && userData.value && userData.value.account);
	text &&
		ElMessage({
			message: "Copied!",
			grouping: true,
			type: "success",
		});
};
</script>
<template>
	<div class="flex justify-between items-center">
		<a class="logo select-none flex items-center" href="/">
			<img
				:src="Logo"
				alt="logo"
				width="30"
				class="mr-3 opacity-[0.89]"
			/>
			<div class="uppercase tracking-[2px] text-base">Meta Obituary</div>
		</a>
		<div class="actions">
			<a href="/" class="hidden sm:inline-block mr-2 underline">Home</a>
			<router-link
				to="/obituarys"
				v-show="currentRoute !== '/obituarys'"
				class="mr-2 underline"
				>Explore</router-link
			>
			<router-link
				to="/gen"
				v-show="currentRoute !== '/gen'"
				class="mr-2 underline"
				>Publish</router-link
			>
			<a
				href="javascript:void(0);"
				class="px-2 py-1 border rounded-full hover:border-b hover:border-spacing-1 hover:border-black transition"
				@click="connectHandler"
				v-if="!hasUserInfo"
				>Connect</a
			>
			<div class="inline-block" v-else>
				<span
					class="hidden sm:inline-block font-bold mr-1.5 cursor-pointer p-1 rounded-full will-change-auto transition-all hover:bg-highlight-color/50"
					@click="copyHandler"
					>{{ clipString(userData && userData.account) }}
				</span>
				<a
					href="javascript:void(0);"
					class="px-2 py-1 border rounded-full hover:border-b hover:border-spacing-1 hover:border-black transition"
					@click="disconnectHandler"
					>Disconnect</a
				>
			</div>
		</div>
	</div>
</template>
