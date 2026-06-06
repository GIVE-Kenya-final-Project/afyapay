const router = require("express").Router();

const {
  createClaim,
} = require("../controllers/claimController");

router.post("/", createClaim);

module.exports = router;