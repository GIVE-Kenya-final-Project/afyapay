import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  authController.register
);

router.get(
  "/users/:wallet",
  authController.getUser
);

export default router;