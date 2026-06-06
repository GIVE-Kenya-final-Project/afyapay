import express from "express";
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AfyaPay backend running",
  });
});

export default app;