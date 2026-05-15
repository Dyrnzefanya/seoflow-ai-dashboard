import { topPages } from "@/lib/placeholder-data";
import { formatNumber } from "@/lib/format-number";

export function TopPagesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs min-w-[400px]">
        <thead>
          <tr className="border-b border-[#1a2d42]">
            <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Page</th>
            <th className="pb-3 px-2 text-right text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Clicks</th>
            <th className="pb-3 px-2 text-right text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55] hidden sm:table-cell">Impressions</th>
            <th className="pb-3 px-2 text-right text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">CTR</th>
            <th className="pb-3 pl-2 text-right text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55] hidden md:table-cell">Avg. Pos.</th>
          </tr>
        </thead>
        <tbody>
          {topPages.map((row, i) => (
            <tr key={row.page} className="border-b border-[#1a2d42]/40 hover:bg-[#0c1322] transition-colors group">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#2a3f55] w-4 shrink-0 tabular-nums">{i + 1}</span>
                  <span className="font-medium text-[#8ca4be] truncate max-w-[160px] group-hover:text-[#f0f4f8] transition-colors">
                    {row.page}
                  </span>
                </div>
              </td>
              <td className="py-3 px-2 text-right font-bold text-[#f0f4f8] tabular-nums">
                {formatNumber(row.clicks)}
              </td>
              <td className="py-3 px-2 text-right text-[#415a72] tabular-nums hidden sm:table-cell">
                {formatNumber(row.impressions)}
              </td>
              <td className="py-3 px-2 text-right">
                <span className="font-semibold text-emerald-400">{row.ctr}</span>
              </td>
              <td className="py-3 pl-2 text-right text-[#415a72] tabular-nums hidden md:table-cell">
                {row.position}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
