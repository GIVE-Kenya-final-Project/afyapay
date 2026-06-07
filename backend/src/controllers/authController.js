import generateToken from "../utils/generateToken.js";
import prisma from "../../prisma/client.js";

// LOGIN (wallet-based)
export const login = async (req, res) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({ message: "Wallet required" });
    }

    // Check if user exists in DB
    const user = await prisma.user.findUnique({
      where: { wallet },
    });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    const token = generateToken(user);

    return res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};