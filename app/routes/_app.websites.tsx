import { Globe, Plus, Search, ExternalLink, Github, Server } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";

const WEBSITES = [
  {
    id: "1", name: "NovaForgeAI", url: "novaforgeai.com", status: "active", hosting: "Vercel",
    framework: "Next.js", lastDeploy: "Jun 10, 2026", repo: "novaforgeai-app", color: "#6C63FF"
  },
  {
    id: "2", name: "NovaSphere Technologies", url: "novasphere.tech", status: "active", hosting: "Vercel",
    framework: "Next.js", lastDeploy: "May 28, 2026", repo: "novasphere-main", color: "#00D4FF"
  },
  {
    id: "3", name: "COSMIC9", url: "cosmic9.io", status: "in-progress", hosting: "Vercel",
    framework: "Next.js", lastDeploy: "Jun 8, 2026", repo: "cosmic9-wallet", color: "#3B82F6"
  },
  {
    id: "4", name: "NovaDEX", url: "novadex.finance", status: "in-progress", hosting: "Vercel",
    framework: "Next.js", lastDeploy: "Jun 11, 2026", repo: "novadex-frontend", color: "#F59E0B"
  },
  {
    id: "5", name: "NovaScan", url: "novascan.io", status: "active", hosting: "Vercel",
    framework: "Next.js", lastDeploy: "Jun 5, 2026", repo: "novascan-explorer", color: "#10B981"
  },
  {
    id: "6", name: "NovaStack Command Center", url: "novastack.app", status: "active", hosting: "Vercel",
    framework: "React Router v7", lastDeploy: "Jun 11, 2026", repo: "novastack-command-center", color: "#6C63FF"
  },
  {
    id: "7", name: "Bennie The Cat", url: "benniethecat.io", status: "active", hosting: "Vercel",
    framework: "Next.js", lastDeploy: "Jun 3, 2026", repo: "bennie-the-cat", color: "#EC4899"
  },
];

export default function WebsitesPage() {
  const [search, setSearch] = useState("");

  const filtered = WEBSITES.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Websites"
        description="All NovaSphere public websites — hosting, deployments, and analytics"
        icon={Globe}
        accent="#8B5CF6"
        actions={[{ label: "Add Website", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Websites" value={7} accent="#8B5CF6" icon={Globe} />
        <StatCard label="Live" value={5} accent="#10B981" />
        <StatCard label="In Development" value={2} accent="#00D4FF" />
        <StatCard label="Hosting" value="Vercel" accent="#6B7280" />
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search websites..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((site) => (
          <div
            key={site.id}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: `${site.color}18` }}
              >
                <Globe size={18} style={{ color: site.color }} />
              </div>
              <StatusBadge status={site.status} />
            </div>

            <p className="text-sm font-semibold text-foreground mb-0.5">{site.name}</p>
            <a
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1 mb-4"
            >
              {site.url}
              <ExternalLink size={10} />
            </a>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Server size={11} />
                  Hosting
                </span>
                <span className="text-foreground">{site.hosting}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Framework</span>
                <span className="text-foreground">{site.framework}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Deploy</span>
                <span className="text-muted-foreground">{site.lastDeploy}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Github size={12} />
                <span className="font-mono truncate max-w-[120px]">{site.repo}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-500">Online</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
