import web3             from './services/clients/Web3Client';
import ExioExChange     from './contracts/ExioExChange.json';
import { ETH_NETWORKS } from './consts';

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "wss://ropsten.infura.io/",
    },
  },
  contracts: [{
    contractName: 'ExioExChange',
    web3Contract: new web3.eth.Contract(ExioExChange.abi, ETH_NETWORKS[1].CONTRACT_ADDRESSES.EXIOEXCHANGE, {
        data: 'deployedBytecode',
    }),
  }],
  events: {
    ExioExChange: ["Order", "Cancel", "Trade", "Deposit", "Withdraw"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
