import { BarChart3, Plus, Download, TrendingUp, TrendingDown, DollarSign, Activity, Calendar } from "lucide-react";
import { PageHeader } from "~/components/shared/page-header";
import { StatCard } from "~/components/shared/stat-card";
import { StatusBadge } from "~/components/shared/status-badge";

const REPORTS = [
  {
    id: "1", title: "Treasury Report Q1 2026", category: "Financial", status: "completed",
    generated: "Apr 5, 2026", size: "1.2 MB", pages: 18,
  },
  {
    id: "2", title: "NovaChain Security Audit 2026", category: "Security", status: "completed",
    generated: "Mar 20, 2026", size: "2.8 MB", pages: 34,
  },
  {
    id: "3", title: "NovaSphere Ecosystem Overview Q2", category: "Strategic", status: "draft",
    generated: "Jun 11, 2026", size: "—", pages: 0,
  },
  {
    id: "4", title: "NovaForgeAI User Analytics May 2026", category: "Analytics", status: "completed",
    generated: "Jun 2, 2026", size: "890 KB", pages: 12,
  },
  {
    id: "5", title: "Token Performance Report H1 2026", category: "Financial", status: "in-progress",
    generated: "Jun 10, 2026", size: "—", pages: 0,
  },
  {
    id: "6", title: "AI Agents Efficiency Audit", category: "Operations", status: "pending",
    generated: "—", size: "—", pages: 0,
  },
];

const MONTHLY_REVENUE = [
  { month: "Jan", value: 15000 },
  { month: "Feb", value: 18500 },
  { month: "Mar", value: 22000 },
  { month: "Apr", value: 19800 },
  { month: "May", value: 24500 },
  { month: "Jun", value: 22500 },
];

const max = Math.max(...MONTHLY_REVENUE.map((d) => d.value));

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      <PageHeader
        title="Reports"
        description="Financial reports, analytics, security audits, and ecosystem intelligence"
        icon={BarChart3}
        accent="#10B981"
        actions={[
          { label: "Generate Report", icon: Plus, variant: "outline" },
          { label: "AI Report", icon: Plus, variant: "default" },
        ]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Reports" value={REPORTS.length} accent="#10B981" icon={BarChart3} />
        <StatCard label="This Month Revenue" value="$22.5K" accent="#10B981" />
        <StatCard label="Monthly Expenses" value="$8.1K" accent="#EF4444" />
        <StatCard label="Net Profit" value="$14.4K" accent="#10B981" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Monthly Revenue</h2>
              <p className="text-xs text-muted-foreground">H1 2026</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
              <TrendingUp size={14} />
              +18.4%
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_REVENUE.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">
                  ${(d.value / 1000).toFixed(1)}K
                </span>
                <div
                  className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors min-h-[4px]"
                  style={{ height: `${(d.value / max) * 120}px` }}
                />
                <span className="text-[10px] text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial summary */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Financial Summary</h2>
          <div className="space-y-3">
            {[
              { label: "Total Revenue H1", value: "+$122,300", trend: "positive", icon: TrendingUp },
              { label: "Total Expenses H1", value: "-$48,600", trend: "negative", icon: TrendingDown },
              { label: "Net Profit H1", value: "$73,700", trend: "positive", icon: DollarSign },
              { label: "Runway", value: "18 months", trend: "neutral", icon: Calendar },
              { label: "Subscriptions/mo", value: "$4,200", trend: "negative", icon: Activity },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon
                      size={14}
                      className={
                        item.trend === "positive"
                          ? "text-emerald-500"
                          : item.trend === "negative"
                          ? "text-red-400"
                          : "text-muted-foreground"
                      }
                    />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      item.trend === "positive"
                        ? "text-emerald-500"
                        : item.trend === "negative"
                        ? "text-red-400"
                        : "text-foreground"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reports list */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Report Archive</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generated</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Size</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {REPORTS.map((report) => (
              <tr key={report.id} className="hover:bg-primary/5 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <BarChart3 size={14} className="text-emerald-500" />
                    </div>
                    <span className="font-medium text-foreground">{report.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs text-muted-foreground">{report.category}</span>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs text-muted-foreground">{report.generated}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs text-muted-foreground">{report.size}</span>
                </td>
                <td className="px-5 py-3">
                  {report.status === "completed" && (
                    <button className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Download size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
