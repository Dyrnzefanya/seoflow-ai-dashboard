"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("animate-shimmer rounded-lg", className)} style={style} />
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-[#1a2d42] bg-[#0f1929] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-28 rounded-md" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 160 }: { height?: number }) {
  const bars = [55, 70, 42, 80, 60, 90, 68, 95, 75, 88, 100, 82];
  return (
    <div className="space-y-2.5">
      <div className="flex items-end gap-1.5" style={{ height }}>
        {bars.map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between gap-2">
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
          <Skeleton key={m} className="h-2 w-6" />
        ))}
      </div>
    </div>
  );
}

export function TableRowSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1a2d42]"
          style={{ opacity: 1 - i * 0.12 }}
        >
          <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
          <Skeleton className="h-2.5 flex-1 max-w-48" />
          <Skeleton className="h-2.5 w-8 ml-auto" />
          <Skeleton className="h-2.5 w-10" />
          <Skeleton className="h-2.5 w-14 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function RecommendationSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-5 rounded-2xl border border-[#1a2d42]"
          style={{ opacity: 1 - i * 0.15 }}
        >
          <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-2.5 w-16" />
            </div>
            <Skeleton className="h-3.5 w-4/5" />
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border border-[#1a2d42] bg-[#0f1929] p-5 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-16" />
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-2.5" style={{ width: `${85 - i * 10}%`, opacity: 1 - i * 0.2 }} />
      ))}
    </div>
  );
}
