"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ wallet: "", name: "", role: "Hospital" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post("/api/auth/register", form);
      setSuccess(`Account created for ${form.name}. Redirecting to login...`);
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Register to access the platform</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-2xl mb-6 text-sm font-medium">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stellar Wallet Address</label>
            <input
              type="text"
              name="wallet"
              placeholder="G_YOUR_STELLAR_ADDRESS..."
              value={form.wallet}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
            <input
              type="text"
              name="name"
              placeholder="City Hospital"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Hospital">Hospital</option>
              <option value="Insurer">Insurer</option>
              <option value="Investor">Investor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold text-lg shadow-lg disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Already registered?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Login here
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
