"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { fetchClaims, createClaim } from "../../lib/claims";
import type { Claim } from "../../lib/claims";
import { getUser } from "../../lib/api";

export default function HospitalDashboard() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [insurerWallet, setInsurerWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const loadClaims = useCallback(async () => {
    try {
      const data = await fetchClaims();
      setClaims(data);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => { loadClaims(); }, [loadClaims]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createClaim(insurerWallet, Number(amount));
      setInsurerWallet("");
      setAmount("");
      await loadClaims();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to create claim");
    } finally {
      setLoading(false);
    }
  }

  const user = getUser();

  return (
    <DashboardLayout role="hospital">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-blue-600 font-semibold">Hospital Dashboard</p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Claims Overview</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <p className="text-gray-500">Total Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-gray-900">{claims.length}</h2>
        </div>
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            {claims.filter((c) => c.status === "PENDING").length}
          </h2>
        </div>
        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <p className="text-gray-500">Approved</p>
          <h2 className="text-5xl font-bold mt-4 text-green-600">
            {claims.filter((c) => c.status === "APPROVED").length}
          </h2>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
        <h2 className="text-2xl font-bold mb-6">Submit New Claim</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Wallet</label>
            <input
              type="text"
              value={user?.wallet || ""}
              className="border p-4 rounded-xl bg-gray-50 text-gray-500 w-full"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Insurer Wallet</label>
            <input
              type="text"
              placeholder="G_INSURER_ADDRESS..."
              value={insurerWallet}
              onChange={(e) => setInsurerWallet(e.target.value)}
              className="border p-4 rounded-xl w-full font-mono text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (USD)</label>
            <input
              type="number"
              placeholder="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-4 rounded-xl w-full"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 md:col-span-3 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Claim"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Claims</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-4">Claim ID</th>
                <th className="pb-4">Blockchain ID</th>
                <th className="pb-4">Insurer</th>
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
                  <td className="py-5 font-mono text-sm text-gray-800">{c.insurerWallet.slice(0, 8)}...</td>
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
                    No claims yet. Submit your first claim above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
