import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols4, GridCols2 } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { weeklyReport } from "@/lib/placeholder-data";
import { FileText, Download, Share2, TrendingUp, BarChart2, Globe, Search, Sparkles } from "lucide-react";

const history = [
  { week: "May 5–11, 2025",      traffic: "+14.2%", score: 81, ai: 68, pos: true },
  { week: "Apr 28–May 4, 2025",  traffic: "+8.7%",  score: 79, ai: 64, pos: true },
  { week: "Apr 21–27, 2025",     traffic: "+5.1%",  score: 77, ai: 61, pos: true },
  { week: "Apr 14–20, 2025",     traffic: "-1.4%",  score: 75, ai: 59, pos: false },
  { week: "Apr 7–13, 2025",      traffic: "+3.6%",  score: 74, ai: 57, pos: true },
];

export default function ReportsPage() {
  return (
    <>
      <Topbar title="Weekly Reports" subtitle="Automated · PDF export available" />
      <DashboardShell>

        {/* Latest report banner */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#0c1a2c] to-[#0c1322] p-6">
          <div className="absolute -top-6 -right-6 h-40 w-40 rounded-full bg-emerald-500/6 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="success">
                  <Sparkles className="h-2.5 w-2.5 mr-1" />
                  Latest Report
                </Badge>
                <span className="text-xs text-[#415a72]">{weeklyReport.weekOf}</span>
              </div>
              <h2 className="text-xl font-bold text-[#f0f4f8] mb-1">Weekly Performance Summary</h2>
              <p className="text-xs text-[#415a72]">acme-corp.com · Generated May 12, 2025 · AI-analysed</p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#8ca4be] hover:border-[#243d56] hover:text-[#f0f4f8] transition-all">
                <Share2 className="h-3.5 w-3.5" />
                Share Link
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Download className="h-3.5 w-3.5" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* This week's KPIs */}
        <GridCols4>
          <KpiCard title="Organic Traffic" value={weeklyReport.organicTraffic.value.toLocaleString()} change={weeklyReport.organicTraffic.change} changeLabel="vs prev week" icon={<TrendingUp className="h-4.5 w-4.5" />} />
          <KpiCard title="Keywords Ranked" value={weeklyReport.keywords.value} change={2.8} changeLabel="vs prev week" icon={<Search className="h-4.5 w-4.5" />} iconColor="text-blue-400" />
          <KpiCard title="AI Visibility"   value={weeklyReport.aiVisibility.value} suffix="/100" change={weeklyReport.aiVisibility.change} changeLabel="vs prev week" icon={<Globe className="h-4.5 w-4.5" />} iconColor="text-purple-400" />
          <KpiCard title="SEO Score"       value={weeklyReport.seoScore.value}    suffix="/100" change={weeklyReport.seoScore.change}    changeLabel="vs prev week" icon={<BarChart2 className="h-4.5 w-4.5" />} iconColor="text-amber-400" />
        </GridCols4>

        {/* Key insight callout */}
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/5">
          <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-emerald-400 mb-0.5">AI Insight of the Week</p>
            <p className="text-xs text-[#415a72] leading-relaxed">
              "generative engine optimization" jumped <span className="text-[#8ca4be] font-semibold">+4 positions to #4</span> this week — your highest performer. Consider expanding this topic cluster with 2–3 supporting articles to consolidate authority.
            </p>
          </div>
        </div>

        {/* Report history */}
        <Card>
          <CardHeader>
            <CardTitle>Report History</CardTitle>
            <span className="text-[11px] text-[#415a72]">Last 5 weeks</span>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((report, i) => (
                <div
                  key={report.week}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#1a2d42] hover:border-[#243d56] hover:bg-[#0c1322] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-[#0c1322] border border-[#1a2d42] flex items-center justify-center group-hover:border-[#243d56] transition-colors">
                      <FileText className="h-4 w-4 text-[#415a72]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#f0f4f8]">
                        Weekly Report {i === 0 && <span className="ml-1.5 text-[10px] text-emerald-400 font-bold">LATEST</span>}
                      </p>
                      <p className="text-[10px] text-[#415a72] mt-0.5">{report.week}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#415a72]">
                      <span>SEO <span className="text-[#8ca4be] font-semibold">{report.score}</span></span>
                      <span>AI <span className="text-[#8ca4be] font-semibold">{report.ai}</span></span>
                    </div>
                    <span className={`text-xs font-bold ${report.pos ? "text-emerald-400" : "text-red-400"}`}>
                      {report.traffic}
                    </span>
                    <Download className="h-3.5 w-3.5 text-[#415a72] group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </DashboardShell>
    </>
  );
}
