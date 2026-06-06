const prisma = require("../utils/prisma");
const { invokeContract } = require("./stellarService");

async function createClaim(data) {
  const response = await invokeContract(
    process.env.CLAIM_REGISTRY_CONTRACT,
    "create_claim",
    [
      data.claimId,
      data.hospitalWallet,
      data.insurerWallet,
      data.amount,
    ]
  );

  const claim = await prisma.claim.create({
    data: {
      id: data.claimId,
      hospital: data.hospitalWallet,
      insurer: data.insurerWallet,
      amount: data.amount,
      status: "PENDING",
      txHash: response.hash,
    },
  });

  return claim;
}

module.exports = {
  createClaim,
};