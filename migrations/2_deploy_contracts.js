var CouponFactory = artifacts.require('./CouponFactory.sol');

module.exports = function (deployer) {
  deployer.deploy(CouponFactory);
};
