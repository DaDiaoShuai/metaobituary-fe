import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
	history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/gen",
		},
		{
			path: "/gen",
			name: "GenNft",
			component: () => import("../views/GenNft.vue"),
		},
		{
			path: "/obituarys",
			name: "Obituarys",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/ObituaryView.vue"),
		},
	],
});

export default router;
