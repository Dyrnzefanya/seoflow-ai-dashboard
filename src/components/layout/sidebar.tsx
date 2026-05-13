"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, Cpu, Lightbulb,
  Search, FileText, Workflow, Settings, Zap, ChevronDown, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileNav } from "./mobile-nav-context";

const navItems = [
  { href: "/dashboard",       label: "Overview",        icon: LayoutDashboard, badge: null },
  { href: "/seo",             label: "SEO Performance", icon: TrendingUp,      badge: null },
  { href: "/ai-visibility",   label: "AI Visibility",   icon: Cpu,             badge: null },
  { href: "/recommendations", label: "Recommendations", icon: Lightbulb,       badge: "8" },
  { href: "/keywords",        label: "Keywords",        icon: Search,          badge: null },
  { href: "/reports",         label: "Reports",         icon: FileText,        badge: null },
  { href: "/workflow",        label: "Workflow",        icon: Workflow,        badge: "3" },
];

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-[18px] border-b border-[#1a2d42]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
          <Zap className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <span className="text-sm font-bold text-[#f0f4f8] tracking-tight">SEOFlow</span>
        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 leading-none">
          AI
        </span>
      </div>

      {/* Project selector */}
      <div className="px-3 py-3 border-b border-[#1a2d42]">
        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#0c1322] transition-colors group text-left">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500/30 to-blue-600/20 border border-blue-500/30 shrink-0 flex items-center justify-center">
            <span className="text-[9px] font-bold text-blue-400">AC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#f0f4f8] truncate">acme-corp.com</p>
            <p className="text-[10px] text-[#415a72]">Pro Plan · 847 keywords</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-[#415a72] shrink-0 group-hover:text-[#8ca4be] transition-colors" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <p className="px-3 mb-2.5 text-[10px] font-bold uppercase tracking-widest text-[#2a3f55]">
          Main Menu
        </p>
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onLinkClick}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 shadow-[inset_0_1px_0_rgba(16,185,129,0.1)]"
                  : "text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] border border-transparent"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0 transition-colors", active ? "text-emerald-400" : "text-[#415a72] group-hover:text-[#8ca4be]")} />
              <span className="flex-1">{label}</span>
              {badge && !active && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 leading-none">
                  {badge}
                </span>
              )}
              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-[#1a2d42] space-y-0.5">
        <Link
          href="/settings"
          onClick={onLinkClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] border border-transparent transition-all duration-150"
        >
          <Settings className="h-4 w-4 shrink-0" />
          <span>Settings</span>
        </Link>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shrink-0 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <span className="text-[11px] font-bold text-white">AJ</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#f0f4f8] truncate">Alex Johnson</p>
            <p className="text-[10px] text-[#415a72] truncate">alex@acme-corp.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  const { isOpen, close } = useMobileNav();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[#1a2d42] bg-[#070c18] h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          {/* Drawer */}
          <aside className="animate-slide-left absolute left-0 top-0 bottom-0 w-72 bg-[#070c18] border-r border-[#1a2d42] flex flex-col shadow-2xl">
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] transition-colors"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
            <NavContent onLinkClick={close} />
          </aside>
        </div>
      )}
    </>
  );
}
