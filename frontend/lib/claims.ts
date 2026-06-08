import { api, getUser } from "./api";

export type ClaimStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Claim = {
  id: number;
  blockchainId: string;
  hospitalWallet: string;
  insurerWallet: string;
  amount: number;
  status: ClaimStatus;
  createdAt: string;
};

export type ClaimToken = {
  id: number;
  tokenId: string;
  claimId: string;
  owner: string;
  createdAt: string;
};

export async function fetchClaims(): Promise<Claim[]> {
  return api.get("/api/claims");
}

export async function fetchClaim(id: number): Promise<Claim> {
  return api.get(`/api/claims/${id}`);
}

export async function createClaim(insurerWallet: string, amount: number): Promise<Claim> {
  const user = getUser();
  return api.post("/api/claims/create", {
    hospitalWallet: user?.wallet,
    insurerWallet,
    amount,
  });
}

export async function approveClaim(id: number): Promise<{ approval: Claim; token?: ClaimToken }> {
  return api.post(`/api/claims/${id}/approve`, { sourceAccount: "insurer" });
}

export async function rejectClaim(id: number): Promise<Claim> {
  return api.post(`/api/claims/${id}/reject`, { sourceAccount: "insurer" });
}

export async function purchaseToken(tokenId: number, newOwner: string): Promise<{ success: boolean; data: unknown }> {
  return api.post("/api/marketplace/purchase", {
    tokenId,
    newOwner,
    sourceAccount: "investor",
  });
}

export async function settleClaim(tokenId: number, claimId: number, payer: string, payee: string, amount: number) {
  return api.post("/api/settlements", { tokenId, claimId, payer, payee, amount });
}
