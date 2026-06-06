const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const settlementRoutes = require("./routes/settlementRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/settlements", settlementRoutes);

module.exports = app;