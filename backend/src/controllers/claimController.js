const claimService = require("../services/claimService");

async function createClaim(req, res) {
  try {
    const claim = await claimService.createClaim(
      req.body
    );

    res.status(201).json(claim);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create claim",
    });
  }
}

module.exports = {
  createClaim,
};