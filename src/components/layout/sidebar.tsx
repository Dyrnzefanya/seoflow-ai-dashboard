"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, TrendingUp, Cpu, Lightbulb,
  Search, FileText, Workflow, Settings, Zap, ChevronDown, X, Plus, Layers,
  PenLine, StickyNote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileNav } from "./mobile-nav-context";
import { useModal } from "@/components/providers/modal-context";

const navItems = [
  { href: "/dashboard",       label: "Overview",        icon: LayoutDashboard, badge: null },
  { href: "/seo",             label: "SEO Performance", icon: TrendingUp,      badge: null },
  { href: "/ai-visibility",   label: "AI Visibility",   icon: Cpu,             badge: null },
  { href: "/recommendations", label: "Recommendations", icon: Lightbulb,       badge: "8" },
  { href: "/keywords",        label: "Keywords",        icon: Search,          badge: null },
  { href: "/content",         label: "Content Ideas",   icon: PenLine,         badge: null },
  { href: "/reports",         label: "Reports",         icon: FileText,        badge: null },
  { href: "/workflow",        label: "Workflow",        icon: Workflow,        badge: "3" },
  { href: "/notes",           label: "Notes",           icon: StickyNote,      badge: null },
];

const projects = [
  {
    abbr: "AC",
    name: "acme-corp.com",
    plan: "Pro Plan · 847 keywords",
    active: true,
    gradient: "from-blue-500/30 to-blue-600/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  {
    abbr: "MY",
    name: "myshop.io",
    plan: "Starter · 234 keywords",
    active: false,
    gradient: "from-purple-500/30 to-purple-600/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
  },
];

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const { openAddProject, openManageProjects } = useModal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

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
      <div className="px-3 py-3 border-b border-[#1a2d42] relative" ref={dropdownRef}>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#0c1322] transition-colors group text-left min-w-0"
          >
            <div
              className={cn(
                "h-6 w-6 rounded-md bg-gradient-to-br border shrink-0 flex items-center justify-center",
                activeProject.gradient,
                activeProject.border
              )}
            >
              <span className={cn("text-[9px] font-bold", activeProject.text)}>
                {activeProject.abbr}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#f0f4f8] truncate">{activeProject.name}</p>
              <p className="text-[10px] text-[#415a72]">{activeProject.plan}</p>
            </div>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-[#415a72] shrink-0 transition-transform duration-200",
                dropdownOpen && "rotate-180"
              )}
            />
          </button>

          <button
            onClick={() => { setDropdownOpen(false); openAddProject(); }}
            title="Add new project"
            className="p-1.5 rounded-lg text-[#415a72] hover:text-emerald-400 hover:bg-[#0c1322] transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute top-full left-3 right-3 z-50 mt-1 rounded-xl border border-[#1a2d42] bg-[#0c1322] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            <p className="px-3 pt-2.5 pb-1.5 text-[9px] font-bold uppercase tracking-widest text-[#2a3f55]">
              Your projects
            </p>
            {projects.map((proj) => (
              <button
                key={proj.name}
                onClick={() => { setActiveProject(proj); setDropdownOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#0f1929] transition-colors text-left"
              >
                <div
                  className={cn(
                    "h-6 w-6 rounded-md bg-gradient-to-br border shrink-0 flex items-center justify-center",
                    proj.gradient, proj.border
                  )}
                >
                  <span className={cn("text-[9px] font-bold", proj.text)}>{proj.abbr}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#f0f4f8] truncate">{proj.name}</p>
                  <p className="text-[10px] text-[#415a72]">{proj.plan}</p>
                </div>
                {activeProject.name === proj.name && (
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                )}
              </button>
            ))}
            <div className="border-t border-[#1a2d42]">
              <button
                onClick={() => { setDropdownOpen(false); openManageProjects(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#0f1929] transition-colors text-left"
              >
                <div className="h-6 w-6 rounded-md border border-[#1a2d42] shrink-0 flex items-center justify-center">
                  <Layers className="h-3.5 w-3.5 text-[#415a72]" />
                </div>
                <span className="text-xs font-semibold text-[#415a72]">Manage projects</span>
              </button>
              <button
                onClick={() => { setDropdownOpen(false); openAddProject(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#0f1929] transition-colors text-left"
              >
                <div className="h-6 w-6 rounded-md border border-dashed border-emerald-500/30 shrink-0 flex items-center justify-center">
                  <Plus className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-emerald-400">Add new project</span>
              </button>
            </div>
          </div>
        )}
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
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-emerald-400" : "text-[#415a72] group-hover:text-[#8ca4be]"
                )}
              />
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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <aside className="animate-slide-left absolute left-0 top-0 bottom-0 w-72 bg-[#070c18] border-r border-[#1a2d42] flex flex-col shadow-2xl">
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
