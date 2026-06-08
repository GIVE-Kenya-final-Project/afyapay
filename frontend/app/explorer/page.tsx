"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { fetchClaims } from "../../lib/claims";
import { api } from "../../lib/api";
import type { Claim, ClaimToken } from "../../lib/claims";

export default function ExplorerPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [tokens, setTokens] = useState<ClaimToken[]>([]);

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

  const tokenizedCount = tokens.length;

  return (
    <DashboardLayout role="explorer">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-blue-600 font-semibold">Blockchain Explorer</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Stellar Claim Activity</h1>
        </div>
        <div className="bg-[#0B1120] text-white px-6 py-4 rounded-2xl shadow-lg">
          <p className="text-sm text-gray-400">Soroban Network</p>
          <h2 className="text-2xl font-bold">Testnet Active</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Total Claims</p>
          <h2 className="text-5xl font-bold mt-4">{claims.length}</h2>
        </div>
        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Tokenized Assets</p>
          <h2 className="text-5xl font-bold mt-4 text-blue-600">{tokenizedCount}</h2>
        </div>
        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Approved</p>
          <h2 className="text-5xl font-bold mt-4 text-green-600">
            {claims.filter((c) => c.status === "APPROVED").length}
          </h2>
        </div>
        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Rejected</p>
          <h2 className="text-5xl font-bold mt-4 text-red-600">
            {claims.filter((c) => c.status === "REJECTED").length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border shadow-sm">
        <h2 className="text-2xl font-bold mb-8">Blockchain Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-700">
                <th className="pb-4">Claim ID</th>
                <th className="pb-4">Blockchain ID</th>
                <th className="pb-4">Hospital</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-5 font-semibold text-gray-900">{c.id}</td>
                  <td className="py-5 font-mono text-sm text-gray-600">{c.blockchainId}</td>
                  <td className="py-5 font-mono text-sm text-gray-800">{c.hospitalWallet.slice(0, 8)}...</td>
                  <td className="py-5 font-semibold text-gray-900">${c.amount}</td>
                  <td className="py-5">
                    <span
                      className={
                        c.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm"
                          : c.status === "APPROVED"
                          ? "bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"
                          : "bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                      }
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-5 text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {claims.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    No blockchain records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#0B1120] text-white rounded-3xl p-8 mt-10">
        <h2 className="text-2xl font-bold">Soroban Smart Contract Activity</h2>
        <p className="text-gray-400 mt-3 leading-7">
          This dashboard tracks healthcare claim tokenization, ownership, and settlement activity powered by Stellar Soroban.
        </p>
      </div>
    </DashboardLayout>
  );
}
