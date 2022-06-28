import Web3 from "web3";
import Web3Modal from "web3modal";
import providerOptions from "./providerOptions.js";

export const onConnect = async () => {
	try {
		// const providerOptions = {}

		const web3Modal = new Web3Modal({
			network: "mainnet", // optional
			cacheProvider: true, // optional
			providerOptions, // required
		});
		web3Modal.clearCachedProvider();
		const provider = await web3Modal.connect();
		// await provider.request({ method: 'eth_requestAccounts' })
		const web3 = new Web3(provider);
		const userAccount = await web3.eth.getAccounts();
		const account = userAccount[0];
		const ethBalance = await web3.eth.getBalance(account);
		const chainId = await web3.eth.getChainId();
		return saveUserInfo(ethBalance, chainId, account);
	} catch (error) {
		console.log(error);
	}
};

export const saveUserInfo = (ethBalance, chainId, account) => {
	const userInfo = {
		ethBalance,
		chainId,
		account,
	};
	window.localStorage.setItem("userAccount", JSON.stringify(userInfo));
	const userData = JSON.parse(localStorage.getItem("userAccount"));
	return [userData, true];
};

export const onDisconnect = () => {
	window.localStorage.removeItem("userAccount");
	return [{}, false];
};
