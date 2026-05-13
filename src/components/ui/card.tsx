"use client";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  glow?: boolean;
}

export function Card({ className, glass, glow, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-[#1a2d42] bg-[#0f1929] p-5",
        "shadow-[0_2px_12px_rgba(0,0,0,0.35),_0_0_0_1px_rgba(255,255,255,0.02)]",
        "transition-all duration-200",
        "hover:border-[#243d56] hover:shadow-[0_4px_20px_rgba(0,0,0,0.45),_0_0_0_1px_rgba(16,185,129,0.06)]",
        glass && "backdrop-blur-sm bg-[#0f1929]/80",
        glow && "border-emerald-500/25 shadow-[0_2px_12px_rgba(0,0,0,0.35),_0_0_24px_rgba(16,185,129,0.06)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-5 flex items-center justify-between gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-semibold text-[#8ca4be]", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
