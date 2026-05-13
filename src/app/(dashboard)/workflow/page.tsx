import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols3 } from "@/components/layout/dashboard-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { workflowTasks } from "@/lib/placeholder-data";
import { CheckCircle2, Circle, Clock, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityVariant = {
  high:   "danger"  as const,
  medium: "warning" as const,
  low:    "info"    as const,
};

const columns = [
  {
    key: "todo",
    title: "To Do",
    color: "text-[#8ca4be]",
    dotColor: "bg-[#415a72]",
    headerBg: "bg-[#1a2d42]/30",
    icon: Circle,
    iconColor: "text-[#415a72]",
  },
  {
    key: "in-progress",
    title: "In Progress",
    color: "text-amber-400",
    dotColor: "bg-amber-400",
    headerBg: "bg-amber-500/5",
    icon: Clock,
    iconColor: "text-amber-400",
  },
  {
    key: "done",
    title: "Completed",
    color: "text-emerald-400",
    dotColor: "bg-emerald-400",
    headerBg: "bg-emerald-500/5",
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
  },
];

export default function WorkflowPage() {
  return (
    <>
      <Topbar title="Workflow" subtitle="SEO task management · 3 tasks in progress" />
      <DashboardShell>

        {/* Progress bar */}
        <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#1a2d42] bg-[#0c1322]">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#8ca4be]">Sprint Progress</p>
              <p className="text-xs font-bold text-[#f0f4f8]">3 / 8 completed</p>
            </div>
            <div className="h-1.5 rounded-full bg-[#1a2d42] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                style={{ width: "37.5%", boxShadow: "0 0 10px rgba(16,185,129,0.3)" }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400 shrink-0">37%</div>
        </div>

        <GridCols3>
          {columns.map((col) => {
            const items = workflowTasks.filter((t) => t.status === col.key);
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
                          "group flex items-start gap-3 p-3.5 rounded-xl cursor-pointer",
                          "border border-[#1a2d42] bg-[#0f1929]",
                          "hover:border-[#243d56] hover:bg-[#0c1a2c]",
                          "transition-all duration-150",
                          task.status === "done" && "opacity-60 hover:opacity-80"
                        )}
                      >
                        <TaskIcon className={cn("h-4 w-4 mt-0.5 shrink-0", col.iconColor)} />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-xs font-semibold leading-snug mb-2",
                            task.status === "done" ? "text-[#415a72] line-through" : "text-[#f0f4f8]"
                          )}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                            <span className="text-[10px] text-[#2a3f55]">Due {task.due}</span>
                          </div>
                        </div>
                        <button className="p-1 rounded text-[#2a3f55] hover:text-[#8ca4be] transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}

                  {/* Add task */}
                  <button className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#2a3f55] hover:text-[#8ca4be] hover:bg-[#0c1322] border border-dashed border-[#1a2d42] hover:border-[#243d56] transition-all">
                    <Plus className="h-3.5 w-3.5" />
                    Add task
                  </button>
                </div>
              </div>
            );
          })}
        </GridCols3>

      </DashboardShell>
    </>
  );
}
