export const ETH_NETWORKS = [{
    id        : 1,
    name      : 'Main Ethereum Network',
    explorer  : 'https://etherscan.io/',
    socket    : 'wss://mainnet.infura.io/',
    CONTRACT_ADDRESSES: {
      EXIOEXCHANGE  : '0xB085945a6d80b8E5A7202bbc1CEb28F5e3e5bD53',
    },
}, {
    id        : 3,
    name      : 'Ropsten Test Network',
    explorer  : 'https://ropsten.etherscan.io/',
    socket    : 'wss://ropsten.infura.io/v3',
    CONTRACT_ADDRESSES: {
      EXIOEXCHANGE  : '0xB085945a6d80b8E5A7202bbc1CEb28F5e3e5bD53',
    },
}, {
    id        : 5777,
    name      : 'Ganache Local Test Network',
    explorer  : 'http://127.0.0.1:7545/',
    socket    : 'wss://127.0.0.1:7545/',
    CONTRACT_ADDRESSES: {
      EXIOEXCHANGE  : '0xB085945a6d80b8E5A7202bbc1CEb28F5e3e5bD53',
    },
}];

export const API_ROOT = 'https://api-ropsten.etherscan.io/api';
export const API_KEY = '49USA2B7IQCNV3BT61PTVXXQ2UB15GNPAW';
export const API_OPTIONS_GET_CONTRACT_ABI = {
  module    : 'contract',
  action    : 'getabi',
  address   : '0xA63B377BA262c0C0708AbbE125b1b345a9391Cd7',
  apikey    : '49USA2B7IQCNV3BT61PTVXXQ2UB15GNPAW',
}

export const OWNER = '0xA188aD39Ee48c7fD22ff2707C5A0A66E22281B83';
