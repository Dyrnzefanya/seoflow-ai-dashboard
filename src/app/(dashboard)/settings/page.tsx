"use client";

import { useState, useEffect, useRef } from "react";
import { Topbar } from "@/components/layout/topbar";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useToast } from "@/components/ui/toast";
import {
  User, Link2, Sliders, Globe, ChevronDown, CheckCircle2,
  Loader2, RefreshCw, Edit3, Save, X, AlertTriangle,
  Shield, Clock, Zap, Bell, ExternalLink, Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "account" | "project" | "integrations" | "workspace";
type IntegrationStatus = "connected" | "connecting" | "disconnected";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "account",      label: "Account",      icon: User },
  { id: "project",      label: "Project",      icon: Globe },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "workspace",    label: "Workspace",    icon: Sliders },
];

// ── Integration logos ────────────────────────────────────────────────────────

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ── IntegrationCard ──────────────────────────────────────────────────────────

type IntegrationDef = {
  id: string;
  name: string;
  description: string;
  logo: "google" | "wordpress" | "shopify";
  category: string;
};

const INTEGRATIONS: IntegrationDef[] = [
  {
    id: "gsc",
    name: "Google Search Console",
    description: "Pull organic traffic, keyword rankings, impressions, and CTR data directly from Google.",
    logo: "google",
    category: "Analytics",
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    description: "Sync audience data, session metrics, and conversion goals for holistic reporting.",
    logo: "google",
    category: "Analytics",
  },
  {
    id: "wordpress",
    name: "WordPress",
    description: "Publish AI-optimised content and push meta updates directly from SEOFlow.",
    logo: "wordpress",
    category: "CMS",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Track product page SEO, collection rankings, and e-commerce keyword performance.",
    logo: "shopify",
    category: "E-commerce",
  },
];

type IntegrationState = {
  status: IntegrationStatus;
  lastSynced?: string;
  disconnectConfirm: boolean;
};

