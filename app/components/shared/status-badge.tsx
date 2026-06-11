import { cn } from "~/lib/utils";

type Status =
  | "active"
  | "live"
  | "in-progress"
  | "pending"
  | "blocked"
  | "completed"
  | "draft"
  | "archived"
  | "inactive"
  | string;

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  active: { label: "Active", bg: "rgba(16,185,129,0.12)", text: "#10B981" },
  live: { label: "Live", bg: "rgba(16,185,129,0.12)", text: "#10B981" },
  "in-progress": { label: "In Progress", bg: "rgba(0,212,255,0.10)", text: "#00D4FF" },
  "in_progress": { label: "In Progress", bg: "rgba(0,212,255,0.10)", text: "#00D4FF" },
  pending: { label: "Pending", bg: "rgba(245,158,11,0.10)", text: "#F59E0B" },
  blocked: { label: "Blocked", bg: "rgba(239,68,68,0.10)", text: "#EF4444" },
  completed: { label: "Completed", bg: "rgba(107,114,128,0.10)", text: "#6B7280" },
  done: { label: "Done", bg: "rgba(107,114,128,0.10)", text: "#6B7280" },
  draft: { label: "Draft", bg: "rgba(168,85,247,0.10)", text: "#A855F7" },
  archived: { label: "Archived", bg: "rgba(107,114,128,0.10)", text: "#6B7280" },
  inactive: { label: "Inactive", bg: "rgba(239,68,68,0.10)", text: "#EF4444" },
  review: { label: "Review", bg: "rgba(59,130,246,0.10)", text: "#3B82F6" },
  published: { label: "Published", bg: "rgba(16,185,129,0.12)", text: "#10B981" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const lower = status.toLowerCase().replace(/\s+/g, "-");
  const config = STATUS_CONFIG[lower] ?? {
    label: status,
    bg: "rgba(108,99,255,0.10)",
    text: "#6C63FF",
  };

  return (
    <span
      className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", className)}
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}
