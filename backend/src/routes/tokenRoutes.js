import express from "express";
import {
  tokenizeClaim,
  transferToken,
  getToken,
} from "../controllers/tokenController.js";

const router = express.Router();

router.post("/tokenize", tokenizeClaim);
router.post("/transfer", transferToken);
router.get("/:id", getToken);

export default router;
