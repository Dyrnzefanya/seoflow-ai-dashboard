import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols4, GridCols2 } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrafficChart } from "@/components/charts/traffic-chart";
import { TopPagesTable } from "@/components/dashboard/top-pages-table";
import { MousePointerClick, Eye, BarChart2, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";

const healthItems = [
  { label: "Pages Indexed",      value: "342 / 358", status: "good",  detail: "96% coverage" },
  { label: "Core Web Vitals",    value: "Needs Work", status: "warn",  detail: "LCP: 3.2s (target < 2.5s)" },
  { label: "Mobile Usability",   value: "98% passed", status: "good",  detail: "7 pages with minor issues" },
  { label: "Crawl Errors",       value: "3 pages",    status: "warn",  detail: "Soft 404 on service pages" },
  { label: "HTTPS Coverage",     value: "100%",        status: "good",  detail: "All pages secured" },
  { label: "Structured Data",    value: "Partial",    status: "warn",  detail: "62 pages missing schema" },
];

export default function SeoPage() {
  return (
    <>
      <Topbar title="SEO Performance" subtitle="Google Search Console · Last synced 14 min ago" />
      <DashboardShell>

        <GridCols4>
          <KpiCard title="Total Clicks"   value="31.2k" change={14.8} changeLabel="vs prev period" icon={<MousePointerClick className="h-4.5 w-4.5" />} />
          <KpiCard title="Impressions"    value="248k"  change={9.2}  changeLabel="vs prev period" icon={<Eye className="h-4.5 w-4.5" />} iconColor="text-blue-400" />
          <KpiCard title="Avg. CTR"       value="12.6"  suffix="%"    change={2.1}  changeLabel="vs prev period" icon={<BarChart2 className="h-4.5 w-4.5" />} iconColor="text-purple-400" />
          <KpiCard title="Avg. Position"  value="4.2"   change={-0.8} changeLabel="position improved" icon={<TrendingUp className="h-4.5 w-4.5" />} iconColor="text-amber-400" />
        </GridCols4>

        <GridCols2>
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <div className="flex items-center gap-3 text-[10px] font-medium text-[#2a3f55]">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-emerald-400 inline-block" />Organic
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-blue-400 inline-block" />Paid
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <TrafficChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Health</CardTitle>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" />3 good
                </span>
                <span className="text-[#1a2d42]">·</span>
                <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                  <AlertTriangle className="h-3 w-3" />3 issues
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {healthItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-[#0c1322] border border-[#1a2d42] hover:border-[#243d56] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.status === "good" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#8ca4be] truncate">{item.label}</p>
                      <p className="text-[10px] text-[#415a72] truncate">{item.detail}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ${item.status === "good" ? "text-emerald-400" : "text-amber-400"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </GridCols2>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
            <span className="text-[11px] text-[#415a72]">Last 30 days · Google Search Console</span>
          </CardHeader>
          <CardContent>
            <TopPagesTable />
          </CardContent>
        </Card>

      </DashboardShell>
    </>
  );
}
