"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type SidebarProps = {
  role?: "hospital" | "insurer" | "investor" |"explorer" ;
};

export default function Sidebar({
  role = "hospital",
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("afyapay_token");
    localStorage.removeItem("afyapay_user");
    router.push("/login");
  }

  const hospitalLinks = [
    {
      name: "Hospital Dashboard",
      href: "/hospital",
    },
    {
      name: "Blockchain Explorer",
      href: "/explorer",
    },
  ];

  const insurerLinks = [
    {
      name: "Insurer Dashboard",
      href: "/insurer",
    },
    {
      name: "Blockchain Explorer",
      href: "/explorer",
    },
  ];

  const investorLinks = [
    {
      name: "Investor Marketplace",
      href: "/investor",
    },
    {
      name: "Blockchain Explorer",
      href: "/explorer",
    },
  ];

  let links = hospitalLinks;

  if (role === "insurer") {
    links = insurerLinks;
  }

  if (role === "investor") {
    links = investorLinks;
  }

  return (
    <aside className="w-72 bg-[#0B1120] text-white min-h-screen p-8 flex flex-col justify-between">

      <div>

        {/* LOGO */}
        <div className="mb-14">
          <h1 className="text-3xl font-bold">
            AfyaPay
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Healthcare Finance Infrastructure
          </p>
        </div>

        {/* ROLE BADGE */}
        <div className="mb-8">
          <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-medium capitalize">
            {role} Portal
          </span>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`block px-5 py-4 rounded-2xl transition font-medium ${
                pathname === link.href
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
          <p className="text-sm text-gray-400">Blockchain Status</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="font-medium">Stellar Testnet Active</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-white/5 hover:bg-red-600/20 border border-white/10 p-4 rounded-3xl text-sm text-gray-400 hover:text-red-400 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
