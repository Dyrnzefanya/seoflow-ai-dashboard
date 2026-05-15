import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-[#1a2d42]/60 blur-xl scale-150 pointer-events-none" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1a2d42] bg-[#0c1322]">
          {icon}
        </div>
      </div>

      <h3 className="text-sm font-bold text-[#f0f4f8] mb-2">{title}</h3>
      <p className="text-xs text-[#415a72] leading-relaxed max-w-xs mb-6">{description}</p>

      {action && action}
    </div>
  );
}
