"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { recommendations } from "@/lib/placeholder-data";
import { useToast } from "@/components/ui/toast";
import {
  AlertCircle, AlertTriangle, Info, ArrowRight, Zap,
  CheckCircle2, Lightbulb, RotateCcw, ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";

const priorityConfig = {
  high: {
    variant: "danger" as const,
    icon: AlertCircle,
    borderLeft: "border-l-red-500/50",
    iconBg: "bg-red-500/10 border-red-500/20",
    iconColor: "text-red-400",
    label: "High Priority",
  },
  medium: {
    variant: "warning" as const,
    icon: AlertTriangle,
    borderLeft: "border-l-amber-500/50",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
    label: "Medium Priority",
  },
  low: {
    variant: "info" as const,
    icon: Info,
    borderLeft: "border-l-blue-500/50",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    label: "Low Priority",
  },
};

const effortColor: Record<string, string> = {
  Low: "text-emerald-400",
  Medium: "text-amber-400",
  High: "text-red-400",
};

type FilterPriority = "all" | "high" | "medium" | "low";

export default function RecommendationsPage() {
  const { toast } = useToast();
  const [doneIds, setDoneIds] = useLocalStorage<string[]>("seoflow_rec_done_v1", []);
  const [filter, setFilter] = useState<FilterPriority>("all");

  const done = new Set(doneIds);

  const markDone = (id: string, title: string) => {
    setDoneIds((prev) => [...prev, id]);
    toast(`"${title.slice(0, 48)}${title.length > 48 ? "…" : ""}" marked as done.`);
  };

  const undoDone = (id: string) => {
    setDoneIds((prev) => prev.filter((x) => x !== id));
  };

  const active = recommendations.filter((r) => !done.has(r.id));
  const filtered = filter === "all" ? active : active.filter((r) => r.priority === filter);

  const high = recommendations.filter((r) => r.priority === "high" && !done.has(r.id));
  const medium = recommendations.filter((r) => r.priority === "medium" && !done.has(r.id));
  const low = recommendations.filter((r) => r.priority === "low" && !done.has(r.id));

  return (
    <>
      <Topbar title="AI Recommendations" subtitle="Powered by Claude AI · Refreshed daily" />
      <DashboardShell>

        {/* Summary + filter row */}
        <div className="flex flex-wrap items-center gap-2.5">
          {[
            { label: "High Priority",   count: high.length,   variant: "danger"  as const, f: "high" as FilterPriority },
            { label: "Medium Priority", count: medium.length, variant: "warning" as const, f: "medium" as FilterPriority },
            { label: "Low Priority",    count: low.length,    variant: "info"    as const, f: "low" as FilterPriority },
            { label: "All Actions",     count: active.length, variant: "default" as const, f: "all" as FilterPriority },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setFilter(s.f)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all",
                filter === s.f
                  ? "border-emerald-500/30 bg-emerald-500/8"
                  : "border-[#1a2d42] bg-[#0c1322] hover:border-[#243d56]"
              )}
            >
              <Badge variant={s.variant}>{s.count}</Badge>
              <span className="text-xs font-medium text-[#8ca4be]">{s.label}</span>
            </button>
          ))}

          {doneIds.length > 0 && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 ml-auto">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">{doneIds.length} completed</span>
            </div>
          )}

          {doneIds.length === 0 && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 ml-auto">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Est. impact: +34% visibility</span>
            </div>
          )}
        </div>

        {/* Recommendation cards */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((rec) => {
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
                  <div
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
                      cfg.iconBg
                    )}
                  >
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
                        <span className="ml-auto text-[11px] font-semibold text-emerald-500">
                          {rec.estGain}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-[#f0f4f8] mb-1.5 leading-snug">{rec.title}</p>
                    <p className="text-xs text-[#415a72] leading-relaxed">{rec.description}</p>
                  </div>

                  <div className="flex flex-col items-center gap-2 shrink-0 ml-1">
                    <ArrowRight className="h-4 w-4 text-[#2a3f55] group-hover:text-emerald-400 transition-colors" />
                    <button
                      onClick={(e) => { e.stopPropagation(); markDone(rec.id, rec.title); }}
                      title="Mark as done"
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-[#2a3f55] hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-150"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toast(`"${rec.title.slice(0, 40)}…" added to Workflow.`); }}
                      title="Add to Workflow"
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-[#2a3f55] hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-150"
                    >
                      <ListTodo className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<Lightbulb className="h-8 w-8 text-[#415a72]" />}
            title={doneIds.length > 0 ? "All done for now!" : "No recommendations"}
            description={
              doneIds.length > 0
                ? `You've completed all ${doneIds.length} recommendation${doneIds.length > 1 ? "s" : ""}. Claude AI will generate new insights after your next data refresh.`
                : "No recommendations match this filter. Try selecting a different priority level."
            }
            action={
              doneIds.length > 0 ? (
                <button
                  onClick={() => setDoneIds([])}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset all
                </button>
              ) : undefined
            }
          />
        )}

        {/* Completed section */}
        {doneIds.length > 0 && filtered.length > 0 && (
          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2a3f55] mb-3 px-1">
              Completed ({doneIds.length})
            </p>
            <div className="space-y-2">
              {recommendations
                .filter((r) => done.has(r.id))
                .map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-[#1a2d42] bg-[#070c18] opacity-60"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#415a72] line-through truncate">{rec.title}</p>
                    </div>
                    <button
                      onClick={() => undoDone(rec.id)}
                      className="text-[10px] text-[#2a3f55] hover:text-[#415a72] font-medium transition-colors shrink-0"
                    >
                      Undo
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

      </DashboardShell>
    </>
  );
}
