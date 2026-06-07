import { createClaim, approveClaim, rejectClaim } from "../services/claimService.js";
export const createClaimController = async (req, res) => {
  try {
    const claim = await createClaim(req.body);
    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const approveClaimController = async (req, res) => {
  try {
    const result = await approveClaim({
      claimId: req.params.id,
      sourceAccount: req.body.sourceAccount,
    });

    res.json(result);
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