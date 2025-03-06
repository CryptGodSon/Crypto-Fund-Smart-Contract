const hre = require("hardhat");

async function main() {
  const CryptoFund = await hre.ethers.getContractFactory("CryptoFund");
  const cryptoFund = await CryptoFund.deploy();
  await cryptoFund.deployed();

  console.log(`CryptoFund deployed to: ${cryptoFund.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
