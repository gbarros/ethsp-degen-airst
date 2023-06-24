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
        address indexed cartesiDapp
    );

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
        //@TODO charge for the generation
        IInput(cartesiDapp).addInput(prompt);
    }

    function newNFT(
        address user,
        string memory cid,
        bytes calldata _notice,
        OutputValidityProof calldata _v
    ) public onlyCartesi {
        require(
            IOutput(cartesiDapp).validateNotice(_notice, _v) == true,
            "This notice does not have valid proof"
        );
        AIDeGen newNft = new AIDeGen(user, cartesiDapp, cid);
        emit AIDeGenCreated(user, cartesiDapp, address(newNft));
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
