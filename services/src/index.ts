import { ethers } from "ethers";


import { AIDeGenFactory__factory, AIDeGen__factory } from "ai-degen-nft/src/types/factories/contracts";
import { AIDeGenFactory } from "ai-degen-nft/src/types/contracts";

import {setupNode, wait, checkNewNotice, processNewNotice} from "./utils";

//@TODO use exports from hardhat-deploy / export
// implement extra scripts
// generalize for other networks
import * as deployment from "ai-degen-nft/deployments/localhost/AIDeGenFactory.json";

//@TODO use deployment file & network from cartesi-dapp
const cartesiDappAddr = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";
const graphQLAPI = "http://localhost:4000/graphql";

async function checkTokenURI(factory: AIDeGenFactory, signer: ethers.JsonRpcSigner) {
    const addrr = await factory.nftCollections(0);
    console.log("addrr", addrr)
    const collection = await AIDeGen__factory.connect(addrr, signer);

    const tokenURI  = await collection.tokenURI(0);

    console.log("tokenURI", tokenURI);
}

(async () => {
    const provider = new ethers.JsonRpcProvider();
    const signer = await provider.getSigner();
    const degenFactory = AIDeGenFactory__factory.connect(deployment.address, signer);

    // const owner = await degenFactory.owner()
    
    const currentAddress = await degenFactory.cartesiDapp();
    // currentAddress is the address of the current CartesiDApp and should be zero if not set
    if(currentAddress === ethers.ZeroAddress) {
        await setupNode(degenFactory, cartesiDappAddr);
    }

    let lastId = Number(await degenFactory.collectionCounter());
    console.log("lastId", lastId);
    while (true) {
        if(await checkNewNotice(lastId)) {
            console.log("New notice found");
            lastId++;
            await processNewNotice(degenFactory, lastId, cartesiDappAddr)
        } else {
            console.log("No new notice found");
        }
        await wait(5* 1000); // 5 seconds
    }


})();



