import express from "express";
import stellarService from "../services/stellarService.js";

const router = express.Router();

router.get("/hospital-address", async (req, res) => {
  try {
    const address =
      await stellarService.getHospitalAddress();

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;