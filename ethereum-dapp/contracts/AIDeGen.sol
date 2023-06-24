// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AIDeGen is ERC721, AccessControl, ERC721URIStorage {
    string public ipfsID;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(
        address user,
        address cartesiDapp,
        string memory _cid
    ) ERC721("AIDeGen", "ADG") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, cartesiDapp);
        _setIpfsID(_cid);
        safeMint(user);
    }

    function _setIpfsID(string memory _cid) internal {
        ipfsID = string(abi.encodePacked(_baseURI(), _cid));
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://"; //set concat
    }

    /// @param to address of the owner of this token
    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return ipfsID;
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, AccessControl, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
