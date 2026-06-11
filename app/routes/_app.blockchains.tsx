import { Link2, Plus, Search, Activity, Coins, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";
import { cn } from "~/lib/utils";

const BLOCKCHAINS = [
  { id: "1", name: "NovaChain", symbol: "NOVA", status: "active", tokens: 8, validators: 21, tps: "1,200", color: "#6C63FF" },
  { id: "2", name: "LumeNet", symbol: "LUME", status: "active", tokens: 3, validators: 15, tps: "800", color: "#00D4FF" },
  { id: "3", name: "Jupiter Chain", symbol: "JUPI", status: "active", tokens: 2, validators: 12, tps: "650", color: "#F59E0B" },
  { id: "4", name: "NovaGold Chain", symbol: "NGLD", status: "active", tokens: 1, validators: 9, tps: "400", color: "#FFD700" },
  { id: "5", name: "Cara Chain", symbol: "CARA", status: "active", tokens: 1, validators: 9, tps: "350", color: "#EC4899" },
  { id: "6", name: "PyramidX Chain", symbol: "PYRX", status: "in-progress", tokens: 1, validators: 7, tps: "300", color: "#8B5CF6" },
  { id: "7", name: "Alux Chain", symbol: "LEAX", status: "active", tokens: 1, validators: 9, tps: "450", color: "#10B981" },
  { id: "8", name: "QuantumNet", symbol: "QNET", status: "active", tokens: 2, validators: 18, tps: "2,400", color: "#3B82F6" },
  { id: "9", name: "StellarForge Chain", symbol: "STFG", status: "in-progress", tokens: 1, validators: 11, tps: "600", color: "#F97316" },
  { id: "10", name: "NovaSilver Chain", symbol: "NSLV", status: "active", tokens: 1, validators: 9, tps: "380", color: "#94A3B8" },
  { id: "11", name: "CryptoVault Chain", symbol: "CVLT", status: "active", tokens: 1, validators: 9, tps: "500", color: "#6C63FF" },
  { id: "12", name: "NovaConscious Chain", symbol: "NCON", status: "draft", tokens: 1, validators: 5, tps: "—", color: "#A855F7" },
  { id: "13", name: "SentientX Chain", symbol: "SNTX", status: "draft", tokens: 1, validators: 5, tps: "—", color: "#EF4444" },
  { id: "14", name: "EvoNova Chain", symbol: "EVON", status: "pending", tokens: 1, validators: 7, tps: "—", color: "#00D4FF" },
  { id: "15", name: "LumeNet Extended Assets Chain", symbol: "LEAX", status: "active", tokens: 4, validators: 12, tps: "700", color: "#00D4FF" },
];

export default function BlockchainsPage() {
  const [search, setSearch] = useState("");

  const filtered = BLOCKCHAINS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const active = BLOCKCHAINS.filter((b) => b.status === "active").length;
  const totalTokens = BLOCKCHAINS.reduce((s, b) => s + b.tokens, 0);
  const totalValidators = BLOCKCHAINS.reduce((s, b) => s + b.validators, 0);

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Blockchains"
        description="15 NovaSphere blockchains — all metrics in one place"
        icon={Link2}
        accent="#00D4FF"
        actions={[{ label: "Add Blockchain", icon: Plus, variant: "default" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Blockchains" value={15} accent="#00D4FF" icon={Link2} />
        <StatCard label="Active" value={active} accent="#10B981" />
        <StatCard label="Total Tokens" value={totalTokens} accent="#F59E0B" icon={Coins} />
        <StatCard label="Total Validators" value={totalValidators} accent="#A855F7" />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search blockchains..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blockchain</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Symbol</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tokens</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Validators</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">TPS</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((chain) => (
                <tr key={chain.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-7 w-7 rounded-md flex items-center justify-center text-xs font-bold"
                        style={{ background: `${chain.color}20`, color: chain.color }}
                      >
                        {chain.symbol.slice(0, 2)}
                      </div>
                      <span className="font-medium text-foreground">{chain.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-mono text-xs text-muted-foreground">{chain.symbol}</span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={chain.status} />
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-foreground font-medium">{chain.tokens}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-foreground font-medium">{chain.validators}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn("font-mono text-sm", chain.tps === "—" ? "text-muted-foreground" : "text-cyan-400")}>
                      {chain.tps}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
