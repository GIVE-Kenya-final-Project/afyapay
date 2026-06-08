import express from "express";
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import settlementRoutes from "./routes/settlementRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/settlements", settlementRoutes);
app.use("/api/test", testRoutes);
app.use("/api/marketplace", marketplaceRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AfyaPay backend running",
  });
});

export default app;