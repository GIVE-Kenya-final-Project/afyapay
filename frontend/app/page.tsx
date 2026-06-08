import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AfyaPay</h1>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition px-5 py-3 rounded-2xl">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-2xl font-semibold"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-blue-400 font-semibold mb-6">Powered by Stellar & Soroban</p>
            <h1 className="text-6xl font-bold leading-tight">
              Healthcare Claims Financing
              <span className="text-blue-500"> For Modern Africa</span>
            </h1>
            <p className="mt-8 text-gray-400 text-xl leading-relaxed">
              AfyaPay enables hospitals, insurers, and investors to settle healthcare claims
              transparently using blockchain technology and tokenized claim financing.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 transition px-7 py-4 rounded-2xl font-semibold shadow-lg"
              >
                Launch Dashboard
              </Link>
              <Link
                href="/explorer"
                className="border border-gray-700 hover:border-blue-500 hover:bg-[#111827] transition px-7 py-4 rounded-2xl font-semibold"
              >
                Explore Claims
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-14">
              <div>
                <h2 className="text-3xl font-bold text-white">1,245+</h2>
                <p className="text-gray-400 mt-2 text-sm">Claims Processed</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">$2.4M</h2>
                <p className="text-gray-400 mt-2 text-sm">Settlements</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">98%</h2>
                <p className="text-gray-400 mt-2 text-sm">Transparency Rate</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />
            <div className="relative bg-[#111827] border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Healthcare"
                className="rounded-2xl h-72 w-full object-cover"
              />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#1E293B] p-5 rounded-2xl">
                  <p className="text-gray-400 text-sm">Claims Settled</p>
                  <h2 className="text-3xl font-bold mt-2">1,245</h2>
                </div>
                <div className="bg-[#1E293B] p-5 rounded-2xl">
                  <p className="text-gray-400 text-sm">Liquidity Provided</p>
                  <h2 className="text-3xl font-bold mt-2">$2.4M</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold">PLATFORM FEATURES</p>
          <h2 className="text-5xl font-bold mt-4">Why AfyaPay</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#111827] border border-gray-800 p-8 rounded-3xl">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl">⛓</div>
            <h3 className="text-2xl font-bold mt-6">Blockchain Transparency</h3>
            <p className="text-gray-400 mt-5 leading-relaxed">
              Every healthcare claim and settlement is stored transparently on Stellar blockchain infrastructure.
            </p>
          </div>
          <div className="bg-[#111827] border border-gray-800 p-8 rounded-3xl">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
            <h3 className="text-2xl font-bold mt-6">Smart Contract Automation</h3>
            <p className="text-gray-400 mt-5 leading-relaxed">
              Soroban smart contracts automate approvals, settlements, and tokenized financing workflows.
            </p>
          </div>
          <div className="bg-[#111827] border border-gray-800 p-8 rounded-3xl">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-2xl">💰</div>
            <h3 className="text-2xl font-bold mt-6">Healthcare Liquidity</h3>
            <p className="text-gray-400 mt-5 leading-relaxed">
              Hospitals receive faster access to liquidity through tokenized healthcare claims.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
