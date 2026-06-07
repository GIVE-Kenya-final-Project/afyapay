import * as tokenService from "../services/tokenService.js";
import prisma from "../../prisma/client.js";

export const purchaseToken = async (req, res) => {
  try {
    const { tokenId, newOwner, sourceAccount } = req.body;

    if (!tokenId || !newOwner || !sourceAccount) {
      return res.status(400).json({ success: false, message: "tokenId, newOwner and sourceAccount required" });
    }

    // transfer token on-chain and update DB via tokenService
    const result = await tokenService.transferTokenService({
      tokenId,
      newOwner,
      userWallet: sourceAccount,
    });

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("purchaseToken error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTokenizationFailures = async (req, res) => {
  try {
    const failures = await prisma.tokenizationFailure.findMany({ orderBy: { createdAt: "desc" } });
    return res.json({ success: true, data: failures });
  } catch (error) {
    console.error("getTokenizationFailures error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const retryFailedAttempts = async (req, res) => {
  try {
    const limit = Number(req.body.limit) || 10;

    const attempts = await prisma.tokenizationAttempt.findMany({
      where: { status: "FAILED" },
      take: limit,
      orderBy: { createdAt: "asc" },
    });

    const results = [];

    for (const a of attempts) {
      let meta = {};
      try {
        meta = a.metadata ? JSON.parse(a.metadata) : {};
      } catch (e) {
        meta = {};
      }

      const owner = meta.owner || null;
      const userWallet = meta.userWallet || null;

      try {
        // call chain directly
        const result = await (await import("../services/stellarService.js")).default.tokenizeClaim({ claimId: a.claimId, owner, sourceAccount: userWallet });
        const tokenId = result?.returnValue;

        if (!tokenId) throw new Error("No tokenId from chain on retry");

        // create claimToken if missing
        const existing = await prisma.claimToken.findUnique({ where: { tokenId: Number(tokenId) } });
        if (!existing) {
          await prisma.claimToken.create({ data: { tokenId: Number(tokenId), claimId: a.claimId ? Number(a.claimId) : null, owner } });
        }

        await prisma.tokenizationAttempt.update({ where: { id: a.id }, data: { status: "SUCCESS", tokenId: Number(tokenId), errorMessage: null } });

        results.push({ attemptId: a.id, status: "success", tokenId });
      } catch (err) {
        // increment attemptCount and update error
        await prisma.tokenizationAttempt.update({ where: { id: a.id }, data: { attemptCount: { increment: 1 }, errorMessage: err.message } });
        results.push({ attemptId: a.id, status: "failed", error: err.message });
      }
    }

    return res.json({ success: true, results });
  } catch (error) {
    console.error("retryFailedAttempts error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