function IntegrationCard({
  def,
  state,
  onConnect,
  onDisconnect,
  onResync,
}: {
  def: IntegrationDef;
  state: IntegrationState;
  onConnect: () => void;
  onDisconnect: () => void;
  onResync: () => void;
}) {
  const [connecting, setConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const startConnect = () => {
    setConnecting(true);
    setProgress(0);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 20 + 8;
      const c = Math.min(p, 100);
      setProgress(c);
      if (c >= 100) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeout(() => {
          setConnecting(false);
          setProgress(0);
          onConnect();
        }, 350);
      }
    }, 240);
  };

  const Logo = () => {
    if (def.logo === "google") return <GoogleLogo />;
    if (def.logo === "wordpress") {
      return (
        <div className="h-5 w-5 rounded flex items-center justify-center bg-[#21759b] shrink-0">
          <span className="text-[9px] font-black text-white leading-none">W</span>
        </div>
      );
    }
    return (
      <div className="h-5 w-5 rounded flex items-center justify-center bg-[#95bf47] shrink-0">
        <span className="text-[9px] font-black text-white leading-none">S</span>
      </div>
    );
  };

  const isConnected = state.status === "connected";

  return (
    <div className={cn(
      "rounded-2xl border bg-[#0f1929] p-5 transition-all duration-200",
      isConnected ? "border-[#1a2d42]" : "border-[#1a2d42] hover:border-[#243d56]",
      connecting && "border-emerald-500/20",
    )}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1a2d42] bg-[#070c18] shrink-0">
          <Logo />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-bold text-[#f0f4f8]">{def.name}</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#1a2d42] text-[#2a3f55] leading-none">
                  {def.category}
                </span>
              </div>
              <p className="text-xs text-[#415a72] leading-relaxed">{def.description}</p>
            </div>

            {/* Status badge */}
            {isConnected && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Connected
              </div>
            )}
            {!isConnected && !connecting && (
              <span className="text-[10px] font-semibold text-[#2a3f55] shrink-0">Not connected</span>
            )}
          </div>

          {/* Last synced */}
          {isConnected && state.lastSynced && (
            <div className="flex items-center gap-1.5 text-[10px] text-[#2a3f55] mt-2 mb-3">
              <Clock className="h-3 w-3" />
              Last synced {state.lastSynced}
            </div>
          )}

          {/* Connecting progress bar */}
          {connecting && (
            <div className="mt-3 mb-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-[#8ca4be]">
                  <Loader2 className="h-3 w-3 animate-spin text-emerald-400" />
                  Connecting...
                </div>
                <span className="text-[10px] font-bold text-emerald-400 tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-[#1a2d42] overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-200"
                  style={{ width: `${progress}%`, boxShadow: "0 0 6px rgba(16,185,129,0.4)" }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {!isConnected && !connecting && (
              <button
                onClick={startConnect}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Connect
              </button>
            )}

            {isConnected && !state.disconnectConfirm && (
              <>
                <button
                  onClick={onResync}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1a2d42] text-[10px] font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
                >
                  <RefreshCw className="h-3 w-3" />
                  Resync
                </button>
                <button
                  onClick={onDisconnect}
                  className="text-[10px] font-semibold text-[#2a3f55] hover:text-red-400 transition-colors ml-auto"
                >
                  Disconnect
                </button>
              </>
            )}

            {isConnected && state.disconnectConfirm && (
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] text-amber-400 font-medium">Stop syncing this account?</span>
                <button
                  onClick={onDisconnect}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/25 text-[10px] font-bold text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Field components ──────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, disabled }: {
  value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-sm text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    />
  );
}

function SelectInput({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-sm text-[#8ca4be] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#415a72] pointer-events-none" />
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-[#8ca4be]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 rounded-full transition-all duration-200 shrink-0",
          checked ? "bg-emerald-500" : "bg-[#1a2d42]",
        )}
      >
        <span className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200",
          checked ? "left-[18px]" : "left-0.5",
        )} />
      </button>
    </div>
  );
}

