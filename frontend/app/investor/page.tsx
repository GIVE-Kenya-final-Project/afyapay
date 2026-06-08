"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { fetchClaims, purchaseToken } from "../../lib/claims";
import { api, getUser } from "../../lib/api";
import type { Claim, ClaimToken } from "../../lib/claims";

export default function InvestorDashboard() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [tokens, setTokens] = useState<ClaimToken[]>([]);
  const [msg, setMsg] = useState("");

  const loadData = useCallback(async () => {
    try {
      const [c, t] = await Promise.all([fetchClaims(), api.get("/api/tokens")]);
      setClaims(c);
      setTokens(t);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const user = getUser();
  const approvedClaims = claims.filter((c) => c.status === "APPROVED");
  const myTokens = tokens.filter((t) => t.owner === user?.wallet);

  async function handlePurchase(claim: Claim) {
    setMsg("");
    try {
      const token = tokens.find((t) => t.claimId === String(claim.blockchainId));
      if (!token) return setMsg("No token found for this claim");
      await purchaseToken(Number(token.tokenId), user?.wallet || "");
      setMsg(`Token #${token.tokenId} purchased successfully`);
      await loadData();
    } catch (err: unknown) {
      setMsg(`Error: ${err instanceof Error ? err.message : "Purchase failed"}`);
    }
  }

  return (
    <DashboardLayout role="investor">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-blue-600 font-semibold">Investor Marketplace</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Available Claim Assets</h1>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">My Tokens</p>
          <h2 className="text-2xl font-bold text-gray-900">{myTokens.length}</h2>
        </div>
      </div>

      {msg && (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl mb-6 text-sm font-medium">{msg}</div>
      )}

      {approvedClaims.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">No Approved Claims</h2>
          <p className="text-gray-500 mt-3">Approved healthcare claims will appear here for purchase.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {approvedClaims.map((claim) => (
          <div key={claim.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Claim #{claim.id}</p>
                <h2 className="text-xl font-bold mt-1 text-gray-900 font-mono">
                  {claim.hospitalWallet.slice(0, 12)}...
                </h2>
              </div>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">Approved</span>
            </div>
            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Insurer</p>
                <h3 className="font-semibold text-lg text-gray-900 font-mono text-sm">
                  {claim.insurerWallet.slice(0, 12)}...
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Claim Amount</p>
                <h2 className="text-3xl font-bold text-blue-600">${claim.amount}</h2>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blockchain ID</p>
                <p className="font-mono text-sm text-gray-600">{claim.blockchainId}</p>
              </div>
            </div>
            <button
              onClick={() => handlePurchase(claim)}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold"
            >
              Purchase Claim Token
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 mt-10 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">My Tokenized Assets</h2>
        {myTokens.length === 0 && (
          <p className="text-gray-400 text-center py-8">No tokens purchased yet.</p>
        )}
        <div className="space-y-4">
          {myTokens.map((t) => (
            <div key={t.id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-5">
              <div>
                <h3 className="font-bold text-gray-900">Token #{t.tokenId}</h3>
                <p className="text-gray-500 text-sm">Claim #{t.claimId}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-bold">Owned</p>
                <p className="text-sm text-gray-500">Tokenized Asset</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
