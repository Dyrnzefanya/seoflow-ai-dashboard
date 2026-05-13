import { recommendations } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityConfig = {
  high:   { variant: "danger"  as const, icon: AlertCircle,   border: "border-l-red-500/40",    iconBg: "bg-red-500/10 border-red-500/20",    iconColor: "text-red-400" },
  medium: { variant: "warning" as const, icon: AlertTriangle, border: "border-l-amber-500/40",  iconBg: "bg-amber-500/10 border-amber-500/20", iconColor: "text-amber-400" },
  low:    { variant: "info"    as const, icon: Info,          border: "border-l-blue-500/40",   iconBg: "bg-blue-500/10 border-blue-500/20",   iconColor: "text-blue-400" },
};

export function RecommendationsWidget({ limit = 3 }: { limit?: number }) {
  const items = recommendations.slice(0, limit);

  return (
    <div className="space-y-2.5">
      {items.map((rec) => {
        const cfg = priorityConfig[rec.priority];
        const Icon = cfg.icon;
        return (
          <div
            key={rec.id}
            className={cn(
              "group flex items-start gap-3 p-3.5 rounded-xl",
              "border border-[#1a2d42] border-l-2 bg-[#0c1322]",
              "hover:border-[#243d56] hover:bg-[#0f1929]",
              "transition-all duration-150 cursor-pointer",
              cfg.border
            )}
          >
            <div className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border", cfg.iconBg)}>
              <Icon className={cn("h-3.5 w-3.5", cfg.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                <Badge variant={cfg.variant}>{rec.priority}</Badge>
                <span className="text-[10px] text-[#2a3f55] font-medium">{rec.category}</span>
                {rec.estGain && (
                  <span className="text-[10px] text-emerald-500/70 font-medium ml-auto">{rec.estGain}</span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#f0f4f8] leading-snug">{rec.title}</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-[#2a3f55] shrink-0 mt-0.5 group-hover:text-emerald-400 transition-colors" />
          </div>
        );
      })}
    </div>
  );
}
