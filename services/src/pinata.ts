
import PinataClient, { PinataPinOptions } from "@pinata/sdk";
import { promises as fs } from 'fs';
import { ethers } from "ethers";

const pinata = new PinataClient(process.env.PINATA_APIKey, process.env.PINATA_APISecret);

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log("Connected to Pinata", result);
}).catch((err) => {
    //handle error here
    console.log("Couldnt connect to Pinata", err);
});


export async function saveImageToDisk(payload:string, fileName:string): Promise<string> {
    const data = ethers.getBytes(payload)
    await fs.appendFile(fileName, Buffer.from(data));
    return fileName;
}

export async function uploadImg(fileImg:string, fileName:string):Promise<string> {
    const options: PinataPinOptions = {
        pinataMetadata: {
            name: fileName,
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    const result = await pinata.pinFromFS(fileImg, options);
    return result.IpfsHash;
}

export async function buildJSONFile(fileURIIPFS:string, name:string):Promise<string> {
    const base = {
        name,
        description: "AIDeGen NFT",
        image: `ipfs://${fileURIIPFS}}`,
        attributes: [{
            trait_type: "generation",
            value: "generation"
        },{
            trait_type: "type",
            value: "UNKOWN"
        }]
    }
    //@todo save to disk
    await fs.writeFile(`${name}.json`, JSON.stringify(base));
    return `${name}.json`;
}

export async function saveJSONFile(data:string, name:string):Promise<string> {
    //@todo save to disk
    await fs.writeFile(`${name}.json`, data);
    return `${name}.json`;
}

export async function uploadJSONFile(fileImg:string, fileName:string) {
    const options: PinataPinOptions = {
        pinataMetadata: {
            name: fileName,
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    const result = await pinata.pinFromFS(fileName, options);
    return result.IpfsHash;
}

export async function cleanFiles(jsonFile:string, imgFile:string) {
    await fs.unlink(jsonFile);
    await fs.unlink(imgFile);
}