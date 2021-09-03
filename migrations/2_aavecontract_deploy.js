const AaveContract = artifacts.require("AaveContract.sol");

module.exports = function (deployer) {
  deployer.deploy(AaveContract);
};
