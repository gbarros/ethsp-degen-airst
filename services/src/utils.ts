import { AIDeGenFactory, OutputValidityProofStruct } from "ai-degen-nft/src/types/contracts/AIDeGenFactory";

import { getNotice, parsePayload } from "./notice";
import { getReport } from "./report";
import { saveImageToDisk, uploadImg, buildJSONFile, saveJSONFile, uploadJSONFile, cleanFiles } from "./pinata";
import { Notice } from "../generated-src/graphql";


// const graphQLAPI = "http://localhost:4000/graphql";// generalize for other networks
const graphQLAPI = "http://192.168.1.75:2224/graphql";// generalize for other networks


export function wait(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

export async function setupNode(factory: AIDeGenFactory, cartesiDappAddr: string) {
    try {
        const tx = await factory.setCartesiDapp(cartesiDappAddr);
    } catch (error) {
        console.log("This node is already setup", (error as Error).message);
    }
    const newAddress = await factory.cartesiDapp();
    const newOwner = await factory.owner();
    console.log("[setupNode finished]", newAddress, newOwner);
}

export async function checkNewNotice(lastId: number) {
    try {
        const notice = await getNotice(graphQLAPI, (lastId + 1).toString());
        if (!notice.proof) {
            console.log(`notice "${lastId}" has no associated proof yet`);
            return false;
        }
    } catch (error) {
        const msg = (error as Error).message;
        if (msg.includes("[GraphQL] Unable to find notice with id"))
            return false;
        throw error;
    }
    return true;
}

export async function finishCollectionCreation(factory: AIDeGenFactory, notice: Notice, cartesiDappAddr: string, ipfsURI: string) {
    if (!notice.proof) {
        console.log(`notice "${notice.id}" has no associated proof yet`);
        return;
    }
    const proof: OutputValidityProofStruct = {
        ...notice.proof,
        epochIndex: notice.input.epoch.index,
        inputIndex: notice.input.index,
        outputIndex: notice.index,
    };

    const tx = await factory.newNFTCollection(cartesiDappAddr, ipfsURI, notice.payload, proof);
    const log = await tx.wait(1);
    console.log("[finishCollectionCreation]", log);
}

export async function processNewNotice(factory: AIDeGenFactory, lastId: number, cartesiDappAddr: string) {
    const notice = await getNotice(graphQLAPI, `${lastId}`);
    const report = await getReport(graphQLAPI, `${lastId}`);
    const noticePayload = parsePayload(notice.payload);
    const imgFileName = noticePayload.descriptor_data.name;
    
    const imgFile = await saveImageToDisk(report.payload, imgFileName);
    console.log("img saved to disk")

    const imgIpfsHash = await uploadImg(imgFile, imgFileName);
    console.log("img uploaded to ipfs", imgIpfsHash)

    // const jsonFile = await buildJSONFile(imgIpfsHash, `${lastId}`);
    const jsonFile = await saveJSONFile(noticePayload.descriptor_rawdata, `${lastId}`);
    console.log("json file created")

    const jsonIpfsHash = await uploadJSONFile(jsonFile, jsonFile);
    console.log("json uploaded to ipfs", jsonIpfsHash)

    await finishCollectionCreation(factory, notice, cartesiDappAddr, jsonIpfsHash);
    console.log("collection created")

    await cleanFiles(jsonFile, imgFileName);
    console.log("files cleaned")

}

// // this is supposed to be called by the frontend
// export async function createNFT(degen: AIDeGenFactory) {
//     console.log("Attempt to generate NFT NOTICE");
//     const tx2 = await degen.generateNFT(ethers.encodeBytes32String("Simple Notice 123"), { value: ethers.parseEther("0.01") });
//     console.log("NFT NOTICE created");
// }