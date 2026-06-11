import { Landmark, Plus, TrendingUp, TrendingDown, DollarSign, CreditCard, RefreshCw } from "lucide-react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";

const ACCOUNTS = [
  { id: "1", name: "Main Operating Account", type: "Bank Account", balance: "$142,500.00", currency: "USD", status: "active", lastTx: "Jun 10, 2026" },
  { id: "2", name: "Reserve Account A", type: "Reserve", balance: "$500,000.00", currency: "USD", status: "active", lastTx: "Jun 8, 2026" },
  { id: "3", name: "Reserve Account B", type: "Reserve", balance: "$250,000.00", currency: "USD", status: "active", lastTx: "Jun 5, 2026" },
  { id: "4", name: "NOVA Treasury Wallet", type: "Crypto", balance: "2,500,000 NOVA", currency: "NOVA", status: "active", lastTx: "Jun 11, 2026" },
  { id: "5", name: "Ad Spend Account", type: "Ad Account", balance: "$15,000.00", currency: "USD", status: "active", lastTx: "Jun 9, 2026" },
  { id: "6", name: "Payroll Reserve", type: "Bank Account", balance: "$45,000.00", currency: "USD", status: "active", lastTx: "Jun 1, 2026" },
];

const RECENT_TRANSACTIONS = [
  { id: "1", description: "AWS Infrastructure", amount: "-$2,340.00", type: "expense", date: "Jun 11, 2026", category: "Subscriptions" },
  { id: "2", description: "Token Development Revenue", amount: "+$18,000.00", type: "income", date: "Jun 10, 2026", category: "Revenue" },
  { id: "3", description: "Vercel Pro Plan", amount: "-$240.00", type: "expense", date: "Jun 10, 2026", category: "Subscriptions" },
  { id: "4", description: "NovaForgeAI License Sales", amount: "+$4,500.00", type: "income", date: "Jun 9, 2026", category: "Revenue" },
  { id: "5", description: "Marketing Spend", amount: "-$1,200.00", type: "expense", date: "Jun 8, 2026", category: "Marketing" },
  { id: "6", description: "GitHub Enterprise", amount: "-$189.00", type: "expense", date: "Jun 7, 2026", category: "Subscriptions" },
];

export default function TreasuryPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Treasury"
        description="Complete financial oversight — bank accounts, crypto wallets, revenue and expenses"
        icon={Landmark}
        accent="#10B981"
        actions={[
          { label: "Add Account", icon: Plus, variant: "outline" },
          { label: "Record Transaction", icon: Plus, variant: "default" },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Accounts" value={8} accent="#10B981" icon={Landmark} />
        <StatCard label="Total Balance" value="$952.5K" accent="#10B981" />
        <StatCard label="Monthly Revenue" value="+$22.5K" accent="#10B981" />
        <StatCard label="Monthly Expenses" value="-$8.1K" accent="#EF4444" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Accounts */}
        <div className="lg:col-span-3 rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Accounts</h2>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">
              View all
            </button>
          </div>
          <div className="divide-y divide-border">
            {ACCOUNTS.map((acc) => (
              <div key={acc.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  {acc.type === "Crypto" ? (
                    <DollarSign size={16} className="text-emerald-500" />
                  ) : acc.type === "Ad Account" ? (
                    <CreditCard size={16} className="text-emerald-500" />
                  ) : (
                    <Landmark size={16} className="text-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{acc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{acc.type}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">Last: {acc.lastTx}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-emerald-500">{acc.balance}</p>
                  <StatusBadge status={acc.status} className="mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Transactions</h2>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {RECENT_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/20 transition-colors">
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
                  }`}
                >
                  {tx.type === "income" ? (
                    <TrendingUp size={14} className="text-emerald-500" />
                  ) : (
                    <TrendingDown size={14} className="text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold shrink-0 ${
                    tx.type === "income" ? "text-emerald-500" : "text-red-400"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
