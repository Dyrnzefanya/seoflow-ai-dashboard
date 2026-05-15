import { KpiCardSkeleton, ChartSkeleton, TableRowSkeleton, RecommendationSkeleton, Skeleton } from "@/components/ui/skeleton";

function TopbarSkeleton() {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[#1a2d42] bg-[#080d1a]/90 px-4 py-3 lg:px-6">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-2.5 w-52" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-xl" />
        <Skeleton className="h-8 w-8 rounded-xl" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <>
      <TopbarSkeleton />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-5 p-4 pb-10 lg:p-6 lg:pb-12">

          {/* Status banner skeleton */}
          <Skeleton className="h-10 w-full rounded-2xl" />

          {/* KPI cards */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <KpiCardSkeleton key={i} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {[180, 180].map((h, i) => (
              <div key={i} className="rounded-2xl border border-[#1a2d42] bg-[#0f1929] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-6 w-24 rounded-lg" />
                </div>
                <ChartSkeleton height={h} />
              </div>
            ))}
          </div>

          {/* Recommendations skeleton */}
          <div className="rounded-2xl border border-[#1a2d42] bg-[#0f1929] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-6 w-20 rounded-lg" />
            </div>
            <RecommendationSkeleton rows={3} />
          </div>

          {/* Keywords table skeleton */}
          <div className="rounded-2xl border border-[#1a2d42] bg-[#0f1929] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-6 w-24 rounded-lg" />
            </div>
            {/* Table header */}
            <div className="flex items-center gap-3 px-4 pb-2 border-b border-[#1a2d42]">
              {[48, 16, 12, 14, 20].map((w, i) => (
                <Skeleton key={i} className="h-2" style={{ width: `${w}%`, opacity: 0.6 }} />
              ))}
            </div>
            <TableRowSkeleton rows={5} />
          </div>

        </div>
      </main>
    </>
  );
}
