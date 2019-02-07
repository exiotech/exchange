pragma solidity ^0.5.2;

import "./math/SafeMath.sol";
import "./token/ERC20/ERC20.sol";
import "./accounts/AccountLevel.sol";

contract ExioExChange {
  using SafeMath for uint256;

  address public owner;
  address public feeAccount; //the account that will receive fees
  address public accountLevelAddr; //the address of the AccountLevel contract

  uint256 public feeMake; //percentage times (1 ether)
  uint256 public feeTake; //percentage times (1 ether)
  uint256 public feeRebate; //percentage times (1 ether)

  mapping(address => mapping(address => uint256)) public tokens; //mapping of token addresses to mapping of account balances (token=0 means Ether)
  mapping(address => mapping(bytes32 => bool)) public orders; //mapping of user accounts to mapping of order hashes to booleans (true = submitted by user, equivalent to offchain signature)
  mapping(address => mapping(bytes32 => uint256)) public orderFills; //mapping of user accounts to mapping of order hashes to uints (amount of order that has been filled)

  event Order(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint256 nonce, address user);
  event Cancel(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint256 nonce, address user, uint8 v, bytes32 r, bytes32 s);
  event Trade(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, address get, address give);
  event Deposit(address token, address user, uint256 amount, uint256 balance);
  event Withdraw(address token, address user, uint256 amount, uint256 balance);

  constructor(address owner_, address feeAccount_, address accountLevelAddr_, uint256 feeMake_, uint256 feeTake_, uint256 feeRebate_) public {
    owner = owner_;
    feeAccount = feeAccount_;
    accountLevelAddr = accountLevelAddr_;
    feeMake = feeMake_;
    feeTake = feeTake_;
    feeRebate = feeRebate_;
  }

  function() external {
    revert();
  }

  function changeOwner(address owner_) public {
    require(msg.sender == owner);
    owner = owner_;
  }

  function changeAccountLevelAddr(address accountLevelAddr_) public {
    require(msg.sender == owner);
    accountLevelAddr = accountLevelAddr_;
  }

  function changeFeeAccount(address feeAccount_) public {
    require(msg.sender == owner);
    feeAccount = feeAccount_;
  }

  function changeFeeMake(uint256 feeMake_) public {
    require(msg.sender == owner);
    require(feeMake_ <= feeMake);
    feeMake = feeMake_;
  }

  function changeFeeTake(uint256 feeTake_) public {
    require(msg.sender == owner);
    require(feeTake_ <= feeTake || feeTake_ >= feeRebate);
    feeTake = feeTake_;
  }

  function changeFeeRebate(uint256 feeRebate_) public {
    require(msg.sender == owner);
    require(feeRebate_ >= feeRebate || feeRebate_ <= feeRebate);
    feeRebate = feeRebate_;
  }

  function deposit() public payable {
    tokens[address(0)][msg.sender] = SafeMath.add(tokens[address(0)][msg.sender], msg.value);
    emit Deposit(address(0), msg.sender, msg.value, tokens[address(0)][msg.sender]);
  }

  function withdraw(uint256 amount) public {
    require(tokens[address(0)][msg.sender] >= amount);
    tokens[address(0)][msg.sender] = SafeMath.sub(tokens[address(0)][msg.sender], amount);
    // require(msg.sender.call.value(amount)(""));
    emit Withdraw(address(0), msg.sender, amount, tokens[address(0)][msg.sender]);
  }

  function depositToken(address token, uint256 amount) public {
    require(token != address(0));
    require(ERC20(token).transferFrom(msg.sender, address(this), amount));
    tokens[token][msg.sender] = SafeMath.add(tokens[token][msg.sender], amount);
    emit Deposit(token, msg.sender, amount, tokens[token][msg.sender]);
  }

  function withdrawToken(address token, uint amount) public {
    require(token != address(0));
    require(tokens[token][msg.sender] >= amount);
    tokens[token][msg.sender] = SafeMath.sub(tokens[token][msg.sender], amount);
    require(ERC20(token).transfer(msg.sender, amount));
    emit Withdraw(token, msg.sender, amount, tokens[token][msg.sender]);
  }

  function balanceOf(address token, address user) public view returns(uint256) {
    return tokens[token][user];
  }

  function order(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint256 nonce) public {
    bytes memory arg = abi.encodePacked(address(this), tokenGet, amountGet, tokenGive, amountGive, expires, nonce);
    bytes32 hash_ = sha256(arg);
    orders[msg.sender][hash_] = true;
    emit Order(tokenGet, amountGet, tokenGive, amountGive, expires, nonce, msg.sender);
  }

  function trade(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint nonce, address user, uint8 v, bytes32 r, bytes32 s, uint256 amount) public {
    // //amount is in amountGet terms
    bytes memory arg = abi.encodePacked(address(this), tokenGet, amountGet, tokenGive, amountGive, expires, nonce);
    bytes32 hash_ = sha256(arg);
    arg = abi.encodePacked("\x19Ethereum Signed Message:\n32", hash_);
    require(
      (orders[user][hash_] || ecrecover(keccak256(arg), v, r, s) == user) &&
      block.number <= expires &&
      SafeMath.add(orderFills[user][hash_], amount) <= amountGet
    );
    tradeBalances(tokenGet, amountGet, tokenGive, amountGive, user, amount);
    orderFills[user][hash_] = SafeMath.add(orderFills[user][hash_], amount);
    emit Trade(tokenGet, amount, tokenGive, amountGive * amount / amountGet, user, msg.sender);
  }

  function tradeBalances(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, address user, uint256 amount) private {
    uint256 feeMakeXfer = SafeMath.mul(amount, feeMake) / (1 ether);
    uint256 feeTakeXfer = SafeMath.mul(amount, feeTake) / (1 ether);
    uint256 feeRebateXfer = uint256(0);

    if(accountLevelAddr != address(0)) {
      uint256 accountLevel = AccountLevel(accountLevelAddr).accountLevels(user);
      if(accountLevel == 1) feeRebateXfer = SafeMath.mul(amount, feeRebate) / (1 ether);
      if(accountLevel == 2) feeRebateXfer = feeTakeXfer;
    }

    tokens[tokenGet][msg.sender] = SafeMath.sub(tokens[tokenGet][msg.sender], SafeMath.add(amount, feeTakeXfer));
    tokens[tokenGet][user] = SafeMath.add(tokens[tokenGet][user], SafeMath.sub(SafeMath.add(amount, feeRebateXfer), feeMakeXfer));
    tokens[tokenGet][feeAccount] = SafeMath.add(tokens[tokenGet][feeAccount], SafeMath.sub(SafeMath.add(feeMakeXfer, feeTakeXfer), feeRebateXfer));
    tokens[tokenGive][user] = SafeMath.sub(tokens[tokenGive][user], SafeMath.mul(amountGive, amount) / amountGet);
    tokens[tokenGive][msg.sender] = SafeMath.add(tokens[tokenGive][msg.sender], SafeMath.mul(amountGive, amount) / amountGet);
  }

  function testTrade(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint256 nonce, address user, uint8 v, bytes32 r, bytes32 s, uint256 amount, address sender) public view returns(bool) {
    if(!(
      tokens[tokenGet][sender] >= amount &&
      availableVolume(tokenGet, amountGet, tokenGive, amountGive, expires, nonce, user, v, r, s) >= amount
    )) return false;
    return true;
  }

  function availableVolume(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint256 nonce, address user, uint8 v, bytes32 r, bytes32 s) public view returns(uint256) {
    bytes memory arg = abi.encodePacked(address(this), tokenGet, amountGet, tokenGive, amountGive, expires, nonce);
    bytes32 hash_ = sha256(arg);
    arg = abi.encodePacked("\x19Ethereum Signed Message:\n32", hash_);
    if(!(
      (orders[user][hash_] || ecrecover(keccak256(arg), v, r, s) == user) &&
      block.number <= expires
    )) return 0;
    // delete arg;
    // uint256 available1 = SafeMath.sub(amountGet, orderFills[user][hash_]);
    // uint256 available2 = SafeMath.mul(tokens[tokenGive][user], amountGet)/ amountGive;
    if(SafeMath.sub(amountGet, orderFills[user][hash_]) < SafeMath.mul(tokens[tokenGive][user], amountGet)/ amountGive) return SafeMath.sub(amountGet, orderFills[user][hash_]);
    return SafeMath.mul(tokens[tokenGive][user], amountGet)/ amountGive;
  }

  function amountFilled(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint256 nonce, address user) public view returns(uint256) {
    bytes memory arg = abi.encodePacked(address(this), tokenGet, amountGet, tokenGive, amountGive, expires, nonce);
    bytes32 hash_ = sha256(arg);
    return orderFills[user][hash_];
  }

  function cancelOrder(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 expires, uint256 nonce, uint8 v, bytes32 r, bytes32 s) public {
    bytes memory arg = abi.encodePacked(address(this), tokenGet, amountGet, tokenGive, amountGive, expires, nonce);
    bytes32 hash_ = sha256(arg);
    require((orders[msg.sender][hash_] || ecrecover(keccak256(arg), v, r, s) == msg.sender));
    orderFills[msg.sender][hash_] = amountGet;
    emit Cancel(tokenGet, amountGet, tokenGive, amountGive, expires, nonce, msg.sender, v, r, s);
  }
}
