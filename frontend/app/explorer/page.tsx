"use client";

import DashboardLayout from "../../components/DashboardLayout";
import { claims } from "../../lib/claims";
import type { Claim } from "../../lib/claims";

export default function ExplorerPage() {

  const tokenizedClaims = claims.filter(
    (c) => c.status === "Tokenized"
  );

  return (
    <DashboardLayout role="explorer">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <p className="text-blue-600 font-semibold">
            Blockchain Explorer
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Stellar Claim Activity
          </h1>
        </div>

        <div className="bg-[#0B1120] text-white px-6 py-4 rounded-2xl shadow-lg">

          <p className="text-sm text-gray-400">
            Soroban Network
          </p>

          <h2 className="text-2xl font-bold">
            Testnet Active
          </h2>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Total Claims</p>
          <h2 className="text-5xl font-bold mt-4">
            {claims.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Tokenized Assets</p>
          <h2 className="text-5xl font-bold mt-4 text-blue-600">
            {tokenizedClaims.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Approved Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-green-600">
            {claims.filter((c) => c.status === "Approved").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-7 border shadow-sm">
          <p className="text-gray-500">Rejected Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-red-600">
            {claims.filter((c) => c.status === "Rejected").length}
          </h2>
        </div>

      </div>

      {/* BLOCKCHAIN TABLE */}
      <div className="bg-white rounded-3xl p-8 border shadow-sm">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-bold">
            Blockchain Records
          </h2>

          <button className="text-blue-600 font-medium">
            Refresh Network
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-700">
                <th className="pb-4">Claim ID</th>
                <th className="pb-4">Token ID</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Transaction Hash</th>
                <th className="pb-4">Network</th>
              </tr>
            </thead>

            <tbody>

              {claims.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >

                  <td className="py-5 font-semibold text-gray-900">
                    {c.id}
                  </td>

                  <td className="py-5">
                    {c.tokenId ? (
                      <span className="text-blue-600 font-bold">
                        {c.tokenId}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        Not Tokenized
                      </span>
                    )}
                  </td>

                  <td className="py-5">
                    <span
                      className={
                        c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm"
                          : c.status === "Approved"
                          ? "bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"
                          : c.status === "Rejected"
                          ? "bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                          : "bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
                      }
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="py-5 font-mono text-sm text-gray-900">
                    TX-{Math.random().toString(36).substring(2, 12).toUpperCase()}
                  </td>

                  <td className="py-5">
                    Stellar Testnet
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* FOOTER */}
      <div className="bg-[#0B1120] text-white rounded-3xl p-8 mt-10">

        <h2 className="text-2xl font-bold">
          Soroban Smart Contract Activity
        </h2>

        <p className="text-gray-400 mt-3 leading-7">
          This dashboard tracks healthcare claim tokenization,
          ownership, and settlement activity powered by Stellar Soroban.
        </p>

      </div>

    </DashboardLayout>
  );
}