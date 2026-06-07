import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { purchaseToken, getTokenizationFailures, retryFailedAttempts } from "../controllers/marketplaceController.js";

const router = express.Router();

router.post("/purchase", authMiddleware, roleMiddleware(["Investor"]), purchaseToken);
router.get("/failures", authMiddleware, roleMiddleware(["Insurer"]), getTokenizationFailures);
router.post("/retry", authMiddleware, roleMiddleware(["Insurer"]), retryFailedAttempts);

export default router;
