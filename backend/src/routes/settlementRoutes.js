import express from "express";
import {
  settleClaim,
  getSettlement,
  isSettled,
} from "../controllers/settlementController.js";

const router = express.Router();

router.post("/", settleClaim);

router.get("/:tokenId", getSettlement);

router.get(
  "/:tokenId/status",
  isSettled
);

export default router;