import Link from "next/link";
import {
  Zap, BarChart2, Cpu, Lightbulb, Search, FileText,
  Workflow, ArrowRight, TrendingUp, TrendingDown,
  CheckCircle2, ChevronRight, Globe, Sparkles,
} from "lucide-react";

// ─── Mini Dashboard Preview ───────────────────────────────────────────────────

function MiniScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 22; const cx = 28; const cy = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center w-14 h-14">
      <svg viewBox={`0 0 ${cx * 2} ${cy * 2}`} className="absolute inset-0 -rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2d42" strokeWidth={4} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}66)` }} />
      </svg>
      <div className="relative flex flex-col items-center leading-none">
        <span className="text-sm font-bold text-[#f0f4f8]">{score}</span>
        <span className="text-[8px] text-[#415a72] text-center">{label}</span>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow behind the preview */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 blur-2xl scale-105 pointer-events-none" />

      {/* Browser frame */}
      <div className="relative rounded-2xl border border-[#1a2d42] bg-[#070c18] shadow-[0_32px_64px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a2d42] bg-[#0c1322]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          <div className="flex-1 mx-4 h-5 rounded-md bg-[#1a2d42] flex items-center px-2.5 gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
            <div className="h-1 w-24 rounded bg-[#243d56]" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex h-64">
          {/* Mini sidebar */}
          <div className="w-10 border-r border-[#1a2d42] bg-[#070c18] flex flex-col items-center py-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-1.5 w-5 rounded ${i === 0 ? "bg-emerald-500/40" : "bg-[#1a2d42]"}`} />
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 p-4 space-y-3 overflow-hidden">
            {/* Score row */}
            <div className="flex items-center gap-4">
              <MiniScoreRing score={81} label="SEO" color="#10b981" />
              <MiniScoreRing score={68} label="AI" color="#3b82f6" />
              <div className="flex-1 space-y-1.5">
                {[
                  { label: "Traffic", val: "31.2k", up: true },
                  { label: "Keywords", val: "847", up: true },
                  { label: "AI Refs", val: "24", up: true },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0c1322] border border-[#1a2d42]">
                    <span className="text-[9px] text-[#415a72]">{m.label}</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-2 w-2 text-emerald-400" />
                      <span className="text-[10px] font-bold text-[#f0f4f8]">{m.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini chart */}
            <div className="rounded-lg border border-[#1a2d42] bg-[#0c1322] p-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="h-1.5 w-16 rounded bg-[#1a2d42]" />
                <div className="h-1 w-10 rounded bg-[#1a2d42]" />
              </div>
              <svg viewBox="0 0 200 40" className="w-full h-8">
                <defs>
                  <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,32 C20,28 30,22 50,20 S80,12 100,10 S130,6 160,8 S185,4 200,2" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <path d="M0,32 C20,28 30,22 50,20 S80,12 100,10 S130,6 160,8 S185,4 200,2 L200,40 L0,40 Z" fill="url(#miniGrad)" />
              </svg>
            </div>

            {/* Mini recs */}
            {[
              { color: "#ef4444", text: "Fix 14 pages missing meta descriptions" },
              { color: "#f59e0b", text: "Add FAQ schema to service pages" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0c1322] border border-[#1a2d42]">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: r.color }} />
                <span className="text-[9px] text-[#415a72] truncate">{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating stat cards */}
      <div className="absolute -left-8 top-12 hidden lg:block">
        <div className="rounded-xl border border-[#1a2d42] bg-[#0c1322] px-3 py-2.5 shadow-xl">
          <p className="text-[9px] text-[#415a72] mb-1">AI Visibility</p>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span className="text-sm font-bold text-[#f0f4f8]">+9pts</span>
          </div>
        </div>
      </div>
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="rounded-xl border border-[#1a2d42] bg-[#0c1322] px-3 py-2.5 shadow-xl">
          <p className="text-[9px] text-[#415a72] mb-1">Top Mover</p>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-[#f0f4f8]">#2</span>
            <span className="text-[9px] text-emerald-400">↑3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Feature grid ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: BarChart2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    title: "SEO Performance",
    desc: "Track organic traffic, keyword rankings, CTR, and Core Web Vitals in one unified view powered by Google Search Console.",
  },
  {
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "AI Visibility Tracking",
    desc: "Monitor whether your brand appears in ChatGPT, Perplexity, Google AI Overviews, Gemini, and Bing Copilot answers.",
  },
  {
    icon: Globe,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    title: "GEO & AEO Optimization",
    desc: "Optimize your content for Generative Engine Optimization and Answer Engine Optimization with AI-guided schema recommendations.",
  },
  {
    icon: Lightbulb,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "AI Recommendations",
    desc: "Claude AI analyses your site daily and delivers concise, business-focused action items ranked by impact and effort.",
  },
  {
    icon: Search,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    title: "Keyword Intelligence",
    desc: "Monitor thousands of keywords, track position changes, spot opportunities under KD 40, and benchmark against competitors.",
  },
  {
    icon: FileText,
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
    title: "Automated Reports",
    desc: "Receive weekly performance summaries with AI-written insights, shareable links, and one-click PDF export for clients.",
  },
];

// ─── Differentiators ──────────────────────────────────────────────────────────

const differentiators = [
  "Tracks AI visibility across 5 major LLM platforms — not just Google",
  "AI recommendations powered by Claude — concise, business-focused, actionable",
  "GEO & AEO monitoring built-in, not bolted on",
  "Unified dashboard: no more switching between 6 different tools",
  "Weekly AI-written summaries your clients can actually read",
  "Workflow task management built around your recommendations",
];

// ─── Platform logos ────────────────────────────────────────────────────────────

const platforms = [
  { name: "ChatGPT",       color: "#10a37f", bg: "bg-[#10a37f]/10 border-[#10a37f]/20" },
  { name: "Google AI",     color: "#4285F4", bg: "bg-[#4285F4]/10 border-[#4285F4]/20" },
  { name: "Perplexity",    color: "#f59e0b", bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Gemini",        color: "#7c3aed", bg: "bg-purple-500/10 border-purple-500/20" },
  { name: "Bing Copilot",  color: "#0078d4", bg: "bg-blue-500/10 border-blue-500/20" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070c18] text-[#f0f4f8]">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-[#1a2d42]/80 bg-[#070c18]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-[#f0f4f8]">SEOFlow</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 leading-none">
                AI
              </span>
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-6">
              {["Features", "How it works", "Pricing"].map((l) => (
                <a key={l} href="#" className="text-sm text-[#415a72] hover:text-[#8ca4be] transition-colors font-medium">
                  {l}
                </a>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070c18]/50 to-[#070c18]" />
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div className="space-y-8 max-w-xl">
              {/* AI badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/8 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Powered by Claude AI · GPT-4 · Gemini
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                  The AI-Powered Platform for{" "}
                  <span className="gradient-text">Modern Search Visibility</span>
                </h1>
                <p className="text-lg text-[#415a72] leading-relaxed">
                  Monitor SEO performance, track AI visibility across ChatGPT, Perplexity, and Google AI Overviews, and get daily actionable recommendations — all in one unified dashboard.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                >
                  View Live Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#features"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#1a2d42] text-sm font-semibold text-[#8ca4be] hover:border-[#243d56] hover:text-[#f0f4f8] transition-all"
                >
                  See Features
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {[
                  { value: "3,200+", label: "Teams" },
                  { value: "24M+",   label: "Keywords" },
                  { value: "5",      label: "AI Platforms" },
                  { value: "97%",    label: "Satisfaction" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-lg font-black text-[#f0f4f8]">{s.value}</p>
                    <p className="text-[11px] text-[#415a72] font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: dashboard preview */}
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* ── AI Platforms bar ────────────────────────────────────────── */}
      <section className="border-y border-[#1a2d42] bg-[#0c1322]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#2a3f55] mb-6">
            Track your visibility across all major AI platforms
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${p.bg} font-medium text-sm`}
                style={{ color: p.color }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section id="features" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              Everything you need
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Built for the AI-first web
            </h2>
            <p className="text-[#415a72] text-lg max-w-2xl mx-auto">
              SEOFlow combines SEO monitoring, AI visibility tracking, and GEO/AEO optimization in a single platform your whole team can use.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group p-6 rounded-2xl border border-[#1a2d42] bg-[#0f1929] hover:border-[#243d56] hover:bg-[#0c1a2c] transition-all duration-200"
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${f.bg} mb-4`}>
                    <Icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-[#f0f4f8] mb-2">{f.title}</h3>
                  <p className="text-xs text-[#415a72] leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why SEOFlow ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-[#1a2d42]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Why SEOFlow</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Traditional SEO tools weren't built for the AI era
              </h2>
              <p className="text-[#415a72] leading-relaxed">
                Google, ChatGPT, and Perplexity are all competing for your audience's attention. SEOFlow is the first platform that tracks your presence across all of them.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Try the demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {differentiators.map((d, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-4 rounded-xl border border-[#1a2d42] bg-[#0f1929] hover:border-[#243d56] transition-colors"
                >
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#8ca4be] leading-snug font-medium">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-[#1a2d42] bg-[#0c1322]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Three steps to full visibility</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {[
              {
                step: "01",
                icon: Globe,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20",
                title: "Connect your properties",
                desc: "Link your Google Search Console, GA4, and target URLs in under 5 minutes. No developer required.",
              },
              {
                step: "02",
                icon: Cpu,
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20",
                title: "AI analyses everything",
                desc: "Claude AI scans your SEO data, checks AI platform visibility, and identifies your highest-impact opportunities daily.",
              },
              {
                step: "03",
                icon: Workflow,
                color: "text-purple-400",
                bg: "bg-purple-500/10 border-purple-500/20",
                title: "Act on recommendations",
                desc: "Work through prioritised action items in the built-in Workflow, then track results in your weekly automated report.",
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative p-6 rounded-2xl border border-[#1a2d42] bg-[#0f1929]">
                  <span className="text-5xl font-black text-[#1a2d42] absolute top-4 right-5 select-none leading-none">
                    {s.step}
                  </span>
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${s.bg} mb-5`}>
                    <Icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-[#f0f4f8] mb-2">{s.title}</h3>
                  <p className="text-xs text-[#415a72] leading-relaxed">{s.desc}</p>
                  {i < 2 && (
                    <ArrowRight className="hidden sm:block absolute -right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1a2d42] z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-[#1a2d42]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl scale-150 pointer-events-none" />
            <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mx-auto">
              <Zap className="h-7 w-7 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to take control of your{" "}
            <span className="gradient-text">AI search presence?</span>
          </h2>
          <p className="text-[#415a72] text-lg max-w-xl mx-auto leading-relaxed">
            Join 3,200+ teams using SEOFlow to monitor SEO, track AI visibility, and act on recommendations that actually move the needle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              Open Live Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[#1a2d42] text-sm font-semibold text-[#8ca4be] hover:border-[#243d56] hover:text-[#f0f4f8] transition-all"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1a2d42] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/25">
                <Zap className="h-3 w-3 text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-[#8ca4be]">SEOFlow AI</span>
            </div>
            <p className="text-xs text-[#415a72]">
              © 2025 SEOFlow. The AI-powered SEO & GEO platform.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#415a72]">
              <a href="#" className="hover:text-[#8ca4be] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#8ca4be] transition-colors">Terms</a>
              <Link href="/dashboard" className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors">
                Open Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
