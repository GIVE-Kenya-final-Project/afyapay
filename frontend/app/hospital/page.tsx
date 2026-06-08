"use client";

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { claims as initialClaims } from "../../lib/claims";

export default function HospitalDashboard() {

  const [claims, setClaims] = useState(initialClaims);

  const [form, setForm] = useState({
    patient: "",
    hospital: "",
    amount: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newClaim = {
      id: "AFY-" + Math.floor(Math.random() * 10000),
      patient: form.patient,
      hospital: form.hospital,
      amount: Number(form.amount),
      status: "Pending" as const,
    };

    setClaims([newClaim, ...claims]);

    setForm({
      patient: "",
      hospital: "",
      amount: "",
    });
  }

  return (
    <DashboardLayout role="hospital">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <p className="text-blue-600 font-semibold">
            Hospital Dashboard
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Claims Overview
          </h1>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl font-medium shadow-lg">
          Submit New Claim
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <p className="text-gray-500">Total Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            {claims.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <p className="text-gray-500">Pending Settlements</p>
          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            {claims.filter(c => c.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
          <p className="text-gray-500">Tokenized Claims</p>
          <h2 className="text-5xl font-bold mt-4 text-gray-900">
            {claims.filter(c => c.status === "Tokenized").length}
          </h2>
        </div>

      </div>

      {/* SUBMIT FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Submit New Claim
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >

          <input
            type="text"
            name="patient"
            placeholder="Patient Name"
            value={form.patient}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            name="hospital"
            placeholder="Hospital Name"
            value={form.hospital}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount (USD)"
            value={form.amount}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 md:col-span-3"
          >
            Submit Claim
          </button>

        </form>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-gray-900">
            Recent Claims
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left text-gray-500 border-b border-gray-100">

                <th className="pb-4">Claim ID</th>
                <th className="pb-4">Patient</th>
                <th className="pb-4">Hospital</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>

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

                  <td className="py-5 text-gray-800">
                    {c.patient}
                  </td>

                  <td className="py-5 text-gray-800">
                    {c.hospital}
                  </td>

                  <td className="py-5 font-semibold text-gray-900">
                    ${c.amount}
                  </td>

                  <td className="py-5">

                    <span
                      className={
                        c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm"
                          : c.status === "Approved"
                          ? "bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"
                          : c.status === "Tokenized"
                          ? "bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
                          : "bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                      }
                    >
                      {c.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}