function SectionCard({ title, description, children }: {
  title: string; description?: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#1a2d42] bg-[#0f1929] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#1a2d42]">
        <p className="text-sm font-bold text-[#f0f4f8]">{title}</p>
        {description && <p className="text-xs text-[#415a72] mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ── Tab content ───────────────────────────────────────────────────────────────

function AccountTab({ toast }: { toast: (msg: string, t?: "success" | "error" | "info") => void }) {
  const [name, setName] = useState("Alex Johnson");
  const [email] = useState("alex@acme-corp.com");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const [twoFa, setTwoFa] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);

  const saveProfile = () => {
    setName(draft);
    setEditing(false);
    toast("Profile updated.");
  };

  return (
    <div className="space-y-5">
      <SectionCard title="Profile" description="Your account details and display name.">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
            <span className="text-xl font-black text-white">AJ</span>
          </div>
          <div>
            <p className="text-base font-bold text-[#f0f4f8]">{name}</p>
            <p className="text-xs text-[#415a72]">{email}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 leading-none">
                Pro Plan
              </span>
              <span className="text-[10px] text-[#2a3f55]">· Admin</span>
            </div>
          </div>
        </div>

        {!editing ? (
          <div className="space-y-3">
            {[
              { label: "Full name", value: name },
              { label: "Email address", value: email },
              { label: "Role", value: "Admin" },
            ].map((f) => (
              <div key={f.label} className="flex items-center justify-between py-2.5 border-b border-[#1a2d42] last:border-0">
                <span className="text-xs text-[#415a72]">{f.label}</span>
                <span className="text-xs font-semibold text-[#8ca4be]">{f.value}</span>
              </div>
            ))}
            <button
              onClick={() => { setEditing(true); setDraft(name); }}
              className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#415a72] hover:text-[#8ca4be] transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Field label="Full name">
              <TextInput value={draft} onChange={setDraft} />
            </Field>
            <Field label="Email address">
              <TextInput value={email} onChange={() => {}} disabled />
            </Field>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={saveProfile}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors"
              >
                <Save className="h-3 w-3" />
                Save changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Plan & Billing" description="Your current subscription details.">
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#070c18] border border-emerald-500/15 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-emerald-400" />
              <p className="text-sm font-bold text-[#f0f4f8]">Pro Plan</p>
            </div>
            <p className="text-xs text-[#415a72]">$49 / month · Renews Jun 15, 2026</p>
          </div>
          <button className="px-3.5 py-2 rounded-xl border border-[#243d56] text-xs font-bold text-[#8ca4be] hover:border-[#415a72] hover:text-[#f0f4f8] transition-all">
            Manage plan
          </button>
        </div>
        <div className="space-y-2.5">
          {[
            { label: "Projects", value: "2 / 5" },
            { label: "Keywords tracked", value: "1,081 / 2,000" },
            { label: "Team seats", value: "1 / 3 used" },
            { label: "AI recommendations / mo", value: "Unlimited" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between py-1.5 border-b border-[#1a2d42] last:border-0">
              <span className="text-xs text-[#415a72]">{f.label}</span>
              <span className="text-xs font-semibold text-[#8ca4be]">{f.value}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Security" description="Control your account access and authentication.">
        <div className="space-y-1 divide-y divide-[#1a2d42]">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-[#8ca4be] font-medium">Password</p>
              <p className="text-[10px] text-[#2a3f55]">Last changed 3 months ago</p>
            </div>
            <button
              onClick={() => toast("A password reset link has been sent to your email.", "info")}
              className="px-3 py-1.5 rounded-lg border border-[#1a2d42] text-[10px] font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
            >
              Change
            </button>
          </div>
          <Toggle
            checked={twoFa}
            onChange={(v) => { setTwoFa(v); toast(v ? "Two-factor authentication enabled." : "Two-factor authentication disabled.", "info"); }}
            label="Two-factor authentication"
          />
          <Toggle
            checked={emailNotifs}
            onChange={(v) => { setEmailNotifs(v); }}
            label="Login notification emails"
          />
        </div>
      </SectionCard>
    </div>
  );
}

function ProjectTab({ toast }: { toast: (msg: string, t?: "success" | "error" | "info") => void }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Acme Corp");
  const [domain] = useState("acme-corp.com");
  const [industry, setIndustry] = useState("SaaS / Software");
  const [targetMarket, setTargetMarket] = useState("B2B, Mid-market");
  const [trackingStart] = useState("Jan 12, 2026");
  const [competitors, setCompetitors] = useState(["ahrefs.com", "semrush.com", "moz.com"]);
  const [newCompetitor, setNewCompetitor] = useState("");

  const INDUSTRIES = [
    "SaaS / Software", "E-commerce", "Agency / Marketing",
    "Media / Publishing", "Finance", "Healthcare", "Other",
  ];

  const save = () => { setEditing(false); toast("Project settings saved."); };

  const addCompetitor = () => {
    const d = newCompetitor.trim().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    if (!d || competitors.includes(d)) return;
    setCompetitors((prev) => [...prev, d]);
    setNewCompetitor("");
    toast(`"${d}" added to competitor tracking.`);
  };

  const removeCompetitor = (c: string) => {
    setCompetitors((prev) => prev.filter((x) => x !== c));
  };

  const keywordPct = Math.round((847 / 1000) * 100);

  return (
    <div className="space-y-5">
      <SectionCard title="Project Details" description="Core settings for the active project.">
        {!editing ? (
          <div className="space-y-0">
            {[
              { label: "Project name", value: name },
              { label: "Domain", value: domain },
              { label: "Industry", value: industry },
              { label: "Target market", value: targetMarket },
              { label: "Tracking since", value: trackingStart },
            ].map((f) => (
              <div key={f.label} className="flex items-center justify-between py-2.5 border-b border-[#1a2d42] last:border-0">
                <span className="text-xs text-[#415a72]">{f.label}</span>
                <span className="text-xs font-semibold text-[#8ca4be]">{f.value}</span>
              </div>
            ))}
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#415a72] hover:text-[#8ca4be] transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit details
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Field label="Project name"><TextInput value={name} onChange={setName} /></Field>
            <Field label="Domain"><TextInput value={domain} onChange={() => {}} disabled /></Field>
            <Field label="Industry">
              <SelectInput value={industry} onChange={setIndustry} options={INDUSTRIES} />
            </Field>
            <Field label="Target market">
              <TextInput value={targetMarket} onChange={setTargetMarket} placeholder="e.g. B2B, Mid-market" />
            </Field>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={save}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors"
              >
                <Save className="h-3 w-3" />
                Save changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-xl border border-[#1a2d42] text-xs font-semibold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Keyword Tracking" description="Usage and limits for this project.">
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#415a72]">Keywords tracked</span>
            <span className="text-xs font-bold text-[#f0f4f8]">847 / 1,000</span>
          </div>
          <div className="h-2 rounded-full bg-[#1a2d42] overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${keywordPct}%`, boxShadow: "0 0 8px rgba(16,185,129,0.3)" }}
            />
          </div>
          <p className="text-[10px] text-[#2a3f55] mt-1.5">153 slots remaining on your Pro Plan</p>
        </div>
        <div className="space-y-2.5">
          {[
            { label: "Tracking frequency", value: "Daily" },
            { label: "SERP depth", value: "Top 100 results" },
            { label: "Location targeting", value: "United States" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between py-2 border-b border-[#1a2d42] last:border-0">
              <span className="text-xs text-[#415a72]">{f.label}</span>
              <span className="text-xs font-semibold text-[#8ca4be]">{f.value}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Competitor Tracking" description="Domains to benchmark against your site.">
        <div className="space-y-2 mb-4">
          {competitors.map((c) => (
            <div key={c} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18]">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-md border border-[#1a2d42] bg-[#0c1322] flex items-center justify-center shrink-0">
                  <Globe className="h-3 w-3 text-[#415a72]" />
                </div>
                <span className="text-xs font-medium text-[#8ca4be]">{c}</span>
              </div>
              <button
                onClick={() => removeCompetitor(c)}
                className="p-1 rounded text-[#2a3f55] hover:text-red-400 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCompetitor}
            onChange={(e) => setNewCompetitor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCompetitor()}
            placeholder="Add competitor domain..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
          <button
            onClick={addCompetitor}
            disabled={!newCompetitor.trim()}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

function IntegrationsTab({ toast }: { toast: (msg: string, t?: "success" | "error" | "info") => void }) {
  const [states, setStates] = useState<Record<string, IntegrationState>>({
    gsc:       { status: "connected",    lastSynced: "12 min ago", disconnectConfirm: false },
    ga4:       { status: "connected",    lastSynced: "12 min ago", disconnectConfirm: false },
    wordpress: { status: "disconnected", disconnectConfirm: false },
    shopify:   { status: "disconnected", disconnectConfirm: false },
  });

  const handleConnect = (id: string, name: string) => {
    setStates((prev) => ({ ...prev, [id]: { status: "connected", lastSynced: "Just now", disconnectConfirm: false } }));
    toast(`${name} connected successfully.`);
  };

  const handleDisconnect = (id: string, name: string) => {
    const current = states[id];
    if (!current.disconnectConfirm) {
      setStates((prev) => ({ ...prev, [id]: { ...prev[id], disconnectConfirm: true } }));
      return;
    }
    setStates((prev) => ({ ...prev, [id]: { status: "disconnected", disconnectConfirm: false } }));
    toast(`${name} disconnected.`, "info");
  };

  const handleResync = (id: string, name: string) => {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], lastSynced: "Just now" } }));
    toast(`${name} data refreshed.`);
  };

  const connected = INTEGRATIONS.filter((i) => states[i.id]?.status === "connected").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#415a72]">
          <span className="font-bold text-emerald-400">{connected}</span> of {INTEGRATIONS.length} integrations active
        </p>
      </div>

      {/* Analytics group */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2a3f55] mb-3">Analytics</p>
        <div className="space-y-3">
          {INTEGRATIONS.filter((i) => i.category === "Analytics").map((def) => (
            <IntegrationCard
              key={def.id}
              def={def}
              state={states[def.id]}
              onConnect={() => handleConnect(def.id, def.name)}
              onDisconnect={() => handleDisconnect(def.id, def.name)}
              onResync={() => handleResync(def.id, def.name)}
            />
          ))}
        </div>
      </div>

      {/* CMS + E-commerce group */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2a3f55] mb-3">CMS & E-commerce</p>
        <div className="space-y-3">
          {INTEGRATIONS.filter((i) => i.category !== "Analytics").map((def) => (
            <IntegrationCard
              key={def.id}
              def={def}
              state={states[def.id]}
              onConnect={() => handleConnect(def.id, def.name)}
              onDisconnect={() => handleDisconnect(def.id, def.name)}
              onResync={() => handleResync(def.id, def.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkspaceTab({ toast }: { toast: (msg: string, t?: "success" | "error" | "info") => void }) {
  const [timezone, setTimezone] = useState("America/New_York (UTC−5)");
  const [reportFreq, setReportFreq] = useState("Weekly");
  const [aiModel] = useState("Claude Sonnet 4.6");
  const [refreshInterval, setRefreshInterval] = useState("Daily at 3:00 AM");
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [keywordAlerts, setKeywordAlerts] = useState(true);
  const [visibilityAlerts, setVisibilityAlerts] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [dangerConfirm, setDangerConfirm] = useState(false);

  const TIMEZONES = [
    "America/New_York (UTC−5)",
    "America/Los_Angeles (UTC−8)",
    "America/Chicago (UTC−6)",
    "Europe/London (UTC+0)",
    "Europe/Berlin (UTC+1)",
    "Asia/Tokyo (UTC+9)",
    "Australia/Sydney (UTC+10)",
  ];

  const FREQUENCIES = ["Daily", "Weekly", "Monthly"];
  const REFRESH_OPTS = ["Every hour", "Every 6 hours", "Daily at 3:00 AM", "Manual only"];

  const TEAM_MEMBERS = [
    { name: "Alex Johnson", email: "alex@acme-corp.com", role: "Admin", avatar: "AJ" },
    { name: "Sam Rivera", email: "sam@acme-corp.com", role: "Editor", avatar: "SR" },
  ];

  const saveWorkspace = () => toast("Workspace preferences saved.");

  const sendInvite = () => {
    if (!inviteEmail.trim()) return;
    toast(`Invitation sent to ${inviteEmail}.`);
    setInviteEmail("");
  };

  return (
    <div className="space-y-5">
      <SectionCard title="Preferences" description="Configure how SEOFlow behaves for your workspace.">
        <div className="space-y-4">
          <Field label="Timezone">
            <SelectInput value={timezone} onChange={setTimezone} options={TIMEZONES} />
          </Field>
          <Field label="Report frequency">
            <SelectInput value={reportFreq} onChange={setReportFreq} options={FREQUENCIES} />
          </Field>
          <Field label="Data refresh interval">
            <SelectInput value={refreshInterval} onChange={setRefreshInterval} options={REFRESH_OPTS} />
          </Field>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#2a3f55] mb-1.5">
              AI model
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18]">
              <Zap className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-sm text-[#8ca4be]">{aiModel}</span>
              <span className="ml-auto text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded leading-none">
                Active
              </span>
            </div>
          </div>
          <button
            onClick={saveWorkspace}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors"
          >
            <Save className="h-3 w-3" />
            Save preferences
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Notifications" description="Control how and when SEOFlow alerts you.">
        <div className="divide-y divide-[#1a2d42]">
          <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} label="Weekly performance digest email" />
          <Toggle checked={keywordAlerts} onChange={setKeywordAlerts} label="Keyword ranking drop alerts (>5 positions)" />
          <Toggle checked={visibilityAlerts} onChange={setVisibilityAlerts} label="AI visibility score drop alerts" />
        </div>
        <div className="mt-4 pt-4 border-t border-[#1a2d42]">
          <Field label="Slack webhook URL">
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                placeholder="https://hooks.slack.com/services/..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
              <button
                onClick={() => slackWebhook.trim() && toast("Slack webhook saved.")}
                disabled={!slackWebhook.trim()}
                className="px-3.5 py-2.5 rounded-xl border border-[#1a2d42] text-xs font-bold text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] transition-all disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Team Members" description="Manage who has access to this workspace.">
        <div className="space-y-2 mb-4">
          {TEAM_MEMBERS.map((m) => (
            <div key={m.email} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18]">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shrink-0 flex items-center justify-center">
                <span className="text-[10px] font-black text-white">{m.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#f0f4f8]">{m.name}</p>
                <p className="text-[10px] text-[#415a72]">{m.email}</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1a2d42] text-[#415a72] leading-none">
                {m.role}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendInvite()}
            placeholder="Invite by email address..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#1a2d42] bg-[#070c18] text-xs text-[#f0f4f8] placeholder:text-[#2a3f55] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
          <button
            onClick={sendInvite}
            disabled={!inviteEmail.trim()}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors disabled:opacity-40"
          >
            Invite
          </button>
        </div>
      </SectionCard>

      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-500/15">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <p className="text-sm font-bold text-red-400">Danger Zone</p>
          </div>
          <p className="text-xs text-[#415a72] mt-0.5">Irreversible actions for this project.</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#8ca4be]">Reset all project data</p>
              <p className="text-xs text-[#415a72]">Clears historical metrics. Cannot be undone.</p>
            </div>
            <button
              onClick={() => toast("Data reset is disabled in demo mode.", "info")}
              className="px-3.5 py-2 rounded-xl border border-red-500/25 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all"
            >
              Reset data
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-red-500/15 pt-4">
            <div>
              <p className="text-sm font-semibold text-[#8ca4be]">Archive project</p>
              <p className="text-xs text-[#415a72]">Removes from active tracking. Can be restored.</p>
            </div>
            {!dangerConfirm ? (
              <button
                onClick={() => setDangerConfirm(true)}
                className="px-3.5 py-2 rounded-xl border border-red-500/25 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all"
              >
                Archive
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setDangerConfirm(false); toast("Project archived.", "info"); }}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-[10px] font-bold text-white hover:bg-red-400 transition-colors"
                >
                  Confirm archive
                </button>
                <button
                  onClick={() => setDangerConfirm(false)}
                  className="text-[10px] font-medium text-[#415a72] hover:text-[#8ca4be] transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("account");

  return (
    <>
      <Topbar title="Settings" subtitle="Manage your account, project, and workspace" />
      <DashboardShell>

        {/* Tab bar */}
        <div className="flex items-center gap-1 p-1 rounded-2xl border border-[#1a2d42] bg-[#0c1322] w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                tab === id
                  ? "bg-[#0f1929] text-[#f0f4f8] border border-[#243d56] shadow-sm"
                  : "text-[#415a72] hover:text-[#8ca4be] hover:bg-[#0f1929]/50",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="max-w-2xl">
          {tab === "account"      && <AccountTab      toast={toast} />}
          {tab === "project"      && <ProjectTab      toast={toast} />}
          {tab === "integrations" && <IntegrationsTab toast={toast} />}
          {tab === "workspace"    && <WorkspaceTab    toast={toast} />}
        </div>

      </DashboardShell>
    </>
  );
}
