const setTokenAddress = address => ({
  type: 'SET_TOKEN_ADDRESS',
  address
})

const setTokenName = name => ({
  type: 'SET_TOKEN_NAME',
  name
})

const balanceOfToken = (balance) => ({
  type: 'GET_BALANCE_OF_TOKEN',
  balance
})

export default {
  SET_TOKEN_ADDRESS: (address) => setTokenAddress(address),
  SET_TOKEN_NAME: (name) => setTokenName(name),
  GET_BALANCE_OF_TOKEN: (balance) => balanceOfToken(balance),
};
