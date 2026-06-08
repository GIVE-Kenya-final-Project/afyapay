"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { getUser } from "../lib/api";

type DashboardLayoutProps = {
  children: React.ReactNode;
  role: "hospital" | "insurer" | "investor" | "explorer";
};

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [user, setUser] = useState<{ wallet: string; role: string; name: string } | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <Sidebar role={role} />
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 px-10 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AfyaPay Platform</h1>
            <p className="text-gray-500 text-sm mt-1">Stellar Healthcare Claims Infrastructure</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-[#0B1120] text-white px-5 py-3 rounded-2xl shadow-lg max-w-[200px]">
              <p className="text-xs text-gray-400">Wallet</p>
              <h2 className="font-bold text-sm mt-1 truncate font-mono">
                {user ? `${user.wallet.slice(0, 8)}...` : "Loading..."}
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-2xl">
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 capitalize">{user?.name || role}</h3>
                <p className="text-sm text-gray-500">{user?.role || "AfyaPay User"}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
