"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Hospital",
      href: "/hospital",
    },
    {
      name: "Insurer",
      href: "/insurer",
    },
    {
      name: "Explorer",
      href: "/explorer",
    },
  ];

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
      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">

        <p className="text-sm text-gray-400">
          Blockchain Status
        </p>

        <div className="flex items-center gap-2 mt-3">

          <div className="w-3 h-3 rounded-full bg-green-500"></div>

          <p className="font-medium">
            Stellar Testnet Active
          </p>

        </div>

      </div>

    </aside>
  );
}