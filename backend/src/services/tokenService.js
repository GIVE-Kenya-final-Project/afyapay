import stellarService from "./stellarService.js";
import prisma from "../../prisma/client.js";

export async function tokenizeClaimService({
  claimId,
  owner,
  userWallet,
}) {
  // create attempt record before calling chain
  const attempt = await prisma.tokenizationAttempt.create({
    data: {
      claimId: claimId ? Number(claimId) : null,
      status: "PENDING",
      attemptCount: 0,
      metadata: JSON.stringify({ owner, userWallet }),
    },
  });

  try {
    // increment attempt count
    await prisma.tokenizationAttempt.update({ where: { id: attempt.id }, data: { attemptCount: attempt.attemptCount + 1 } });

    // 1. Call blockchain
    const result = await stellarService.tokenizeClaim({
      claimId,
      owner,
      sourceAccount: userWallet,
    });

    const tokenId = result?.returnValue;

    if (!tokenId) {
      throw new Error("Tokenization failed: no tokenId returned from chain");
    }

    // 2. Save to DB
    const token = await prisma.claimToken.create({
      data: {
        tokenId: Number(tokenId),
        claimId: Number(claimId),
        owner,
      },
    });

    // update attempt as success
    await prisma.tokenizationAttempt.update({
      where: { id: attempt.id },
      data: { status: "SUCCESS", tokenId: Number(tokenId) },
    });

    return token;
  } catch (error) {
    console.error("tokenizeClaimService error:", error);
    try {
      // update attempt as failed
      await prisma.tokenizationAttempt.update({
        where: { id: attempt.id },
        data: {
          status: "FAILED",
          errorMessage: error.message,
          attemptCount: { increment: 0 },
        },
      });

      await prisma.tokenizationFailure.create({
        data: {
          claimId: claimId ? Number(claimId) : null,
          tokenId: null,
          errorMessage: error.message,
          metadata: JSON.stringify({ attemptId: attempt.id, rawError: String(error) }),
        },
      });
    } catch (logErr) {
      console.error("Failed to log tokenization failure / attempt update:", logErr);
    }

    // Bubble up so caller can handle/error-response
    throw error;
  }
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