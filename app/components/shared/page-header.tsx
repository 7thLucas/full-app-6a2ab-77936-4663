import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

interface PageAction {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  variant?: "default" | "outline" | "ghost";
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  accent?: string;
  actions?: PageAction[];
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  accent = "#6C63FF",
  actions = [],
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${accent}18` }}
          >
            <Icon size={18} style={{ color: accent }} />
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {actions.length > 0 && (
        <div className="flex items-center gap-2 shrink-0">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={action.variant ?? (i === actions.length - 1 ? "default" : "outline")}
              onClick={action.onClick}
              size="sm"
            >
              {action.icon && <action.icon size={14} />}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
