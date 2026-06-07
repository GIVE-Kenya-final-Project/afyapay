import dotenv from "dotenv";

dotenv.config();

export const CONTRACTS = {
  registration: process.env.REGISTRATION_CONTRACT_ID,
  registry: process.env.CLAIM_REGISTRY_CONTRACT_ID,
  tokenization: process.env.TOKENIZATION_CONTRACT_ID,
  settlement: process.env.SETTLEMENT_CONTRACT_ID,
};

export const NETWORK =
  process.env.STELLAR_NETWORK || "testnet";