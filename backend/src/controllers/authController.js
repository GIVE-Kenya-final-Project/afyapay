import generateToken from "../utils/generateToken.js";
import prisma from "../../prisma/client.js";
import registrationService from "../services/registrationService.js";

export const register = async (req, res) => {
  try {
    const { wallet, role, name } = req.body;

    if (!wallet || !role || !name) {
      return res.status(400).json({ message: "wallet, role, and name are required" });
    }

    // register on-chain
    await registrationService.registerUser(wallet, role, name);

    // save in DB
    const user = await prisma.user.create({
      data: {
        wallet,
        role,
        name,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({ message: "Wallet required" });
    }

    const user = await prisma.user.findUnique({
      where: { wallet },
    });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    const token = generateToken({
      wallet: user.wallet,
      role: user.role,
    });

    return res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};