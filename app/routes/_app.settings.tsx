import { Settings, User, Shield, Bell, Palette, Database, Key, Globe, Save } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "~/components/shared/page-header";
import { useAuth } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "database", label: "Database", icon: Database },
  { id: "api", label: "API Keys", icon: Key },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { config, loading } = useConfigurables();
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Settings"
        description="Manage your NovaStack Command Center preferences and configuration"
        icon={Settings}
        accent="#6B7280"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar nav */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-2 space-y-0.5">
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  )}
                >
                  <Icon size={16} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-border bg-card p-6">
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-0.5">Profile</h2>
                <p className="text-xs text-muted-foreground">Manage your account information</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                  {user?.username?.slice(0, 2).toUpperCase() ?? "NS"}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{user?.username ?? "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email ?? "admin@novasphere.tech"}</p>
                  <button className="text-xs text-primary hover:text-primary/80 mt-1 transition-colors">
                    Change avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Username", value: user?.username ?? "", placeholder: "Your username" },
                  { label: "Email", value: user?.email ?? "", placeholder: "Your email" },
                  { label: "Role", value: user?.role ?? "admin", placeholder: "Your role", disabled: true },
                  { label: "Ecosystem", value: config?.ecosystemName ?? "NovaSphere", placeholder: "Ecosystem name" },
                ].map((field) => (
                  <div key={field.label} className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      className="w-full h-9 px-3 text-sm rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>

              <Button onClick={handleSave} size="sm">
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-0.5">Security</h2>
                <p className="text-xs text-muted-foreground">Manage authentication and security settings</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full h-9 px-3 text-sm rounded-md border border-input bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full h-9 px-3 text-sm rounded-md border border-input bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full h-9 px-3 text-sm rounded-md border border-input bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button onClick={handleSave} size="sm">
                  Update Password
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Active Sessions</h3>
                <div className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Current Session</p>
                      <p className="text-xs text-muted-foreground">Browser · IP: 192.168.x.x · Now</p>
                    </div>
                    <span className="text-xs text-emerald-500 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-0.5">Appearance</h2>
                <p className="text-xs text-muted-foreground">Customize how NovaStack looks and feels</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">
                    Theme
                  </label>
                  <div className="flex gap-3">
                    {["dark", "light", "system"].map((t) => (
                      <button
                        key={t}
                        className={cn(
                          "px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors",
                          t === "dark"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">
                    Brand Colors
                  </label>
                  <div className="flex gap-3">
                    {[
                      { label: "Primary", color: config?.brandColor?.primary ?? "#6C63FF" },
                      { label: "Secondary", color: config?.brandColor?.secondary ?? "#00D4FF" },
                      { label: "Accent", color: config?.brandColor?.accent ?? "#A855F7" },
                    ].map((c) => (
                      <div key={c.label} className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md border border-border" style={{ backgroundColor: c.color }} />
                        <span className="text-xs text-muted-foreground">{c.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Colors are managed through the portal's app config editor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "integrations" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-0.5">Integrations</h2>
                <p className="text-xs text-muted-foreground">Configure external service connections</p>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Supabase", description: "Auth, Database, Storage", status: "configured", color: "#3ECF8E" },
                  { name: "OpenAI", description: "AI Assistant (NovaStack AI)", status: "pending", color: "#10A37F" },
                  { name: "Vercel", description: "Frontend Hosting", status: "configured", color: "#000000" },
                  { name: "Railway", description: "Backend Hosting", status: "configured", color: "#7239EA" },
                  { name: "GitHub", description: "Repository", status: "configured", color: "#333333" },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: service.color }}
                      >
                        {service.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium capitalize",
                        service.status === "configured" ? "text-emerald-500" : "text-amber-500"
                      )}
                    >
                      {service.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "api" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-0.5">API Keys</h2>
                <p className="text-xs text-muted-foreground">Manage API keys and secrets</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "JWT Secret", key: "JWT_SECRET", status: "set" },
                  { label: "OpenAI API Key", key: "OPENAI_API_KEY", status: "pending" },
                  { label: "Supabase URL", key: "SUPABASE_URL", status: "set" },
                  { label: "Supabase Anon Key", key: "SUPABASE_ANON_KEY", status: "set" },
                  { label: "QB Scaffolder Key", key: "QB_SCAFFOLDER_KEY", status: "set" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </label>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          item.status === "set" ? "text-emerald-500" : "text-amber-500"
                        )}
                      >
                        {item.status === "set" ? "Configured" : "Not set"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder={item.status === "set" ? "••••••••••••••••" : "Enter value..."}
                        className="flex-1 h-8 px-3 text-xs rounded-md border border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                      />
                      <button className="px-3 h-8 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                        Update
                      </button>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5 font-mono">{item.key}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!["profile", "security", "appearance", "integrations", "api"].includes(activeSection) && (
            <div className="flex flex-col items-center justify-center py-12">
              <Settings size={32} className="text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">This section is coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
