import { ethers } from "ethers";

// Adres wdrożonego kontraktu
const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";

// ABI kontraktu (skopiuj ABI z Hardhat)
const CONTRACT_ABI = [
  // Tutaj wklej ABI Twojego smart kontraktu
];

export const getContract = (providerOrSigner) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};
