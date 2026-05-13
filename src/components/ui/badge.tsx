import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "purple";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[#1a2d42] text-[#8ca4be] border border-[#243d56]",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  danger:  "bg-red-500/10 text-red-400 border border-red-500/20",
  info:    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  purple:  "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium leading-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
