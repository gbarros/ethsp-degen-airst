import {ethers} from "ethers";
import {AIDeGen__factory} from "ai-degen-nft";

//@TODO use exports from hardhat-deploy / export
// implement extra scripts
// generalize for other networks
import * as deployment from "ai-degen-nft/deployments/localhost/AIDeGen.json";


//@TODO use deployment file & network from cartesi-dapp
const cartesiDappAddr = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

(async () => {
    const provider = new ethers.JsonRpcProvider();
    const signer = await provider.getSigner();
    const degen = AIDeGen__factory.connect(deployment.address, signer);

    const currentAddress = await degen.cartesiDapp()
    const owner = await degen.owner()

    console.log(currentAddress, deployment.address, owner)
    try {
        const tx = await degen.finishSetup(cartesiDappAddr);
    } catch (error) {
        console.log((error as Error).message,);
    }

    const newAddress = await degen.cartesiDapp()
    const newOwner = await degen.owner()

    console.log(newAddress, newOwner);

    console.log("Attempt to generate NFT NOTICE");
    
    const tx2 = await degen.generateNFT(ethers.encodeBytes32String("Simple Notice 123"), { value: ethers.parseEther("0.01") });

    console.log("NFT NOTICE created");
})();