const setTokenAddress = address => ({
  type: 'SET_TOKEN_ADDRESS',
  address
})

const setTokenName = name => ({
  type: 'SET_TOKEN_NAME',
  name
})

const setBalanceOfToken = (balance) => ({
  type: 'SET_BALANCE_OF_TOKEN',
  balance
})

export default {
  SET_TOKEN_ADDRESS: (address) => setTokenAddress(address),
  SET_TOKEN_NAME: (name) => setTokenName(name),
  SET_BALANCE_OF_TOKEN: (balance) => setBalanceOfToken(balance),
};
