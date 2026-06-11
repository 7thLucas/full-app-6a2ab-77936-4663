import { FolderKanban, Plus, Search, Filter, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";
import { EmptyState } from "~/components/shared/empty-state";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

const PROJECTS = [
  {
    id: "1",
    name: "NovaForgeAI",
    description: "AI-powered development platform for NovaSphere ecosystem tools and agents",
    status: "active",
    tasks: 12,
    documents: 8,
    blockchain: "NovaChain",
    lastUpdated: "2h ago",
    color: "#6C63FF",
  },
  {
    id: "2",
    name: "NovaSphere Technologies",
    description: "Core technology infrastructure and services for the entire NovaSphere ecosystem",
    status: "active",
    tasks: 7,
    documents: 15,
    blockchain: "Multiple",
    lastUpdated: "1d ago",
    color: "#00D4FF",
  },
  {
    id: "3",
    name: "COSMIC9 Wallet",
    description: "Multi-chain crypto wallet supporting all 15 NovaSphere blockchains",
    status: "in-progress",
    tasks: 18,
    documents: 11,
    blockchain: "All Chains",
    lastUpdated: "3h ago",
    color: "#3B82F6",
  },
  {
    id: "4",
    name: "NovaDEX",
    description: "Decentralized exchange for NovaSphere tokens and cross-chain swaps",
    status: "in-progress",
    tasks: 22,
    documents: 9,
    blockchain: "NovaChain",
    lastUpdated: "5h ago",
    color: "#F59E0B",
  },
  {
    id: "5",
    name: "NovaScan",
    description: "Blockchain explorer and analytics platform for all NovaSphere chains",
    status: "active",
    tasks: 5,
    documents: 6,
    blockchain: "All Chains",
    lastUpdated: "2d ago",
    color: "#10B981",
  },
  {
    id: "6",
    name: "Treasury System",
    description: "Complete financial management system for NovaSphere treasury operations",
    status: "active",
    tasks: 3,
    documents: 20,
    blockchain: "Multiple",
    lastUpdated: "1h ago",
    color: "#10B981",
  },
  {
    id: "7",
    name: "Ad Generator AI",
    description: "AI-powered advertising content generator for NovaSphere marketing",
    status: "draft",
    tasks: 8,
    documents: 3,
    blockchain: "NovaChain",
    lastUpdated: "1w ago",
    color: "#A855F7",
  },
  {
    id: "8",
    name: "Blockchain Creator",
    description: "No-code platform for creating and deploying new blockchains in the ecosystem",
    status: "pending",
    tasks: 15,
    documents: 7,
    blockchain: "NovaChain",
    lastUpdated: "3d ago",
    color: "#00D4FF",
  },
  {
    id: "9",
    name: "Token Creator",
    description: "Tool for launching and managing new tokens on NovaSphere blockchains",
    status: "pending",
    tasks: 10,
    documents: 5,
    blockchain: "Multiple",
    lastUpdated: "4d ago",
    color: "#F59E0B",
  },
  {
    id: "10",
    name: "Bennie The Cat",
    description: "NovaSphere's community mascot project and NFT collection",
    status: "active",
    tasks: 6,
    documents: 4,
    blockchain: "LumeNet",
    lastUpdated: "6h ago",
    color: "#EC4899",
  },
];

const STATUS_FILTERS = ["All", "Active", "In Progress", "Pending", "Draft"];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = PROJECTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      p.status.toLowerCase() === statusFilter.toLowerCase().replace(" ", "-");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Projects"
        description="10 active projects across the NovaSphere ecosystem"
        icon={FolderKanban}
        accent="#6C63FF"
        actions={[{ label: "New Project", icon: Plus, variant: "default" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Projects" value={10} accent="#6C63FF" icon={FolderKanban} />
        <StatCard label="Active" value={5} accent="#10B981" />
        <StatCard label="In Progress" value={2} accent="#00D4FF" />
        <StatCard label="Open Tasks" value={106} accent="#F59E0B" icon={FolderKanban} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects found"
          description="Try adjusting your search or filter."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all group cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${project.color}18` }}
                >
                  <FolderKanban size={18} style={{ color: project.color }} />
                </div>
                <StatusBadge status={project.status} />
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-1.5">{project.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span>{project.tasks} tasks</span>
                  <span>{project.documents} docs</span>
                </div>
                <span>{project.lastUpdated}</span>
              </div>

              {project.blockchain && (
                <div className="mt-3 pt-3 border-t border-border">
                  <Badge variant="ghost" className="text-xs">
                    {project.blockchain}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
