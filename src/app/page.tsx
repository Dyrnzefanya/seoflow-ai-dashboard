import Link from "next/link";
import {
  Zap, BarChart2, Cpu, Lightbulb, Search, FileText,
  Workflow, ArrowRight, TrendingUp,
  CheckCircle2, ChevronRight, Globe, Sparkles, Star,
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
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 blur-2xl scale-105 pointer-events-none" />

      {/* Browser frame */}
      <div className="relative rounded-2xl border border-[#1a2d42] bg-[#070c18] shadow-[0_32px_64px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a2d42] bg-[#0c1322]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          <div className="flex-1 mx-4 h-5 rounded-md bg-[#1a2d42] flex items-center px-2.5 gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
            <span className="text-[9px] text-[#2a3f55] font-mono">app.seoflow.io/dashboard</span>
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
            <div className="flex items-center gap-4">
              <MiniScoreRing score={81} label="SEO" color="#10b981" />
              <MiniScoreRing score={68} label="AI" color="#3b82f6" />
              <div className="flex-1 space-y-1.5">
                {[
                  { label: "Traffic", val: "31.2k" },
                  { label: "Keywords", val: "847" },
                  { label: "AI Refs", val: "24" },
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
                <div className="h-1.5 w-20 rounded bg-[#1a2d42]" />
                <div className="h-1 w-12 rounded bg-[#1a2d42]" />
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

            {[
              { color: "#ef4444", text: "Fix 14 pages missing meta descriptions" },
              { color: "#f59e0b", text: "Add FAQ schema to service pages → 3× AI citations" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0c1322] border border-[#1a2d42]">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: r.color }} />
                <span className="text-[9px] text-[#415a72] truncate">{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -left-10 top-10 hidden lg:block">
        <div className="rounded-xl border border-[#1a2d42] bg-[#0c1322] px-3.5 py-3 shadow-xl">
          <p className="text-[9px] text-[#415a72] mb-1 font-medium">AI Visibility</p>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span className="text-sm font-bold text-[#f0f4f8]">+9 pts</span>
          </div>
          <p className="text-[8px] text-[#415a72] mt-0.5">this month</p>
        </div>
      </div>
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="rounded-xl border border-[#1a2d42] bg-[#0c1322] px-3.5 py-3 shadow-xl">
          <p className="text-[9px] text-[#415a72] mb-1 font-medium">Top Mover</p>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-emerald-400">#2</span>
            <span className="text-[9px] text-emerald-400 font-bold">↑3</span>
          </div>
          <p className="text-[8px] text-[#415a72] mt-0.5">ai seo platform</p>
        </div>
      </div>
      <div className="absolute -left-6 bottom-8 hidden lg:block">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-3 py-2 shadow-xl">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
            <span className="text-[9px] font-bold text-emerald-400">8 AI actions ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "We were ranking #1 on Google but invisible on ChatGPT. SEOFlow showed us the gap and gave us the exact steps to close it. Perplexity citations up 4× in six weeks.",
    name: "Sarah Chen",
    role: "Head of SEO",
    company: "Mira Analytics",
    initials: "SC",
    color: "from-blue-500/30 to-blue-600/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  {
    quote:
      "Replaced three separate tools with SEOFlow. The AI recommendations are the first thing my team checks on Monday — they're specific, ranked by impact, and actually actionable.",
    name: "Marcus Reid",
    role: "Founder & CEO",
    company: "GrowthStack",
    initials: "MR",
    color: "from-purple-500/30 to-purple-600/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
  },
  {
    quote:
      "The weekly AI-written summaries are what I send to clients now. They finally understand what GEO optimization is and why it matters for their business.",
    name: "Priya Nair",
    role: "Digital Marketing Director",
    company: "Velocity Labs",
    initials: "PN",
    color: "from-emerald-500/30 to-emerald-600/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────

const features = [
  {
    icon: BarChart2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    title: "SEO Performance",
    desc: "Traffic, rankings, CTR, and Core Web Vitals from Google Search Console — surfaced in a single view that takes seconds to read.",
  },
  {
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "AI Visibility Tracking",
    desc: "Know exactly when and how your brand appears in ChatGPT, Perplexity, Google AI Overviews, Gemini, and Bing Copilot — daily.",
  },
  {
    icon: Globe,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    title: "GEO & AEO Optimization",
    desc: "Schema markup recommendations, structured content guidance, and answer-engine strategies built specifically for generative search.",
  },
  {
    icon: Lightbulb,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "AI Recommendations",
    desc: "Claude AI audits your site daily and delivers a prioritised action list — each item ranked by impact, effort, and estimated gain.",
  },
  {
    icon: Search,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    title: "Keyword Intelligence",
    desc: "Track rankings, spot opportunities under KD 40, and see which keywords are driving AI citations — not just organic clicks.",
  },
  {
    icon: FileText,
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
    title: "Automated Reports",
    desc: "Weekly AI-written performance summaries with one-click PDF export and shareable links — ready to send to clients as-is.",
  },
];

// ─── Differentiators ──────────────────────────────────────────────────────────

const differentiators = [
  "Tracks AI visibility across ChatGPT, Perplexity, Gemini, Google AI, and Bing Copilot",
  "Daily AI recommendations from Claude — specific, ranked, and ready to act on",
  "GEO & AEO monitoring built-in, not duct-taped to an old SEO tool",
  "One platform replaces your SEO tracker, AI monitor, and reporting tool",
  "Weekly reports your clients can actually read — generated by AI, edited by nobody",
  "Workflow board keeps your team aligned on what to work on next",
];

// ─── AI Platforms ─────────────────────────────────────────────────────────────

const platforms = [
  { name: "ChatGPT",      color: "#10a37f", bg: "bg-[#10a37f]/10 border-[#10a37f]/20" },
  { name: "Google AI",    color: "#4285F4", bg: "bg-[#4285F4]/10 border-[#4285F4]/20" },
  { name: "Perplexity",   color: "#f59e0b", bg: "bg-amber-500/10 border-amber-500/20" },
  { name: "Gemini",       color: "#7c3aed", bg: "bg-purple-500/10 border-purple-500/20" },
  { name: "Bing Copilot", color: "#0078d4", bg: "bg-blue-500/10 border-blue-500/20" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070c18] text-[#f0f4f8]">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-[#1a2d42]/80 bg-[#070c18]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-[#f0f4f8]">SEOFlow</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 leading-none">
                AI
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-[#415a72] hover:text-[#8ca4be] transition-colors font-medium">
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#415a72] hover:text-[#8ca4be] transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Try the demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070c18]/50 to-[#070c18]" />
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div className="space-y-8 max-w-xl">
              {/* Announcement badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/8 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                New — Track AI visibility across ChatGPT, Perplexity &amp; Gemini
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                  Your brand is probably{" "}
                  <span className="gradient-text">invisible to AI search.</span>{" "}
                  We fix that.
                </h1>
                <p className="text-lg text-[#415a72] leading-relaxed">
                  SEOFlow tracks exactly where your brand shows up across Google, ChatGPT, Perplexity, and Gemini — then gives you a clear action list to rank higher across all of them.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                >
                  See the live demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#features"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#1a2d42] text-sm font-semibold text-[#8ca4be] hover:border-[#243d56] hover:text-[#f0f4f8] transition-all"
                >
                  Explore features
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <p className="text-xs text-[#2a3f55] font-medium">
                No account needed · Live interactive demo · Free to explore
              </p>

              {/* Social proof stats */}
              <div className="flex flex-wrap items-center gap-5 pt-1 border-t border-[#1a2d42]">
                {[
                  { value: "2,800+", label: "Teams using SEOFlow" },
                  { value: "5",      label: "AI platforms tracked" },
                  { value: "97%",    label: "Would recommend" },
                  { value: "34%",    label: "Avg. visibility lift" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-base font-black text-[#f0f4f8]">{s.value}</p>
                    <p className="text-[10px] text-[#415a72] font-medium">{s.label}</p>
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
            Track your visibility across every major AI platform
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
              Everything in one place
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Built for search in the AI era
            </h2>
            <p className="text-[#415a72] text-lg max-w-2xl mx-auto leading-relaxed">
              Every feature is designed around a simple question: where does your brand show up when someone searches — on Google or an AI platform — and how do you rank higher?
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

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-[#1a2d42] bg-[#0c1322]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              What teams are saying
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Trusted by SEO teams that take AI seriously
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col p-6 rounded-2xl border border-[#1a2d42] bg-[#0f1929] hover:border-[#243d56] hover:bg-[#0c1a2c] transition-all duration-200"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="flex-1 text-sm text-[#8ca4be] leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#1a2d42]">
                  <div className={`h-9 w-9 rounded-full bg-gradient-to-br border shrink-0 flex items-center justify-center ${t.color} ${t.border}`}>
                    <span className={`text-[10px] font-bold ${t.text}`}>{t.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#f0f4f8]">{t.name}</p>
                    <p className="text-[10px] text-[#415a72] truncate">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
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
                Traditional SEO tools weren't built for what search looks like now
              </h2>
              <p className="text-[#415a72] leading-relaxed">
                40% of search queries now get answered by AI before anyone clicks a link. If you&apos;re only optimising for the blue links, you&apos;re optimising for half the picture. SEOFlow covers both.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Explore the demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {differentiators.map((d, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-4 rounded-xl border border-[#1a2d42] bg-[#0f1929] hover:border-[#243d56] transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#8ca4be] leading-snug font-medium">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 lg:py-28 border-t border-[#1a2d42] bg-[#0c1322]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Up and running in under 5 minutes
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {[
              {
                step: "01",
                icon: Globe,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20",
                title: "Connect your properties",
                desc: "Link Google Search Console and add your target URLs. No developer required — takes under 5 minutes, works immediately.",
              },
              {
                step: "02",
                icon: Cpu,
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20",
                title: "Claude audits everything",
                desc: "Our AI scans your SEO signals, checks all 5 AI platforms for your brand, and ranks every opportunity by real business impact.",
              },
              {
                step: "03",
                icon: Workflow,
                color: "text-purple-400",
                bg: "bg-purple-500/10 border-purple-500/20",
                title: "Work the action list",
                desc: "A clear priority queue — ranked by impact, not just severity. Track progress in the built-in Workflow board and watch results in your weekly report.",
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

      {/* ── Pricing teaser ──────────────────────────────────────────── */}
      <section id="pricing" className="py-20 lg:py-28 border-t border-[#1a2d42]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Simple, transparent plans</h2>
            <p className="text-[#415a72] max-w-xl mx-auto">Start free. Scale when you&apos;re ready. No hidden fees, no long-term contracts.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "forever",
                desc: "For individuals exploring AI search visibility.",
                features: ["1 project", "5 AI platforms tracked", "50 keywords", "Weekly reports"],
                cta: "Start free",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$49",
                period: "per month",
                desc: "For teams serious about winning AI search.",
                features: ["5 projects", "All 5 AI platforms", "1,000 keywords", "Daily AI recommendations", "PDF export & sharing", "Priority support"],
                cta: "Start 14-day trial",
                highlight: true,
              },
              {
                name: "Agency",
                price: "$149",
                period: "per month",
                desc: "For agencies managing multiple clients.",
                features: ["Unlimited projects", "White-label reports", "Client sharing links", "API access", "Custom AI prompts", "Dedicated support"],
                cta: "Contact sales",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-2xl border transition-all duration-200 ${
                  plan.highlight
                    ? "border-emerald-500/30 bg-gradient-to-b from-emerald-500/8 to-transparent shadow-[0_0_40px_rgba(16,185,129,0.08)]"
                    : "border-[#1a2d42] bg-[#0f1929] hover:border-[#243d56]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                      Most popular
                    </span>
                  </div>
                )}
                <p className="text-xs font-bold uppercase tracking-widest text-[#415a72] mb-3">{plan.name}</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-3xl font-black text-[#f0f4f8]">{plan.price}</span>
                  <span className="text-xs text-[#415a72]">/{plan.period}</span>
                </div>
                <p className="text-xs text-[#415a72] mb-5 leading-relaxed">{plan.desc}</p>
                <div className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="text-xs text-[#8ca4be]">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/dashboard"
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    plan.highlight
                      ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                      : "border border-[#1a2d42] text-[#8ca4be] hover:border-[#243d56] hover:text-[#f0f4f8]"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
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

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Stop guessing. Start knowing exactly where{" "}
              <span className="gradient-text">your brand ranks across AI.</span>
            </h2>
            <p className="text-[#415a72] text-lg max-w-xl mx-auto leading-relaxed">
              Explore the full dashboard right now — no account, no signup, no credit card. See exactly what SEOFlow shows you about a real site.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              Open the live demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[#1a2d42] text-sm font-semibold text-[#8ca4be] hover:border-[#243d56] hover:text-[#f0f4f8] transition-all"
            >
              Learn more
            </a>
          </div>

          <p className="text-xs text-[#2a3f55] font-medium">
            Free to explore · No account required · Live interactive demo
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1a2d42] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/25">
                <Zap className="h-3 w-3 text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-[#8ca4be]">SEOFlow AI</span>
            </div>
            <p className="text-xs text-[#2a3f55]">
              © 2026 SEOFlow. Built for the AI search era.
            </p>
            <div className="flex items-center gap-5 text-xs text-[#415a72]">
              <a href="#" className="hover:text-[#8ca4be] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#8ca4be] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#8ca4be] transition-colors">Blog</a>
              <Link href="/dashboard" className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors">
                Open demo →
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
