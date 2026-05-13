"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { trafficData } from "@/lib/placeholder-data";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + p.value, 0);
  return (
    <div className="rounded-xl border border-[#1a2d42] bg-[#0c1322] p-3.5 shadow-2xl text-xs min-w-[140px]">
      <p className="mb-2.5 font-semibold text-[#8ca4be] text-[11px] uppercase tracking-wider">{label} 2025</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
          <span className="flex items-center gap-1.5 text-[#415a72] capitalize">
            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: p.color }} />
            {p.dataKey}
          </span>
          <span className="font-bold text-[#f0f4f8] tabular-nums">{p.value.toLocaleString()}</span>
        </div>
      ))}
      <div className="mt-2.5 pt-2.5 border-t border-[#1a2d42] flex items-center justify-between">
        <span className="text-[#415a72]">Total</span>
        <span className="font-bold text-[#f0f4f8] tabular-nums">{total.toLocaleString()}</span>
      </div>
    </div>
  );
}

export function TrafficChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={trafficData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
        <defs>
          <linearGradient id="organicGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="paidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="#1a2d42" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: "#415a72", fontSize: 11, fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#415a72", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#243d56", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="organic"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#organicGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#10b981", stroke: "#0c1322", strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="paid"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#paidGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#3b82f6", stroke: "#0c1322", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
