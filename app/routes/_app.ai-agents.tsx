import { Bot, Plus, Search, Cpu, Activity, ChevronRight, Network } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";
import { invokeLLM } from "@qb/agentic";
import { cn } from "~/lib/utils";

type AgentTier = "master" | "overseer" | "manager" | "worker";

const AGENTS = [
  { id: "1", name: "NovaStack Master", role: "Master Orchestrator", tier: "master" as AgentTier, status: "active", tasks: 0, specialty: "Orchestration", color: "#6C63FF" },
  { id: "2", name: "NovaForge Overseer", role: "Overseer", tier: "overseer" as AgentTier, status: "active", tasks: 3, specialty: "Development", color: "#A855F7" },
  { id: "3", name: "Treasury Overseer", role: "Overseer", tier: "overseer" as AgentTier, status: "active", tasks: 2, specialty: "Finance", color: "#10B981" },
  { id: "4", name: "Security Overseer", role: "Overseer", tier: "overseer" as AgentTier, status: "active", tasks: 1, specialty: "Security", color: "#EF4444" },
  { id: "5", name: "Marketing Overseer", role: "Overseer", tier: "overseer" as AgentTier, status: "active", tasks: 4, specialty: "Marketing", color: "#F59E0B" },
  { id: "6", name: "Research Manager", role: "Manager", tier: "manager" as AgentTier, status: "active", tasks: 6, specialty: "Research", color: "#3B82F6" },
  { id: "7", name: "Deployment Manager", role: "Manager", tier: "manager" as AgentTier, status: "in-progress", tasks: 8, specialty: "DevOps", color: "#00D4FF" },
  { id: "8", name: "Healing Manager", role: "Manager", tier: "manager" as AgentTier, status: "active", tasks: 2, specialty: "Monitoring", color: "#10B981" },
  { id: "9", name: "Token Creator Worker", role: "Worker", tier: "worker" as AgentTier, status: "active", tasks: 12, specialty: "Token Creation", color: "#F59E0B" },
  { id: "10", name: "Content Writer Worker", role: "Worker", tier: "worker" as AgentTier, status: "active", tasks: 7, specialty: "Content", color: "#A855F7" },
  { id: "11", name: "Code Reviewer Worker", role: "Worker", tier: "worker" as AgentTier, status: "active", tasks: 9, specialty: "Code Review", color: "#6C63FF" },
  { id: "12", name: "Analytics Worker", role: "Worker", tier: "worker" as AgentTier, status: "active", tasks: 5, specialty: "Analytics", color: "#3B82F6" },
];

const TIER_CONFIG: Record<AgentTier, { label: string; color: string; indent: number }> = {
  master: { label: "Master", color: "#6C63FF", indent: 0 },
  overseer: { label: "Overseer", color: "#A855F7", indent: 1 },
  manager: { label: "Manager", color: "#00D4FF", indent: 2 },
  worker: { label: "Worker", color: "#F59E0B", indent: 3 },
};

export default function AIAgentsPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<AgentTier | "all">("all");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const filtered = AGENTS.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.specialty.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "all" || a.tier === tierFilter;
    return matchSearch && matchTier;
  });

  async function handleAIQuery() {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiResult(null);
    try {
      const result = await invokeLLM({
        message: aiQuery,
        system_prompt: "You are NovaStack AI, an AI management assistant for the NovaSphere ecosystem. Answer concisely about AI agents, tasks, and ecosystem management.",
        schema: { type: "object", properties: { answer: { type: "string" } }, required: ["answer"] },
      } as any);
      const answer = (result.response as any)?.answer ?? JSON.stringify(result.response);
      setAiResult(answer);
    } catch {
      setAiResult("NovaStack AI is not configured yet. Set up your QB_SCAFFOLDER_KEY to enable AI queries.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="AI Agents"
        description="Hierarchical AI agent network — Master → Overseers → Managers → Workers"
        icon={Bot}
        accent="#A855F7"
        actions={[{ label: "New Agent", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Agents" value={AGENTS.length} accent="#A855F7" icon={Bot} />
        <StatCard label="Active" value={AGENTS.filter((a) => a.status === "active").length} accent="#10B981" />
        <StatCard label="Open Tasks" value={AGENTS.reduce((s, a) => s + a.tasks, 0)} accent="#F59E0B" />
        <StatCard label="Tiers" value="4" accent="#00D4FF" icon={Network} />
      </div>

      {/* AI Query Panel */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Bot size={16} className="text-purple-500" />
          <h3 className="text-sm font-semibold text-foreground">Query NovaStack AI</h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about your agents, tasks, or ecosystem..."
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAIQuery()}
            className="flex-1 h-9 px-3 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleAIQuery}
            disabled={aiLoading}
            className="px-4 h-9 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {aiLoading ? "..." : "Ask"}
          </button>
        </div>
        {aiResult && (
          <div className="mt-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm text-foreground">
            {aiResult}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "master", "overseer", "manager", "worker"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors",
                tierFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              )}
            >
              {t === "all" ? "All Tiers" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((agent) => {
          const tier = TIER_CONFIG[agent.tier];
          return (
            <div
              key={agent.id}
              className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${agent.color}20` }}
                >
                  <Bot size={18} style={{ color: agent.color }} />
                </div>
                <StatusBadge status={agent.status} />
              </div>
              <p className="text-sm font-semibold text-foreground mb-0.5">{agent.name}</p>
              <p className="text-xs text-muted-foreground mb-3">{agent.specialty}</p>
              <div className="flex items-center justify-between text-xs">
                <span
                  className="px-2 py-0.5 rounded-full font-medium capitalize"
                  style={{ background: `${tier.color}18`, color: tier.color }}
                >
                  {tier.label}
                </span>
                <span className="text-muted-foreground">{agent.tasks} tasks</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
