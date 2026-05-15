"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, Globe, Zap, Sparkles,
  BarChart2, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "seoflow_onboarding_v1";

type Step = "welcome" | "add-site" | "connect-gsc" | "connecting" | "done";

const STEP_PROGRESS: Record<Step, string> = {
  welcome: "0%",
  "add-site": "28%",
  "connect-gsc": "56%",
  connecting: "80%",
  done: "100%",
};

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url || "";
  }
}

// ── Welcome ──────────────────────────────────────────────────────────────────

function WelcomeStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-[#f0f4f8]">SEOFlow</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 leading-none">AI</span>
        </div>
        <button
          onClick={onSkip}
          className="text-xs text-[#2a3f55] hover:text-[#415a72] transition-colors font-medium"
        >
          Skip setup
        </button>
      </div>

      <div className="text-center space-y-4 mb-10">
        <div className="relative inline-block mx-auto">
          <div className="absolute inset-0 rounded-full bg-emerald-500/15 blur-2xl scale-150 pointer-events-none" />
          <div className="relative inline-flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mx-auto">
            <Sparkles className="h-9 w-9 text-emerald-400" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#f0f4f8] mb-2.5 leading-tight">
            Let&apos;s get you visible<br />
            <span className="text-emerald-400">everywhere it matters.</span>
          </h2>
          <p className="text-sm text-[#415a72] leading-relaxed max-w-sm mx-auto">
            Set up takes under 3 minutes. You&apos;ll walk away knowing exactly where your brand stands — on Google <em>and</em> every major AI platform.
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        {[
          {
            icon: BarChart2,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
            text: "See your real keyword rankings & organic traffic in one place",
          },
          {
            icon: Globe,
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20",
            text: "Track how often your brand appears in ChatGPT, Perplexity & Gemini answers",
          },
          {
            icon: Sparkles,
            color: "text-purple-400",
            bg: "bg-purple-500/10 border-purple-500/20",
            text: "Get a prioritised fix list from Claude AI — updated every 24 hours",
          },
        ].map(({ icon: Icon, color, bg, text }) => (
          <div
            key={text}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1a2d42] bg-[#070c18]"
          >
            <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg border shrink-0", bg)}>
              <Icon className={cn("h-3.5 w-3.5", color)} />
            </div>
            <span className="flex-1 text-xs font-medium text-[#8ca4be]">{text}</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.3)]"
      >
        Set up my dashboard
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="text-center text-[10px] text-[#2a3f55] mt-4 font-medium">
        No credit card required · Cancel anytime
      </p>
    </div>
  );
}

// ── Add Site ─────────────────────────────────────────────────────────────────

