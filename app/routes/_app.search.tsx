import { Search, SearchX, FolderKanban, Link2, Coins, FileText, Bot, Wallet, Files, Globe, AppWindow, CheckSquare, Map, StickyNote, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { PageHeader } from "~/components/shared/page-header";
import { StatusBadge } from "~/components/shared/status-badge";
import { invokeLLM } from "@qb/agentic";
import { cn } from "~/lib/utils";

const ALL_ENTITIES = [
  { id: "1", name: "NovaForgeAI", type: "Project", status: "active", module: "projects", updated: "2h ago" },
  { id: "2", name: "NovaDEX", type: "Project", status: "in-progress", module: "projects", updated: "5h ago" },
  { id: "3", name: "COSMIC9 Wallet", type: "Project", status: "in-progress", module: "projects", updated: "3h ago" },
  { id: "4", name: "NovaChain", type: "Blockchain", status: "active", module: "blockchains", updated: "1h ago" },
  { id: "5", name: "LumeNet", type: "Blockchain", status: "active", module: "blockchains", updated: "2h ago" },
  { id: "6", name: "QuantumNet", type: "Blockchain", status: "active", module: "blockchains", updated: "30m ago" },
  { id: "7", name: "NOVA Token", type: "Token", status: "active", module: "tokens", updated: "1d ago" },
  { id: "8", name: "LUME Token", type: "Token", status: "active", module: "tokens", updated: "1d ago" },
  { id: "9", name: "NOVA White Paper", type: "White Paper", status: "published", module: "whitepapers", updated: "Jan 15" },
  { id: "10", name: "QNET White Paper", type: "White Paper", status: "published", module: "whitepapers", updated: "May 1" },
  { id: "11", name: "NovaStack Master", type: "AI Agent", status: "active", module: "ai-agents", updated: "1h ago" },
  { id: "12", name: "Treasury Overseer", type: "AI Agent", status: "active", module: "ai-agents", updated: "2h ago" },
  { id: "13", name: "Main Operating Account", type: "Treasury", status: "active", module: "treasury", updated: "Jun 11" },
  { id: "14", name: "COSMIC9 Main Wallet", type: "Wallet", status: "active", module: "wallets", updated: "2h ago" },
  { id: "15", name: "NovaSphere Business Plan", type: "Document", status: "active", module: "documents", updated: "May 15" },
  { id: "16", name: "NovaDEX Technical Architecture", type: "Document", status: "active", module: "documents", updated: "Jun 8" },
  { id: "17", name: "novaforgeai.com", type: "Website", status: "active", module: "websites", updated: "Jun 10" },
  { id: "18", name: "NovaScan", type: "Application", status: "active", module: "applications", updated: "Jun 4" },
  { id: "19", name: "Deploy NovaDEX v2", type: "Task", status: "in-progress", module: "tasks", updated: "Today" },
  { id: "20", name: "NovaDEX Launch Roadmap", type: "Roadmap", status: "in-progress", module: "roadmaps", updated: "Jun 8" },
  { id: "21", name: "NovaForgeAI Revenue Ideas", type: "Note", status: "active", module: "notes", updated: "Jun 11" },
  { id: "22", name: "Treasury Q2 Strategy", type: "Note", status: "active", module: "notes", updated: "Jun 7" },
];

const TYPE_ICONS: Record<string, React.FC<any>> = {
  Project: FolderKanban,
  Blockchain: Link2,
  Token: Coins,
  "White Paper": FileText,
  "AI Agent": Bot,
  Treasury: Landmark,
  Wallet: Wallet,
  Document: Files,
  Website: Globe,
  Application: AppWindow,
  Task: CheckSquare,
  Roadmap: Map,
  Note: StickyNote,
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [typeFilter, setTypeFilter] = useState("All");

  const allTypes = ["All", ...Array.from(new Set(ALL_ENTITIES.map((e) => e.type)))];

  const results = query.trim()
    ? ALL_ENTITIES.filter((e) => {
        const matchQuery =
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.type.toLowerCase().includes(query.toLowerCase());
        const matchType = typeFilter === "All" || e.type === typeFilter;
        return matchQuery && matchType;
      })
    : [];

  async function handleAISearch() {
    if (!query.trim()) return;
    setAiLoading(true);
    setAiAnswer(null);
    try {
      const result = await invokeLLM({
        message: `Search the NovaSphere ecosystem for: "${query}". Provide a brief, helpful answer about what you find related to this query in the context of blockchain projects, tokens, AI agents, treasury, and other ecosystem components.`,
        schema: {
          type: "object",
          properties: { answer: { type: "string" } },
          required: ["answer"],
        },
        systemPrompt: "You are NovaStack AI, an assistant for the NovaSphere ecosystem. Provide concise, accurate answers.",
      } as any);
      const answer = (result.response as any)?.answer ?? "No answer available.";
      setAiAnswer(answer);
    } catch {
      setAiAnswer("AI search is not configured. Set up QB_SCAFFOLDER_KEY to enable AI-powered search.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Global Search"
        description="Search everything across all 18 modules simultaneously"
        icon={Search}
        accent="#6C63FF"
      />

      {/* Search bar */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search everything — projects, blockchains, tokens, documents, notes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
              className="w-full h-11 pl-10 pr-4 text-sm rounded-lg border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>
          <button
            onClick={handleAISearch}
            disabled={aiLoading || !query.trim()}
            className="px-4 h-11 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {aiLoading ? "Searching..." : "AI Search"}
          </button>
        </div>

        {/* AI answer */}
        {aiAnswer && (
          <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs font-semibold text-primary mb-1.5">NovaStack AI</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{aiAnswer}</p>
          </div>
        )}
      </div>

      {/* Type filter */}
      {query.trim() && (
        <div className="flex gap-1.5 flex-wrap">
          {allTypes.map((t) => (
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
      )}

      {/* Results */}
      {query.trim() && (
        <div>
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <SearchX size={40} className="text-muted-foreground mb-4" />
              <p className="text-sm font-medium text-foreground">No results for "{query}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-muted-foreground mb-3">
                {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
              </p>
              <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
                {results.map((entity) => {
                  const Icon = TYPE_ICONS[entity.type] ?? Files;
                  return (
                    <div
                      key={entity.id}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{entity.name}</p>
                        <p className="text-xs text-muted-foreground">{entity.type}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={entity.status} />
                        <span className="text-xs text-muted-foreground">{entity.updated}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {!query.trim() && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <Search size={40} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">
            Search the entire NovaSphere ecosystem
          </p>
          <p className="text-xs text-muted-foreground">
            Projects · Blockchains · Tokens · White Papers · AI Agents · Treasury · Wallets · Documents · Websites · Applications · Tasks · Roadmaps · Notes
          </p>
        </div>
      )}
    </div>
  );
}
