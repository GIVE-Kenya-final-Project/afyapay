"use client";

import DashboardLayout from "../../components/DashboardLayout";
import { claims, tokenizeClaim } from "../../lib/claims";

export default function InvestorDashboard() {

  const approvedClaims = claims.filter(
    (c) => c.status === "Approved"
  );

  return (
    <DashboardLayout role="investor">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <p className="text-blue-600 font-semibold">
            Investor Marketplace
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Available Claim Assets
          </h1>
        </div>

        <div className="bg-white px-6 py-4 rounded-2xl border shadow-sm">
          <p className="text-sm text-gray-500">
            Investor Wallet
          </p>

          <h2 className="text-2xl font-bold text-gray-900">
            12,500 XLM
          </h2>
        </div>

      </div>

      {/* EMPTY STATE */}
      {approvedClaims.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border shadow-sm">

          <h2 className="text-2xl font-bold text-gray-800">
            No Approved Claims
          </h2>

          <p className="text-gray-500 mt-3">
            Approved healthcare claims will appear here.
          </p>

        </div>
      )}

      {/* CLAIM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {approvedClaims.map((claim) => (

          <div
            key={claim.id}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Claim ID
                </p>

                <h2 className="text-2xl font-bold mt-1 text-gray-900">
                  {claim.id}
                </h2>
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                Approved
              </span>

            </div>

            <div className="mt-8 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Patient
                </p>

                <h3 className="font-semibold text-lg text-gray-900">
                  {claim.patient}
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Hospital
                </p>

                <h3 className="font-semibold text-lg text-gray-900">
                  {claim.hospital}
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Claim Amount
                </p>

                <h2 className="text-3xl font-bold text-blue-600">
                  ${claim.amount}
                </h2>
              </div>

            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={() => tokenizeClaim(claim.id)}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold"
            >
              Purchase Claim Token
            </button>

          </div>

        ))}

      </div>

      {/* TOKENIZED CLAIMS */}
      <div className="bg-white rounded-3xl p-8 mt-10 shadow-sm border border-gray-100">

        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Tokenized Assets
        </h2>

        <div className="space-y-4">

          {claims
            .filter((c) => c.status === "Tokenized")
            .map((c) => (

              <div
                key={c.id}
                className="flex items-center justify-between border border-gray-100 rounded-2xl p-5"
              >

                <div>
                  <h3 className="font-bold text-gray-900">
                    {c.id}
                  </h3>

                  <p className="text-gray-500">
                    {c.hospital}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-blue-600 font-bold">
                    {c.tokenId}
                  </p>

                  <p className="text-sm text-gray-500">
                    Tokenized Asset
                  </p>

                </div>

              </div>

            ))}

        </div>

      </div>

    </DashboardLayout>
  );
}