pragma solidity ^0.5.2;

import "./token/ERC20/ERC20.sol";
import "./math/SafeMath.sol";

contract ReserveToken is ERC20 {
  address public minter;

  constructor() public {
    minter = msg.sender;
  }

  function create(address account, uint256 amount) public {
    require(msg.sender == minter);
    _balances[account] = SafeMath.add(_balances[account], amount);
    _totalSupply = SafeMath.add(_totalSupply, amount);
  }

  function destroy(address account, uint256 amount) public {
    require(msg.sender == minter);
    require(_balances[account] >= amount);
    _balances[account] = SafeMath.sub(_balances[account], amount);
    _totalSupply = SafeMath.sub(_totalSupply, amount);
  }
}
