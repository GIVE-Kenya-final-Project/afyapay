const {
  SorobanRpc,
  Networks,
  Keypair,
} = require("@stellar/stellar-sdk");

const server = new SorobanRpc.Server(
  process.env.STELLAR_RPC_URL
);

const adminKeypair = Keypair.fromSecret(
  process.env.ADMIN_SECRET_KEY
);

module.exports = {
  server,
  adminKeypair,
  networkPassphrase: process.env.NETWORK_PASSPHRASE,
};