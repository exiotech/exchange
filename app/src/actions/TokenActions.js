const setTokenAddress = address => ({
  type: 'SET_TOKEN_ADDRESS',
  address
})

const balanceOfToken = (balance) => ({
  type: 'GET_BALANCE_OF_TOKEN',
  balance
})

export default {
  SET_TOKEN_ADDRESS: (address) => setTokenAddress(address),
  GET_BALANCE_OF_TOKEN: (balance) => balanceOfToken(balance),
};
