import { fileURLToPath, URL } from "url";
const { resolve } = require("path");
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				// additionalData: `@use "@/styles/element/index.scss" as *;`,
			},
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			web3: "web3/dist/web3.min.js",
		},
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/],
		},
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				mint: resolve(__dirname, "mint/index.html"),
			},
		},
	},
	server: {
		hmr: {
			overlay: false,
		},
	},
});
