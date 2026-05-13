"use client";

import { Bell, Search, RefreshCw, Menu, ChevronDown } from "lucide-react";
import { useMobileNav } from "./mobile-nav-context";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const { open } = useMobileNav();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#1a2d42] bg-[#070c18]/95 backdrop-blur-md px-4 lg:px-6 shrink-0">
      {/* Mobile menu */}
      <button
        onClick={open}
        className="lg:hidden p-2 rounded-xl text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-bold text-[#f0f4f8] truncate leading-none">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-[11px] text-[#415a72] truncate hidden sm:block">{subtitle}</p>
        )}
      </div>

      {/* Search bar */}
      <button className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0c1322] border border-[#1a2d42] text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all duration-150 min-w-[200px]">
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="text-[12px] flex-1 text-left">Search anything...</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#1a2d42] text-[#415a72] font-mono leading-none">
          ⌘K
        </kbd>
      </button>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-xl text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] transition-colors"
          title="Refresh data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <button
          className="relative p-2 rounded-xl text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
        </button>
      </div>

      {/* Date range */}
      <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0c1322] border border-[#1a2d42] hover:border-[#243d56] text-[12px] text-[#8ca4be] transition-all duration-150 font-medium">
        Last 30 days
        <ChevronDown className="h-3.5 w-3.5 text-[#415a72]" />
      </button>
    </header>
  );
}
