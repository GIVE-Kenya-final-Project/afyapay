import { createClaim, approveClaim, rejectClaim } from "../services/claimService.js";
import * as tokenService from "../services/tokenService.js";
import prisma from "../../prisma/client.js";

const serializeBigInts = (value) =>
  JSON.parse(
    JSON.stringify(value, (_, nestedValue) =>
      typeof nestedValue === "bigint" ? nestedValue.toString() : nestedValue
    )
  );
export const createClaimController = async (req, res) => {
  try {
    const hospitalWallet = req.body.hospitalWallet || req.body.hospital_Wallet || req.user?.wallet;
    const insurerWallet = req.body.insurerWallet || req.body.insurer_Wallet;
    const amount = req.body.amount;

    if (!hospitalWallet || !insurerWallet || amount === undefined || amount === null) {
      return res.status(400).json({
        success: false,
        message: "hospitalWallet, insurerWallet and amount are required",
      });
    }

    const claim = await createClaim({
      hospitalWallet,
      insurerWallet,
      amount,
      sourceAccount: req.user?.wallet,
    });

    res.json(serializeBigInts(claim));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const approveClaimController = async (req, res) => {
  try {
    // approveClaim now returns the updated claim record
    const updatedClaim = await approveClaim({
      claimId: req.params.id,
      sourceAccount: req.body.sourceAccount,
    });

    let token;
    if (updatedClaim) {
      token = await tokenService.tokenizeClaimService({
        claimId: updatedClaim.blockchainId,
        owner: updatedClaim.hospitalWallet,
        userWallet: updatedClaim.hospitalWallet,
      });
    }

    res.json({ approval: updatedClaim, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const rejectClaimController = async (req, res) => {
  try {
    const result = await rejectClaim({
      claimId: req.params.id,
      sourceAccount: req.body.sourceAccount,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};