import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols4 } from "@/components/layout/dashboard-shell";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KeywordTable } from "@/components/dashboard/keyword-table";
import { Search, TrendingUp, Award, Target, SlidersHorizontal } from "lucide-react";

const filterTabs = ["All Keywords", "Top 10", "Movers", "Opportunities", "Declining"];

export default function KeywordsPage() {
  return (
    <>
      <Topbar title="Keyword Tracking" subtitle="847 keywords · Updated daily" />
      <DashboardShell>

        <GridCols4>
          <KpiCard title="Total Keywords"  value="847"  change={2.8}  changeLabel="new this month"  icon={<Search className="h-4.5 w-4.5" />} />
          <KpiCard title="Avg. Position"   value="11.4" change={-1.2} changeLabel="positions improved" icon={<TrendingUp className="h-4.5 w-4.5" />} iconColor="text-blue-400" />
          <KpiCard title="Top 3 Rankings"  value="38"   change={5}    changeLabel="vs last month"   icon={<Award className="h-4.5 w-4.5" />} iconColor="text-amber-400" />
          <KpiCard title="Opportunities"   value="62"                 changeLabel="KD under 40"     icon={<Target className="h-4.5 w-4.5" />} iconColor="text-purple-400" />
        </GridCols4>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Rankings</CardTitle>
            <button className="flex items-center gap-1.5 text-[11px] text-[#415a72] hover:text-[#8ca4be] transition-colors">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>
          </CardHeader>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-0.5">
            {filterTabs.map((tab, i) => (
              <button
                key={tab}
                className={
                  i === 0
                    ? "shrink-0 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold"
                    : "shrink-0 text-xs px-3 py-1.5 rounded-lg text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] border border-transparent font-medium transition-all"
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <CardContent>
            <KeywordTable limit={12} />
          </CardContent>
        </Card>

      </DashboardShell>
    </>
  );
}
