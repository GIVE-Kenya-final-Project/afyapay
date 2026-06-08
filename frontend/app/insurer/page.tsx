"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { fetchClaims, approveClaim, rejectClaim } from "../../lib/claims";
import type { Claim } from "../../lib/claims";

export default function InsurerDashboard() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [actionMsg, setActionMsg] = useState("");

  const loadClaims = useCallback(async () => {
    try {
      const data = await fetchClaims();
      setClaims(data);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => { loadClaims(); }, [loadClaims]);

  async function handleApprove(id: number) {
    setActionMsg("");
    try {
      await approveClaim(id);
      setActionMsg(`Claim #${id} approved and tokenized`);
      await loadClaims();
    } catch (err: unknown) {
      setActionMsg(`Error: ${err instanceof Error ? err.message : "Failed"}`);
    }
  }

  async function handleReject(id: number) {
    setActionMsg("");
    try {
      await rejectClaim(id);
      setActionMsg(`Claim #${id} rejected`);
      await loadClaims();
    } catch (err: unknown) {
      setActionMsg(`Error: ${err instanceof Error ? err.message : "Failed"}`);
    }
  }

  const pendingClaims = claims.filter((c) => c.status === "PENDING");

  return (
    <DashboardLayout role="insurer">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-blue-600 font-semibold">Insurance Review Portal</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Claim Review Dashboard</h1>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">Claims Awaiting Review</p>
          <h2 className="text-2xl font-bold text-gray-900">{pendingClaims.length}</h2>
        </div>
      </div>

      {actionMsg && (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl mb-6 text-sm font-medium">{actionMsg}</div>
      )}

      {pendingClaims.length === 0 && (
        <div className="bg-white rounded-3xl p-10 border shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-900">No Pending Claims</h2>
          <p className="text-gray-500 mt-3">All healthcare claims have been reviewed.</p>
        </div>
      )}

      {pendingClaims.length > 0 && (
        <div className="bg-white rounded-3xl p-8 border shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pending Claims</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-700">
                  <th className="pb-4 font-medium">Claim ID</th>
                  <th className="pb-4 font-medium">Hospital</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-5 font-semibold text-gray-900">{claim.id}</td>
                    <td className="py-5 font-mono text-sm text-gray-800">{claim.hospitalWallet.slice(0, 12)}...</td>
                    <td className="py-5 font-semibold text-gray-900">${claim.amount}</td>
                    <td className="py-5">
                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">Pending</span>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleApprove(claim.id)}
                          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-xl text-sm font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(claim.id)}
                          className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-xl text-sm font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Approved Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-green-600">
            {claims.filter((c) => c.status === "APPROVED").length}
          </h2>
        </div>
        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Rejected Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-red-600">
            {claims.filter((c) => c.status === "REJECTED").length}
          </h2>
        </div>
        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Total Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-blue-600">{claims.length}</h2>
        </div>
      </div>
    </DashboardLayout>
  );
}
