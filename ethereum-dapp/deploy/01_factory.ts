import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (bre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = bre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("AIDeGenFactory", { from: deployer, log: true });
};

func.tags = ["Factory"];
export default func;