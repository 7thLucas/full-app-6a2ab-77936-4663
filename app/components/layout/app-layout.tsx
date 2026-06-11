import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { cn } from "~/lib/utils";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { useConfigurables } from "~/modules/configurables";

export function AppLayout() {
  const { config, loading } = useConfigurables();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Apply default theme from configurables
  useEffect(() => {
    if (!loading && config?.defaultTheme) {
      // Theme is handled by next-themes via ThemeProvider
    }
  }, [loading, config]);

  // Apply sidebar default state
  useEffect(() => {
    if (!loading && config?.sidebarCollapsedByDefault) {
      setCollapsed(true);
    }
  }, [loading, config]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar
          collapsed={false}
          onToggle={() => setMobileOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onMenuToggle={() => setMobileOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
