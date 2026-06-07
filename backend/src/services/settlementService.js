import stellarService from "./stellarService.js";

export const settleClaim = async ({
  tokenId,
  claimId,
  payer,
  payee,
  amount,
}) => {
  return await stellarService.settleClaim(
    tokenId,
    claimId,
    payer,
    payee,
    amount
  );
};

export const getSettlement = async (tokenId) => {
  return await stellarService.getSettlement(tokenId);
};

export const isSettled = async (tokenId) => {
  return await stellarService.isSettled(tokenId);
};