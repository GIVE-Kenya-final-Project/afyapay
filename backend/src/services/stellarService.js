import { exec } from "child_process";
import util from "util";
import { CONTRACTS, NETWORK } from "../config/stellar.js";
const execAsync = util.promisify(exec);

class StellarService {
  async run(command) {
  try {
    const { stdout, stderr } = await execAsync(command);

    console.log("STDOUT:");
    console.log(stdout);

    console.log("STDERR:");
    console.log(stderr);

    return stdout.trim();
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

  async getHospitalAddress() {
    return this.run(
      "stellar keys address hospital"
    );
  }
  async getAddress(identity) {
    const cmd = `stellar keys address ${identity}`;
    return this.run(cmd);
  }

  async registerUser(userAddress, role, name) {
    const adminAddress = await this.getAddress("admin");

    const cmd = `
      stellar contract invoke \
      --id ${CONTRACTS.registration} \
      --source hospital \
      --network ${NETWORK} \
      -- register_user \
      --caller ${adminAddress} \
      --user ${userAddress} \
      --role ${role} \
      --name "${name}"
    `;

    return this.run(cmd);
  }

  async getUser(userAddress) {
    const cmd = `
      stellar contract invoke \
      --id ${CONTRACTS.registration} \
      --source hospital \
      --network ${NETWORK} \
      -- get_user \
      --user ${userAddress}
    `;

    return this.run(cmd);
  }

  async getRole(userAddress) {
    const cmd = `
      stellar contract invoke \
      --id ${CONTRACTS.registration} \
      --source hospital \
      --network ${NETWORK} \
      -- get_role \
      --user ${userAddress}
    `;

    return this.run(cmd);
  }

  async deactivateUser(userAddress) {
    const adminAddress = await this.getAddress("admin");

    const cmd = `
      stellar contract invoke \
      --id ${CONTRACTS.registration} \
      --source hospital \
      --network ${NETWORK} \
      -- deactivate_user \
      --caller ${adminAddress} \
      --user ${userAddress}
    `;

    return this.run(cmd);
  }
}
export default new StellarService();