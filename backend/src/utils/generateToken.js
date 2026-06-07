import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      wallet: user.wallet,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;