import { Archive, Search, RotateCcw, Trash2, FolderKanban, FileText, StickyNote, CheckSquare } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { cn } from "~/lib/utils";

const ARCHIVED_ITEMS = [
  { id: "1", name: "BlockExplorer v1.0 Project", type: "Project", archivedAt: "Jan 15, 2026", size: "—" },
  { id: "2", name: "NOVA White Paper v1.0", type: "Document", archivedAt: "Feb 3, 2026", size: "2.1 MB" },
  { id: "3", name: "Old Treasury Spreadsheets", type: "Document", archivedAt: "Mar 10, 2026", size: "4.5 MB" },
  { id: "4", name: "Legacy Marketing Tasks Q4 2025", type: "Tasks", archivedAt: "Jan 1, 2026", size: "—" },
  { id: "5", name: "NovaSphere v1 Architecture Notes", type: "Note", archivedAt: "Nov 20, 2025", size: "—" },
  { id: "6", name: "Initial LUME Token Concept", type: "Document", archivedAt: "Oct 15, 2025", size: "890 KB" },
];

const TYPE_ICONS: Record<string, React.FC<any>> = {
  Project: FolderKanban,
  Document: FileText,
  Tasks: CheckSquare,
  Note: StickyNote,
};

export default function ArchivePage() {
  const [search, setSearch] = useState("");

  const filtered = ARCHIVED_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Archive"
        description="Archived projects, documents, tasks, and notes"
        icon={Archive}
        accent="#6B7280"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Archived Items" value={ARCHIVED_ITEMS.length} accent="#6B7280" icon={Archive} />
        <StatCard label="Projects" value={ARCHIVED_ITEMS.filter((i) => i.type === "Project").length} accent="#6C63FF" />
        <StatCard label="Documents" value={ARCHIVED_ITEMS.filter((i) => i.type === "Document").length} accent="#64748B" />
        <StatCard label="Storage Used" value="7.5 MB" accent="#3B82F6" />
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search archive..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Archived items are hidden from main navigation but remain accessible here.
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Archived</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Size</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((item) => {
              const Icon = TYPE_ICONS[item.type] ?? FileText;
              return (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium text-muted-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{item.type}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{item.archivedAt}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{item.size}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="Restore">
                        <RotateCcw size={13} />
                      </button>
                      <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" title="Delete permanently">
                        <Trash2 size={13} />
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