function AddSiteStep({
  url, setUrl,
  projectName, setProjectName,
  onNext, onBack,
}: {
  url: string; setUrl: (v: string) => void;
  projectName: string; setProjectName: (v: string) => void;
  onNext: () => void; onBack: () => void;
}) {
  const handleUrlChange = (val: string) => {
    setUrl(val);
    const domain = extractDomain(val);
    if (domain) setProjectName(domain);
  };

  return (
    <div className="p-8">
      <button
        onClick={onBack}
        className="text-xs text-[#415a72] hover:text-[#8ca4be] mb-6 flex items-center gap-1 transition-colors font-medium"
      >
        ← Back
      </button>

      <div className="mb-7">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">Step 1 of 3</p>
        <h2 className="text-xl font-black text-[#f0f4f8] mb-1">Add your website</h2>
        <p className="text-xs text-[#415a72] leading-relaxed">Enter the URL you want to track and optimise.</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-xs font-semibold text-[#8ca4be] mb-2">Website URL <span className="text-red-400">*</span></label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#415a72]" />
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://yoursite.com"
              autoFocus
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#1a2d42] bg-[#070c18] text-sm text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8ca4be] mb-2">
            Project name <span className="text-[#2a3f55] font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My Website"
            className="w-full px-4 py-3 rounded-xl border border-[#1a2d42] bg-[#070c18] text-sm text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8ca4be] mb-2">Industry</label>
          <div className="relative">
            <select
              defaultValue=""
              className="w-full appearance-none px-4 py-3 rounded-xl border border-[#1a2d42] bg-[#070c18] text-sm text-[#8ca4be] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
            >
              <option value="" disabled>Select industry...</option>
              <option>SaaS / Software</option>
              <option>E-commerce</option>
              <option>Agency / Marketing</option>
              <option>Media / Publishing</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Other</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#415a72] pointer-events-none" />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!url.trim()}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.25)]"
      >
        Continue
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Connect GSC ──────────────────────────────────────────────────────────────

function ConnectGSCStep({
  onConnect, onSkip,
}: { onConnect: () => void; onSkip: () => void }) {
  return (
    <div className="p-8">
      <div className="mb-7">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">Step 2 of 3</p>
        <h2 className="text-xl font-black text-[#f0f4f8] mb-1">Connect Google Search Console</h2>
        <p className="text-xs text-[#415a72] leading-relaxed">
          Link GSC to pull real traffic, impressions, CTR, and position data automatically.
        </p>
      </div>

      <div className="mb-6 p-4 rounded-2xl border border-[#1a2d42] bg-[#070c18]">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2a3f55] mb-3">What you unlock</p>
        <div className="space-y-2.5">
          {[
            "Real organic traffic & click data",
            "Search position tracking per keyword",
            "Impression share and CTR analytics",
            "Core Web Vitals from Google's crawlers",
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="text-xs text-[#8ca4be] font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onConnect}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-[#243d56] bg-[#0c1322] hover:bg-[#0f1929] text-sm font-bold text-[#f0f4f8] transition-all mb-3"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Connect with Google
      </button>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-[#1a2d42]" />
        <span className="text-[10px] text-[#2a3f55] font-semibold">or</span>
        <div className="flex-1 h-px bg-[#1a2d42]" />
      </div>

      <button
        onClick={onSkip}
        className="w-full py-3 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
      >
        Skip for now — I&apos;ll connect later
      </button>

      <p className="text-center text-[10px] text-[#2a3f55] mt-4 leading-relaxed">
        Read-only access only. Your data is never shared or sold.
      </p>
    </div>
  );
}

// ── Connecting ────────────────────────────────────────────────────────────────

function ConnectingStep({ progress }: { progress: number }) {
  const steps = [
    { label: "Authenticating with Google", threshold: 25 },
    { label: "Fetching Search Console properties", threshold: 50 },
    { label: "Importing keyword rankings", threshold: 72 },
    { label: "Running AI analysis on your site", threshold: 92 },
  ];

  return (
    <div className="p-8 text-center">
      <div className="relative inline-flex items-center justify-center h-24 w-24 mx-auto mb-6">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#1a2d42" strokeWidth="5" />
          <circle
            cx="48" cy="48" r="40"
            fill="none" stroke="#10b981" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
            style={{ transition: "stroke-dashoffset 0.35s ease", filter: "drop-shadow(0 0 6px rgba(16,185,129,0.5))" }}
          />
        </svg>
        <span className="absolute text-lg font-black text-[#f0f4f8] tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>

      <h2 className="text-xl font-black text-[#f0f4f8] mb-1.5">Connecting your account</h2>
      <p className="text-xs text-[#415a72] mb-8">This takes just a moment...</p>

      <div className="space-y-2.5 text-left">
        {steps.map((s) => {
          const done = progress >= s.threshold;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#1a2d42] transition-all duration-300"
            >
              <div
                className={cn(
                  "h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                  done ? "border-emerald-500 bg-emerald-500/15" : "border-[#1a2d42]"
                )}
              >
                {done && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-500",
                  done ? "text-[#f0f4f8]" : "text-[#415a72]"
                )}
              >
                {s.label}
              </span>
              {done && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 ml-auto shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Done ──────────────────────────────────────────────────────────────────────

function DoneStep({ projectName, onFinish }: { projectName: string; onFinish: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl scale-150 pointer-events-none" />
        <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mx-auto">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
      </div>

      <h2 className="text-2xl font-black text-[#f0f4f8] mb-2.5">You&apos;re live.</h2>
      <p className="text-sm text-[#415a72] leading-relaxed mb-8 max-w-sm mx-auto">
        <span className="text-[#f0f4f8] font-semibold">{projectName}</span> is connected and your first AI analysis is running. Here&apos;s what we found so far:
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: "847", label: "Keywords found" },
          { value: "68", label: "AI visibility" },
          { value: "8", label: "Quick wins ready" },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-xl border border-[#1a2d42] bg-[#070c18]">
            <p className="text-xl font-black text-emerald-400">{stat.value}</p>
            <p className="text-[10px] text-[#415a72] mt-0.5 font-medium leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onFinish}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.3)]"
      >
        Open my dashboard
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [url, setUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [connectingProgress, setConnectingProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      const timer = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const complete = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const handleConnectGSC = () => {
    setStep("connecting");
    setConnectingProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 16 + 5;
      const clamped = Math.min(progress, 100);
      setConnectingProgress(clamped);
      if (clamped >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep("done"), 600);
      }
    }, 280);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={complete}
      />
      <div className="relative w-full max-w-md rounded-3xl border border-[#1a2d42] bg-[#0c1322] shadow-[0_32px_80px_rgba(0,0,0,0.85)] overflow-hidden animate-fade-up">
        {/* Progress bar */}
        <div className="h-0.5 bg-[#1a2d42]">
          <div
            className="h-full bg-emerald-500 transition-all duration-700 ease-out"
            style={{ width: STEP_PROGRESS[step] }}
          />
        </div>

        {step === "welcome" && (
          <WelcomeStep onNext={() => setStep("add-site")} onSkip={complete} />
        )}
        {step === "add-site" && (
          <AddSiteStep
            url={url} setUrl={setUrl}
            projectName={projectName} setProjectName={setProjectName}
            onNext={() => setStep("connect-gsc")}
            onBack={() => setStep("welcome")}
          />
        )}
        {step === "connect-gsc" && (
          <ConnectGSCStep onConnect={handleConnectGSC} onSkip={() => setStep("done")} />
        )}
        {step === "connecting" && <ConnectingStep progress={connectingProgress} />}
        {step === "done" && (
          <DoneStep
            projectName={projectName || "acme-corp.com"}
            onFinish={complete}
          />
        )}
      </div>
    </div>
  );
}
