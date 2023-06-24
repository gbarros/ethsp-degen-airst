// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./AIDeGen.sol";
import "@cartesi/rollups/contracts/interfaces/IInput.sol";
import "@cartesi/rollups/contracts/interfaces/IOutput.sol";

contract AIDeGenFactory is AccessControl {
    address public owner;
    address public cartesiDapp;
    event AIDeGenCreated(
        address indexed user,
        address indexed contractAddress,
        address indexed cartesiDapp,
        uint256 collectionID
    );
    mapping(uint256 => address) public nftCollections;
    uint256 collectionCounter = 0;
    mapping(bytes32 =>bool) public usedNotices;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        msg.sender == owner;
        _;
    }

    modifier onlyCartesi() {
        msg.sender == cartesiDapp;
        _;
    }

    function setCartesiDapp(address _cartesiDapp) public onlyOwner {
        cartesiDapp = _cartesiDapp;
    }

    function generateNftCollection(bytes calldata prompt) external payable {
        //@TODO charge more for the generation
        require(msg.value >= 0.1 ether, "Not enough funds to generate NFT");
        IInput(cartesiDapp).addInput(prompt);
    }
    

    function newNFTCollection(
        address user,
        string memory cid,
        bytes calldata _notice,
        OutputValidityProof calldata _v
    ) public {
        require(
            IOutput(cartesiDapp).validateNotice(_notice, _v) == true,
            "This notice does not have valid proof"
        );
        bytes32 hash = keccak256(abi.encode(_notice,_v));
        require(usedNotices[hash] == false, "This notice has already been used");
        usedNotices[hash] = true;
        AIDeGen newNft = new AIDeGen(user, cid);
        emit AIDeGenCreated(user, cartesiDapp, address(newNft), collectionCounter);
        collectionCounter++;
    }

    function mintOnACollection(uint256 collectionID, address _to) public payable{
        //@TODO charge more for the generation
        require(msg.value >= 0.1 ether, "Not enough funds to generate NFT");
        AIDeGen nft = AIDeGen(nftCollections[collectionID]);
        nft.safeMint(_to);
    }
    
    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require( success == true,  "Withdraw failed");
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

}
