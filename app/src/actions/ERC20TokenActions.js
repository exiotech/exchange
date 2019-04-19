export default {
  REQUESTED_ERC20_TOKEN_ABI: () => ({}),
  REQUESTED_ERC20_TOKEN_ABI_SUCCEEDED: (abi) => ({ abi }),
  REQUESTED_ERC20_TOKEN_ABI_FAILED: () => ({}),
  SET_ERC20_TOKEN_ADDRESS: (address) => ({ address }),
  SET_ERC20_TOKEN_TOTAL_SUPPLY: (totalSupply) => ({ totalSupply }),
  SET_ERC20_TOKEN_SYMBOL: (symbol) => ({ symbol }),
  SET_ERC20_TOKEN_NAME: (name) => ({ name }),
  SET_ERC20_TOKEN_DECIMALS: (decimals) => ({ decimals }),
  SET_BALANCE_OF: (balanceOf) => ({ balanceOf }),
};
