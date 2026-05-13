import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  suffix?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconColor = "text-emerald-400",
  suffix,
  className,
}: KpiCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral  = change === 0;

  return (
    <Card className={cn("group", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#415a72] truncate">
            {title}
          </p>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-[#f0f4f8] tabular-nums">
              {value}
            </span>
            {suffix && (
              <span className="text-sm font-medium text-[#415a72]">{suffix}</span>
            )}
          </div>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold",
                  isPositive && "bg-emerald-500/10 text-emerald-400",
                  isNegative && "bg-red-500/10 text-red-400",
                  isNeutral  && "bg-[#1a2d42] text-[#415a72]"
                )}
              >
                {isPositive && <TrendingUp  className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                {isNeutral  && <Minus        className="h-3 w-3" />}
                {isPositive ? "+" : ""}{change}{typeof change === "number" && "%"}
              </span>
              {changeLabel && (
                <span className="text-[11px] text-[#415a72]">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              "bg-[#0c1322] border border-[#1a2d42]",
              "group-hover:border-emerald-500/25 transition-colors",
              iconColor
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
