import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols4, GridCols2 } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AiVisibilityChart } from "@/components/charts/ai-visibility-chart";
import { ScoreRing } from "@/components/ui/score-ring";
import { Badge } from "@/components/ui/badge";
import { Cpu, Globe, Sparkles, Search } from "lucide-react";
import { aeoOpportunities } from "@/lib/placeholder-data";

const potentialVariant: Record<string, "danger" | "warning" | "info"> = {
  High:   "danger",
  Medium: "warning",
  Low:    "info",
};

const statusVariant: Record<string, "danger" | "warning" | "success"> = {
  Missing: "danger",
  Partial: "warning",
  Done:    "success",
};

export default function AiVisibilityPage() {
  return (
    <>
      <Topbar title="AI Visibility" subtitle="GEO · AEO · AI Answer Engine Tracking" />
      <DashboardShell>

        <GridCols4>
          <KpiCard title="AI Visibility Score"     value="68"  suffix="/100" change={9}  changeLabel="this month"   icon={<Cpu className="h-4.5 w-4.5" />} />
          <KpiCard title="AI Platforms Tracked"    value="5"                              changeLabel="platforms"    icon={<Globe className="h-4.5 w-4.5" />} iconColor="text-blue-400" />
          <KpiCard title="Pages Referenced by AI"  value="24"              change={4}    changeLabel="new this month" icon={<Sparkles className="h-4.5 w-4.5" />} iconColor="text-purple-400" />
          <KpiCard title="AEO Opportunities"       value="6"                              changeLabel="ready to act" icon={<Search className="h-4.5 w-4.5" />} iconColor="text-amber-400" />
        </GridCols4>

        <GridCols2>
          <Card>
            <CardHeader>
              <CardTitle>Platform Visibility Scores</CardTitle>
              <span className="text-[11px] text-[#415a72]">Score out of 100</span>
            </CardHeader>
            <CardContent className="pt-1">
              <AiVisibilityChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall AI Presence</CardTitle>
              <Badge variant="success">Growing +9pts</Badge>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5 py-4">
              <ScoreRing score={68} label="AI Visibility" size="lg" />
              <div className="text-center space-y-1 max-w-[240px]">
                <p className="text-xs font-semibold text-[#8ca4be]">
                  Your brand appears in AI answers on 3 of 5 tracked platforms.
                </p>
                <p className="text-[11px] text-[#415a72] leading-relaxed">
                  Implementing FAQ schema and improving content structure could raise this score to <span className="text-emerald-400 font-semibold">82+</span> within 60 days.
                </p>
              </div>
            </CardContent>
          </Card>
        </GridCols2>

        <Card>
          <CardHeader>
            <CardTitle>AEO Schema Opportunities</CardTitle>
            <Badge variant="warning">6 to implement</Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[480px]">
                <thead>
                  <tr className="border-b border-[#1a2d42]">
                    <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Page</th>
                    <th className="pb-3 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Schema Type</th>
                    <th className="pb-3 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Platforms</th>
                    <th className="pb-3 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Impact</th>
                    <th className="pb-3 pl-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#2a3f55]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {aeoOpportunities.map((row) => (
                    <tr key={row.page} className="border-b border-[#1a2d42]/40 hover:bg-[#0c1322] transition-colors">
                      <td className="py-3 pr-4 font-medium text-[#8ca4be] truncate max-w-[160px]">{row.page}</td>
                      <td className="py-3 px-3 text-[#f0f4f8] font-medium">{row.type}</td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {row.aiPlatforms.map((p) => (
                            <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a2d42] text-[#415a72] font-medium">{p}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={potentialVariant[row.potential]}>{row.potential}</Badge>
                      </td>
                      <td className="py-3 pl-3">
                        <Badge variant={statusVariant[row.status] ?? "default"}>{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </DashboardShell>
    </>
  );
}
