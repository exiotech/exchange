pragma solidity ^0.5.2;

import "./IAccountLevel.sol";

contract AccountLevel is IAccountLevel {
  mapping(address => uint256) public accountLevels;

  function setAccountLevel(address user, uint256 level) public {
    accountLevels[user] = level;
  }
}
