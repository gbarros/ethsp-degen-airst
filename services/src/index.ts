import {ethers} from "ethers";
import {AIDeGen__factory, AIDeGen} from "ai-degen-nft";
import { OutputValidityProofStruct, IOutput } from "@cartesi/rollups/dist/src/types/contracts/interfaces/IOutput";
import {IOutput__factory} from "@cartesi/rollups/dist/src/types/factories/contracts/interfaces/IOutput__factory"
import { getNotice } from "./notice";

//@TODO use exports from hardhat-deploy / export
// implement extra scripts
// generalize for other networks
import * as deployment from "ai-degen-nft/deployments/localhost/AIDeGen.json";


//@TODO use deployment file & network from cartesi-dapp
const cartesiDappAddr = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

const graphQLAPI = "http://localhost:4000/graphql";

async function verifyNotice(outputContract: IOutput, id: string) {

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


    const ret = await outputContract.validateNotice(notice.payload, proof);
    console.log(`notice is valid! (ret="${ret}")`, proof);
}
async function setupNode(degen: AIDeGen) {   
    try {
        const tx = await degen.finishSetup(cartesiDappAddr);
    } catch (error) {
        console.log("This node is already setup", (error as Error).message);
    }
    const newAddress = await degen.cartesiDapp()
    const newOwner = await degen.owner()
    console.log("[setupNode finished]", newAddress, newOwner);
}

// this is supposed to be called by the frontend
async function createNFT(degen: AIDeGen) {
    console.log("Attempt to generate NFT NOTICE");
    const tx2 = await degen.generateNFT(ethers.encodeBytes32String("Simple Notice 123"), { value: ethers.parseEther("0.01") });
    console.log("NFT NOTICE created");
}

(async () => {
    const provider = new ethers.JsonRpcProvider();
    const signer = await provider.getSigner();
    const degen = AIDeGen__factory.connect(deployment.address, signer);
    
    const output = IOutput__factory.connect(cartesiDappAddr, signer);

    const currentAddress = await degen.cartesiDapp()
    const owner = await degen.owner()


    console.log(currentAddress, deployment.address)

    // currentAddress is the address of the current CartesiDApp and should be zero if not set
    if(currentAddress == ethers.ZeroAddress) {
        setupNode(degen);
    }

    await verifyNotice(output, "1"); 

    // createNFT(degen);


})();



