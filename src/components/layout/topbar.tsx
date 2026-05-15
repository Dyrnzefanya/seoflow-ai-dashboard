"use client";

import { useState } from "react";
import { Bell, Search, RefreshCw, Menu, ChevronDown } from "lucide-react";
import { useMobileNav } from "./mobile-nav-context";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const { open } = useMobileNav();
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast("Data refreshed — all metrics are up to date.", "success");
    }, 1800);
  };

  const handleNotif = () => {
    setNotifOpen((prev) => !prev);
  };

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
      <div className="flex items-center gap-1 relative">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={cn(
            "p-2 rounded-xl transition-colors",
            refreshing
              ? "text-emerald-400 bg-emerald-500/10"
              : "text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322]"
          )}
          title="Refresh data"
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
        </button>

        <button
          onClick={handleNotif}
          className="relative p-2 rounded-xl text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
        </button>

        {/* Notification dropdown */}
        {notifOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setNotifOpen(false)}
            />
            <div className="absolute right-0 top-10 z-50 w-80 rounded-2xl border border-[#1a2d42] bg-[#0c1322] shadow-[0_16px_40px_rgba(0,0,0,0.55)] overflow-hidden animate-fade-up">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a2d42]">
                <p className="text-xs font-bold text-[#f0f4f8]">Notifications</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">3 new</span>
              </div>
              <div className="divide-y divide-[#1a2d42]">
                {[
                  {
                    title: "AI Analysis Complete",
                    body: "Your weekly SEO report is ready to review.",
                    time: "2 min ago",
                    dot: "bg-emerald-400",
                  },
                  {
                    title: "Keyword Alert",
                    body: "'ai seo platform' moved to #2 — new high.",
                    time: "1 hr ago",
                    dot: "bg-blue-400",
                  },
                  {
                    title: "Technical Issue Detected",
                    body: "3 crawl errors found on service pages.",
                    time: "3 hr ago",
                    dot: "bg-amber-400",
                  },
                ].map((n) => (
                  <button
                    key={n.title}
                    onClick={() => setNotifOpen(false)}
                    className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-[#0f1929] transition-colors text-left"
                  >
                    <div className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", n.dot)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#f0f4f8] mb-0.5">{n.title}</p>
                      <p className="text-[11px] text-[#415a72] leading-snug">{n.body}</p>
                    </div>
                    <span className="text-[10px] text-[#2a3f55] shrink-0 mt-0.5">{n.time}</span>
                  </button>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-[#1a2d42]">
                <button
                  onClick={() => setNotifOpen(false)}
                  className="text-[11px] text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Date range */}
      <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0c1322] border border-[#1a2d42] hover:border-[#243d56] text-[12px] text-[#8ca4be] transition-all duration-150 font-medium">
        Last 30 days
        <ChevronDown className="h-3.5 w-3.5 text-[#415a72]" />
      </button>
    </header>
  );
}
