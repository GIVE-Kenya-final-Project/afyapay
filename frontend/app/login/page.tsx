"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "hospital",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // TEMPORARY FRONTEND AUTH
    if (form.role === "hospital") {
      router.push("/hospital");
    }

    if (form.role === "insurer") {
      router.push("/insurer");
    }

    if (form.role === "investor") {
      router.push("/investor");
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-6">
      
      <div className="w-full max-w-xl bg-white rounded-[32px] shadow-xl p-10 border border-gray-100">

        {/* LOGO */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[#0B1120]">
            AfyaPay
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Stellar Healthcare Claims Infrastructure
          </p>
        </div>

        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">
            Login to continue to your dashboard
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Login As
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hospital">
                Hospital
              </option>

              <option value="insurer">
                Insurer
              </option>

              <option value="investor">
                Investor
              </option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold text-lg shadow-lg"
          >
            Login
          </button>

        </form>

        {/* FOOTER */}
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            Powered by Stellar Soroban Smart Contracts
          </p>
        </div>

      </div>

    </div>
  );
}