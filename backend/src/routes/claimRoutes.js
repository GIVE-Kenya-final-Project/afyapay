import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
  createClaimController,
  approveClaimController,
  rejectClaimController,
  getClaimsController,
  getClaimController,
} from "../controllers/claimController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getClaimsController
);
router.get(
  "/:id",
  authMiddleware,
  getClaimController
);
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["Hospital"]),
  createClaimController
);
router.post(
  "/:id/approve",
  authMiddleware,
  roleMiddleware(["Insurer"]),
  approveClaimController
);
router.post(
  "/:id/reject",
  authMiddleware,
  roleMiddleware(["Insurer"]),
  rejectClaimController
);

export default router;