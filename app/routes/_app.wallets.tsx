import { Wallet, Plus, Search, Shield, Eye, EyeOff, Copy, Check } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";
import { cn } from "~/lib/utils";

const WALLETS = [
  { id: "1", name: "COSMIC9 Main Wallet", type: "COSMIC9 Wallet", address: "0x7a4b...8f3e", chain: "Multi-Chain", balance: "45,000 NOVA", status: "active", lastActivity: "2h ago" },
  { id: "2", name: "Treasury Cold Storage", type: "Cold Wallet", address: "0x2c1d...9a4b", chain: "NovaChain", balance: "500,000 NOVA", status: "active", lastActivity: "5d ago" },
  { id: "3", name: "Trading Hot Wallet", type: "Hot Wallet", address: "0x8e3f...1c2d", chain: "Multi-Chain", balance: "12,000 NOVA", status: "active", lastActivity: "1h ago" },
  { id: "4", name: "Validator Wallet A", type: "Validator Wallet", address: "0x3b5c...7d8e", chain: "NovaChain", balance: "10,000 NOVA", status: "active", lastActivity: "30m ago" },
  { id: "5", name: "Staking Wallet 1", type: "Staking Wallet", address: "0x9f2a...4e5b", chain: "LumeNet", balance: "25,000 LUME", status: "active", lastActivity: "1d ago" },
  { id: "6", name: "Reserve Wallet B", type: "Reserve Wallet", address: "0x1d7c...8a3f", chain: "Jupiter Chain", balance: "15,000 JUPI", status: "active", lastActivity: "3d ago" },
  { id: "7", name: "Multi-Sig Treasury", type: "Multi-Signature Wallet", address: "0x6e4b...2c9a", chain: "NovaChain", balance: "1,000,000 NOVA", status: "active", lastActivity: "7d ago" },
  { id: "8", name: "Dev Deployment Wallet", type: "Hot Wallet", address: "0x4a8d...5f1e", chain: "Multi-Chain", balance: "2,500 NOVA", status: "active", lastActivity: "4h ago" },
];

const WALLET_TYPE_COLORS: Record<string, string> = {
  "COSMIC9 Wallet": "#6C63FF",
  "Cold Wallet": "#3B82F6",
  "Hot Wallet": "#F59E0B",
  "Validator Wallet": "#10B981",
  "Staking Wallet": "#A855F7",
  "Reserve Wallet": "#00D4FF",
  "Multi-Signature Wallet": "#EF4444",
};

export default function WalletsPage() {
  const [search, setSearch] = useState("");
  const [showAddress, setShowAddress] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = WALLETS.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.type.toLowerCase().includes(search.toLowerCase()) ||
      w.chain.toLowerCase().includes(search.toLowerCase())
  );

  function toggleAddress(id: string) {
    setShowAddress((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function copyAddress(address: string, id: string) {
    navigator.clipboard.writeText(address).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Wallets"
        description="All NovaSphere wallets — asset tracking and transaction history"
        icon={Wallet}
        accent="#3B82F6"
        actions={[{ label: "Add Wallet", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Wallets" value={WALLETS.length} accent="#3B82F6" icon={Wallet} />
        <StatCard label="Active" value={WALLETS.filter((w) => w.status === "active").length} accent="#10B981" />
        <StatCard label="Chains" value="6" accent="#00D4FF" />
        <StatCard label="Total Assets" value="$1.2M+" accent="#F59E0B" />
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search wallets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((wallet) => {
          const color = WALLET_TYPE_COLORS[wallet.type] ?? "#6C63FF";
          const shown = showAddress[wallet.id];
          return (
            <div
              key={wallet.id}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}18` }}
                >
                  <Wallet size={18} style={{ color }} />
                </div>
                <StatusBadge status={wallet.status} />
              </div>

              <p className="text-sm font-semibold text-foreground mb-0.5">{wallet.name}</p>
              <p className="text-xs text-muted-foreground mb-3">{wallet.type}</p>

              {/* Address */}
              <div className="flex items-center gap-1.5 mb-3 p-2 rounded-md bg-muted/30">
                <span className="font-mono text-xs text-muted-foreground flex-1 truncate">
                  {shown ? wallet.address.replace("...", "1234567890abcdef") : wallet.address}
                </span>
                <button
                  onClick={() => toggleAddress(wallet.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {shown ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
                <button
                  onClick={() => copyAddress(wallet.address, wallet.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied === wallet.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Balance</span>
                  <span className="font-semibold" style={{ color }}>{wallet.balance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Chain</span>
                  <span className="text-foreground">{wallet.chain}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Activity</span>
                  <span className="text-muted-foreground">{wallet.lastActivity}</span>
                </div>
              </div>

              {wallet.type === "Multi-Signature Wallet" && (
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5">
                  <Shield size={12} className="text-red-400" />
                  <span className="text-xs text-red-400">Multi-signature protected</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
