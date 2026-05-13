import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols4, GridCols2 } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";
import { TrafficChart } from "@/components/charts/traffic-chart";
import { AiVisibilityChart } from "@/components/charts/ai-visibility-chart";
import { RecommendationsWidget } from "@/components/dashboard/recommendations-widget";
import { KeywordTable } from "@/components/dashboard/keyword-table";
import {
  BarChart2, Globe, Search, FileText,
  ArrowUpRight, Zap, Activity,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <Topbar
        title="Dashboard Overview"
        subtitle="acme-corp.com · Updated 2 minutes ago"
      />
      <DashboardShell>

        {/* Status banner ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-[#1a2d42] bg-gradient-to-br from-[#0c1a2c] via-[#0c1322] to-[#070c18] p-6">
          {/* Background glow */}
          <div className="absolute -top-8 -right-8 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 h-32 w-64 rounded-full bg-blue-500/4 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Score rings */}
            <div className="flex items-center gap-8 shrink-0">
              <ScoreRing score={81} label="SEO Score"    size="lg" />
              <ScoreRing score={68} label="AI Visibility" size="lg" />
            </div>

            {/* Status text */}
            <div className="flex-1 space-y-3 min-w-0">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#2a3f55] mb-1">
                  Overall Status
                </p>
                <p className="text-base font-semibold text-[#f0f4f8] leading-snug">
                  Strong growth trajectory across SEO and AI search visibility.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  <Zap className="h-3 w-3" />
                  8 AI recommendations ready
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                  <Activity className="h-3 w-3" />
                  AI presence growing +9pts
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                  3 technical issues to fix
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI row ─────────────────────────────────────────────────── */}
        <GridCols4>
          <KpiCard
            title="Organic Traffic"
            value="31.2k"
            change={14.2}
            changeLabel="vs last month"
            icon={<BarChart2 className="h-4.5 w-4.5" />}
          />
          <KpiCard
            title="AI Visibility"
            value="68"
            suffix="/100"
            change={9}
            changeLabel="vs last month"
            icon={<Globe className="h-4.5 w-4.5" />}
            iconColor="text-blue-400"
          />
          <KpiCard
            title="Keywords Ranked"
            value="847"
            change={2.8}
            changeLabel="new tracked"
            icon={<Search className="h-4.5 w-4.5" />}
            iconColor="text-purple-400"
          />
          <KpiCard
            title="Reports Generated"
            value="12"
            change={0}
            changeLabel="this month"
            icon={<FileText className="h-4.5 w-4.5" />}
            iconColor="text-amber-400"
          />
        </GridCols4>

        {/* Traffic + AI Visibility ──────────────────────────────────── */}
        <GridCols2>
          <Card>
            <CardHeader>
              <CardTitle>Organic Traffic Trend</CardTitle>
              <div className="flex items-center gap-3 text-[10px] font-medium text-[#2a3f55]">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-emerald-400 inline-block" />
                  Organic
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-blue-400 inline-block" />
                  Paid
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <TrafficChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Platform Visibility</CardTitle>
              <Link
                href="/ai-visibility"
                className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-0.5"
              >
                Details <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <AiVisibilityChart />
            </CardContent>
          </Card>
        </GridCols2>

        {/* Recommendations + Keywords ──────────────────────────────── */}
        <GridCols2>
          <Card>
            <CardHeader>
              <CardTitle>Top AI Recommendations</CardTitle>
              <Link
                href="/recommendations"
                className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-0.5"
              >
                View all 8 <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <RecommendationsWidget limit={3} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <Link
                href="/keywords"
                className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-0.5"
              >
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              <KeywordTable limit={6} />
            </CardContent>
          </Card>
        </GridCols2>

      </DashboardShell>
    </>
  );
}
