// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@manifoldxyz/royalty-registry-solidity/contracts/specs/IEIP2981.sol";
import "@manifoldxyz/libraries-solidity/contracts/access/AdminControl.sol";

contract MoonbirdTest is ERC721, AdminControl {
    
    uint256 private _royaltyAmount; //in % 

    bool public _mintOpened;
    bool public _allMintsAllowed;
    
    mapping (uint256 => bool) _moonbirdMinted;
    mapping (uint256 => bool) _blotterRedeemed;

    address public _moonBirdAddress = 0x23581767a106ae21c074b2276D25e5C3e136a68b;
    address payable  private _royalties_recipient;

    string _uri;
    
    constructor () ERC721("MoonbirdTest", "MoonbirdTest") {
        _royalties_recipient = payable(msg.sender);
        _royaltyAmount = 10;

    } 

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AdminControl)
        returns (bool)
    {
        return
        AdminControl.supportsInterface(interfaceId) ||
        ERC721.supportsInterface(interfaceId) ||
        interfaceId == type(IEIP2981).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    function publicMint(
        address recipient,
        uint256 tokenId
    ) external payable{
        _safeMint(recipient , tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("moonbird test"));
    }

    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId)== msg.sender, "You can only burn your own tokens");
        _burn(tokenId);
    }

    function setRoyalties(address payable _recipient, uint256 _royaltyPerCent) external adminRequired {
        _royalties_recipient = _recipient;
        _royaltyAmount = _royaltyPerCent;
    }

    function royaltyInfo(uint256 salePrice) external view returns (address, uint256) {
        if(_royalties_recipient != address(0)){
            return (_royalties_recipient, (salePrice * _royaltyAmount) / 100 );
        }
        return (address(0), 0);
    }

    function withdraw(address recipient) external adminRequired {
        payable(recipient).transfer(address(this).balance);
    }

}