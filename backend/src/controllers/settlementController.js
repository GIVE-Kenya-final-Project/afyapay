import {
  settleClaim as settleClaimService,
  getSettlement as getSettlementService,
  isSettled as isSettledService,
} from "../services/settlementService.js";

export const settleClaim = async (req, res) => {
  try {
    const {
      tokenId,
      claimId,
      payer,
      payee,
      amount,
    } = req.body;

    const result =
      await settleClaimService({
        tokenId,
        claimId,
        payer,
        payee,
        amount,
      });

    res.status(200).json({
      success: true,
      message: "Claim settled successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
};

export const getSettlement = async (req, res) => {
  try {
    const result =
      await getSettlementService(
        req.params.tokenId
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
};

export const isSettled = async (req, res) => {
  try {
    const result =
      await isSettledService(
        req.params.tokenId
      );

    res.status(200).json({
      success: true,
      settled: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
};