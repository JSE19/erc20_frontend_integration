//SPDX-License-Identifier:MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RAJ is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 10000000 ether;
    uint256 public constant FAUCET_AMT = 1 ether;
    uint256 public constant CLAIM_INTERVAL = 1 days;
    mapping(address => uint256) nextClaimTime;
    //mapping (address => uint) currentClaimTime;
    //mapping (address => uint) MytotalSupply;

    error MustNotExceedMaxSupply(uint256 max);
    error InsufficientBalance();
    error NextClaimTimeNotReached();
    error OwnerCantClaim();

    event Claimed(address indexed receiver, uint256 amount);

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) Ownable(msg.sender) {}

    function mint(uint256 _amount) external onlyOwner {
        require(_amount <= MAX_SUPPLY, MustNotExceedMaxSupply(MAX_SUPPLY));
        require((totalSupply() + _amount) <= MAX_SUPPLY, MustNotExceedMaxSupply(MAX_SUPPLY));
        //MytotalSupply[address(this)] += _amount
        _mint(address(this), _amount);
    }

    function requestToken() external {
        uint256 contractBalance = balanceOf(address(this));
        require(msg.sender != owner(), OwnerCantClaim());
        require(contractBalance >= FAUCET_AMT, InsufficientBalance());
        require(block.timestamp >= nextClaimTime[msg.sender], NextClaimTimeNotReached());
        nextClaimTime[msg.sender] = block.timestamp + CLAIM_INTERVAL;

        _transfer(address(this), msg.sender, FAUCET_AMT);
        emit Claimed(msg.sender, FAUCET_AMT);
    }
}
