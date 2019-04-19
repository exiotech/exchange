const consts = require('../consts');

const AccountLevel = artifacts.require("AccountLevel");
const ExioExChange = artifacts.require("ExioExChange");

module.exports = async function(deployer, network, [owner]) {
  await deployer.deploy(AccountLevel);
  await deployer.deploy(ExioExChange, consts.OWNER, consts.FEE_ACCOUNT, AccountLevel.address, consts.FEE_MAKE, consts.FEE_TAKE, consts.FEE_REBATE);
};
