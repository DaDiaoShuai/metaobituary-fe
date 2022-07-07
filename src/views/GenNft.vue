<script setup>
import { reactive, ref, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { NFTStorage, Blob } from "nft.storage";
import { useStorage, StorageSerializers } from "@vueuse/core";
import { ElMessage, ElLoading } from "element-plus";
import { NFT_STORAGE_TOKEN, GAS_PRICE } from "@/utils/constants";
import { mobContract } from "@/utils/contract/contract";
import { onConnect } from "@/utils/web3/web3modal";
import { useConnectStore } from "@/stores/connect";

const formLabelAlign = reactive({
	name: "",
	careOf: "",
	description: "",
	brith: "",
	death: "",
});

const connectStore = useConnectStore();

const isReady = computed(() => {
	const { name, description, careOf, brith, death } = formLabelAlign;
	return name && description && careOf && brith && death;
});

const fileList = ref([]);
const picLimit = ref(1);
const picPreviewDialogVisible = ref(false);
const dialogImageUrl = ref("");

const uploadRef = ref(null);

const userAccount = () => {
	const _account = useStorage("userAccount", null, undefined, {
		serializer: StorageSerializers.object,
	});
	return _account.value;
};

const isConnected = computed(() => {
	return connectStore.isConnected;
});

const handleRemove = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
	dialogImageUrl.value = uploadFile.url;
	picPreviewDialogVisible.value = true;
};

const handleChange = (file) => {
	console.log(file);
};

const connectHandler = async () => {
	const res = await onConnect();
	if (!res) return;
	connectStore.connect(res[1]);
	connectStore.setUserData(res[0]);
};

const httpRequestHandler = async (file) => {
	const loading = ElLoading.service({
		lock: true,
		text: "Creating...",
		background: "rgba(0, 0, 0, 0.7)",
	});
	const image = file.file;
	try {
		const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
		const ipfsData = await client.store({
			name: formLabelAlign.name || "",
			description: formLabelAlign.description || "",
			image,
		});
		const ipfsImage = ipfsData.embed();
		const ipfsImageUrl = ipfsImage.image.href;

		const metadata = {
			image: ipfsImageUrl,
			...formLabelAlign,
		};

		const metadataJson = JSON.stringify(metadata);

		const ipfsJSONData = await client.store({
			name: "tokenURI",
			image: new Blob([metadataJson], { type: "image/png" }),
			description: "JSON File",
			properties: {
				file: new File([metadataJson], "tokenURIdata.json", {
					type: "javascript/json",
				}),
			},
		});

		const tokenURI = ipfsJSONData.embed().properties.file.href;

		// 获取合约实例
		const myContract = mobContract();
		myContract.methods
			.mint(tokenURI)
			.send({ from: userAccount().account, value: GAS_PRICE })
			.then((d) => {
				console.log(d);
			})
			.finally(() => {
				loading.close();
			});
	} catch (error) {
		console.error(error);
	}
};

const genNft = () => {
	if (!isReady) return;
	if (!userAccount()) {
		return ElMessage({
			type: "warning",
			message: "Please connect wallet first!",
		});
	}
	uploadRef && uploadRef.value.submit();
};
</script>

<template>
	<main v-if="isConnected">
		<h3 class="text-2xl px-4 py-8 text-center">
			Create an Obituary NFT of your loved one that lasts forever.
		</h3>
		<section class="form-wrap">
			<el-form
				class="mx-auto lg:max-w-[55%]"
				label-position="top"
				label-width="100px"
				:model="formLabelAlign"
				hide-required-asterisk
			>
				<el-form-item label="Name">
					<el-input
						placeholder="Name"
						v-model="formLabelAlign.name"
					/>
				</el-form-item>
				<el-form-item label="Life">
					<el-col :span="11">
						<el-date-picker
							v-model="formLabelAlign.brith"
							type="date"
							placeholder="Pick a date"
							style="width: 100%"
						/>
					</el-col>
					<el-col :span="2" class="text-center">
						<span class="text-gray-500">-</span>
					</el-col>
					<el-col :span="11">
						<el-date-picker
							v-model="formLabelAlign.death"
							type="date"
							placeholder="Pick a date"
							style="width: 100%"
						/>
					</el-col>
				</el-form-item>
				<el-form-item label="In The Care of">
					<el-input
						placeholder="In The Care of"
						v-model="formLabelAlign.careOf"
					/>
				</el-form-item>
				<el-form-item label="Photos">
					<el-upload
						ref="uploadRef"
						v-model:file-list="fileList"
						action=""
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:on-change="handleChange"
						:limit="picLimit"
						:auto-upload="false"
						:http-request="httpRequestHandler"
					>
						<el-icon><Plus /></el-icon>
					</el-upload>
				</el-form-item>
				<el-form-item label="Obituary Info">
					<el-input
						type="textarea"
						placeholder="Obituary"
						v-model="formLabelAlign.description"
					/>
				</el-form-item>
				<el-form-item>
					<el-button @click="genNft" :disabled="!isReady"
						>Create</el-button
					>
				</el-form-item>
			</el-form>
		</section>
	</main>
	<h3 v-else class="text-2xl px-4 py-8 text-center">
		Please
		<a href="javascript:void(0);" class="underline" @click="connectHandler"
			>connect</a
		>
		your wallet first.
	</h3>

	<el-dialog v-model="picPreviewDialogVisible">
		<img w-full :src="dialogImageUrl" alt="Preview Image" />
	</el-dialog>
</template>
<style>
.el-input__wrapper {
	width: 100% !important;
}
</style>
