import { Map, Plus, ChevronRight, Calendar, Target } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";
import { cn } from "~/lib/utils";

const ROADMAPS = [
  {
    id: "1",
    name: "NovaForgeAI 2026 Roadmap",
    project: "NovaForgeAI",
    progress: 45,
    status: "in-progress",
    color: "#6C63FF",
    milestones: [
      { name: "Beta Launch", date: "Jun 20, 2026", status: "in-progress" },
      { name: "Payment Integration", date: "Jul 15, 2026", status: "pending" },
      { name: "Mobile App", date: "Sep 1, 2026", status: "pending" },
      { name: "Enterprise Tier", date: "Oct 1, 2026", status: "pending" },
    ],
  },
  {
    id: "2",
    name: "NovaDEX Launch Roadmap",
    project: "NovaDEX",
    progress: 70,
    status: "in-progress",
    color: "#F59E0B",
    milestones: [
      { name: "Testnet Launch", date: "May 1, 2026", status: "completed" },
      { name: "Security Audit", date: "Jun 1, 2026", status: "completed" },
      { name: "Mainnet Deploy", date: "Jul 1, 2026", status: "in-progress" },
      { name: "Mobile App", date: "Aug 15, 2026", status: "pending" },
    ],
  },
  {
    id: "3",
    name: "COSMIC9 Wallet Roadmap",
    project: "COSMIC9 Wallet",
    progress: 30,
    status: "in-progress",
    color: "#3B82F6",
    milestones: [
      { name: "Beta v1", date: "Jun 8, 2026", status: "in-progress" },
      { name: "All 15 Chains", date: "Jul 30, 2026", status: "pending" },
      { name: "DeFi Features", date: "Sep 15, 2026", status: "pending" },
      { name: "App Store Launch", date: "Oct 30, 2026", status: "pending" },
    ],
  },
  {
    id: "4",
    name: "NovaChain Ecosystem Roadmap",
    project: "NovaChain",
    progress: 60,
    status: "active",
    color: "#00D4FF",
    milestones: [
      { name: "Validator Network (21 nodes)", date: "Apr 1, 2026", status: "completed" },
      { name: "NOVA Token Launch", date: "May 15, 2026", status: "completed" },
      { name: "Staking Protocol", date: "Jul 1, 2026", status: "in-progress" },
      { name: "Cross-chain Bridge", date: "Sep 1, 2026", status: "pending" },
    ],
  },
];

export default function RoadmapsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Roadmaps"
        description="Project roadmaps and milestone tracking across NovaSphere"
        icon={Map}
        accent="#10B981"
        actions={[{ label: "New Roadmap", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Roadmaps" value={ROADMAPS.length} accent="#10B981" icon={Map} />
        <StatCard label="Active" value={ROADMAPS.filter((r) => r.status !== "completed").length} accent="#00D4FF" />
        <StatCard
          label="Milestones"
          value={ROADMAPS.reduce((s, r) => s + r.milestones.length, 0)}
          accent="#F59E0B"
          icon={Target}
        />
        <StatCard
          label="Completed"
          value={ROADMAPS.reduce(
            (s, r) => s + r.milestones.filter((m) => m.status === "completed").length,
            0
          )}
          accent="#10B981"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ROADMAPS.map((roadmap) => (
          <div
            key={roadmap.id}
            className={cn(
              "rounded-xl border bg-card p-5 transition-all cursor-pointer",
              selected === roadmap.id ? "border-primary/60" : "border-border hover:border-primary/40"
            )}
            onClick={() => setSelected(selected === roadmap.id ? null : roadmap.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{roadmap.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{roadmap.project}</p>
              </div>
              <StatusBadge status={roadmap.status} />
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-semibold" style={{ color: roadmap.color }}>
                  {roadmap.progress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${roadmap.progress}%`, backgroundColor: roadmap.color }}
                />
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-2">
              {roadmap.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      m.status === "completed"
                        ? "border-emerald-500 bg-emerald-500/20"
                        : m.status === "in-progress"
                        ? "border-primary bg-primary/20"
                        : "border-border bg-muted"
                    )}
                  >
                    {m.status === "completed" && (
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                    {m.status === "in-progress" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span
                      className={cn(
                        "text-xs",
                        m.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                      )}
                    >
                      {m.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={10} />
                      {m.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
