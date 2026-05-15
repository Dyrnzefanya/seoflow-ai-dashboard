"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useToast } from "@/components/ui/toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { formatNumber } from "@/lib/format-number";
import { recommendations, keywordData, weeklyReport } from "@/lib/placeholder-data";
import {
  CheckCircle2, ArrowRight, Target, Zap, Plus, X,
  Check, Lightbulb, AlertCircle, Search, PenLine,
  StickyNote, FileText, Workflow, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type Goal = { id: string; text: string; done: boolean };
type QuickNote = { id: string; text: string; createdAt: string };

// ── Module-level derived data (no side-effects, safe for SSR) ────────────────

const FOCUS_ITEMS = recommendations.filter((r) => r.priority === "high");

const KW_OPPORTUNITIES = keywordData
  .filter((k) => k.position >= 13 && k.difficulty < 55)
  .sort((a, b) => a.difficulty - b.difficulty)
  .slice(0, 3);

const CONTENT_PIPELINE = [
  { id: "3", title: "GEO vs SEO: What's the Difference in 2026?", status: "drafting", type: "Blog post",  keyword: "geo vs seo" },
  { id: "4", title: "FAQ: How to Optimize for ChatGPT Answers",    status: "planned",  type: "FAQ",        keyword: "chatgpt seo optimization" },
  { id: "5", title: "Best AI SEO Tools Comparison 2026",           status: "planned",  type: "Comparison", keyword: "ai seo tools comparison" },
];

const INITIAL_GOALS: Goal[] = [
  { id: "g1", text: "Fix meta descriptions on 14 high-traffic pages", done: false },
  { id: "g2", text: "Publish the GEO optimization pillar page",        done: false },
  { id: "g3", text: "Add FAQ schema to 5 core service pages",          done: false },
  { id: "g4", text: "Review ChatGPT citation rate improvements",       done: true  },
  { id: "g5", text: "Research 3 new low-competition keyword clusters",  done: false },
];

const INITIAL_QUICK_NOTES: QuickNote[] = [
  { id: "q1", text: "Check if FAQ schema went live on /services page",          createdAt: "Today"     },
  { id: "q2", text: "Ask for ChatGPT citation screenshot from client demo",     createdAt: "Yesterday" },
  { id: "q3", text: "Review Perplexity AI article draft before publishing",     createdAt: "May 12"    },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function KdBar({ value }: { value: number }) {
  const color = value >= 65 ? "#ef4444" : value >= 48 ? "#f59e0b" : "#10b981";
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-10 h-1 rounded-full bg-[#1a2d42] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[10px] text-[#415a72] tabular-nums">{value}</span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CommandCenterPage() {
  const { toast } = useToast();

  const [goals, setGoals]           = useLocalStorage<Goal[]>("seoflow_goals_v1", INITIAL_GOALS);
  const [quickNotes, setQuickNotes] = useLocalStorage<QuickNote[]>("seoflow_quick_notes_v1", INITIAL_QUICK_NOTES);

  const [focusDone, setFocusDone] = useState<Set<string>>(new Set());
  const [newNote, setNewNote]     = useState("");
  const [greeting, setGreeting]   = useState("Good morning");
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const now = new Date();
    const h   = now.getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
    setDateLabel(now.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    }));
  }, []);

  const toggleGoal = (id: string) =>
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, done: !g.done } : g));

  const markFocusDone = (id: string, title: string) => {
    setFocusDone((prev) => new Set([...prev, id]));
    toast(`Executed: "${title.slice(0, 44)}${title.length > 44 ? "…" : ""}"`, "success");
  };

  const addQuickNote = () => {
    if (!newNote.trim()) return;
    setQuickNotes((prev) => [
      { id: Date.now().toString(), text: newNote.trim(), createdAt: "Just now" },
      ...prev,
    ]);
    setNewNote("");
    toast("Note added.", "info");
  };

  const removeQuickNote = (id: string) =>
    setQuickNotes((prev) => prev.filter((n) => n.id !== id));

  const goalsDone  = goals.filter((g) => g.done).length;
  const goalsPct   = goals.length > 0 ? Math.round((goalsDone / goals.length) * 100) : 0;
  const draftCount = CONTENT_PIPELINE.filter((c) => c.status === "drafting").length;
  const pendingFocusCount = FOCUS_ITEMS.filter((r) => !focusDone.has(r.id)).length;

  return (
    <>
      <Topbar title="Command Center" subtitle="Your daily SEO briefing · acme-corp.com" />
      <DashboardShell>

        {/* ── Greeting banner ─────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-[#1a2d42] bg-gradient-to-br from-[#0c1a2c] via-[#0c1322] to-[#070c18] px-6 py-6">
          <div className="absolute -top-10 -right-10 h-52 w-52 rounded-full bg-emerald-500/6 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-6 h-36 w-36 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              {dateLabel && (
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#415a72] mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  {dateLabel}
                </p>
              )}
              <h1 className="text-[1.7rem] font-black text-[#f0f4f8] tracking-tight leading-tight mb-1.5">
                {greeting}, Alex.
              </h1>
              <p className="text-sm text-[#415a72]">
                {pendingFocusCount > 0
                  ? `${pendingFocusCount} action${pendingFocusCount !== 1 ? "s" : ""} to execute · ${goalsDone}/${goals.length} goals done · ${draftCount} draft in progress`
                  : `All focus items done · ${goalsDone}/${goals.length} goals done · looking good!`}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end shrink-0">
              {([
                { label: "SEO Score",    value: String(weeklyReport.seoScore.value),       sub: `+${weeklyReport.seoScore.change} pts`,       color: "text-emerald-400" },
                { label: "AI Visibility",value: `${weeklyReport.aiVisibility.value}%`,     sub: `+${weeklyReport.aiVisibility.change}%`,       color: "text-blue-400"   },
                { label: "Traffic",      value: `${(weeklyReport.organicTraffic.value / 1000).toFixed(1)}k`, sub: `+${weeklyReport.organicTraffic.change}% wk`, color: "text-purple-400" },
                { label: "Actions",      value: String(pendingFocusCount),                 sub: "pending today",                               color: pendingFocusCount > 0 ? "text-amber-400" : "text-emerald-400" },
              ] as const).map((s) => (
                <div key={s.label} className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] min-w-[76px] text-center">
                  <span className={cn("text-xl font-black tabular-nums", s.color)}>{s.value}</span>
                  <span className="text-[9px] font-bold text-[#2a3f55] uppercase tracking-wider mt-0.5">{s.label}</span>
                  <span className="text-[9px] text-[#1a2d42] mt-0.5">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Today's Focus ───────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2d42]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="h-3.5 w-3.5 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#f0f4f8]">Today's Focus</p>
                <p className="text-[10px] text-[#415a72]">High-priority actions · execute at least one today</p>
              </div>
            </div>
            {focusDone.size === FOCUS_ITEMS.length ? (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> All done!
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-[#2a3f55]">
                {focusDone.size}/{FOCUS_ITEMS.length} done
              </span>
            )}
          </div>

          <div className="divide-y divide-[#1a2d42]/50">
            {FOCUS_ITEMS.map((item, idx) => {
              const isDone = focusDone.has(item.id);
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-start gap-4 px-5 py-4 transition-all duration-200",
                    isDone ? "opacity-40" : "hover:bg-[#0f1929]",
                  )}
                >
                  <div className="shrink-0 w-7 flex items-center justify-center mt-0.5">
                    {isDone
                      ? <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      : <span className="text-[15px] font-black text-[#1a2d42] tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-bold leading-snug mb-2",
                      isDone ? "text-[#415a72] line-through" : "text-[#f0f4f8]",
                    )}>
                      {item.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-red-500/10 border-red-500/20 text-red-400 uppercase tracking-wide">
                        High priority
                      </span>
                      <span className="text-[10px] text-[#415a72]">{item.category}</span>
                      <span className="text-[#1a2d42] text-[10px]">·</span>
                      <span className="text-[10px] text-[#415a72]">Effort: {item.effort}</span>
                      {item.estGain && (
                        <span className="text-[10px] font-bold text-emerald-500 ml-auto">{item.estGain}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => !isDone && markFocusDone(item.id, item.title)}
                    disabled={isDone}
                    className={cn(
                      "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                      isDone
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 cursor-default"
                        : "text-white bg-emerald-500 hover:bg-emerald-400 active:scale-95 border border-transparent",
                    )}
                  >
                    {isDone
                      ? <><CheckCircle2 className="h-3 w-3" /> Done</>
                      : <><Zap className="h-3 w-3" /> Execute</>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Weekly Goals + Keyword Opportunities ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Weekly Goals */}
          <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2d42]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Target className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#f0f4f8]">Weekly Goals</p>
                  <p className="text-[10px] text-[#415a72]">May 12–18, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-emerald-400 tabular-nums">{goalsPct}%</span>
                <span className="text-[10px] text-[#415a72]">{goalsDone}/{goals.length}</span>
              </div>
            </div>

            <div className="px-5 pt-4 pb-3">
              <div className="h-1.5 rounded-full bg-[#1a2d42] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700"
                  style={{ width: `${goalsPct}%`, boxShadow: goalsPct > 0 ? "0 0 8px rgba(16,185,129,0.3)" : undefined }}
                />
              </div>
            </div>

            <div className="px-5 pb-4 flex-1 space-y-0.5">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-start gap-2.5 py-1.5">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    style={{ width: "16px", height: "16px", minWidth: "16px", marginTop: "2px" }}
                    className={cn(
                      "rounded-full border-2 flex items-center justify-center transition-all duration-200",
                      goal.done
                        ? "border-emerald-500 bg-emerald-500/20"
                        : "border-[#243d56] hover:border-emerald-500/50",
                    )}
                  >
                    {goal.done && <Check className="h-2 w-2 text-emerald-400" />}
                  </button>
                  <span className={cn(
                    "text-xs leading-relaxed transition-all",
                    goal.done ? "text-[#415a72] line-through" : "text-[#8ca4be]",
                  )}>
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/workflow"
              className="flex items-center justify-between px-5 py-3 border-t border-[#1a2d42] text-[11px] font-semibold text-[#415a72] hover:text-emerald-400 hover:bg-[#0f1929] transition-all"
            >
              Open Workflow
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Keyword Opportunities */}
          <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1a2d42]">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Search className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#f0f4f8]">Keyword Opportunities</p>
                <p className="text-[10px] text-[#415a72]">Low KD · positions within reach</p>
              </div>
            </div>

            <div className="divide-y divide-[#1a2d42]/50 flex-1">
              {KW_OPPORTUNITIES.map((kw) => (
                <div key={kw.keyword} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#0f1929] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#8ca4be] truncate mb-1.5">{kw.keyword}</p>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded border tabular-nums",
                        kw.position <= 10
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : kw.position <= 20
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20",
                      )}>
                        #{kw.position}
                      </span>
                      <KdBar value={kw.difficulty} />
                      <span className="text-[10px] text-[#2a3f55] tabular-nums">{formatNumber(kw.volume)}/mo</span>
                    </div>
                  </div>
                  {kw.change > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 shrink-0">+{kw.change} ↑</span>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/keywords"
              className="flex items-center justify-between px-5 py-3 border-t border-[#1a2d42] text-[11px] font-semibold text-[#415a72] hover:text-purple-400 hover:bg-[#0f1929] transition-all"
            >
              View all keywords
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Content Pipeline + Quick Notes ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Content Pipeline */}
          <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1a2d42]">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                <PenLine className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#f0f4f8]">Content Pipeline</p>
                <p className="text-[10px] text-[#415a72]">Drafts to finish · ideas to plan</p>
              </div>
            </div>

            <div className="divide-y divide-[#1a2d42]/50 flex-1">
              {CONTENT_PIPELINE.map((item) => (
                <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#0f1929] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#8ca4be] leading-snug mb-2 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide",
                        item.status === "drafting"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20",
                      )}>
                        {item.status}
                      </span>
                      <span className="text-[10px] text-[#2a3f55]">{item.type}</span>
                      <span className="text-[10px] text-[#2a3f55] truncate">↗ {item.keyword}</span>
                    </div>
                  </div>
                  <Link
                    href="/content"
                    className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-[#415a72] hover:text-blue-400 transition-colors mt-0.5 whitespace-nowrap"
                  >
                    {item.status === "drafting" ? "Continue" : "Plan"}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>

            <Link
              href="/content"
              className="flex items-center justify-between px-5 py-3 border-t border-[#1a2d42] text-[11px] font-semibold text-[#415a72] hover:text-blue-400 hover:bg-[#0f1929] transition-all"
            >
              Open Content Ideas
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick Notes */}
          <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1a2d42]">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                <StickyNote className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#f0f4f8]">Quick Notes</p>
                <p className="text-[10px] text-[#415a72]">Reminders · follow-ups · ideas</p>
              </div>
            </div>

            <div className="px-5 py-3 flex-1 space-y-0.5">
              {quickNotes.slice(0, 4).map((note) => (
                <div key={note.id} className="group flex items-start gap-2.5 py-2 border-b border-[#1a2d42]/50 last:border-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span className="flex-1 text-xs text-[#8ca4be] leading-relaxed">{note.text}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] text-[#2a3f55]">{note.createdAt}</span>
                    <button
                      onClick={() => removeQuickNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[#2a3f55] hover:text-red-400 transition-all"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
              {quickNotes.length === 0 && (
                <p className="py-6 text-center text-xs text-[#2a3f55]">No notes yet.</p>
              )}
            </div>

            <div className="px-5 py-3 border-t border-[#1a2d42]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") addQuickNote(); }}
                  placeholder="Add a note or reminder..."
                  className="flex-1 text-xs bg-transparent text-[#f0f4f8] placeholder:text-[#2a3f55] outline-none py-1"
                />
                <button
                  onClick={addQuickNote}
                  disabled={!newNote.trim()}
                  className="p-1 rounded text-[#2a3f55] hover:text-amber-400 disabled:opacity-30 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <Link
              href="/notes"
              className="flex items-center justify-between px-5 py-3 border-t border-[#1a2d42] text-[11px] font-semibold text-[#415a72] hover:text-amber-400 hover:bg-[#0f1929] transition-all"
            >
              Open Notes
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Quick Actions ────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322] overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#1a2d42]">
            <Zap className="h-3.5 w-3.5 text-[#415a72]" />
            <p className="text-xs font-bold text-[#415a72] uppercase tracking-widest">Quick Actions</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-[#1a2d42]">
            {([
              { label: "Add Keyword",      desc: "Track a new term",       icon: Search,    color: "text-emerald-400", hover: "hover:bg-emerald-500/5 hover:text-emerald-400", href: "/keywords"        },
              { label: "New Content",      desc: "Add an idea",            icon: PenLine,   color: "text-blue-400",    hover: "hover:bg-blue-500/5 hover:text-blue-400",       href: "/content"         },
              { label: "Recommendations",  desc: "8 actions pending",      icon: Lightbulb, color: "text-amber-400",   hover: "hover:bg-amber-500/5 hover:text-amber-400",     href: "/recommendations" },
              { label: "Workflow",         desc: "3 tasks in progress",    icon: Workflow,  color: "text-purple-400",  hover: "hover:bg-purple-500/5 hover:text-purple-400",   href: "/workflow"        },
              { label: "Reports",          desc: "Weekly summary",         icon: FileText,  color: "text-cyan-400",    hover: "hover:bg-cyan-500/5 hover:text-cyan-400",       href: "/reports"         },
              { label: "Notes",            desc: "Open your notes",        icon: StickyNote,color: "text-[#8ca4be]",  hover: "hover:bg-[#0f1929] hover:text-[#f0f4f8]",      href: "/notes"           },
            ] as const).map(({ label, desc, icon: Icon, color, hover, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "group flex flex-col items-center gap-2.5 px-4 py-5 text-center transition-all duration-150",
                  hover,
                )}
              >
                <Icon className={cn("h-5 w-5 transition-colors", color)} />
                <div>
                  <p className="text-[11px] font-bold text-[#8ca4be] group-hover:text-inherit transition-colors">{label}</p>
                  <p className="text-[9px] text-[#2a3f55] mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </DashboardShell>
    </>
  );
}
