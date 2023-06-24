import { HardhatUserConfig } from "hardhat/config";
import { HttpNetworkUserConfig } from "hardhat/types";

import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";


// read MNEMONIC from file or from env variable
let mnemonic = process.env.MNEMONIC;

const infuraNetwork = (
  network: string,
  chainId?: number,
  gas?: number
): HttpNetworkUserConfig => {
  return {
    url: `https://${network}.infura.io/v3/${process.env.PROJECT_ID}`,
    chainId,
    gas,
    accounts: mnemonic ? { mnemonic } : undefined,
  };
};

const config: HardhatUserConfig = {
  networks: {
    hardhat: mnemonic ? { accounts: { mnemonic } } : {},
    localhost: {
      url: "http://localhost:8545",
      accounts: mnemonic ? { mnemonic } : undefined,
    },
    goerli: infuraNetwork("goerli", 5, 6283185),
    sepolia: infuraNetwork("sepolia", 11155111, 6283185),
  },
  solidity: "0.8.18",
  paths: {
    artifacts: "artifacts",
    deploy: "deploy",
    deployments: "deployments",
  },
    typechain: {
        outDir: "src/types",
        target: "ethers-v6",
    },
};

export default config;
