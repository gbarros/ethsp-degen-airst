
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
        AIDeGen__factory.connect(collectionAddress, signer)
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
    const hextData = ethers.utils.toUtf8Bytes(dataString);
    const value = ethers.utils.parseEther("0.1");
    const tx = await degenFactory.generateNftCollection(hextData, { value: value.toHexString() });
    return tx;
}

///
/// @dev mint a new NFT on a collection
/// @param degenFactory ethers object
/// @param collectionID collection ID to mint the NFT
/// @param addressTo address of the receiver
async function mintNewNFTToken(degenFactory, collectionID, addressTo) {
    const value = ethers.utils.parseEther("0.1");
    const tx = await degenFactory.mintOnACollection(collectionID, addressTo, { value: value.toHexString() });
    return tx;
}

async function getCounts(collectionsList) {
    return await Promise.all(collectionsList.map(tokenCounterOnCollention))
}

(async () => {
    const provider = new ethers.providers.JsonRpcProvider("http://192.168.1.75:8888"); //@TODO check how to get the provider from metamask
    const signer = await provider.getSigner();
    const degenFactory = AIDeGenFactory__factory.connect(factoryAddr, signer);
    const collections = await getAllCollections(degenFactory, signer);

    console.log("counts", await getCounts(collections) );

    // Array(10).fill().map(async (_, i) => {});

    // THIS CREATES A NEW COLLECTION
    // await mintNewNFTCollection(degenFactory, { name: "test", description: "test", image: "test" });

    await mintNewNFTToken(degenFactory, 0, "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");

});


module.exports = {
    getAllCollections,
    mintNewNFTCollection,
    mintNewNFTToken,
    getCounts,
    tokenCounterOnCollention,
}