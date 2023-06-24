import {ethers} from "ethers";
import {AIDeGenFactory__factory, AIDeGenFactory } from "ai-degen-nft";
import {OutputValidityProofStruct } from "ai-degen-nft/src/types/contracts/AIDeGenFactory";
// import {IOutput__factory} from "@cartesi/rollups/dist/src/types/factories/contracts/interfaces/IOutput__factory"
import { getNotice } from "./notice";

//@TODO use exports from hardhat-deploy / export
// implement extra scripts
// generalize for other networks
import * as deployment from "ai-degen-nft/deployments/localhost/AIDeGenFactory.json";


//@TODO use deployment file & network from cartesi-dapp
const cartesiDappAddr = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

const graphQLAPI = "http://localhost:4000/graphql";

async function finishCollectionCreation(factory: AIDeGenFactory, id: string) {

    const notice = await getNotice(graphQLAPI, id);
    if (!notice.proof) {
        console.log(`notice "${id}" has no associated proof yet`);
        return;
    }
    const proof: OutputValidityProofStruct = {
        ...notice.proof,
        epochIndex: notice.input.epoch.index,
        inputIndex: notice.input.index,
        outputIndex: notice.index,
    };

    const ret = await factory.newNFTCollection(cartesiDappAddr, "QmaAS123", notice.payload, proof);
    // console.log(`notice is valid! (ret="${ret}")`, proof);
}
async function setupNode(degen: AIDeGenFactory) {   
    try {
        const tx = await degen.setCartesiDapp(cartesiDappAddr);
    } catch (error) {
        console.log("This node is already setup", (error as Error).message);
    }
    const newAddress = await degen.cartesiDapp();
    const newOwner = await degen.owner();
    console.log("[setupNode finished]", newAddress, newOwner);
}

// // this is supposed to be called by the frontend
// async function createNFT(degen: AIDeGenFactory) {
//     console.log("Attempt to generate NFT NOTICE");
//     const tx2 = await degen.generateNFT(ethers.encodeBytes32String("Simple Notice 123"), { value: ethers.parseEther("0.01") });
//     console.log("NFT NOTICE created");
// }

async function checkNewNotice(degen: AIDeGenFactory, lastId: number) {
    try {
        await getNotice(graphQLAPI, (lastId + 1).toString());
    } catch (error) {
        const msg = (error as Error).message;
        if(msg.includes("[GraphQL] Unable to find notice with id"))
            return false;
        throw error;
    }
    return true;
}

(async () => {
    const provider = new ethers.JsonRpcProvider();
    const signer = await provider.getSigner();
    const degenFactory = AIDeGenFactory__factory.connect(deployment.address, signer);
    
    // const output = IOutput__factory.connect(cartesiDappAddr, signer);

    const currentAddress = await degenFactory.cartesiDapp();
    // const owner = await degenFactory.owner()


    console.log(currentAddress, deployment.address, ethers.ZeroAddress)

    // currentAddress is the address of the current CartesiDApp and should be zero if not set
    if(currentAddress === ethers.ZeroAddress) {
        await setupNode(degenFactory);
    }
    

    console.log( await finishCollectionCreation(degenFactory, "1"));
    // console.log(await checkNewNotice(degenFactory, 0));



})();



