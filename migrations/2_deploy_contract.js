const ether = 10**18; // 1 ether = 1000000000000000000 wei
const funds = 0.01*ether; // initial funding

var StakeBank = artifacts.require("StakeBank");

module.exports = function(deployer) {
  deployer.deploy(StakeBank, {value: funds});
};
