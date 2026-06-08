-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "blockchainId" BIGINT NOT NULL,
    "hospitalWallet" TEXT NOT NULL,
    "insurerWallet" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimToken" (
    "id" SERIAL NOT NULL,
    "tokenId" BIGINT NOT NULL,
    "claimId" BIGINT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settlement" (
    "id" SERIAL NOT NULL,
    "tokenId" BIGINT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payer" TEXT NOT NULL,
    "payee" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "Claim_blockchainId_key" ON "Claim"("blockchainId");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimToken_tokenId_key" ON "ClaimToken"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_tokenId_key" ON "Settlement"("tokenId");
