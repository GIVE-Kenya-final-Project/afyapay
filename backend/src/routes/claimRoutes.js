import express from "express";
import {
  createClaimController,
  approveClaimController,
  rejectClaimController,
} from "../controllers/claimController.js";

const router = express.Router();

router.post("/create", createClaimController);
router.post("/:id/approve", approveClaimController);
router.post("/:id/reject", rejectClaimController);

export default router;