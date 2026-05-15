"use client";

import { useState, useCallback } from "react";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useToast } from "@/components/ui/toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { StickyNote, Users, PenLine, Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionMeta = {
  id: string;
  title: string;
  description: string;
  icon: typeof StickyNote;
  iconColor: string;
  iconBg: string;
};

const SECTION_META: SectionMeta[] = [
  {
    id: "strategy",
    title: "Strategy Notes",
    description: "Overall SEO strategy, objectives, and decisions",
    icon: StickyNote,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "competitors",
    title: "Competitor Notes",
    description: "Competitor observations, gaps, and positioning analysis",
    icon: Users,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "content",
    title: "Content Notes",
    description: "Content pipeline, ideas backlog, and editorial notes",
    icon: PenLine,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
  },
];

const DEFAULT_CONTENTS: Record<string, string> = {
  strategy: `Q2 2026 SEO Strategy

Focus areas:
- Build out the GEO/AEO content cluster (6 articles planned)
- Improve Core Web Vitals — LCP target: <2.5s on mobile
- Get into ChatGPT top citations for "AI SEO tools" category
- Target 5 new keywords under KD 45 with existing domain authority

Key objective: Reach 40k organic sessions/month by end of Q2.

Quick wins this week:
- Fix meta descriptions on 14 pages (est. +10% CTR)
- Add FAQ schema to service pages (est. 3× AI citation rate)`,

  competitors: `Competitor Analysis

Ahrefs
- Strong brand authority, slow to adapt to AI visibility space
- Weak on GEO/AEO content — opportunity to outrank on those terms
- Price point: $99+/mo (we can position as more accessible)

Semrush
- Launching AI features but UX is cluttered and overwhelming
- Better keyword data, but poor AI citation tracking
- Customers complain about data overload

Moz
- Declining relevance, DA score losing credibility
- Good for backlink analysis but no AI visibility features
- Significant opportunity to capture "SEO tool" branded searches

Our positioning edge:
→ Only platform monitoring AI citation rates across 5 platforms
→ Claude AI-powered recommendations (not generic rule-based)
→ GEO + AEO as first-class features, not afterthoughts`,

  content: `Content Pipeline Notes

Q2 Priorities:
1. Perplexity SEO cluster (3 articles) — high velocity topic, low competition
2. GEO pillar page refresh — needs 2026 data and new case studies
3. ChatGPT vs Google SEO comparison — targeting "chatgpt vs google seo"
4. FAQ: AI search optimization — structured for AI citation pickup

Repurposing plan:
- Convert top 3 blog posts → FAQ format for better AI citations
- Turn GEO guide → LinkedIn carousel series (5 posts)
- Create "quick win" checklist from recommendations page content

Publishing cadence: 2 posts/week target
Current draft queue: GEO vs SEO, Perplexity tutorial, Comparison post

Content gaps spotted (competitor analysis):
- "what is generative engine optimization" — low KD, high volume
- "perplexity ai for business" — no strong content yet
- "AI search ranking factors" — emerging topic, get in early`,
};

type QuickNote = {
  id: string;
  text: string;
  createdAt: string;
};

const INITIAL_QUICK_NOTES: QuickNote[] = [
  { id: "q1", text: "Check if FAQ schema went live on /services page", createdAt: "Today" },
  { id: "q2", text: "Ask for ChatGPT citation screenshot from client demo", createdAt: "Yesterday" },
  { id: "q3", text: "Review Perplexity AI article draft before publishing", createdAt: "May 12" },
];

