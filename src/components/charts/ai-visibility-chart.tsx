"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { aiVisibilityData } from "@/lib/placeholder-data";

export function AiVisibilityChart() {
  const max = Math.max(...aiVisibilityData.map((d) => d.score));

  return (
    <div className="space-y-4">
      {aiVisibilityData.map((item, i) => (
        <div key={item.platform} className="group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              {/* Platform color dot */}
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: item.color, boxShadow: `0 0 6px ${item.color}66` }}
              />
              <span className="text-xs font-medium text-[#8ca4be]">{item.platform}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#f0f4f8] tabular-nums">{item.score}</span>
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
                  item.change > 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {item.change > 0 ? (
                  <TrendingUp className="h-2.5 w-2.5" />
                ) : (
                  <TrendingDown className="h-2.5 w-2.5" />
                )}
                {item.change > 0 ? "+" : ""}{item.change}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-[#1a2d42] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${item.score}%`,
                background: `linear-gradient(90deg, ${item.color}99, ${item.color})`,
                boxShadow: `0 0 8px ${item.color}40`,
                transitionDelay: `${i * 80}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
