import { keywordData } from "@/lib/placeholder-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

function PositionBadge({ pos }: { pos: number }) {
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

function DifficultyBar({ value }: { value: number }) {
  const color =
    value >= 65 ? "#ef4444" :
    value >= 48 ? "#f59e0b" :
                  "#10b981";
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-12 h-1 rounded-full bg-[#1a2d42] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[11px] text-[#415a72] tabular-nums">{value}</span>
    </div>
  );
}

export function KeywordTable({ limit = 6 }: { limit?: number }) {
  const items = keywordData.slice(0, limit);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs min-w-[400px]">
        <thead>
          <tr className="border-b border-[#1a2d42]">
            <th className="pb-3 pr-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Keyword</th>
            <th className="pb-3 px-2 text-center text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Pos.</th>
            <th className="pb-3 px-2 text-center text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Δ</th>
            <th className="pb-3 px-2 text-right text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55] hidden sm:table-cell">Volume</th>
            <th className="pb-3 pl-2 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55] hidden md:table-cell">KD</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.keyword} className="border-b border-[#1a2d42]/40 hover:bg-[#0c1322] transition-colors">
              <td className="py-3 pr-3 font-medium text-[#8ca4be] max-w-[160px] truncate">{row.keyword}</td>
              <td className="py-3 px-2 text-center">
                <PositionBadge pos={row.position} />
              </td>
              <td className="py-3 px-2 text-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 font-bold text-[11px]",
                    row.change > 0 && "text-emerald-400",
                    row.change < 0 && "text-red-400",
                    row.change === 0 && "text-[#415a72]"
                  )}
                >
                  {row.change > 0 ? <TrendingUp className="h-3 w-3" />
                   : row.change < 0 ? <TrendingDown className="h-3 w-3" />
                   : <Minus className="h-3 w-3" />}
                  {row.change > 0 ? "+" : ""}{row.change}
                </span>
              </td>
              <td className="py-3 px-2 text-right text-[#415a72] tabular-nums hidden sm:table-cell">
                {row.volume.toLocaleString()}
              </td>
              <td className="py-3 pl-2 hidden md:table-cell">
                <DifficultyBar value={row.difficulty} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
