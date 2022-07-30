var BirdBlotter = artifacts.require("./BirdBlotter.sol");
var MoonbirdTest = artifacts.require("./MoonbirdTest.sol");


module.exports = async function(deployer) {
  await deployer.deploy(BirdBlotter);
  await deployer.deploy(MoonbirdTest);
};
