"use client";

import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols3 } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { workflowTasks } from "@/lib/placeholder-data";
import { useToast } from "@/components/ui/toast";
import {
  CheckCircle2, Circle, Clock, Plus, MoreHorizontal, ArrowRight,
  Target, X, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "todo" | "in-progress" | "done";

const priorityVariant = {
  high:   "danger"  as const,
  medium: "warning" as const,
  low:    "info"    as const,
};

const columns: {
  key: Status;
  title: string;
  color: string;
  headerBg: string;
  icon: typeof Circle;
  iconColor: string;
  nextStatus: Status | null;
  nextLabel: string;
}[] = [
  {
    key: "todo",
    title: "To Do",
    color: "text-[#8ca4be]",
    headerBg: "bg-[#1a2d42]/30",
    icon: Circle,
    iconColor: "text-[#415a72]",
    nextStatus: "in-progress",
    nextLabel: "Start",
  },
  {
    key: "in-progress",
    title: "In Progress",
    color: "text-amber-400",
    headerBg: "bg-amber-500/5",
    icon: Clock,
    iconColor: "text-amber-400",
    nextStatus: "done",
    nextLabel: "Complete",
  },
  {
    key: "done",
    title: "Completed",
    color: "text-emerald-400",
    headerBg: "bg-emerald-500/5",
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    nextStatus: null,
    nextLabel: "",
  },
];

type Task = {
  id: string;
  title: string;
  status: Status;
  priority: "high" | "medium" | "low";
  due: string;
  impact?: string;
};

type Goal = {
  id: string;
  text: string;
  done: boolean;
};

const INITIAL_GOALS: Goal[] = [
  { id: "g1", text: "Fix meta descriptions on 14 high-traffic pages", done: false },
  { id: "g2", text: "Publish the GEO optimization pillar page", done: false },
  { id: "g3", text: "Add FAQ schema to 5 core service pages", done: false },
  { id: "g4", text: "Review ChatGPT citation rate improvements", done: true },
  { id: "g5", text: "Research 3 new low-competition keyword clusters", done: false },
];

// ── Add-task inline form ────────────────────────────────────────────────────

function AddTaskForm({
  colKey,
  onAdd,
  onCancel,
}: {
  colKey: Status;
  onAdd: (title: string, priority: "high" | "medium" | "low") => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    if (!text.trim()) return;
    onAdd(text.trim(), priority);
    setText("");
  };

  return (
    <div className="rounded-xl border border-emerald-500/25 bg-[#070c18] p-3 space-y-2.5">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") onCancel();
        }}
        placeholder="Task name..."
        className="w-full text-xs bg-transparent text-[#f0f4f8] placeholder:text-[#2a3f55] outline-none"
      />
      <div className="flex items-center gap-1.5">
        {(["high", "medium", "low"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPriority(p)}
            className={cn(
              "text-[9px] font-bold px-2 py-0.5 rounded-full border capitalize transition-all",
              priority === p
                ? p === "high" ? "bg-red-500/20 border-red-500/30 text-red-400"
                  : p === "medium" ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                  : "bg-blue-500/20 border-blue-500/30 text-blue-400"
                : "border-[#1a2d42] text-[#2a3f55] hover:text-[#415a72]"
            )}
          >
            {p}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={onCancel}
            className="p-1 rounded text-[#2a3f55] hover:text-[#8ca4be] transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
          <button
            onClick={submit}
            disabled={!text.trim()}
            className="p-1 rounded text-[#2a3f55] hover:text-emerald-400 transition-colors disabled:opacity-30"
          >
            <Check className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function WorkflowPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useLocalStorage<Task[]>("seoflow_tasks_v1", workflowTasks as Task[]);
  const [addingInCol, setAddingInCol] = useState<Status | null>(null);
  const [goals, setGoals] = useLocalStorage<Goal[]>("seoflow_goals_v1", INITIAL_GOALS);
  const [newGoalText, setNewGoalText] = useState("");
  const goalInputRef = useRef<HTMLInputElement>(null);

  const moveTask = (id: string, toStatus: Status, taskTitle: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: toStatus } : t));
    if (toStatus === "in-progress") toast(`"${taskTitle.slice(0, 40)}…" moved to In Progress.`);
    else if (toStatus === "done") toast(`"${taskTitle.slice(0, 40)}…" marked complete!`);
  };

  const addTask = (colKey: Status, title: string, priority: "high" | "medium" | "low") => {
    const now = new Date();
    const due = `${now.toLocaleString("en", { month: "short" })} ${now.getDate() + 7}`;
    setTasks((prev) => [...prev, { id: Date.now().toString(), title, status: colKey, priority, due }]);
    toast(`Task added to ${colKey === "todo" ? "To Do" : "In Progress"}.`);
    setAddingInCol(null);
  };

  const toggleGoal = (id: string) => {
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, done: !g.done } : g));
  };

  const addGoal = () => {
    if (!newGoalText.trim()) return;
    setGoals((prev) => [...prev, { id: Date.now().toString(), text: newGoalText.trim(), done: false }]);
    setNewGoalText("");
  };

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const doneCount = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;
  const pct = Math.round((doneCount / total) * 100);
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length;

  const goalsDone = goals.filter((g) => g.done).length;
  const goalsPct = goals.length > 0 ? Math.round((goalsDone / goals.length) * 100) : 0;

  return (
    <>
      <Topbar
        title="Workflow"
        subtitle={`SEO task management · ${inProgressCount} task${inProgressCount !== 1 ? "s" : ""} in progress`}
      />
      <DashboardShell>

        {/* ── Weekly Goals ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[#1a2d42] bg-[#0c1322] overflow-hidden">
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
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-[#f0f4f8]">{goalsDone} / {goals.length}</p>
                <p className="text-[10px] text-[#415a72]">completed</p>
              </div>
              <div className="text-xl font-black text-emerald-400 tabular-nums w-10 text-right">
                {goalsPct}%
              </div>
            </div>
          </div>

          {/* Goals progress bar */}
          <div className="px-5 pt-4">
            <div className="h-1.5 rounded-full bg-[#1a2d42] overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${goalsPct}%`, boxShadow: goalsPct > 0 ? "0 0 8px rgba(16,185,129,0.3)" : undefined }}
              />
            </div>
          </div>

          {/* Goal items */}
          <div className="px-5 pb-2 space-y-1">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="group flex items-center gap-3 py-2.5 border-b border-[#1a2d42]/60 last:border-0"
              >
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={cn(
                    "shrink-0 h-4.5 w-4.5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                    goal.done
                      ? "border-emerald-500 bg-emerald-500/20"
                      : "border-[#243d56] hover:border-emerald-500/50",
                  )}
                  style={{ width: "18px", height: "18px" }}
                >
                  {goal.done && <Check className="h-2.5 w-2.5 text-emerald-400" />}
                </button>
                <span className={cn(
                  "flex-1 text-xs font-medium transition-all",
                  goal.done ? "text-[#415a72] line-through" : "text-[#8ca4be]",
                )}>
                  {goal.text}
                </span>
                <button
                  onClick={() => removeGoal(goal.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-[#2a3f55] hover:text-[#415a72] transition-all"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Add goal input */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mt-1">
              <input
                ref={goalInputRef}
                type="text"
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addGoal(); }}
                placeholder="Add a goal for this week..."
                className="flex-1 text-xs bg-transparent text-[#f0f4f8] placeholder:text-[#2a3f55] outline-none py-2 border-b border-[#1a2d42] focus:border-emerald-500/40 transition-colors"
              />
              <button
                onClick={addGoal}
                disabled={!newGoalText.trim()}
                className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 disabled:opacity-30 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* ── Sprint progress ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#1a2d42] bg-[#0c1322]">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#8ca4be]">Sprint Progress</p>
              <p className="text-xs font-bold text-[#f0f4f8]">{doneCount} / {total} tasks completed</p>
            </div>
            <div className="h-1.5 rounded-full bg-[#1a2d42] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${pct}%`, boxShadow: "0 0 10px rgba(16,185,129,0.3)" }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400 shrink-0 tabular-nums transition-all duration-300">
            {pct}%
          </div>
        </div>

        {/* ── Kanban ───────────────────────────────────────────────────────────── */}
        <GridCols3>
          {columns.map((col) => {
            const items = tasks.filter((t) => t.status === col.key);
            const ColIcon = col.icon;
            return (
              <div key={col.key} className="flex flex-col gap-3">
                {/* Column header */}
                <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl", col.headerBg)}>
                  <ColIcon className={cn("h-4 w-4 shrink-0", col.iconColor)} />
                  <span className={cn("text-xs font-bold", col.color)}>{col.title}</span>
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#1a2d42] text-[#415a72]">
                    {items.length}
                  </span>
                </div>

                {/* Task cards */}
                <div className="space-y-2.5">
                  {items.map((task) => {
                    const TaskIcon = col.icon;
                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "group flex items-start gap-3 p-3.5 rounded-xl",
                          "border border-[#1a2d42] bg-[#0f1929]",
                          "hover:border-[#243d56] hover:bg-[#0c1a2c]",
                          "transition-all duration-150",
                          task.status === "done" && "opacity-55 hover:opacity-75"
                        )}
                      >
                        <TaskIcon className={cn("h-4 w-4 mt-0.5 shrink-0", col.iconColor)} />
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-xs font-semibold leading-snug mb-2",
                              task.status === "done" ? "text-[#415a72] line-through" : "text-[#f0f4f8]"
                            )}
                          >
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                            <span className="text-[10px] text-[#2a3f55]">Due {task.due}</span>
                            {task.impact && (
                              <span className="text-[10px] font-semibold text-emerald-500">{task.impact}</span>
                            )}
                          </div>

                          {col.nextStatus && (
                            <button
                              onClick={() => moveTask(task.id, col.nextStatus!, task.title)}
                              className={cn(
                                "mt-2.5 flex items-center gap-1 text-[10px] font-semibold transition-all",
                                "opacity-0 group-hover:opacity-100",
                                col.key === "todo"
                                  ? "text-amber-400 hover:text-amber-300"
                                  : "text-emerald-400 hover:text-emerald-300"
                              )}
                            >
                              <ArrowRight className="h-2.5 w-2.5" />
                              {col.nextLabel}
                            </button>
                          )}
                        </div>
                        <button className="p-1 rounded text-[#2a3f55] hover:text-[#8ca4be] transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {items.length === 0 && addingInCol !== col.key && (
                    <div className="py-6 text-center">
                      <p className="text-[11px] text-[#2a3f55]">
                        {col.key === "done" ? "No tasks completed yet" : "No tasks here"}
                      </p>
                    </div>
                  )}

                  {/* Add task form */}
                  {addingInCol === col.key && (
                    <AddTaskForm
                      colKey={col.key}
                      onAdd={(title, priority) => addTask(col.key, title, priority)}
                      onCancel={() => setAddingInCol(null)}
                    />
                  )}

                  {col.key !== "done" && addingInCol !== col.key && (
                    <button
                      onClick={() => setAddingInCol(col.key)}
                      className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#2a3f55] hover:text-[#8ca4be] hover:bg-[#0c1322] border border-dashed border-[#1a2d42] hover:border-[#243d56] transition-all"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add task
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </GridCols3>

      </DashboardShell>
    </>
  );
}
