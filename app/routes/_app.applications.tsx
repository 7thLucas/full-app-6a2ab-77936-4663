import { AppWindow, Plus, Search, ExternalLink, Github, Server, Smartphone, Monitor } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";

const APPLICATIONS = [
  {
    id: "1", name: "NovaForgeAI", platform: "Web + Mobile", status: "active", version: "v2.1.0",
    backend: "Railway", frontend: "Vercel", lastRelease: "Jun 9, 2026", users: "1,200+", color: "#6C63FF"
  },
  {
    id: "2", name: "NovaSphere Technologies", platform: "Web", status: "active", version: "v1.5.2",
    backend: "Railway", frontend: "Vercel", lastRelease: "May 25, 2026", users: "800+", color: "#00D4FF"
  },
  {
    id: "3", name: "COSMIC9 Wallet", platform: "Web + Mobile", status: "in-progress", version: "v0.9.1-beta",
    backend: "Railway", frontend: "Vercel", lastRelease: "Jun 8, 2026", users: "Beta", color: "#3B82F6"
  },
  {
    id: "4", name: "NovaDEX", platform: "Web", status: "in-progress", version: "v1.0.0-beta",
    backend: "Railway", frontend: "Vercel", lastRelease: "Jun 11, 2026", users: "Beta", color: "#F59E0B"
  },
  {
    id: "5", name: "NovaScan", platform: "Web", status: "active", version: "v3.0.1",
    backend: "Railway", frontend: "Vercel", lastRelease: "Jun 4, 2026", users: "5,000+", color: "#10B981"
  },
  {
    id: "6", name: "NovaStack Command Center", platform: "Web", status: "active", version: "v1.0.0",
    backend: "Railway", frontend: "Vercel", lastRelease: "Jun 11, 2026", users: "Private", color: "#6C63FF"
  },
  {
    id: "7", name: "Bennie The Cat", platform: "Web + Mobile", status: "active", version: "v2.3.0",
    backend: "Railway", frontend: "Vercel", lastRelease: "Jun 2, 2026", users: "3,400+", color: "#EC4899"
  },
  {
    id: "8", name: "Future Applications", platform: "TBD", status: "pending", version: "—",
    backend: "TBD", frontend: "TBD", lastRelease: "—", users: "—", color: "#6B7280"
  },
];

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");

  const filtered = APPLICATIONS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.platform.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Applications"
        description="All NovaSphere applications — deployments, versions, and analytics"
        icon={AppWindow}
        accent="#EC4899"
        actions={[{ label: "New Application", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Applications" value={8} accent="#EC4899" icon={AppWindow} />
        <StatCard label="Live" value={5} accent="#10B981" />
        <StatCard label="In Development" value={2} accent="#00D4FF" />
        <StatCard label="Total Users" value="10K+" accent="#F59E0B" />
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Application</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Version</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Backend</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Users</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Release</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((app) => (
              <tr key={app.id} className="hover:bg-primary/5 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${app.color}18` }}
                    >
                      <AppWindow size={14} style={{ color: app.color }} />
                    </div>
                    <span className="font-medium text-foreground">{app.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {app.platform.includes("Mobile") ? <Smartphone size={11} /> : <Monitor size={11} />}
                    {app.platform}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="font-mono text-xs text-muted-foreground">{app.version}</span>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Server size={11} />
                    {app.backend}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="text-sm font-medium text-foreground">{app.users}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs text-muted-foreground">{app.lastRelease}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
