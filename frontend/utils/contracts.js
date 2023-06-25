
const ethers = require("ethers");

const deploymentJSON = require("ai-degen-nft/deployments/localhost/AIDeGenFactory.json");

const factoryAddr = deploymentJSON.address;;
console.log(factoryAddr);

const { AIDeGenFactory__factory } = require("ai-degen-nft/dist/src/types/factories/contracts/AIDeGenFactory__factory")

const { AIDeGen__factory } = require("ai-degen-nft/dist/src/types/factories/contracts/AIDeGen__factory")


async function getAllCollections(degenFactory, signer) {
    const counter = await degenFactory.collectionCounter();
    const collectionsAddresses = await Promise.all(
        Array(parseInt(counter)).fill().map((_, i) => degenFactory.nftCollections(i))
    )
    console.log(collectionsAddresses);

    return collectionsAddresses.map((collectionAddress) =>
        AIDeGen__factory(collectionAddress, signer)
    );
}

async function tokenCounterOnCollention(collection) {
    return await collection._tokenIdCounter();
}

///
/// @dev mint a new NFT on a collection
/// @param degenFactory ethers object
/// @param data JSON object 
/// @return tx	can be used to wait for the transaction to be mined
///             as await tx.wait(1)
async function mintNewNFTCollection(degenFactory, data) {
    const dataString = JSON.stringify(data);
    const tx = await degenFactory.generateNftCollection(dataString);
    return tx;
}

///
/// @dev mint a new NFT on a collection
/// @param degenFactory ethers object
/// @param collectionID collection ID to mint the NFT
/// @param addressTo address of the receiver
async function mintNewNFTToken(degenFactory, collectionID, addressTo) {
    const tx = await degenFactory.mintOnACollection(collectionID, addressTo);
    return tx;
}

(async () => {

    const provider = new ethers.providers.JsonRpcProvider("http://192.168.1.75:8545"); //@TODO check how to get the provider from metamask
    const signer = await provider.getSigner();
    const degenFactory = AIDeGenFactory__factory.connect(factoryAddr, signer);
    await getAllCollections(degenFactory);


})();