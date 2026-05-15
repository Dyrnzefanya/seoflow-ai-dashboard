"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { formatNumber } from "@/lib/format-number";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols4 } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/ui/kpi-card";
import { Badge } from "@/components/ui/badge";
import { keywordData } from "@/lib/placeholder-data";
import { useToast } from "@/components/ui/toast";
import {
  Search, TrendingUp, TrendingDown, Award, Target, Minus,
  Plus, X, ChevronDown, SlidersHorizontal, Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type KWStatus = "tracking" | "opportunity" | "improving" | "declining";
type Intent = "Informational" | "Commercial" | "Navigational" | "Transactional";
type Priority = "high" | "medium" | "low";

type Keyword = {
  id: string;
  keyword: string;
  position: number | null;
  change: number;
  volume: number;
  difficulty: number;
  intent: Intent;
  priority: Priority;
  targetPage: string;
  status: KWStatus;
  isManual: boolean;
};

const STATUS_CONFIG: Record<KWStatus, { label: string; variant: "success" | "danger" | "warning" | "default" }> = {
  improving:   { label: "Improving",   variant: "success"  },
  declining:   { label: "Declining",   variant: "danger"   },
  opportunity: { label: "Opportunity", variant: "warning"  },
  tracking:    { label: "Tracking",    variant: "default"  },
};

const INTENT_COLORS: Record<Intent, string> = {
  Commercial:    "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Informational: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Navigational:  "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Transactional: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const PRIORITY_DOT: Record<Priority, string> = {
  high:   "bg-red-400",
  medium: "bg-amber-400",
  low:    "bg-[#415a72]",
};

const TARGET_PAGES: Record<string, string> = {
  "ai seo platform":             "/features",
  "generative engine optimization": "/blog/ai-seo-guide",
  "ai visibility tracker":       "/features/ai-visibility",
  "seo dashboard software":      "/",
  "seo analytics dashboard":     "/features/analytics",
  "chatgpt seo optimization":    "/blog/chatgpt-seo",
  "perplexity ai seo":           "/blog/perplexity-seo",
};

function deriveStatus(kw: { position: number; change: number; difficulty: number }): KWStatus {
  if (kw.change >= 4) return "improving";
  if (kw.change <= -2) return "declining";
  if (kw.position > 15 && kw.difficulty < 50) return "opportunity";
  return "tracking";
}

const SEED: Keyword[] = keywordData.map((kw, i) => ({
  id: `seed-${i}`,
  keyword: kw.keyword,
  position: kw.position,
  change: kw.change,
  volume: kw.volume,
  difficulty: kw.difficulty,
  intent: kw.intent as Intent,
  priority: kw.volume > 6000 && kw.difficulty < 65 ? "high" : kw.volume > 3000 ? "medium" : "low",
  targetPage: TARGET_PAGES[kw.keyword] ?? "",
  status: deriveStatus(kw),
  isManual: false,
}));

const FILTER_TABS: { id: "all" | KWStatus; label: string }[] = [
  { id: "all",         label: "All" },
  { id: "improving",   label: "Improving" },
  { id: "opportunity", label: "Opportunity" },
  { id: "tracking",    label: "Tracking" },
  { id: "declining",   label: "Declining" },
];

const INTENTS: Intent[] = ["Commercial", "Informational", "Navigational", "Transactional"];
const PRIORITIES: Priority[] = ["high", "medium", "low"];

function DifficultyBar({ value }: { value: number }) {
  const color = value >= 65 ? "#ef4444" : value >= 48 ? "#f59e0b" : "#10b981";
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-12 h-1 rounded-full bg-[#1a2d42] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[11px] text-[#415a72] tabular-nums">{value}</span>
    </div>
  );
}

function PositionBadge({ pos }: { pos: number | null }) {
  if (pos === null) return <span className="text-[11px] text-[#2a3f55] font-medium tabular-nums">—</span>;
  const color =
    pos <= 3  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" :
    pos <= 10 ? "bg-blue-500/15 text-blue-400 border-blue-500/20" :
    pos <= 20 ? "bg-amber-500/15 text-amber-400 border-amber-500/20" :
                "bg-[#1a2d42] text-[#415a72] border-[#243d56]";
  return (
    <span className={cn("inline-flex items-center justify-center h-5 w-7 rounded-md border text-[11px] font-bold tabular-nums", color)}>
      {pos}
    </span>
  );
}

export default function KeywordsPage() {
  const { toast } = useToast();
  const [keywords, setKeywords] = useLocalStorage<Keyword[]>("seoflow_keywords_v1", SEED);
  const [filter, setFilter] = useState<"all" | KWStatus>("all");
  const [showForm, setShowForm] = useState(false);

  const [draft, setDraft] = useState({
    keyword: "",
    intent: "Commercial" as Intent,
    priority: "medium" as Priority,
    targetPage: "",
  });

  const addKeyword = () => {
    if (!draft.keyword.trim()) return;
    const existing = keywords.find((k) => k.keyword.toLowerCase() === draft.keyword.trim().toLowerCase());
    if (existing) { toast("This keyword is already being tracked.", "info"); return; }

    const newKw: Keyword = {
      id: Date.now().toString(),
      keyword: draft.keyword.trim(),
      position: null,
      change: 0,
      volume: 0,
      difficulty: 0,
      intent: draft.intent,
      priority: draft.priority,
      targetPage: draft.targetPage.trim(),
      status: "tracking",
      isManual: true,
    };
    setKeywords((prev) => [newKw, ...prev]);
    toast(`"${draft.keyword.trim()}" added to keyword tracking.`);
    setDraft({ keyword: "", intent: "Commercial", priority: "medium", targetPage: "" });
    setShowForm(false);
  };

  const removeKeyword = (id: string, kw: string) => {
    setKeywords((prev) => prev.filter((k) => k.id !== id));
    toast(`"${kw}" removed from tracking.`, "info");
  };

  const filtered = filter === "all" ? keywords : keywords.filter((k) => k.status === filter);

  const counts = {
    improving:   keywords.filter((k) => k.status === "improving").length,
    opportunity: keywords.filter((k) => k.status === "opportunity").length,
    tracking:    keywords.filter((k) => k.status === "tracking").length,
    declining:   keywords.filter((k) => k.status === "declining").length,
  };
  const top3 = keywords.filter((k) => k.position !== null && k.position <= 3).length;

  return (
    <>
      <Topbar
        title="Keywords"
        subtitle={`${keywords.length} keywords tracked · Updated daily`}
      />
      <DashboardShell>

        {/* KPI row */}
        <GridCols4>
          <KpiCard title="Total Keywords"  value={String(keywords.length)} change={2.8} changeLabel="new this month"     icon={<Search className="h-4.5 w-4.5" />} />
          <KpiCard title="Top 3 Rankings"  value={String(top3)}            change={5}   changeLabel="vs last month"      icon={<Award className="h-4.5 w-4.5" />}  iconColor="text-amber-400" />
          <KpiCard title="Opportunities"   value={String(counts.opportunity)}           changeLabel="KD under 50"        icon={<Target className="h-4.5 w-4.5" />} iconColor="text-purple-400" />
          <KpiCard title="Improving"       value={String(counts.improving)} change={counts.improving} changeLabel="gaining positions" icon={<TrendingUp className="h-4.5 w-4.5" />} iconColor="text-emerald-400" />
        </GridCols4>

        {/* Main table card */}
        <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2d42]">
            <p className="text-sm font-bold text-[#f0f4f8]">Keyword Rankings</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-[11px] text-[#415a72] hover:text-[#8ca4be] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#0f1929] border border-transparent hover:border-[#1a2d42]">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter
              </button>
              <button
                onClick={() => setShowForm((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  showForm
                    ? "bg-[#0f1929] border border-[#1a2d42] text-[#415a72]"
                    : "bg-emerald-500 text-white hover:bg-emerald-400"
                )}
              >
                {showForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                {showForm ? "Cancel" : "Add keyword"}
              </button>
            </div>
          </div>

          {/* Add keyword form */}
          {showForm && (
            <div className="px-5 py-4 border-b border-[#1a2d42] bg-[#070c18] space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Add keyword to tracking</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Keyword *</label>
                  <input
                    type="text"
                    autoFocus
                    value={draft.keyword}
                    onChange={(e) => setDraft((d) => ({ ...d, keyword: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") addKeyword(); }}
                    placeholder="e.g. seo audit tool"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Search intent</label>
                  <div className="relative">
                    <select
                      value={draft.intent}
                      onChange={(e) => setDraft((d) => ({ ...d, intent: e.target.value as Intent }))}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#8ca4be] focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                    >
                      {INTENTS.map((i) => <option key={i}>{i}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#415a72] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Priority</label>
                  <div className="relative">
                    <select
                      value={draft.priority}
                      onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value as Priority }))}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#8ca4be] focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                    >
                      {PRIORITIES.map((p) => <option key={p} className="capitalize">{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#415a72] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Target page</label>
                  <input
                    type="text"
                    value={draft.targetPage}
                    onChange={(e) => setDraft((d) => ({ ...d, targetPage: e.target.value }))}
                    placeholder="/blog/my-post"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={addKeyword}
                  disabled={!draft.keyword.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors disabled:opacity-40"
                >
                  <Plus className="h-3 w-3" />
                  Add to tracking
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex items-center gap-1 px-5 pt-4 pb-3 overflow-x-auto">
            {FILTER_TABS.map((tab) => {
              const count = tab.id === "all" ? keywords.length : counts[tab.id];
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                    active
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0f1929] border border-transparent"
                  )}
                >
                  {tab.label}
                  <span className={cn("text-[10px] font-bold px-1.5 py-0 rounded-full", active ? "bg-emerald-500/20 text-emerald-400" : "bg-[#1a2d42] text-[#2a3f55]")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table */}
          <div className="px-5 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#1a2d42]">
                    <th className="pb-3 pr-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#2a3f55]">Keyword</th>
                    <th className="pb-3 px-2 text-left text-[10px] font-bold uppercase tracking-wider text-[#2a3f55]">Status</th>
                    <th className="pb-3 px-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#2a3f55]">Pos.</th>
                    <th className="pb-3 px-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#2a3f55]">Δ</th>
                    <th className="pb-3 px-2 text-right text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] hidden sm:table-cell">Vol.</th>
                    <th className="pb-3 px-2 text-left text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] hidden md:table-cell">KD</th>
                    <th className="pb-3 px-2 text-left text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] hidden lg:table-cell">Intent</th>
                    <th className="pb-3 pl-2 text-left text-[10px] font-bold uppercase tracking-wider text-[#2a3f55]">Priority</th>
                    <th className="pb-3 pl-2 w-8" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-[#1a2d42]/40 hover:bg-[#0f1929] transition-colors group"
                    >
                      <td className="py-3 pr-3">
                        <div>
                          <p className="font-semibold text-[#8ca4be] truncate max-w-[180px]">{row.keyword}</p>
                          {row.targetPage && (
                            <p className="text-[10px] text-[#2a3f55] truncate max-w-[180px] mt-0.5">{row.targetPage}</p>
                          )}
                          {row.isManual && (
                            <span className="text-[9px] font-bold text-emerald-500/70">● manual</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={STATUS_CONFIG[row.status].variant}>
                          {STATUS_CONFIG[row.status].label}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <PositionBadge pos={row.position} />
                      </td>
                      <td className="py-3 px-2 text-center">
                        {row.position === null ? (
                          <span className="text-[11px] text-[#2a3f55]">new</span>
                        ) : (
                          <span className={cn(
                            "inline-flex items-center gap-0.5 font-bold text-[11px]",
                            row.change > 0 && "text-emerald-400",
                            row.change < 0 && "text-red-400",
                            row.change === 0 && "text-[#415a72]",
                          )}>
                            {row.change > 0 ? <TrendingUp className="h-3 w-3" /> : row.change < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {row.change > 0 ? "+" : ""}{row.change}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right text-[#415a72] tabular-nums hidden sm:table-cell">
                        {row.volume > 0 ? formatNumber(row.volume) : "—"}
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        {row.difficulty > 0 ? <DifficultyBar value={row.difficulty} /> : <span className="text-[11px] text-[#2a3f55]">—</span>}
                      </td>
                      <td className="py-3 px-2 hidden lg:table-cell">
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md border", INTENT_COLORS[row.intent])}>
                          {row.intent}
                        </span>
                      </td>
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-1.5">
                          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", PRIORITY_DOT[row.priority])} />
                          <span className="text-[11px] text-[#415a72] capitalize">{row.priority}</span>
                        </div>
                      </td>
                      <td className="py-3 pl-2">
                        <button
                          onClick={() => removeKeyword(row.id, row.keyword)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded text-[#2a3f55] hover:text-red-400 transition-all"
                          title="Remove keyword"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-[#415a72]">No keywords match this filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </DashboardShell>
    </>
  );
}
