"use client";

import { useState } from "react";
import {
  X, Plus, Edit3, Archive, Save, ChevronDown,
  Layers, Clock, CheckCircle2,
} from "lucide-react";
import { useModal } from "@/components/providers/modal-context";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type ProjectStatus = "active" | "archived";

type Project = {
  id: string;
  abbr: string;
  name: string;
  domain: string;
  industry: string;
  targetMarket: string;
  plan: string;
  keywords: number;
  keywordLimit: number;
  status: ProjectStatus;
  lastSynced: string;
  gradient: string;
  border: string;
  text: string;
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1", abbr: "AC", name: "Acme Corp", domain: "acme-corp.com",
    industry: "SaaS / Software", targetMarket: "B2B, Mid-market",
    plan: "Pro Plan", keywords: 847, keywordLimit: 1000,
    status: "active", lastSynced: "12 min ago",
    gradient: "from-blue-500/30 to-blue-600/20", border: "border-blue-500/30", text: "text-blue-400",
  },
  {
    id: "2", abbr: "MY", name: "MyShop", domain: "myshop.io",
    industry: "E-commerce", targetMarket: "B2C, Consumer",
    plan: "Starter", keywords: 234, keywordLimit: 250,
    status: "active", lastSynced: "2 hours ago",
    gradient: "from-purple-500/30 to-purple-600/20", border: "border-purple-500/30", text: "text-purple-400",
  },
];

const INDUSTRIES = [
  "SaaS / Software", "E-commerce", "Agency / Marketing",
  "Media / Publishing", "Finance", "Healthcare", "Other",
];

type EditDraft = { name: string; industry: string; targetMarket: string };

// ── ProjectRow ────────────────────────────────────────────────────────────────

