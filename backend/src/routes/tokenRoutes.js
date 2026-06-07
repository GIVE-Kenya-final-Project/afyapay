import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
  tokenizeClaim,
  transferToken,
  getToken,
} from "../controllers/tokenController.js";

const router = express.Router();

router.post(
  "/tokenize",
  authMiddleware,
  roleMiddleware(["Hospital"]),
  tokenizeClaim
);
router.post(
  "/transfer",
  authMiddleware,
  roleMiddleware(["Investor"]),
  transferToken
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Hospital", "Insurer", "Investor"]),
  getToken
);

export default router;
