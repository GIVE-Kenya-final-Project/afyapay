import stellarService from "./stellarService.js";
import prisma from "../../prisma/client.js";

const extractBigIntFromOutput = (output) => {
  const match = String(output).match(/\d+/g);
  if (!match || match.length === 0) {
    throw new Error(`Unable to parse blockchain claim id from output: ${output}`);
  }

  return BigInt(match[match.length - 1]);
};

export const createClaim = async (data) => {
  const { hospitalWallet, insurerWallet, amount, sourceAccount } = data;

  // 1. Call blockchain
  const blockchainClaimId = await stellarService.createClaim({
    hospitalWallet,
    insurerWallet,
    amount,
    sourceAccount,
  });

  let parsedBlockchainClaimId;
  try {
    parsedBlockchainClaimId = extractBigIntFromOutput(blockchainClaimId);
  } catch (error) {
    const nextClaimNumber = (await prisma.claim.count()) + 1;
    parsedBlockchainClaimId = BigInt(nextClaimNumber);
  }

  // 2. Save to DB
  try {
    const claim = await prisma.claim.create({
      data: {
        blockchainId: parsedBlockchainClaimId,
        hospitalWallet,
        insurerWallet,
        amount,
        status: "PENDING",
      },
    });

    return claim;
  } catch (error) {
    if (error?.code === "P2002") {
      const existingClaim = await prisma.claim.findUnique({
        where: { blockchainId: parsedBlockchainClaimId },
      });

      if (existingClaim) {
        return existingClaim;
      }
    }

    throw error;
  }
};
export const getClaim = async (claimId) => {
  return await stellarService.getClaim({ claimId });
};
export const approveClaim = async ({ claimId, sourceAccount }) => {
  // Determine claim record: try DB id first, then blockchainId
  let claimRecord = null;

  if (!isNaN(Number(claimId))) {
    claimRecord = await prisma.claim.findUnique({ where: { id: Number(claimId) } });
  }

  if (!claimRecord) {
    try {
      claimRecord = await prisma.claim.findUnique({ where: { blockchainId: BigInt(claimId) } });
    } catch (e) {
      // ignore parse errors
    }
  }

  if (!claimRecord) {
    throw new Error(`Claim not found for id ${claimId}`);
  }

  const blockchainId = claimRecord.blockchainId;

  // 1. Blockchain update
  await stellarService.approveClaim({ claimId: blockchainId, sourceAccount });

  // 2. Update DB by primary id
  const updated = await prisma.claim.update({ where: { id: claimRecord.id }, data: { status: "APPROVED" } });

  return updated;
};
export const rejectClaim = async ({ claimId, sourceAccount }) => {
  // Determine claim record: try DB id first, then blockchainId
  let claimRecord = null;

  if (!isNaN(Number(claimId))) {
    claimRecord = await prisma.claim.findUnique({ where: { id: Number(claimId) } });
  }

  if (!claimRecord) {
    try {
      claimRecord = await prisma.claim.findUnique({ where: { blockchainId: BigInt(claimId) } });
    } catch (e) {
      // ignore parse errors
    }
  }

  if (!claimRecord) {
    throw new Error(`Claim not found for id ${claimId}`);
  }

  const blockchainId = claimRecord.blockchainId;

  await stellarService.rejectClaim({ claimId: blockchainId, sourceAccount });

  const updated = await prisma.claim.update({ where: { id: claimRecord.id }, data: { status: "REJECTED" } });

  return updated;
};