function ProjectRow({
  project, isEditing, editDraft, archiveConfirm,
  onEdit, onCancelEdit, onSaveEdit, onDraftChange,
  onArchiveRequest, onArchiveConfirm, onArchiveCancel,
}: {
  project: Project;
  isEditing: boolean;
  editDraft: EditDraft;
  archiveConfirm: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onDraftChange: (d: Partial<EditDraft>) => void;
  onArchiveRequest: () => void;
  onArchiveConfirm: () => void;
  onArchiveCancel: () => void;
}) {
  const pct = Math.round((project.keywords / project.keywordLimit) * 100);

  return (
    <div className={cn(
      "rounded-2xl border bg-[#0f1929] overflow-hidden transition-all duration-200",
      isEditing ? "border-emerald-500/30" : "border-[#1a2d42]",
    )}>
      {/* Header row */}
      <div className="flex items-center gap-3.5 px-5 py-4">
        <div className={cn(
          "h-10 w-10 rounded-xl bg-gradient-to-br border shrink-0 flex items-center justify-center",
          project.gradient, project.border,
        )}>
          <span className={cn("text-xs font-bold", project.text)}>{project.abbr}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-bold text-[#f0f4f8]">{project.name}</p>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 leading-none shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Active
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-[#415a72]">
            <span>{project.domain}</span>
            <span className="text-[#2a3f55]">·</span>
            <span>{project.plan}</span>
            <span className="text-[#2a3f55]">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              Synced {project.lastSynced}
            </span>
          </div>
        </div>

        <button
          onClick={isEditing ? onCancelEdit : onEdit}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all border shrink-0",
            isEditing
              ? "text-[#415a72] border-[#1a2d42] hover:text-[#8ca4be] hover:border-[#243d56]"
              : "text-[#415a72] border-transparent hover:text-[#8ca4be] hover:bg-[#1a2d42]/50 hover:border-[#1a2d42]",
          )}
        >
          {isEditing
            ? (<><X className="h-3 w-3" /> Cancel</>)
            : (<><Edit3 className="h-3 w-3" /> Edit</>)}
        </button>
      </div>

      {/* Keyword usage bar */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#2a3f55]">Keywords tracked</span>
          <span className="text-[10px] font-semibold text-[#415a72]">
            {project.keywords.toLocaleString()} / {project.keywordLimit.toLocaleString()}
          </span>
        </div>
        <div className="h-1 rounded-full bg-[#1a2d42] overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-700", pct > 88 ? "bg-amber-400" : "bg-emerald-500")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Inline edit panel */}
      {isEditing && (
        <div className="px-5 pb-5 pt-4 border-t border-[#1a2d42] space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] mb-1.5">
                Project name
              </label>
              <input
                type="text"
                value={editDraft.name}
                onChange={(e) => onDraftChange({ name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-xs text-[#f0f4f8] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] mb-1.5">
                Target market
              </label>
              <input
                type="text"
                value={editDraft.targetMarket}
                onChange={(e) => onDraftChange({ targetMarket: e.target.value })}
                placeholder="e.g. B2B, Mid-market"
                className="w-full px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] mb-1.5">
              Industry
            </label>
            <div className="relative">
              <select
                value={editDraft.industry}
                onChange={(e) => onDraftChange({ industry: e.target.value })}
                className="w-full appearance-none px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-xs text-[#8ca4be] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#415a72] pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onSaveEdit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors"
            >
              <Save className="h-3 w-3" />
              Save changes
            </button>

            {!archiveConfirm ? (
              <button
                onClick={onArchiveRequest}
                className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#415a72] hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/5 transition-all"
              >
                <Archive className="h-3 w-3" />
                Archive project
              </button>
            ) : (
              <div className="ml-auto flex items-center gap-2.5">
                <span className="text-[10px] text-amber-400 font-medium">Archive this project?</span>
                <button
                  onClick={onArchiveConfirm}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/25 text-[10px] font-bold text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={onArchiveCancel}
                  className="text-[10px] text-[#415a72] hover:text-[#8ca4be] font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ManageProjectsModal ────────────────────────────────────────────────────────

export function ManageProjectsModal() {
  const { isManageProjectsOpen, closeManageProjects, openAddProject } = useModal();
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<EditDraft>({ name: "", industry: "", targetMarket: "" });
  const [archiveConfirmId, setArchiveConfirmId] = useState<string | null>(null);

  if (!isManageProjectsOpen) return null;

  const active = projects.filter((p) => p.status === "active");
  const archived = projects.filter((p) => p.status === "archived");

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditDraft({ name: p.name, industry: p.industry, targetMarket: p.targetMarket });
    setArchiveConfirmId(null);
  };

  const cancelEdit = () => { setEditingId(null); setArchiveConfirmId(null); };

  const saveEdit = (id: string) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, ...editDraft } : p));
    setEditingId(null);
    toast("Project settings saved.");
  };

  const archiveProject = (id: string) => {
    const p = projects.find((x) => x.id === id);
    setProjects((prev) => prev.map((x) => x.id === id ? { ...x, status: "archived" } : x));
    setEditingId(null);
    setArchiveConfirmId(null);
    toast(`"${p?.name}" has been archived.`, "info");
  };

  const restoreProject = (id: string) => {
    const p = projects.find((x) => x.id === id);
    setProjects((prev) => prev.map((x) => x.id === id ? { ...x, status: "active" } : x));
    toast(`"${p?.name}" restored to active.`);
  };

  const handleAddProject = () => {
    closeManageProjects();
    openAddProject();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={closeManageProjects} />

      <div className="relative w-full max-w-2xl rounded-3xl border border-[#1a2d42] bg-[#0c1322] shadow-[0_32px_80px_rgba(0,0,0,0.85)] overflow-hidden animate-fade-up max-h-[88vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a2d42] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1a2d42] bg-[#070c18]">
              <Layers className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <span className="text-sm font-bold text-[#f0f4f8]">Projects</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#1a2d42] text-[#415a72]">
              {active.length} active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddProject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add project
            </button>
            <button
              onClick={closeManageProjects}
              className="p-1.5 rounded-lg text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0f1929] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Project list */}
        <div className="overflow-y-auto flex-1 p-6 space-y-3">
          {active.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-[#415a72] mb-4">No active projects</p>
              <button
                onClick={handleAddProject}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors mx-auto"
              >
                <Plus className="h-3.5 w-3.5" />
                Add your first project
              </button>
            </div>
          )}

          {active.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              isEditing={editingId === project.id}
              editDraft={editDraft}
              archiveConfirm={archiveConfirmId === project.id}
              onEdit={() => startEdit(project)}
              onCancelEdit={cancelEdit}
              onSaveEdit={() => saveEdit(project.id)}
              onDraftChange={(d) => setEditDraft((prev) => ({ ...prev, ...d }))}
              onArchiveRequest={() => setArchiveConfirmId(project.id)}
              onArchiveConfirm={() => archiveProject(project.id)}
              onArchiveCancel={() => setArchiveConfirmId(null)}
            />
          ))}

          {archived.length > 0 && (
            <div className="pt-2 border-t border-[#1a2d42]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2a3f55] mb-3 pt-2">
                Archived ({archived.length})
              </p>
              <div className="space-y-2">
                {archived.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1a2d42] bg-[#070c18] opacity-55"
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-lg bg-gradient-to-br border shrink-0 flex items-center justify-center",
                      p.gradient, p.border,
                    )}>
                      <span className={cn("text-[10px] font-bold", p.text)}>{p.abbr}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#415a72]">{p.name}</p>
                      <p className="text-[10px] text-[#2a3f55]">{p.domain}</p>
                    </div>
                    <button
                      onClick={() => restoreProject(p.id)}
                      className="text-[10px] font-semibold text-[#415a72] hover:text-emerald-400 transition-colors shrink-0"
                    >
                      Restore
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
