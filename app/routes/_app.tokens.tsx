import { Coins, Plus, Search, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";

const TOKENS = [
  { id: "1", symbol: "NOVA", name: "Nova Token", blockchain: "NovaChain", supply: "1,000,000,000", category: "Utility", status: "active", color: "#6C63FF" },
  { id: "2", symbol: "LUME", name: "Lume Token", blockchain: "LumeNet", supply: "500,000,000", category: "Utility", status: "active", color: "#00D4FF" },
  { id: "3", symbol: "JUPI", name: "Jupiter Token", blockchain: "Jupiter Chain", supply: "750,000,000", category: "Governance", status: "active", color: "#F59E0B" },
  { id: "4", symbol: "NGLD", name: "NovaGold Token", blockchain: "NovaGold Chain", supply: "21,000,000", category: "Asset", status: "active", color: "#FFD700" },
  { id: "5", symbol: "CARA", name: "Cara Token", blockchain: "Cara Chain", supply: "800,000,000", category: "Utility", status: "active", color: "#EC4899" },
  { id: "6", symbol: "PYRX", name: "PyramidX Token", blockchain: "PyramidX Chain", supply: "600,000,000", category: "Utility", status: "in-progress", color: "#8B5CF6" },
  { id: "7", symbol: "LEAX", name: "Alux Token", blockchain: "Alux Chain", supply: "400,000,000", category: "Utility", status: "active", color: "#10B981" },
  { id: "8", symbol: "QNET", name: "QuantumNet Token", blockchain: "QuantumNet", supply: "2,000,000,000", category: "Utility", status: "active", color: "#3B82F6" },
  { id: "9", symbol: "STFG", name: "StellarForge Token", blockchain: "StellarForge Chain", supply: "900,000,000", category: "Utility", status: "in-progress", color: "#F97316" },
  { id: "10", symbol: "NSLV", name: "NovaSilver Token", blockchain: "NovaSilver Chain", supply: "100,000,000", category: "Asset", status: "active", color: "#94A3B8" },
  { id: "11", symbol: "CVLT", name: "CryptoVault Token", blockchain: "CryptoVault Chain", supply: "300,000,000", category: "Security", status: "active", color: "#6C63FF" },
  { id: "12", symbol: "NCON", name: "NovaConscious Token", blockchain: "NovaConscious Chain", supply: "777,777,777", category: "AI", status: "draft", color: "#A855F7" },
  { id: "13", symbol: "SNTX", name: "SentientX Token", blockchain: "SentientX Chain", supply: "500,000,000", category: "AI", status: "draft", color: "#EF4444" },
  { id: "14", symbol: "EVON", name: "EvoNova Token", blockchain: "EvoNova Chain", supply: "1,500,000,000", category: "Utility", status: "pending", color: "#00D4FF" },
  { id: "15", symbol: "LEAX", name: "LumeNet Extended", blockchain: "LEAC", supply: "250,000,000", category: "Asset", status: "active", color: "#00D4FF" },
];

export default function TokensPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(TOKENS.map((t) => t.category)))];

  const filtered = TOKENS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.blockchain.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Tokens"
        description="Token registry for all 15 NovaSphere ecosystem tokens"
        icon={Coins}
        accent="#F59E0B"
        actions={[{ label: "New Token", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Tokens" value={15} accent="#F59E0B" icon={Coins} />
        <StatCard label="Active" value={10} accent="#10B981" />
        <StatCard label="In Development" value={5} accent="#00D4FF" />
        <StatCard label="Total Supply" value="10B+" accent="#A855F7" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                categoryFilter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((token) => (
          <div
            key={token.id}
            className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{ background: `${token.color}20`, color: token.color }}
              >
                {token.symbol.slice(0, 3)}
              </div>
              <StatusBadge status={token.status} />
            </div>
            <p className="text-base font-bold text-foreground">{token.symbol}</p>
            <p className="text-xs text-muted-foreground mb-3">{token.name}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Blockchain</span>
                <span className="text-foreground font-medium truncate max-w-[120px]">{token.blockchain}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Supply</span>
                <span className="font-mono text-amber-500">{token.supply}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Category</span>
                <span className="text-foreground">{token.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
