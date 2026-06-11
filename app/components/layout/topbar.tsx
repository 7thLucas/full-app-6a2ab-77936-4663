import { Link, useNavigate } from "react-router";
import { Search, Bell, Moon, Sun, Sparkles, Menu, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication";

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const { config, loading } = useConfigurables();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchPlaceholder = loading
    ? "Search everything..."
    : (config?.globalSearchPlaceholder ?? "Search everything...");

  const aiName = loading ? "NovaStack AI" : (config?.aiAssistantName ?? "NovaStack AI");
  const aiEnabled = loading ? true : (config?.enableAIAssistant !== false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    window.location.href = "/auth/login";
  }

  return (
    <header className="flex items-center h-14 px-4 gap-3 bg-[var(--navbar-background)] border-b border-border shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Global search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-[480px]">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
        </div>
      </form>

      {/* Right side actions */}
      <div className="flex items-center gap-1 ml-auto">
        {/* AI Assistant */}
        {aiEnabled && (
          <Link
            to="/ai-assistant"
            className="flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">{aiName}</span>
          </Link>
        )}

        {/* Notifications */}
        <button className="relative h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Bell size={16} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User avatar */}
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu((v) => !v)}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-semibold hover:bg-primary/30 transition-colors"
            >
              {user.username?.slice(0, 2).toUpperCase() ?? "NS"}
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-10 w-48 rounded-md border border-border bg-popover shadow-lg z-50">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                >
                  <User size={14} />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="h-8 px-3 flex items-center text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
