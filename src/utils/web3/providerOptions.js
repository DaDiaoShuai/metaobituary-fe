import { INFURA_ID } from "@/utils/constants.js";
// import WalletConnectProvider from '@walletconnect/web3-provider'
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
const CoinbaseWalletSDK = () => import("@coinbase/wallet-sdk");

const WalletConnectProvider = () => import("@walletconnect/web3-provider");

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
			infuraId: INFURA_ID, // required
		},
	},
	coinbasewallet: {
		package: CoinbaseWalletSDK, // Required
		options: {
			appName: "My Awesome App", // Required
			infuraId: INFURA_ID, // Required
			rpc: "", // Optional if `infuraId` is provided; otherwise it's required
			chainId: 1, // Optional. It defaults to 1 if not provided
			darkMode: false, // Optional. Use dark theme, defaults to false
		},
	},
};

export default providerOptions;
