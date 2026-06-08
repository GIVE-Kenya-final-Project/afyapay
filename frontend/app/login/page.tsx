"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, setAuth } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/api/auth/login", { wallet });
      setAuth(data.token, data.user);
      const role = data.user.role.toLowerCase();
      if (role === "hospital") router.push("/hospital");
      else if (role === "insurer") router.push("/insurer");
      else if (role === "investor") router.push("/investor");
      else router.push("/explorer");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white rounded-[32px] shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[#0B1120]">AfyaPay</h1>
          <p className="text-gray-500 mt-4 text-lg">Stellar Healthcare Claims Infrastructure</p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login with your Stellar wallet to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet Address</label>
            <input
              type="text"
              placeholder="G_YOUR_STELLAR_ADDRESS..."
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold text-lg shadow-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500">Powered by Stellar Soroban Smart Contracts</p>
        </div>
      </div>
    </div>
  );
}
