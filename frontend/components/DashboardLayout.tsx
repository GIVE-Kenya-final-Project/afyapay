import Sidebar from "./Sidebar";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
  role: "hospital" | "insurer" | "investor" | "explorer";
};

export default function DashboardLayout({
  children,
  role,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">

      <Sidebar role={role} />

      <div className="flex-1">

        {/* TOPBAR */}
        <header className="bg-white border-b border-gray-200 px-10 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AfyaPay Platform
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Stellar Healthcare Claims Infrastructure
            </p>
          </div>

          <div className="flex items-center gap-5">

            {/* WALLET */}
            <div className="bg-[#0B1120] text-white px-5 py-3 rounded-2xl shadow-lg">
              <p className="text-xs text-gray-400">
                Wallet Balance
              </p>

              <h2 className="font-bold text-lg mt-1">
                2,450 XLM
              </h2>
            </div>

            {/* PROFILE */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-2xl">

              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 capitalize">
                  {role}
                </h3>

                <p className="text-sm text-gray-500">
                  AfyaPay User
                </p>
              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <main className="p-10">
          {children}
        </main>

      </div>

    </div>
  );
}