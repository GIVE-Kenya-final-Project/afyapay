-- CreateTable
CREATE TABLE "TokenizationFailure" (
    "id" SERIAL NOT NULL,
    "claimId" BIGINT,
    "tokenId" BIGINT,
    "errorMessage" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenizationFailure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenizationAttempt" (
    "id" SERIAL NOT NULL,
    "claimId" BIGINT,
    "tokenId" BIGINT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenizationAttempt_pkey" PRIMARY KEY ("id")
);
