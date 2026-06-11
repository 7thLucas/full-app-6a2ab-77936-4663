import { CheckSquare, Plus, Search, GripVertical } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";
import { cn } from "~/lib/utils";

type KanbanStatus = "inbox" | "pending" | "in-progress" | "blocked" | "review" | "completed";

const KANBAN_COLUMNS: { id: KanbanStatus; label: string; color: string }[] = [
  { id: "inbox", label: "Inbox", color: "#6B7280" },
  { id: "pending", label: "Pending", color: "#F59E0B" },
  { id: "in-progress", label: "In Progress", color: "#00D4FF" },
  { id: "blocked", label: "Blocked", color: "#EF4444" },
  { id: "review", label: "Review", color: "#3B82F6" },
  { id: "completed", label: "Completed", color: "#10B981" },
];

const TASKS: Array<{
  id: string; title: string; project: string; status: KanbanStatus;
  priority: "high" | "medium" | "low"; assignee: string; dueDate: string;
}> = [
  { id: "1", title: "Deploy NovaDEX v2 to mainnet", project: "NovaDEX", status: "in-progress", priority: "high", assignee: "Founder", dueDate: "Jul 1" },
  { id: "2", title: "Review NOVA White Paper v1.4", project: "NovaChain", status: "review", priority: "high", assignee: "Founder", dueDate: "Jun 15" },
  { id: "3", title: "Finalize COSMIC9 beta onboarding flow", project: "COSMIC9 Wallet", status: "in-progress", priority: "high", assignee: "Founder", dueDate: "Jun 20" },
  { id: "4", title: "Set up QuantumNet validators", project: "QuantumNet", status: "pending", priority: "medium", assignee: "Founder", dueDate: "Jul 5" },
  { id: "5", title: "Update Treasury Report Q2", project: "Treasury System", status: "inbox", priority: "medium", assignee: "Founder", dueDate: "Jun 30" },
  { id: "6", title: "Write NovaForgeAI API documentation", project: "NovaForgeAI", status: "in-progress", priority: "medium", assignee: "Founder", dueDate: "Jun 18" },
  { id: "7", title: "Fix NovaScan mobile layout bug", project: "NovaScan", status: "blocked", priority: "high", assignee: "Founder", dueDate: "Jun 13" },
  { id: "8", title: "Design Bennie The Cat NFT collection", project: "Bennie The Cat", status: "pending", priority: "low", assignee: "Founder", dueDate: "Jul 10" },
  { id: "9", title: "Implement NovaForgeAI payment gateway", project: "NovaForgeAI", status: "review", priority: "high", assignee: "Founder", dueDate: "Jun 22" },
  { id: "10", title: "Audit security for COSMIC9 wallet", project: "COSMIC9 Wallet", status: "pending", priority: "high", assignee: "Founder", dueDate: "Jun 25" },
  { id: "11", title: "Draft EvoNova token economics", project: "EvoNova Chain", status: "inbox", priority: "low", assignee: "Founder", dueDate: "Jul 20" },
  { id: "12", title: "Setup Staking rewards system", project: "NovaChain", status: "completed", priority: "high", assignee: "Founder", dueDate: "Jun 5" },
];

const PRIORITY_COLORS = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#10B981",
};

export default function TasksPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [search, setSearch] = useState("");

  const filtered = TASKS.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.project.toLowerCase().includes(search.toLowerCase())
  );

  const getTasksByStatus = (status: KanbanStatus) =>
    filtered.filter((t) => t.status === status);

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Tasks"
        description="Kanban task management across all NovaSphere projects"
        icon={CheckSquare}
        accent="#F59E0B"
        actions={[{ label: "New Task", icon: Plus, variant: "default" }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {KANBAN_COLUMNS.map((col) => (
          <StatCard
            key={col.id}
            label={col.label}
            value={getTasksByStatus(col.id).length}
            accent={col.color}
          />
        ))}
      </div>

      {/* View toggle + search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex border border-border rounded-md overflow-hidden">
          {(["kanban", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "kanban" ? (
        /* Kanban board */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {KANBAN_COLUMNS.map((col) => {
              const colTasks = getTasksByStatus(col.id);
              return (
                <div key={col.id} className="w-72 flex-none">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
                      <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
                      <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">
                        {colTasks.length}
                      </span>
                    </div>
                    <button className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <Plus size={13} />
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-lg border border-border bg-card p-3 hover:border-primary/40 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-1.5 mb-2">
                          <GripVertical size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                          <p className="text-xs font-medium text-foreground leading-snug">{task.title}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground truncate">{task.project}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
                            />
                            <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List view */
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Priority</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((task) => (
                <tr key={task.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-foreground">{task.title}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{task.project}</span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs font-medium capitalize"
                      style={{ color: PRIORITY_COLORS[task.priority] }}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
