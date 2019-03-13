import ExioExChange from "./contracts/ExioExChange.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
  contracts: [ExioExChange],
  events: {
    ExioExChange: ["Order", "Cancel", "Trade", "Deposit", "Withdraw"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
