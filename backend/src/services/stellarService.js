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

      if (stderr) {
        console.log("STDERR:");
        console.log(stderr);
      }

      return stdout.trim() || stderr.trim();
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getAddress(identity) {
    return this.run(`stellar keys address ${identity}`);
  }

  // =========================
  // REGISTRATION
  // =========================

  async registerUser(userAddress, role, name) {
    const adminAddress = await this.getAddress("admin");

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
    const adminAddress = await this.getAddress("admin");

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

  // =========================
  // CLAIMS
  // =========================

  async createClaim({ hospitalWallet, insurerWallet, amount }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.registry} \
  --source hospital \
  --network ${NETWORK} \
  -- create_claim \
  --hospital_wallet ${hospitalWallet} \
  --insurer_wallet ${insurerWallet} \
  --claim_amount ${amount}
`;

    return this.run(cmd);
  }

  async getClaim({ claimId }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.registry} \
  --source hospital \
  --network ${NETWORK} \
  -- get_claim \
  --claim_id ${claimId}
`;

    return this.run(cmd);
  }

  async approveClaim({ claimId }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.registry} \
  --source hospital \
  --network ${NETWORK} \
  -- approve_claim \
  --claim_id ${claimId}
`;

    return this.run(cmd);
  }

  async rejectClaim({ claimId }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.registry} \
  --source hospital \
  --network ${NETWORK} \
  -- reject_claim \
  --claim_id ${claimId}
`;

    return this.run(cmd);
  }

  // =========================
  // TOKENIZATION
  // =========================

  async tokenizeClaim({
  claimId,
  owner,
  sourceAccount,
}) {
  const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.tokenization} \
  --source ${sourceAccount} \
  --network ${NETWORK} \
  -- tokenize_claim \
  --claim_id ${claimId} \
  --owner ${owner}
`;

  console.log(cmd);

  return this.run(cmd);
}

  async transferToken({ tokenId, newOwner, sourceAccount }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.tokenization} \
  --source ${sourceAccount} \
  --network ${NETWORK} \
  -- transfer_token \
  --token_id ${tokenId} \
  --new_owner ${newOwner}
`;

    return this.run(cmd);
  }

  async getToken(tokenId) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.tokenization} \
  --source hospital \
  --network ${NETWORK} \
  -- get_token \
  --token_id ${tokenId}
`;

    return this.run(cmd);
  }

  // =========================
  // SETTLEMENT
  // =========================

  async settleClaim({ tokenId, claimId, payer, payee, amount }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.settlement} \
  --source hospital \
  --network ${NETWORK} \
  -- settle_claim \
  --token_id ${tokenId} \
  --claim_id ${claimId} \
  --payer ${payer} \
  --payee ${payee} \
  --amount ${amount}
`;

    return this.run(cmd);
  }

  async getSettlement({ tokenId }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.settlement} \
  --source hospital \
  --network ${NETWORK} \
  -- get_settlement \
  --token_id ${tokenId}
`;

    return this.run(cmd);
  }

  async isSettled({ tokenId }) {
    const cmd = `
stellar contract invoke \
  --id ${CONTRACTS.settlement} \
  --source hospital \
  --network ${NETWORK} \
  -- is_settled \
  --token_id ${tokenId}
`;

    return this.run(cmd);
  }
}

export default new StellarService();