import { Files, Plus, Search, Upload, Download, Eye, FileText, FileCheck, FileCode, Briefcase } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";
import { cn } from "~/lib/utils";

const DOCUMENT_TYPES = ["All", "Business", "Legal", "Contracts", "White Papers", "Research", "Reports", "Technical", "Templates"];

const DOCUMENTS = [
  { id: "1", name: "NovaSphere Business Plan 2026", type: "Business", status: "active", size: "2.4 MB", version: "v3.1", lastUpdated: "May 15, 2026", related: "NovaSphere Technologies" },
  { id: "2", name: "NOVA Token Legal Framework", type: "Legal", status: "active", size: "1.8 MB", version: "v2.0", lastUpdated: "Apr 22, 2026", related: "NovaChain" },
  { id: "3", name: "NovaForgeAI Service Agreement", type: "Contracts", status: "active", size: "890 KB", version: "v1.4", lastUpdated: "Jun 1, 2026", related: "NovaForgeAI" },
  { id: "4", name: "NOVA White Paper", type: "White Papers", status: "published", size: "3.2 MB", version: "v1.3", lastUpdated: "Jan 15, 2026", related: "NovaChain" },
  { id: "5", name: "NovaDEX Technical Architecture", type: "Technical", status: "active", size: "4.1 MB", version: "v2.2", lastUpdated: "Jun 8, 2026", related: "NovaDEX" },
  { id: "6", name: "Treasury Q1 2026 Report", type: "Reports", status: "completed", size: "1.2 MB", version: "v1.0", lastUpdated: "Apr 5, 2026", related: "Treasury System" },
  { id: "7", name: "Security Audit Report - NovaChain", type: "Reports", status: "completed", size: "2.8 MB", version: "v1.0", lastUpdated: "Mar 20, 2026", related: "NovaChain" },
  { id: "8", name: "Blockchain Integration Research", type: "Research", status: "draft", size: "1.5 MB", version: "v0.7", lastUpdated: "Jun 10, 2026", related: "QuantumNet" },
  { id: "9", name: "NDA Template", type: "Templates", status: "active", size: "245 KB", version: "v2.0", lastUpdated: "Feb 10, 2026", related: "General" },
  { id: "10", name: "Validator Node Setup Guide", type: "Technical", status: "active", size: "1.1 MB", version: "v1.5", lastUpdated: "May 28, 2026", related: "NovaChain" },
];

const TYPE_ICONS: Record<string, React.FC<any>> = {
  Business: Briefcase,
  Legal: FileCheck,
  Contracts: FileCheck,
  "White Papers": FileText,
  Research: FileText,
  Reports: FileText,
  Technical: FileCode,
  Templates: Files,
};

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = DOCUMENTS.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.related.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Documents"
        description="All NovaSphere documents — business, legal, technical, and more"
        icon={Files}
        accent="#6B7280"
        actions={[
          { label: "Upload", icon: Upload, variant: "outline" },
          { label: "New Document", icon: Plus, variant: "default" },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Documents" value={47} accent="#6B7280" icon={Files} />
        <StatCard label="Active" value={34} accent="#10B981" />
        <StatCard label="Drafts" value={8} accent="#A855F7" />
        <StatCard label="Total Size" value="148 MB" accent="#00D4FF" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {DOCUMENT_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Version</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Size</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Updated</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((doc) => {
              const Icon = TYPE_ICONS[doc.type] ?? Files;
              return (
                <tr key={doc.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm truncate max-w-[220px]">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.related}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{doc.type}</span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-mono text-xs text-muted-foreground">{doc.version}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{doc.lastUpdated}</span>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