function NoteTextarea({
  section,
  content,
  onBlur,
}: {
  section: SectionMeta;
  content: string;
  onBlur: (id: string, value: string) => void;
}) {
  const [value, setValue] = useState(content);
  const [saved, setSaved] = useState(true);

  const handleChange = (v: string) => {
    setValue(v);
    setSaved(false);
  };

  const handleBlur = () => {
    onBlur(section.id, value);
    setSaved(true);
  };

  const Icon = section.icon;

  return (
    <div className="rounded-2xl border border-[#1a2d42] bg-[#0f1929] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2d42]">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg border shrink-0", section.iconBg)}>
            <Icon className={cn("h-3.5 w-3.5", section.iconColor)} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#f0f4f8]">{section.title}</p>
            <p className="text-[10px] text-[#415a72]">{section.description}</p>
          </div>
        </div>
        <span className={cn(
          "text-[10px] font-medium transition-all duration-300",
          saved ? "text-[#2a3f55]" : "text-amber-400",
        )}>
          {saved ? "Saved" : "Editing…"}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        rows={10}
        placeholder={`Write your ${section.title.toLowerCase()}...`}
        className="w-full px-5 py-4 bg-transparent text-xs text-[#8ca4be] placeholder:text-[#2a3f55] leading-relaxed outline-none resize-none font-mono"
      />
    </div>
  );
}

export default function NotesPage() {
  const { toast } = useToast();
  const [noteContents, setNoteContents, loaded] = useLocalStorage<Record<string, string>>(
    "seoflow_notes_content_v1",
    DEFAULT_CONTENTS,
  );
  const [quickNotes, setQuickNotes] = useLocalStorage<QuickNote[]>(
    "seoflow_quick_notes_v1",
    INITIAL_QUICK_NOTES,
  );
  const [newNote, setNewNote] = useState("");

  const saveSection = useCallback((id: string, content: string) => {
    setNoteContents((prev) => ({ ...prev, [id]: content }));
    toast("Notes saved.", "info");
  }, [setNoteContents, toast]);

  const addQuickNote = () => {
    if (!newNote.trim()) return;
    setQuickNotes((prev) => [
      { id: Date.now().toString(), text: newNote.trim(), createdAt: "Just now" },
      ...prev,
    ]);
    setNewNote("");
  };

  const removeQuickNote = (id: string) => {
    setQuickNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const totalWords = Object.values(noteContents).join(" ").split(/\s+/).filter(Boolean).length;

  return (
    <>
      <Topbar
        title="Notes"
        subtitle={`acme-corp.com · ${totalWords.toLocaleString()} words across all sections`}
      />
      <DashboardShell>

        {/* Quick notes */}
        <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322]">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1a2d42]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Check className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#f0f4f8]">Quick Notes</p>
              <p className="text-[10px] text-[#415a72]">Short reminders, observations, and to-check items</p>
            </div>
          </div>

          <div className="px-5 py-4 space-y-1.5">
            {quickNotes.map((note) => (
              <div key={note.id} className="group flex items-start gap-3 py-2.5 border-b border-[#1a2d42]/60 last:border-0">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="flex-1 text-xs text-[#8ca4be] leading-relaxed">{note.text}</span>
                <span className="text-[10px] text-[#2a3f55] shrink-0">{note.createdAt}</span>
                <button
                  onClick={() => removeQuickNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-[#2a3f55] hover:text-red-400 transition-all shrink-0"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {quickNotes.length === 0 && (
              <p className="py-4 text-center text-xs text-[#2a3f55]">No quick notes yet.</p>
            )}

            {/* Add quick note */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addQuickNote(); }}
                placeholder="Add a quick note or reminder..."
                className="flex-1 text-xs bg-transparent text-[#f0f4f8] placeholder:text-[#2a3f55] outline-none py-2 border-b border-[#1a2d42] focus:border-amber-500/40 transition-colors"
              />
              <button
                onClick={addQuickNote}
                disabled={!newNote.trim()}
                className="p-1.5 rounded-lg text-[#2a3f55] hover:text-amber-400 hover:bg-amber-500/10 disabled:opacity-30 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section notes */}
        <div className="space-y-4">
          {SECTION_META.map((section) => (
            <NoteTextarea
              key={`${section.id}-${loaded}`}
              section={section}
              content={noteContents[section.id] ?? DEFAULT_CONTENTS[section.id] ?? ""}
              onBlur={saveSection}
            />
          ))}
        </div>

      </DashboardShell>
    </>
  );
}
