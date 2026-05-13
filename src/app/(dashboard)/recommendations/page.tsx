import { Topbar } from "@/components/layout/topbar";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { recommendations } from "@/lib/placeholder-data";
import { AlertCircle, AlertTriangle, Info, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityConfig = {
  high:   { variant: "danger"  as const, icon: AlertCircle,   borderLeft: "border-l-red-500/50",   iconBg: "bg-red-500/10 border-red-500/20",    iconColor: "text-red-400",   label: "High Priority" },
  medium: { variant: "warning" as const, icon: AlertTriangle, borderLeft: "border-l-amber-500/50", iconBg: "bg-amber-500/10 border-amber-500/20", iconColor: "text-amber-400", label: "Medium Priority" },
  low:    { variant: "info"    as const, icon: Info,          borderLeft: "border-l-blue-500/50",  iconBg: "bg-blue-500/10 border-blue-500/20",   iconColor: "text-blue-400",  label: "Low Priority" },
};

const effortColor: Record<string, string> = {
  Low:    "text-emerald-400",
  Medium: "text-amber-400",
  High:   "text-red-400",
};

export default function RecommendationsPage() {
  const high   = recommendations.filter((r) => r.priority === "high");
  const medium = recommendations.filter((r) => r.priority === "medium");
  const low    = recommendations.filter((r) => r.priority === "low");

  return (
    <>
      <Topbar title="AI Recommendations" subtitle="Powered by Claude AI · Refreshed daily" />
      <DashboardShell>

        {/* Summary */}
        <div className="flex flex-wrap gap-2.5">
          {[
            { label: "High Priority",   count: high.length,   variant: "danger"  as const },
            { label: "Medium Priority", count: medium.length, variant: "warning" as const },
            { label: "Low Priority",    count: low.length,    variant: "info"    as const },
            { label: "Total Actions",   count: recommendations.length, variant: "default" as const },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1a2d42] bg-[#0c1322]"
            >
              <Badge variant={s.variant}>{s.count}</Badge>
              <span className="text-xs font-medium text-[#8ca4be]">{s.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 ml-auto">
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Est. impact: +34% visibility</span>
          </div>
        </div>

        {/* Recommendation cards */}
        <div className="space-y-3">
          {recommendations.map((rec) => {
            const cfg = priorityConfig[rec.priority];
            const Icon = cfg.icon;
            return (
              <div
                key={rec.id}
                className={cn(
                  "group relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer",
                  "border border-l-2 border-[#1a2d42] bg-[#0c1322]",
                  "hover:border-[#243d56] hover:bg-[#0f1929]",
                  "transition-all duration-150",
                  cfg.borderLeft
                )}
              >
                <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border", cfg.iconBg)}>
                  <Icon className={cn("h-4 w-4", cfg.iconColor)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    <span className="text-[11px] font-medium text-[#415a72]">{rec.category}</span>
                    <span className="text-[#1a2d42]">·</span>
                    <span className="text-[11px] text-[#415a72]">
                      Effort: <span className={effortColor[rec.effort]}>{rec.effort}</span>
                    </span>
                    <span className="text-[#1a2d42]">·</span>
                    <span className="text-[11px] text-[#415a72]">
                      Impact: <span className="text-[#8ca4be] font-medium">{rec.impact}</span>
                    </span>
                    {rec.estGain && (
                      <span className="ml-auto text-[11px] font-semibold text-emerald-500">{rec.estGain}</span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#f0f4f8] mb-1.5 leading-snug">{rec.title}</p>
                  <p className="text-xs text-[#415a72] leading-relaxed">{rec.description}</p>
                </div>

                <ArrowRight className="h-4 w-4 text-[#2a3f55] shrink-0 mt-1 group-hover:text-emerald-400 transition-colors" />
              </div>
            );
          })}
        </div>

      </DashboardShell>
    </>
  );
}
