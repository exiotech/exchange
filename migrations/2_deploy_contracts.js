const AccountLevel = artifacts.require("AccountLevel");
const ExioExChange = artifacts.require("ExioExChange");

module.exports = async function(deployer) {
  await deployer.deploy(AccountLevel);
  await deployer.deploy(ExioExChange, '0x689cDd53AFB3A786A4821dED5669f1c9E8ffAEB7', '0x88d90A6a83A5829c48EF002330E99141f12F0394', AccountLevel.address, 1, 1, 1);
};
