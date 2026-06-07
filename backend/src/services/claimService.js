import stellarService from "./stellarService.js";
import prisma from "../../prisma/client.js";
export const createClaim = async (data) => {
  const { hospitalWallet, insurerWallet, amount, sourceAccount } = data;

  // 1. Call blockchain
  const blockchainClaimId = await stellarService.createClaim({
    hospitalWallet,
    insurerWallet,
    amount,
    sourceAccount,
  });

  // 2. Save to DB
  const claim = await prisma.claim.create({
    data: {
      blockchainId: Number(blockchainClaimId),
      hospitalWallet,
      insurerWallet,
      amount,
      status: "PENDING",
    },
  });

  return claim;
};
export const getClaim = async (claimId) => {
  return await stellarService.getClaim({ claimId });
};
export const approveClaim = async ({ claimId, sourceAccount }) => {

  // 1. Blockchain update
  await stellarService.approveClaim({
    claimId,
    sourceAccount,
  });

  // 2. Update DB
  await prisma.claim.update({
    where: { blockchainId: Number(claimId) },
    data: { status: "APPROVED" },
  });

  return { success: true };
};
export const rejectClaim = async ({ claimId, sourceAccount }) => {

  await stellarService.rejectClaim({
    claimId,
    sourceAccount,
  });

  await prisma.claim.update({
    where: { blockchainId: Number(claimId) },
    data: { status: "REJECTED" },
  });

  return { success: true };
};