import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
  settleClaim,
  getSettlement,
  isSettled,
} from "../controllers/settlementController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Insurer"]),
  settleClaim
);

router.get(
  "/:tokenId",
  authMiddleware,
  roleMiddleware(["Insurer"]),
  getSettlement
);

router.get(
  "/:tokenId/status",
  authMiddleware,
  roleMiddleware(["Insurer"]),
  isSettled
);

export default router;