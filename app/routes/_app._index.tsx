import {
  LayoutDashboard,
  FolderKanban,
  Link2,
  Coins,
  Bot,
  Wallet,
  Landmark,
  Globe,
  AppWindow,
  Files,
  CheckSquare,
  FileText,
  Clock,
  Zap,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import { StatCard } from "~/components/shared/stat-card";
import { PageHeader } from "~/components/shared/page-header";
import { StatusBadge } from "~/components/shared/status-badge";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication";

const STATS = [
  { label: "Projects", value: 11, icon: FolderKanban, accent: "#6C63FF", href: "/projects" },
  { label: "Blockchains", value: 15, icon: Link2, accent: "#00D4FF", href: "/blockchains" },
  { label: "Tokens", value: 15, icon: Coins, accent: "#F59E0B", href: "/tokens" },
  { label: "White Papers", value: 15, icon: FileText, accent: "#64748B", href: "/whitepapers" },
  { label: "AI Agents", value: 24, icon: Bot, accent: "#A855F7", href: "/ai-agents" },
  { label: "Treasury Accounts", value: 8, icon: Landmark, accent: "#10B981", href: "/treasury" },
  { label: "Wallets", value: 12, icon: Wallet, accent: "#3B82F6", href: "/wallets" },
  { label: "Documents", value: 47, icon: Files, accent: "#6B7280", href: "/documents" },
  { label: "Websites", value: 7, icon: Globe, accent: "#8B5CF6", href: "/websites" },
  { label: "Applications", value: 8, icon: AppWindow, accent: "#EC4899", href: "/applications" },
  { label: "Active Tasks", value: 34, icon: CheckSquare, accent: "#F59E0B", href: "/tasks" },
];

const RECENT_ACTIVITY = [
  { type: "Project", name: "NovaForgeAI", action: "Updated", time: "2m ago", status: "active" },
  { type: "Token", name: "NOVA", action: "White paper revised", time: "15m ago", status: "draft" },
  { type: "Task", name: "Deploy NovaDEX v2", action: "Moved to In Progress", time: "1h ago", status: "in-progress" },
  { type: "Blockchain", name: "NovaChain", action: "Metrics updated", time: "2h ago", status: "active" },
  { type: "Document", name: "Treasury Report Q2", action: "Uploaded", time: "3h ago", status: "completed" },
  { type: "Wallet", name: "COSMIC9 Main", action: "Transaction recorded", time: "4h ago", status: "active" },
];

const QUICK_ACTIONS = [
  { label: "New Project", href: "/projects", icon: FolderKanban, color: "#6C63FF" },
  { label: "Add Task", href: "/tasks", icon: CheckSquare, color: "#F59E0B" },
  { label: "New Document", href: "/documents", icon: Files, color: "#6B7280" },
  { label: "Add Note", href: "/notes", icon: FileText, color: "#A855F7" },
  { label: "Add Wallet", href: "/wallets", icon: Wallet, color: "#3B82F6" },
  { label: "View Reports", href: "/reports", icon: TrendingUp, color: "#10B981" },
];

const UPCOMING_MILESTONES = [
  { name: "NovaForgeAI Beta Launch", project: "NovaForgeAI", date: "Jun 20, 2026", status: "in-progress" },
  { name: "NovaDEX Mainnet Deploy", project: "NovaDEX", date: "Jul 1, 2026", status: "pending" },
  { name: "NOVA Token White Paper v2", project: "NovaChain", date: "Jul 15, 2026", status: "draft" },
  { name: "Treasury Q2 Audit", project: "Treasury System", date: "Jun 30, 2026", status: "pending" },
];

export default function DashboardPage() {
  const { config, loading } = useConfigurables();
  const { user } = useAuth();

  const welcomeMsg = loading
    ? "Welcome back to NovaStack Command Center"
    : (config?.dashboardWelcomeMessage ?? "Welcome back to NovaStack Command Center");

  const ecosystemName = loading ? "NovaSphere" : (config?.ecosystemName ?? "NovaSphere");

  return (
    <div className="p-6 space-y-8 max-w-[1600px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard size={20} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Command Center
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{welcomeMsg}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {ecosystemName} ecosystem — {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-500 font-medium">All systems operational</span>
        </div>
      </div>

      {/* Stats grid */}
      <div>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Ecosystem Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {STATS.map((stat) => (
            <Link key={stat.label} to={stat.href} className="group">
              <StatCard
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                accent={stat.accent}
                className="group-hover:scale-[1.01] transition-transform cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.href}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${action.color}18` }}
                >
                  <Icon size={18} style={{ color: action.color }} />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
            </div>
            <Link
              to="/search"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{item.type}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm font-medium text-foreground truncate mt-0.5">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.action}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              <h2 className="text-sm font-semibold text-foreground">Upcoming Milestones</h2>
            </div>
            <Link
              to="/roadmaps"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View roadmaps <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {UPCOMING_MILESTONES.map((milestone, i) => (
              <div key={i} className="flex items-start justify-between gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {milestone.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{milestone.project}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-muted-foreground">{milestone.date}</span>
                  <StatusBadge status={milestone.status} />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border">
            <Link
              to="/roadmaps"
              className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus size={12} />
              Add milestone
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
