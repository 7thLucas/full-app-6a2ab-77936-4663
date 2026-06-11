/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TNavModule = {
  id: string;
  label: string;
  enabled: boolean;
};

export type TDefaultConfigurableData = {
  appName: string;
  appTagline?: string;
  logoUrl: string;
  brandColor: TBrandColor;
  ecosystemName?: string;
  ownerName?: string;
  defaultTheme?: "dark" | "light" | "system";
  enableAIAssistant?: boolean;
  aiAssistantName?: string;
  sidebarCollapsedByDefault?: boolean;
  navModules?: TNavModule[];
  dashboardWelcomeMessage?: string;
  globalSearchPlaceholder?: string;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "NovaStack Command Center",
  appTagline: "One Command Center. Every NovaSphere Asset. Zero Chaos.",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#6C63FF",
    secondary: "#00D4FF",
    accent: "#A855F7",
  },
  ecosystemName: "NovaSphere",
  ownerName: "Founder",
  defaultTheme: "dark",
  enableAIAssistant: true,
  aiAssistantName: "NovaStack AI",
  sidebarCollapsedByDefault: false,
  navModules: [
    { id: "dashboard", label: "Dashboard", enabled: true },
    { id: "projects", label: "Projects", enabled: true },
    { id: "blockchains", label: "Blockchains", enabled: true },
    { id: "tokens", label: "Tokens", enabled: true },
    { id: "whitepapers", label: "White Papers", enabled: true },
    { id: "ai-agents", label: "AI Agents", enabled: true },
    { id: "treasury", label: "Treasury", enabled: true },
    { id: "wallets", label: "Wallets", enabled: true },
    { id: "documents", label: "Documents", enabled: true },
    { id: "websites", label: "Websites", enabled: true },
    { id: "applications", label: "Applications", enabled: true },
    { id: "tasks", label: "Tasks", enabled: true },
    { id: "roadmaps", label: "Roadmaps", enabled: true },
    { id: "notes", label: "Notes", enabled: true },
    { id: "search", label: "Search", enabled: true },
    { id: "reports", label: "Reports", enabled: true },
    { id: "settings", label: "Settings", enabled: true },
    { id: "archive", label: "Archive", enabled: true },
  ],
  dashboardWelcomeMessage: "Welcome back to NovaStack Command Center",
  globalSearchPlaceholder: "Search everything...",
};
