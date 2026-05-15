"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols4 } from "@/components/layout/dashboard-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { weeklyReport } from "@/lib/placeholder-data";
import { useToast } from "@/components/ui/toast";
import { formatNumber } from "@/lib/format-number";
import {
  FileText, Download, Share2, TrendingUp, BarChart2, Globe,
  Search, Sparkles, Loader2, Plus, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

const history = [
  { id: "1", week: "May 5–11, 2026",      traffic: "+14.2%", score: 81, ai: 68, pos: true },
  { id: "2", week: "Apr 28–May 4, 2026",  traffic: "+8.7%",  score: 79, ai: 64, pos: true },
  { id: "3", week: "Apr 21–27, 2026",     traffic: "+5.1%",  score: 77, ai: 61, pos: true },
  { id: "4", week: "Apr 14–20, 2026",     traffic: "-1.4%",  score: 75, ai: 59, pos: false },
  { id: "5", week: "Apr 7–13, 2026",      traffic: "+3.6%",  score: 74, ai: 57, pos: true },
];

export default function ReportsPage() {
  const { toast } = useToast();
  const [exporting, setExporting] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleExportPDF = () => {
    if (exporting) return;
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      toast("PDF exported — check your downloads folder.", "success");
    }, 2200);
  };

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText("https://seoflow.app/reports/shared/acme-corp-may-2026");
      toast("Share link copied to clipboard.", "success");
    } catch {
      toast("Share link: seoflow.app/reports/acme-corp-may-2026", "info");
    }
  };

  const handleDownloadReport = (id: string, week: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      toast(`Report for "${week}" downloaded.`);
    }, 1600);
  };

  const handleViewReport = (id: string, week: string) => {
    setViewingId(id);
    setTimeout(() => setViewingId(null), 800);
    toast(`Opening report: ${week}`, "info");
  };

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
              <p className="text-xs text-[#415a72]">
                acme-corp.com · Generated May 12, 2026 · AI-analysed
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleShareLink}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#8ca4be] hover:border-[#243d56] hover:text-[#f0f4f8] transition-all"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share Link
              </button>
              <button
                onClick={handleExportPDF}
                disabled={exporting}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-70"
              >
                {exporting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <GridCols4>
          <KpiCard
            title="Organic Traffic"
            value={formatNumber(weeklyReport.organicTraffic.value)}
            change={weeklyReport.organicTraffic.change}
            changeLabel="vs prev week"
            icon={<TrendingUp className="h-4.5 w-4.5" />}
          />
          <KpiCard
            title="Keywords Ranked"
            value={weeklyReport.keywords.value}
            change={2.8}
            changeLabel="vs prev week"
            icon={<Search className="h-4.5 w-4.5" />}
            iconColor="text-blue-400"
          />
          <KpiCard
            title="AI Visibility"
            value={weeklyReport.aiVisibility.value}
            suffix="/100"
            change={weeklyReport.aiVisibility.change}
            changeLabel="vs prev week"
            icon={<Globe className="h-4.5 w-4.5" />}
            iconColor="text-purple-400"
          />
          <KpiCard
            title="SEO Score"
            value={weeklyReport.seoScore.value}
            suffix="/100"
            change={weeklyReport.seoScore.change}
            changeLabel="vs prev week"
            icon={<BarChart2 className="h-4.5 w-4.5" />}
            iconColor="text-amber-400"
          />
        </GridCols4>

        {/* AI insight callout */}
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/5">
          <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-emerald-400 mb-0.5">AI Insight of the Week</p>
            <p className="text-xs text-[#415a72] leading-relaxed">
              &quot;generative engine optimization&quot; jumped{" "}
              <span className="text-[#8ca4be] font-semibold">+4 positions to #4</span> this week —
              your highest performer. Consider expanding this topic cluster with 2–3 supporting articles
              to consolidate authority.
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
            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((report, i) => (
                  <div
                    key={report.id}
                    onClick={() => handleViewReport(report.id, report.week)}
                    className={cn(
                      "flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer group",
                      viewingId === report.id
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-[#1a2d42] hover:border-[#243d56] hover:bg-[#0c1322]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-xl border flex items-center justify-center transition-colors",
                        viewingId === report.id
                          ? "border-emerald-500/25 bg-emerald-500/10"
                          : "bg-[#0c1322] border-[#1a2d42] group-hover:border-[#243d56]"
                      )}>
                        <FileText className={cn(
                          "h-4 w-4 transition-colors",
                          viewingId === report.id ? "text-emerald-400" : "text-[#415a72]"
                        )} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#f0f4f8]">
                          Weekly Report
                          {i === 0 && (
                            <span className="ml-1.5 text-[10px] text-emerald-400 font-bold">LATEST</span>
                          )}
                        </p>
                        <p className="text-[10px] text-[#415a72] mt-0.5">{report.week}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#415a72]">
                        <span>SEO <span className="text-[#8ca4be] font-semibold">{report.score}</span></span>
                        <span>AI <span className="text-[#8ca4be] font-semibold">{report.ai}</span></span>
                      </div>
                      <span className={cn("text-xs font-bold", report.pos ? "text-emerald-400" : "text-red-400")}>
                        {report.traffic}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadReport(report.id, report.week);
                        }}
                        disabled={downloadingId === report.id}
                        className="p-1.5 rounded-lg text-[#415a72] hover:text-emerald-400 hover:bg-emerald-500/10 transition-all disabled:opacity-60"
                        title="Download PDF"
                      >
                        {downloadingId === report.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                        ) : (
                          <Download className="h-3.5 w-3.5 group-hover:text-emerald-400 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<FileText className="h-8 w-8 text-[#415a72]" />}
                title="No reports yet"
                description="Your first weekly report will be generated automatically after 7 days of data collection."
                action={
                  <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                    Generate report now
                  </button>
                }
              />
            )}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            {
              icon: Eye,
              label: "Scheduled Reports",
              desc: "Weekly · Every Monday at 9am",
              action: "Configure",
            },
            {
              icon: Share2,
              label: "Client Sharing",
              desc: "3 active share links",
              action: "Manage",
            },
            {
              icon: Sparkles,
              label: "AI Summaries",
              desc: "Claude-generated insights enabled",
              action: "Settings",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => toast(`"${item.label}" settings coming soon.`, "info")}
                className="flex items-center gap-3 p-4 rounded-2xl border border-[#1a2d42] bg-[#0f1929] hover:border-[#243d56] hover:bg-[#0c1a2c] transition-all text-left group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1a2d42] bg-[#070c18] group-hover:border-[#243d56] transition-colors shrink-0">
                  <Icon className="h-4 w-4 text-[#415a72]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#f0f4f8] mb-0.5">{item.label}</p>
                  <p className="text-[10px] text-[#415a72]">{item.desc}</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-500 shrink-0 group-hover:text-emerald-400 transition-colors">
                  {item.action} →
                </span>
              </button>
            );
          })}
        </div>

      </DashboardShell>
    </>
  );
}
