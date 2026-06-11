import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Link2,
  Coins,
  FileText,
  Bot,
  Landmark,
  Wallet,
  Files,
  Globe,
  AppWindow,
  CheckSquare,
  Map,
  StickyNote,
  Search,
  BarChart3,
  Settings,
  Archive,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "projects", label: "Projects", icon: FolderKanban, href: "/projects" },
  { id: "blockchains", label: "Blockchains", icon: Link2, href: "/blockchains" },
  { id: "tokens", label: "Tokens", icon: Coins, href: "/tokens" },
  { id: "whitepapers", label: "White Papers", icon: FileText, href: "/whitepapers" },
  { id: "ai-agents", label: "AI Agents", icon: Bot, href: "/ai-agents" },
  { id: "treasury", label: "Treasury", icon: Landmark, href: "/treasury" },
  { id: "wallets", label: "Wallets", icon: Wallet, href: "/wallets" },
  { id: "documents", label: "Documents", icon: Files, href: "/documents" },
  { id: "websites", label: "Websites", icon: Globe, href: "/websites" },
  { id: "applications", label: "Applications", icon: AppWindow, href: "/applications" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, href: "/tasks" },
  { id: "roadmaps", label: "Roadmaps", icon: Map, href: "/roadmaps" },
  { id: "notes", label: "Notes", icon: StickyNote, href: "/notes" },
  { id: "search", label: "Search", icon: Search, href: "/search" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/reports" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "archive", label: "Archive", icon: Archive, href: "/archive" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { config, loading } = useConfigurables();

  const appName = loading ? "NovaStack" : (config?.appName ?? "NovaStack");
  const logoUrl = loading ? null : (config?.logoUrl ?? null);

  const enabledModuleIds = loading
    ? null
    : (config?.navModules?.filter((m) => m.enabled !== false).map((m) => m.id) ?? null);

  const visibleNavItems = NAV_ITEMS.filter(
    (item) => !enabledModuleIds || enabledModuleIds.includes(item.id)
  );

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--sidebar-background)] border-r border-[var(--sidebar-border)] transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo / Brand */}
      <div className="flex items-center h-14 px-3 border-b border-[var(--sidebar-border)] shrink-0">
        {logoUrl && logoUrl !== "FILL_LOGO_URL_HERE" ? (
          <img
            src={logoUrl}
            alt={appName}
            className="h-8 w-8 rounded-lg object-contain shrink-0"
          />
        ) : (
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground text-xs font-bold">
              {appName.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {!collapsed && (
          <span className="ml-2.5 font-semibold text-sm text-foreground truncate">
            {appName}
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-all duration-100",
                isActive
                  ? "border-l-2 border-primary bg-primary/10 text-foreground pl-[6px]"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground border-l-2 border-transparent"
              )}
            >
              <Icon
                size={18}
                className={cn(
                  "shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              {!collapsed && (
                <span className="truncate font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-[var(--sidebar-border)] shrink-0">
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full h-8 rounded-md text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
