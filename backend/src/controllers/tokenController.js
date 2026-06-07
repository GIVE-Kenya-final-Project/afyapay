import * as tokenService from "../services/tokenService.js";

export async function tokenizeClaim(req, res) {
  try {
    const { claimId, owner } = req.body;

    const userWallet = req.user.wallet;

    const token = await tokenService.tokenizeClaimService({
      claimId,
      owner,
      userWallet,
    });

    res.json(token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function transferToken(req, res) {
  try {
    const { tokenId, newOwner } = req.body;

    const userWallet = req.user.wallet;

    const result = await tokenService.transferTokenService({
      tokenId,
      newOwner,
      userWallet,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getToken(req, res) {
  try {
    const { id } = req.params;

    const token = await tokenService.getTokenService(id);

    res.json(token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}