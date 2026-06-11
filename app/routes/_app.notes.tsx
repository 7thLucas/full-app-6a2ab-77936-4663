import { StickyNote, Plus, Search, Tag, Clock } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { cn } from "~/lib/utils";

const CATEGORIES = ["All", "Ideas", "Research", "Meeting Notes", "Technical", "Business", "Future Plans", "Quick Notes", "Knowledge Vault"];

const NOTES = [
  {
    id: "1", title: "NovaForgeAI Revenue Model Ideas", category: "Ideas",
    content: "Subscription tiers: Basic $29/mo, Pro $99/mo, Enterprise custom. Annual discount 20%. Freemium model with 5 free projects...",
    tags: ["NovaForgeAI", "Revenue", "Strategy"], lastUpdated: "Jun 11, 2026", color: "#6C63FF"
  },
  {
    id: "2", title: "QuantumNet Consensus Research", category: "Research",
    content: "Investigating hybrid PoS + PoA consensus for QuantumNet. Key findings: 2400 TPS achievable with 18 validators, finality in ~2 seconds...",
    tags: ["QuantumNet", "Blockchain", "Research"], lastUpdated: "Jun 10, 2026", color: "#3B82F6"
  },
  {
    id: "3", title: "COSMIC9 UX Feedback - Beta", category: "Meeting Notes",
    content: "Key feedback from beta users: 1) Onboarding too complex, 2) Need better multi-chain switching, 3) Transaction confirmation needs redesign...",
    tags: ["COSMIC9", "UX", "Beta"], lastUpdated: "Jun 9, 2026", color: "#F59E0B"
  },
  {
    id: "4", title: "NovaDEX Smart Contract Architecture", category: "Technical",
    content: "Architecture decisions: 1) Use upgradeable proxy pattern, 2) Multi-sig for admin functions, 3) Emergency pause mechanism...",
    tags: ["NovaDEX", "Smart Contracts", "Architecture"], lastUpdated: "Jun 8, 2026", color: "#00D4FF"
  },
  {
    id: "5", title: "Treasury Q2 Strategy", category: "Business",
    content: "Q2 budget allocation: 40% infrastructure, 25% development, 20% marketing, 15% reserve. Focus on reducing AWS costs...",
    tags: ["Treasury", "Strategy", "Q2"], lastUpdated: "Jun 7, 2026", color: "#10B981"
  },
  {
    id: "6", title: "Future Blockchain Ideas", category: "Future Plans",
    content: "Potential new chains: 1) AI-focused chain for agent transactions, 2) Gaming chain with built-in NFTs, 3) IoT microchain...",
    tags: ["Blockchain", "Future", "Ideas"], lastUpdated: "Jun 5, 2026", color: "#A855F7"
  },
  {
    id: "7", title: "Daily standup Jun 11", category: "Quick Notes",
    content: "Today: NovaDEX mainnet prep, COSMIC9 beta fix, Treasury report review. Blockers: Security audit pending for COSMIC9...",
    tags: ["Daily", "Standup"], lastUpdated: "Jun 11, 2026", color: "#6B7280"
  },
  {
    id: "8", title: "Bennie The Cat NFT Collection Specs", category: "Knowledge Vault",
    content: "Collection: 10,000 unique Bennie NFTs on LumeNet. Traits: 80 backgrounds, 120 outfits, 45 accessories, 30 special editions...",
    tags: ["Bennie", "NFT", "LumeNet"], lastUpdated: "Jun 3, 2026", color: "#EC4899"
  },
];

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeNote, setActiveNote] = useState<string | null>(NOTES[0].id);

  const filtered = NOTES.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || n.category === category;
    return matchSearch && matchCat;
  });

  const activeNoteData = NOTES.find((n) => n.id === activeNote);

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Notes"
        description="Knowledge vault — ideas, research, meeting notes, and more"
        icon={StickyNote}
        accent="#A855F7"
        actions={[{ label: "New Note", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Notes" value={NOTES.length} accent="#A855F7" icon={StickyNote} />
        <StatCard label="Ideas" value={NOTES.filter((n) => n.category === "Ideas").length} accent="#6C63FF" />
        <StatCard label="Research" value={NOTES.filter((n) => n.category === "Research").length} accent="#3B82F6" />
        <StatCard label="Technical" value={NOTES.filter((n) => n.category === "Technical").length} accent="#00D4FF" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 min-h-[500px]">
        {/* Sidebar */}
        <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
          {/* Search + filter */}
          <div className="p-3 border-b border-border space-y-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-8 pl-7 pr-3 text-xs rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-8 px-2 text-xs rounded-md border border-input bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Note list */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.map((note) => (
              <button
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={cn(
                  "w-full text-left px-3 py-3 hover:bg-muted/30 transition-colors",
                  activeNote === note.id && "bg-primary/10"
                )}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: note.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{note.title}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{note.content.slice(0, 60)}...</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={9} className="text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{note.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Note editor */}
        {activeNoteData ? (
          <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-foreground">{activeNoteData.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${activeNoteData.color}18`, color: activeNoteData.color }}
                    >
                      {activeNoteData.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {activeNoteData.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <p className="text-sm text-foreground/90 leading-relaxed">{activeNoteData.content}</p>
              <div className="flex items-center gap-2 mt-6 flex-wrap">
                {activeNoteData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    <Tag size={9} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card flex items-center justify-center">
            <div className="text-center">
              <StickyNote size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Select a note to view it</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
