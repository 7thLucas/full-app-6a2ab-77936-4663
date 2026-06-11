import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  accent?: string;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = "#6C63FF",
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 transition-all hover:border-[var(--border-strong)] hover:shadow-md",
        className
      )}
      style={{ "--border-strong": "#2A2A3E" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {label}
          </p>
          <p
            className="text-3xl font-bold"
            style={{ color: accent }}
          >
            {value}
          </p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-1">
              <span
                className={
                  trend.value >= 0 ? "text-emerald-500" : "text-red-500"
                }
              >
                {trend.value >= 0 ? "+" : ""}
                {trend.value}%
              </span>{" "}
              {trend.label}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ background: `${accent}18` }}
          >
            <Icon size={20} style={{ color: accent }} />
          </div>
        )}
      </div>
    </div>
  );
}
