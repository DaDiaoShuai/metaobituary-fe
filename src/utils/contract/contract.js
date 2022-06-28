import Web3 from "web3";
import { CONTRACT_ADDRESS, MOB_ABI } from "@/utils/constants";

export const mobContract = () => {
	const web3js = new Web3(window.ethereum);
	const _contract = new web3js.eth.Contract(MOB_ABI.abi, CONTRACT_ADDRESS);
	return _contract;
};
