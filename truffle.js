var consts = require('./consts');
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(consts.PRIVATE_KEY, "https://ropsten.infura.io/v3/" + consts.INFURA_API_KEY)
      },
      network_id: 3,
      // gas: 4000000
    },
  },

  mocha: {
    useColors: true
  },

  compilers: {
    solc: {
      version: "0.5.2",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    }
  }
};
