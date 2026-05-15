import { TableRowSkeleton, Skeleton, KpiCardSkeleton } from "@/components/ui/skeleton";

export default function KeywordsLoading() {
  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[#1a2d42] bg-[#080d1a]/90 px-4 py-3 lg:px-6">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-2.5 w-44" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-8 w-8 rounded-xl" />
        </div>
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-5 p-4 pb-10 lg:p-6 lg:pb-12">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <KpiCardSkeleton key={i} />
            ))}
          </div>
          <div className="rounded-2xl border border-[#1a2d42] bg-[#0f1929] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-56 rounded-xl" />
              <Skeleton className="h-8 w-24 rounded-xl ml-auto" />
              <Skeleton className="h-8 w-20 rounded-xl" />
            </div>
            <div className="flex items-center gap-3 px-4 pb-2 border-b border-[#1a2d42]">
              {[40, 14, 13, 13, 20].map((w, i) => (
                <Skeleton key={i} className="h-2" style={{ width: `${w}%`, opacity: 0.6 }} />
              ))}
            </div>
            <TableRowSkeleton rows={8} />
          </div>
        </div>
      </main>
    </>
  );
}
