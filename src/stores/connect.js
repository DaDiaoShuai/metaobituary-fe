import { defineStore } from "pinia";

export const useConnectStore = defineStore({
	id: "connect",
	state: () => ({
		connectState: false,
		userData: null,
	}),
	getters: {
		isConnected: (state) => state.connectState,
	},
	actions: {
		connect(payload) {
			this.connectState = payload;
		},
		setUserData(data) {
			this.userData = data;
		},
	},
});
