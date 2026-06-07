import stellarService from "./stellarService.js";
import prisma from "../../prisma/client.js";

export async function tokenizeClaimService({
  claimId,
  owner,
  userWallet,
}) {
  // 1. Call blockchain
  const result = await stellarService.tokenizeClaim({
    claimId,
    owner,
    sourceAccount: userWallet,
  });

  const tokenId = result?.returnValue || 1;

  // 2. Save to DB
  const token = await prisma.claimToken.create({
    data: {
      tokenId: Number(tokenId),
      claimId: Number(claimId),
      owner,
    },
  });

  return token;
}
export async function transferTokenService({
  tokenId,
  newOwner,
  userWallet,
}) {
  const result = await stellarService.transferToken({
    tokenId,
    newOwner,
    sourceAccount: userWallet,
  });

  await prisma.claimToken.updateMany({
    where: { tokenId: Number(tokenId) },
    data: { owner: newOwner },
  });

  return result;
}
export async function getTokenService(tokenId) {
  const token = await prisma.claimToken.findUnique({
    where: { tokenId: Number(tokenId) },
  });

  return token;
}