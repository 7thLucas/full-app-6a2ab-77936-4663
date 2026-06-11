import { FileText, Plus, Search, Download, Eye, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";

const WHITE_PAPERS = [
  { id: "1", token: "NOVA", title: "Nova Token White Paper", version: "v1.3", status: "published", lastUpdated: "Jan 15, 2026", reviewer: "Founder", pages: 42 },
  { id: "2", token: "LUME", title: "LumeNet Token White Paper", version: "v1.1", status: "published", lastUpdated: "Feb 3, 2026", reviewer: "Founder", pages: 38 },
  { id: "3", token: "JUPI", title: "Jupiter Chain Token White Paper", version: "v1.0", status: "published", lastUpdated: "Nov 20, 2025", reviewer: "Founder", pages: 35 },
  { id: "4", token: "NGLD", title: "NovaGold Token White Paper", version: "v1.2", status: "published", lastUpdated: "Mar 10, 2026", reviewer: "Founder", pages: 29 },
  { id: "5", token: "CARA", title: "Cara Chain Token White Paper", version: "v1.0", status: "published", lastUpdated: "Dec 5, 2025", reviewer: "Founder", pages: 31 },
  { id: "6", token: "PYRX", title: "PyramidX Chain Token White Paper", version: "v0.8", status: "draft", lastUpdated: "Apr 2, 2026", reviewer: "Pending", pages: 27 },
  { id: "7", token: "LEAX", title: "Alux Chain Token White Paper", version: "v1.1", status: "published", lastUpdated: "Jan 28, 2026", reviewer: "Founder", pages: 33 },
  { id: "8", token: "QNET", title: "QuantumNet Token White Paper", version: "v2.0", status: "published", lastUpdated: "May 1, 2026", reviewer: "Founder", pages: 54 },
  { id: "9", token: "STFG", title: "StellarForge Token White Paper", version: "v0.9", status: "review", lastUpdated: "May 20, 2026", reviewer: "In Review", pages: 40 },
  { id: "10", token: "NSLV", title: "NovaSilver Token White Paper", version: "v1.0", status: "published", lastUpdated: "Feb 15, 2026", reviewer: "Founder", pages: 28 },
  { id: "11", token: "CVLT", title: "CryptoVault Token White Paper", version: "v1.2", status: "published", lastUpdated: "Mar 22, 2026", reviewer: "Founder", pages: 37 },
  { id: "12", token: "NCON", title: "NovaConscious Token White Paper", version: "v0.5", status: "draft", lastUpdated: "Apr 15, 2026", reviewer: "Pending", pages: 18 },
  { id: "13", token: "SNTX", title: "SentientX Token White Paper", version: "v0.4", status: "draft", lastUpdated: "Apr 20, 2026", reviewer: "Pending", pages: 15 },
  { id: "14", token: "EVON", title: "EvoNova Token White Paper", version: "v0.7", status: "review", lastUpdated: "May 25, 2026", reviewer: "In Review", pages: 32 },
  { id: "15", token: "LEAX", title: "LEAC Extended Assets White Paper", version: "v1.0", status: "published", lastUpdated: "Mar 5, 2026", reviewer: "Founder", pages: 25 },
];

export default function WhitePapersPage() {
  const [search, setSearch] = useState("");

  const filtered = WHITE_PAPERS.filter(
    (w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.token.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="White Papers"
        description="15 token white papers — version control and publication tracking"
        icon={FileText}
        accent="#64748B"
        actions={[
          { label: "Upload", icon: Plus, variant: "outline" },
          { label: "New White Paper", icon: Plus, variant: "default" },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total White Papers" value={15} accent="#64748B" icon={FileText} />
        <StatCard label="Published" value={10} accent="#10B981" />
        <StatCard label="In Review" value={2} accent="#00D4FF" />
        <StatCard label="Draft" value={3} accent="#A855F7" />
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search white papers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Token / Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Version</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pages</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Updated</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reviewer</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((wp) => (
              <tr key={wp.id} className="hover:bg-primary/5 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-md bg-slate-500/20 flex items-center justify-center">
                      <FileText size={13} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-xs">{wp.token}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{wp.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="font-mono text-xs text-muted-foreground">{wp.version}</span>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={wp.status} />
                </td>
                <td className="px-5 py-3">
                  <span className="text-foreground">{wp.pages}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-muted-foreground text-xs">{wp.lastUpdated}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-muted-foreground text-xs">{wp.reviewer}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Eye size={14} />
                    </button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
