const setTokenAddress = address => ({
  type: 'SET_TOKEN_ADDRESS',
  address
})

export default {
  SET_TOKEN_ADDRESS: (address) => setTokenAddress(address),
};
