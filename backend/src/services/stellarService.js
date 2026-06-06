/*registerUser()

createClaim()

approveClaim()

rejectClaim()

tokenizeClaim()

transferToken()

settleClaim()*/
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

class StellarService {
  async run(command) {
    try {
      const { stdout } = await execAsync(command);
      return stdout.trim();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getHospitalAddress() {
    return this.run(
      "stellar keys address hospital"
    );
  }
}
async getAddress(identity) {
  const cmd = `stellar keys address ${identity}`;
  return this.run(cmd);
}
async registerUser(
  userAddress,
  role,
  name
) {
  const adminAddress =
    await this.getAddress("admin");

  const cmd = `
    stellar contract invoke \
    --id ${CONTRACTS.registration} \
    --source admin \
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
    --source admin \
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
    --source admin \
    --network ${NETWORK} \
    -- get_role \
    --user ${userAddress}
  `;

  return this.run(cmd);
}
async deactivateUser(userAddress) {
  const adminAddress =
    await this.getAddress("admin");

  const cmd = `
    stellar contract invoke \
    --id ${CONTRACTS.registration} \
    --source admin \
    --network ${NETWORK} \
    -- deactivate_user \
    --caller ${adminAddress} \
    --user ${userAddress}
  `;

  return this.run(cmd);
}
export default new StellarService();