import { cn } from "@/lib/utils";

interface ShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: ShellProps) {
  return (
    <main className={cn("flex-1 overflow-y-auto", className)}>
      <div className="mx-auto max-w-7xl space-y-5 p-4 pb-10 lg:p-6 lg:pb-12">
        {children}
      </div>
    </main>
  );
}

export function PageSection({ children, className }: ShellProps) {
  return <section className={cn("space-y-5", className)}>{children}</section>;
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold text-[#f0f4f8]">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-[#415a72]">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function GridCols2({ children, className }: ShellProps) {
  return (
    <div className={cn("grid gap-4 grid-cols-1 lg:grid-cols-2", className)}>
      {children}
    </div>
  );
}

export function GridCols3({ children, className }: ShellProps) {
  return (
    <div className={cn("grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}

export function GridCols4({ children, className }: ShellProps) {
  return (
    <div className={cn("grid gap-4 grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}
