import { ethers } from "ethers";
import { AIDeGenFactory__factory, AIDeGen__factory } from "ai-degen-nft/src/types/factories/contracts";
import { AIDeGenFactory } from "ai-degen-nft/src/types/contracts";

import {setupNode, wait, checkNewNotice, processNewNotice} from "./utils";

//@TODO use exports from hardhat-deploy / export
// implement extra scripts
// generalize for other networks
import * as deployment from "ai-degen-nft/deployments/localhost/AIDeGenFactory.json";

// @TODO generalize for other networks
import * as dapp from "../../cartesi-dapp/deployments/localhost/dapp.json";	
const cartesiDappAddr = dapp.address;

async function checkTokenURI(factory: AIDeGenFactory, signer: ethers.JsonRpcSigner) {
    const addrr = await factory.nftCollections(0);
    console.log("addrr", addrr)
    const collection = await AIDeGen__factory.connect(addrr, signer);

    const tokenURI  = await collection.tokenURI(0);

    console.log("tokenURI", tokenURI);
}

(async () => {
    const provider = new ethers.JsonRpcProvider("http:/\/192.168.1.75:8888");
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



