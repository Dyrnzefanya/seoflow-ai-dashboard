"use client";

import { useState } from "react";
import {
  Globe, X, ArrowRight, Loader2, CheckCircle2, ChevronDown, Plus,
} from "lucide-react";
import { useModal } from "@/components/providers/modal-context";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

type Step = "form" | "analyzing" | "done";

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url || "";
  }
}

const ANALYSIS_STEPS = [
  { label: "Scanning site structure", threshold: 30 },
  { label: "Finding keywords & rankings", threshold: 58 },
  { label: "Checking AI platform visibility", threshold: 80 },
  { label: "Generating initial recommendations", threshold: 96 },
];

export function AddProjectModal() {
  const { isAddProjectOpen, closeAddProject } = useModal();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("form");
  const [url, setUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [progress, setProgress] = useState(0);

  const reset = () => {
    setStep("form");
    setUrl("");
    setProjectName("");
    setProgress(0);
  };

  const handleClose = () => {
    closeAddProject();
    setTimeout(reset, 300);
  };

  const handleSubmit = () => {
    if (!url.trim()) return;
    setStep("analyzing");
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20 + 6;
      const clamped = Math.min(p, 100);
      setProgress(clamped);
      if (clamped >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep("done"), 500);
      }
    }, 260);
  };

  const handleFinish = () => {
    const name = projectName || extractDomain(url);
    toast(`"${name}" has been added and is now being monitored.`);
    handleClose();
  };

  if (!isAddProjectOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-md rounded-3xl border border-[#1a2d42] bg-[#0c1322] shadow-[0_32px_64px_rgba(0,0,0,0.75)] overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a2d42]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1a2d42] bg-[#070c18]">
              <Plus className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <span className="text-sm font-bold text-[#f0f4f8]">Add Project</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0c1322] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        {step === "form" && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#8ca4be] mb-2">
                Website URL <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#415a72]" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    const d = extractDomain(e.target.value);
                    if (d && !projectName) setProjectName(d);
                  }}
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

            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!url.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create project
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Analyzing */}
        {step === "analyzing" && (
          <div className="p-8">
            <div className="text-center mb-7">
              <div className="relative inline-flex items-center justify-center h-20 w-20 mx-auto mb-4">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="33" fill="none" stroke="#1a2d42" strokeWidth="4" />
                  <circle
                    cx="40" cy="40" r="33"
                    fill="none" stroke="#10b981" strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 33}
                    strokeDashoffset={2 * Math.PI * 33 * (1 - progress / 100)}
                    style={{ transition: "stroke-dashoffset 0.28s ease", filter: "drop-shadow(0 0 5px rgba(16,185,129,0.4))" }}
                  />
                </svg>
                <Loader2 className="absolute h-6 w-6 text-emerald-400 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-[#f0f4f8] mb-1">Analyzing your site</h3>
              <p className="text-xs text-[#415a72]">Scanning for keywords, backlinks, and AI visibility...</p>
            </div>

            <div className="space-y-2">
              {ANALYSIS_STEPS.map((s) => {
                const done = progress >= s.threshold;
                return (
                  <div key={s.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[#1a2d42]">
                    <div className={cn(
                      "h-3.5 w-3.5 shrink-0 rounded-full border-2 transition-all duration-500",
                      done ? "border-emerald-500 bg-emerald-500/20" : "border-[#1a2d42]"
                    )} />
                    <span className={cn("text-xs font-medium transition-colors duration-500",
                      done ? "text-[#8ca4be]" : "text-[#2a3f55]"
                    )}>
                      {s.label}
                    </span>
                    {done && <CheckCircle2 className="h-3 w-3 text-emerald-400 ml-auto shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Done */}
        {step === "done" && (
          <div className="p-8 text-center">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl scale-150 pointer-events-none" />
              <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mx-auto">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
            </div>

            <h3 className="text-lg font-black text-[#f0f4f8] mb-1.5">Project created!</h3>
            <p className="text-xs text-[#415a72] leading-relaxed mb-6">
              <span className="text-[#f0f4f8] font-semibold">{projectName || extractDomain(url)}</span> is being analysed.
              Your first AI report will be ready in a few minutes.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { value: "~240", label: "Keywords found" },
                { value: "61", label: "AI visibility" },
                { value: "5", label: "Quick wins" },
              ].map((stat) => (
                <div key={stat.label} className="py-3 rounded-xl border border-[#1a2d42] bg-[#070c18]">
                  <p className="text-lg font-black text-emerald-400">{stat.value}</p>
                  <p className="text-[10px] text-[#415a72] mt-0.5 font-medium leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-400 transition-colors"
            >
              View dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
