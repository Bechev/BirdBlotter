// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@manifoldxyz/royalty-registry-solidity/contracts/specs/IEIP2981.sol";
import "@manifoldxyz/libraries-solidity/contracts/access/AdminControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BirdBlotter is ERC721, AdminControl {
    
    uint256 public _ethPrice = 0.05*10**18; //0.05 ETH
    uint256 private _royaltyAmount; //in % 
    uint256 public _currentBatch = 1;
    uint256 internal _currentSupply = 0;

    bool public _mintOpened;
    bool public _allMintsAllowed;
    
    mapping (uint256 => bool) _moonbirdMinted;
    mapping (uint256 => bool) _blotterRedeemed;

    address public _moonBirdAddress = 0x23581767a106ae21c074b2276D25e5C3e136a68b;
    address payable  private _royalties_recipient;
    string[] private _uriComponents;

    string _uri;
    
    constructor () ERC721("BirdBlotter", "BirdBlotter") {
        _royalties_recipient = payable(msg.sender);
        _royaltyAmount = 10;
        _uriComponents = [
            'data:application/json;utf8,{"name":"',
            '", "description":"',
            '", "created_by":"nbkmdc.eth", "image":"',
            '", "image_url":"',
            '", "attributes":[{',
            '}]}'];
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
        uint256 moonBirdId,
        address account
    ) external payable{
        require(_mintOpened, "Mint closed");
        require(_moonbirdMinted[moonBirdId] == false, "Blotter already minted");
        require(msg.value >= _ethPrice, "Insufficent funds sent");
        require(IERC721(_moonBirdAddress).ownerOf(moonBirdId) == account, "The recipient of the NFT needs to own the associated moonbird");
        if(!_allMintsAllowed){
            require(_currentSupply < _currentBatch * 1000, "Current supply met");
        }
        payable(_royalties_recipient).transfer(_ethPrice);
        _safeMint(account , moonBirdId);
        _moonbirdMinted[moonBirdId] = true;
        _currentSupply += 1;
    }

    function adminMint(
        uint256 moonBirdId,
        address account
    ) external adminRequired{
        _safeMint(account ,moonBirdId);
        _moonbirdMinted[moonBirdId] = true;
        _currentSupply += 1;
    }

    function toggleMintState()external adminRequired{
        _mintOpened = !_mintOpened;
    }

    function toggleAllMintsAllowedState()external adminRequired{
        _allMintsAllowed = !_allMintsAllowed;
    }

    function setMoonbirdAddress(address moonBirdAddress) external adminRequired{
        _moonBirdAddress = moonBirdAddress;
    }

    function getBlotterName(uint256 blotterId) pure internal returns(string memory){
        string memory blotterIdStr;
        if(blotterId < 10){
            blotterIdStr = string.concat('0000', Strings.toString(blotterId));
        }else if(blotterId <100){
            blotterIdStr =  string.concat('000', Strings.toString(blotterId));
        }else if(blotterId <1000){
            blotterIdStr =  string.concat('00', Strings.toString(blotterId));
        }else{
            blotterIdStr = string.concat('0', Strings.toString(blotterId));
        }
        return blotterIdStr;
    }

    function setURI(string calldata updatedURI) external adminRequired{
        _uri = updatedURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory blotterName = getBlotterName(tokenId);
    
        bytes memory byteString = abi.encodePacked(
            abi.encodePacked(_uriComponents[0], 'Birdblotter ',  blotterName),
            abi.encodePacked(_uriComponents[1], 'BirdBlotter: A 10,000 NFT Collection W/ Redeemable 1/1 Handmade IRL Blotter Art Prints 4 Every MoonBird. Token Holder Benefits: The Non Fungible Blotter Collection: A Series of 10 Limited Release IRL Blotter Art Prints Designed By Local NYC Artists. Exclusively 4 BirdBlotter Holders. '),
            abi.encodePacked(_uriComponents[2],_uri, blotterName, ".png"),
            abi.encodePacked(_uriComponents[3], _uri, blotterName, ".png"),
            abi.encodePacked(_uriComponents[4], '"trait_type": "Blotter Redeemed", "value":',  _blotterRedeemed[tokenId] ? '"true"' : '"false"'),
            abi.encodePacked(_uriComponents[5]));
        return string(byteString);
    }

    function increateSupply() public adminRequired{
        _currentBatch += 1;
    }

    function getMaxSupply() public view returns(uint256){
        return _currentBatch * 1000;
    }

    function redeemBlotter(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You can only redeem a blotter for your own tokens");
        require(_blotterRedeemed[tokenId] == false, "Blotter for this moonbird already claimed");
        _blotterRedeemed[tokenId] = true;
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