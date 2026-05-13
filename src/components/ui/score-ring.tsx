"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { wh: "w-20 h-20",  text: "text-xl",   sub: "text-[10px]", r: 30, cx: 40, cy: 40, sw: 4 },
  md: { wh: "w-28 h-28",  text: "text-2xl",  sub: "text-xs",     r: 42, cx: 56, cy: 56, sw: 5 },
  lg: { wh: "w-36 h-36",  text: "text-[32px]", sub: "text-xs",   r: 56, cx: 72, cy: 72, sw: 6 },
};

function getColor(score: number) {
  if (score >= 80) return { stroke: "#10b981", glow: "rgba(16,185,129,0.4)" };
  if (score >= 60) return { stroke: "#f59e0b", glow: "rgba(245,158,11,0.4)" };
  return                  { stroke: "#ef4444", glow: "rgba(239,68,68,0.4)" };
}

export function ScoreRing({ score, label, size = "md", className }: ScoreRingProps) {
  const { wh, text, sub, r, cx, cy, sw } = sizeMap[size];
  const circumference = 2 * Math.PI * r;
  const targetOffset  = circumference - (score / 100) * circumference;
  const color         = getColor(score);
  const viewBox       = `0 0 ${cx * 2} ${cy * 2}`;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setTimeout(() => setOffset(targetOffset), 80);
    });
    return () => cancelAnimationFrame(t);
  }, [targetOffset]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", wh, className)}>
      <svg viewBox={viewBox} className="absolute inset-0 -rotate-90" aria-hidden>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2d42" strokeWidth={sw} />
        {/* Filled arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color.stroke}
          strokeWidth={sw}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: `drop-shadow(0 0 6px ${color.glow})`,
          }}
        />
      </svg>
      <div className="relative flex flex-col items-center leading-none gap-0.5">
        <span className={cn("font-bold text-[#f0f4f8] tabular-nums", text)}>{score}</span>
        <span className={cn("text-[#8ca4be] text-center leading-snug", sub)}>{label}</span>
      </div>
    </div>
  );
}
