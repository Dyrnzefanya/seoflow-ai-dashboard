"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  Plus, X, ChevronDown, ArrowRight, Trash2,
  FileText, BookOpen, HelpCircle, BarChart2, ShoppingBag, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ContentType = "Blog post" | "Landing page" | "FAQ" | "Comparison" | "Product page" | "Tutorial";
type ContentStatus = "idea" | "planned" | "drafting" | "published";
type Priority = "high" | "medium" | "low";

type ContentIdea = {
  id: string;
  title: string;
  keyword: string;
  type: ContentType;
  status: ContentStatus;
  priority: Priority;
  notes: string;
};

const STATUS_CONFIG: Record<ContentStatus, {
  label: string;
  variant: "default" | "info" | "warning" | "success";
  next: ContentStatus | null;
  nextLabel: string;
}> = {
  idea:      { label: "Idea",      variant: "default", next: "planned",   nextLabel: "Plan it" },
  planned:   { label: "Planned",   variant: "info",    next: "drafting",  nextLabel: "Start draft" },
  drafting:  { label: "Drafting",  variant: "warning", next: "published", nextLabel: "Mark published" },
  published: { label: "Published", variant: "success", next: null,        nextLabel: "" },
};

const TYPE_CONFIG: Record<ContentType, { icon: typeof FileText; color: string }> = {
  "Blog post":    { icon: FileText,     color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  "Landing page": { icon: BookOpen,     color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  "FAQ":          { icon: HelpCircle,   color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  "Comparison":   { icon: BarChart2,    color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  "Product page": { icon: ShoppingBag,  color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  "Tutorial":     { icon: GraduationCap,color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
};

const PRIORITY_VARIANT: Record<Priority, "danger" | "warning" | "info"> = {
  high:   "danger",
  medium: "warning",
  low:    "info",
};

const INITIAL_IDEAS: ContentIdea[] = [
  {
    id: "1", title: "Complete Guide to Generative Engine Optimization", keyword: "generative engine optimization",
    type: "Blog post", status: "published", priority: "high", notes: "",
  },
  {
    id: "2", title: "AI Visibility Tracker: Features & How It Works", keyword: "ai visibility tracker",
    type: "Landing page", status: "published", priority: "high", notes: "",
  },
  {
    id: "3", title: "GEO vs SEO: What's the Difference in 2026?", keyword: "geo vs seo",
    type: "Blog post", status: "drafting", priority: "high", notes: "Add comparison table. Include 2026 stats.",
  },
  {
    id: "4", title: "FAQ: How to Optimize for ChatGPT Answers", keyword: "chatgpt seo optimization",
    type: "FAQ", status: "planned", priority: "medium", notes: "",
  },
  {
    id: "5", title: "Best AI SEO Tools Comparison 2026", keyword: "ai seo tools comparison",
    type: "Comparison", status: "planned", priority: "medium", notes: "Compare: SEOFlow, Ahrefs, Semrush, Moz",
  },
  {
    id: "6", title: "How to Rank on Perplexity AI (Step-by-Step)", keyword: "perplexity ai seo",
    type: "Tutorial", status: "idea", priority: "medium", notes: "",
  },
  {
    id: "7", title: "LLM SEO Strategy: A Practical Guide", keyword: "llm seo strategy",
    type: "Blog post", status: "idea", priority: "low", notes: "",
  },
];

const CONTENT_TYPES: ContentType[] = ["Blog post", "Landing page", "FAQ", "Comparison", "Product page", "Tutorial"];
const STATUSES: ContentStatus[] = ["idea", "planned", "drafting", "published"];
const PRIORITIES: Priority[] = ["high", "medium", "low"];

const STATUS_FILTER_TABS: { id: "all" | ContentStatus; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "idea",      label: "Ideas" },
  { id: "planned",   label: "Planned" },
  { id: "drafting",  label: "Drafting" },
  { id: "published", label: "Published" },
];

export default function ContentPage() {
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<ContentIdea[]>(INITIAL_IDEAS);
  const [filter, setFilter] = useState<"all" | ContentStatus>("all");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [draft, setDraft] = useState({
    title: "",
    keyword: "",
    type: "Blog post" as ContentType,
    status: "idea" as ContentStatus,
    priority: "medium" as Priority,
    notes: "",
  });

  const addIdea = () => {
    if (!draft.title.trim()) return;
    const newIdea: ContentIdea = {
      id: Date.now().toString(),
      title: draft.title.trim(),
      keyword: draft.keyword.trim(),
      type: draft.type,
      status: draft.status,
      priority: draft.priority,
      notes: draft.notes.trim(),
    };
    setIdeas((prev) => [newIdea, ...prev]);
    toast(`"${draft.title.trim().slice(0, 40)}…" added to content ideas.`);
    setDraft({ title: "", keyword: "", type: "Blog post", status: "idea", priority: "medium", notes: "" });
    setShowForm(false);
  };

  const advanceStatus = (id: string) => {
    setIdeas((prev) => prev.map((idea) => {
      if (idea.id !== id) return idea;
      const next = STATUS_CONFIG[idea.status].next;
      if (!next) return idea;
      toast(`"${idea.title.slice(0, 40)}…" moved to ${STATUS_CONFIG[next].label}.`);
      return { ...idea, status: next };
    }));
  };

  const removeIdea = (id: string, title: string) => {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
    toast(`"${title.slice(0, 40)}…" removed.`, "info");
  };

  const updateNotes = (id: string, notes: string) => {
    setIdeas((prev) => prev.map((i) => i.id === id ? { ...i, notes } : i));
  };

  const filtered = filter === "all" ? ideas : ideas.filter((i) => i.status === filter);

  const counts = {
    idea:      ideas.filter((i) => i.status === "idea").length,
    planned:   ideas.filter((i) => i.status === "planned").length,
    drafting:  ideas.filter((i) => i.status === "drafting").length,
    published: ideas.filter((i) => i.status === "published").length,
  };

  return (
    <>
      <Topbar
        title="Content Ideas"
        subtitle={`${ideas.length} ideas · ${counts.drafting} in draft · ${counts.published} published`}
      />
      <DashboardShell>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            { label: "Total Ideas", value: ideas.length, color: "text-[#f0f4f8]" },
            { label: "In Progress", value: counts.drafting, color: "text-amber-400" },
            { label: "Planned",     value: counts.planned,  color: "text-blue-400" },
            { label: "Published",   value: counts.published, color: "text-emerald-400" },
          ]).map((s) => (
            <div key={s.label} className="flex flex-col gap-1 px-4 py-3.5 rounded-2xl border border-[#1a2d42] bg-[#0f1929]">
              <p className={cn("text-2xl font-black tabular-nums", s.color)}>{s.value}</p>
              <p className="text-[11px] text-[#415a72] font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* List card */}
        <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322]">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2d42]">
            <p className="text-sm font-bold text-[#f0f4f8]">All Content Ideas</p>
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
              {showForm ? "Cancel" : "Add idea"}
            </button>
          </div>

          {/* Add idea form */}
          {showForm && (
            <div className="px-5 py-4 border-b border-[#1a2d42] bg-[#070c18] space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">New content idea</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Title *</label>
                  <input
                    type="text"
                    autoFocus
                    value={draft.title}
                    onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                    placeholder="e.g. How to Rank on Perplexity AI (Step-by-Step)"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Target keyword</label>
                  <input
                    type="text"
                    value={draft.keyword}
                    onChange={(e) => setDraft((d) => ({ ...d, keyword: e.target.value }))}
                    placeholder="e.g. perplexity ai seo"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Content type</label>
                  <div className="relative">
                    <select
                      value={draft.type}
                      onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as ContentType }))}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#8ca4be] focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                    >
                      {CONTENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#415a72] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Status</label>
                  <div className="relative">
                    <select
                      value={draft.status}
                      onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as ContentStatus }))}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#8ca4be] focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
                    >
                      {STATUSES.map((s) => <option key={s} className="capitalize">{s}</option>)}
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
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold text-[#2a3f55] mb-1.5 uppercase tracking-wide">Notes (optional)</label>
                  <input
                    type="text"
                    value={draft.notes}
                    onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
                    placeholder="Angle, outline ideas, competitor gap..."
                    className="w-full px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#0c1322] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={addIdea}
                  disabled={!draft.title.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors disabled:opacity-40"
                >
                  <Plus className="h-3 w-3" />
                  Add idea
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

          {/* Status filter tabs */}
          <div className="flex items-center gap-1 px-5 pt-4 pb-3 overflow-x-auto">
            {STATUS_FILTER_TABS.map((tab) => {
              const count = tab.id === "all" ? ideas.length : counts[tab.id];
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

          {/* Ideas list */}
          <div className="px-5 pb-5 space-y-2.5">
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm text-[#415a72] mb-1">No ideas in this status yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  + Add your first idea
                </button>
              </div>
            )}

            {filtered.map((idea) => {
              const TypeIcon = TYPE_CONFIG[idea.type].icon;
              const isExpanded = expandedId === idea.id;
              const statusCfg = STATUS_CONFIG[idea.status];

              return (
                <div
                  key={idea.id}
                  className={cn(
                    "rounded-2xl border bg-[#0f1929] overflow-hidden transition-all duration-150",
                    isExpanded ? "border-[#243d56]" : "border-[#1a2d42] hover:border-[#243d56]",
                  )}
                >
                  <div
                    className="flex items-start gap-3.5 px-4 py-3.5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : idea.id)}
                  >
                    {/* Type icon */}
                    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border mt-0.5", TYPE_CONFIG[idea.type].color)}>
                      <TypeIcon className="h-3.5 w-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#f0f4f8] leading-snug mb-2">{idea.title}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                        <Badge variant={PRIORITY_VARIANT[idea.priority]}>{idea.priority}</Badge>
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md border", TYPE_CONFIG[idea.type].color)}>
                          {idea.type}
                        </span>
                        {idea.keyword && (
                          <span className="text-[10px] text-[#415a72] truncate max-w-[140px]">
                            ↗ {idea.keyword}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {statusCfg.next && (
                        <button
                          onClick={(e) => { e.stopPropagation(); advanceStatus(idea.id); }}
                          className="flex items-center gap-1 text-[10px] font-semibold text-[#415a72] hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20"
                        >
                          <ArrowRight className="h-3 w-3" />
                          {statusCfg.nextLabel}
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); removeIdea(idea.id, idea.title); }}
                        className="p-1.5 rounded-lg text-[#2a3f55] hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded notes editor */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-[#1a2d42]">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] mb-2">
                        Notes &amp; outline
                      </label>
                      <textarea
                        value={idea.notes}
                        onChange={(e) => updateNotes(idea.id, e.target.value)}
                        placeholder="Add your angle, content outline, competitor gaps, or key points to cover..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-xs text-[#8ca4be] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/40 transition-all resize-none leading-relaxed"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </DashboardShell>
    </>
  );
}
