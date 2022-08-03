const { getNamedAccounts, deployments, network, ethers } = require("hardhat");

const BASE_FEE = "250000000000000000"; // 0.25 LINK per request
const GAS_PRICE_LINK = 1e9; // link per gas

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    // If we are on a local development network, we need to deploy mocks!
    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...");
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        });

        log("Mocks Deployed!");
        log("----------------------------------------------------------");
    }
};
module.exports.tags = ["all", "mocks"];
