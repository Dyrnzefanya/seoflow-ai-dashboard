"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What are my top opportunities?",
  "How is my AI visibility trending?",
  "Which keywords should I focus on?",
  "Summarize this week's performance",
];

const CANNED_RESPONSES: [string, string][] = [
  [
    "opportunit",
    "Based on your current data, your top 3 opportunities are:\n\n**1)** Fix 14 pages missing meta descriptions — estimated **+8–12% CTR lift** with minimal effort.\n\n**2)** Add FAQ schema to your 6 top service pages. Pages with FAQ schema get cited by ChatGPT **3× more often**.\n\n**3)** 8 keywords between KD 30–45 are within reach — targeting these could add ~**2.1k monthly visits** within 90 days.",
  ],
  [
    "ai visib",
    "Your AI visibility score grew **59 → 68** over the past 4 weeks **(+15%)**. Breakdown by platform:\n\n**ChatGPT** — 74/100 (your strongest channel)\n**Google AI Overviews** — 71/100\n**Perplexity** — 61/100 (+13pts this week)\n**Gemini** — 54/100\n\nPerplexity's spike likely came from your GEO optimization post. Keep that content style going.",
  ],
  [
    "keyword",
    "Your top movers this week:\n\n**'ai visibility tracker'** — jumped +7 positions, now at #11 (KD 56)\n**'ai seo platform'** — holding #2, high commercial intent\n**'perplexity ai seo'** — biggest mover at +9 positions\n\nI'd prioritize expanding the Perplexity content cluster — it's your fastest-growing traffic source right now.",
  ],
  [
    "summar",
    "Strong week overall. Here's the snapshot:\n\n**Traffic:** 31.2k sessions (+14.2% WoW)\n**SEO Score:** 81/100 (+4pts)\n**AI Visibility:** 68/100 — a new all-time high\n**Top mover:** 'generative engine optimization' jumped to position #4\n\n3 technical issues flagged (Core Web Vitals on mobile). Worth addressing before they compound.",
  ],
  [
    "perform",
    "Your site is in solid shape. SEO score is **81/100** and AI visibility hit a new high at **68/100**. Organic traffic grew **+14.2%** this month.\n\nYou have **8 ready-to-act recommendations** in the queue, with an estimated combined impact of **+34% visibility** if all implemented. The meta description fixes alone are worth doing this week — low effort, high reward.",
  ],
  [
    "schema",
    "Schema markup is one of your biggest untapped levers right now. You're missing **FAQ schema** on 6 service pages and **HowTo schema** on 3 tutorial pages.\n\nPages with FAQ schema are **2.8× more likely** to be cited in AI answers. I've queued up the exact JSON-LD snippets in your Recommendations panel — copy-paste ready.",
  ],
  [
    "traffic",
    "Organic traffic reached **31.2k sessions** this month — your highest ever. The top-performing pages drove:\n\n**'GEO optimization guide'** — 4.8k sessions (+22%)\n**'AI SEO tools'** — 3.1k sessions (+18%)\n**Homepage** — 2.4k sessions (stable)\n\nYour blog is your strongest traffic driver. 2 more articles in the content pipeline could push you past 40k next month.",
  ],
  [
    "report",
    "Your latest weekly report is ready. Key highlights: SEO score **81/100**, AI visibility **68/100**, organic traffic up **+14.2%**. You can export it as a PDF or generate a shareable link from the Reports page.\n\nWant me to flag anything specific to include before you share it with stakeholders?",
  ],
  [
    "competit",
    "Your main competitors are outperforming you in two areas: **content freshness** (they publish 3× more frequently) and **schema coverage** (78% schema adoption vs your 41%).\n\nBut you're ahead on **AI citation rate** — your brand appears in ChatGPT answers **2.3× more often** than the category average. That's a real edge worth doubling down on.",
  ],
  [
    "technical",
    "3 technical issues flagged in this week's crawl:\n\n**High priority:** 6 pages with LCP > 4s on mobile — this actively suppresses rankings\n**Medium:** 14 pages with missing or duplicate meta descriptions\n**Low:** 3 broken internal links on the blog\n\nThe LCP issues should be tackled first — Core Web Vitals are a ranking signal and Google is actively measuring them.",
  ],
  [
    "content",
    "Your top content opportunity right now is expanding the **Perplexity SEO cluster** — it's your fastest-growing source and still relatively low-competition.\n\nI'd suggest 2–3 articles targeting:\n— 'how to rank on perplexity ai'\n— 'perplexity ai optimization guide'\n— 'perplexity vs google seo'\n\nBased on your current domain authority, you could reach page 1 within 6–8 weeks.",
  ],
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of CANNED_RESPONSES) {
    if (lower.includes(key)) return response;
  }
  return "Good question. Based on your current data, I'd focus on the **meta description fixes** and **FAQ schema** implementation in your Recommendations panel — these have the highest impact-to-effort ratio right now.\n\nIs there a specific area you'd like me to dig into? Traffic, AI visibility, keywords, or technical issues?";
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-xs text-[#8ca4be] leading-relaxed whitespace-pre-line">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-[#f0f4f8] font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </p>
  );
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hey! I'm your SEOFlow AI assistant, powered by Claude.\n\nI can analyze your SEO performance, AI visibility trends, keyword opportunities, technical issues, and more — just ask.\n\nWhat would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const delay = 900 + Math.random() * 700;
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: getResponse(trimmed) },
      ]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[320px] rounded-2xl border border-[#1a2d42] bg-[#0c1322] shadow-[0_16px_56px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[#1a2d42] bg-[#080d1a]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#f0f4f8] leading-none">AI Assistant</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                <span className="text-[10px] text-emerald-400 font-medium">Powered by Claude</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-[#415a72] hover:text-[#8ca4be] transition-colors"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
              >
                {msg.role === "assistant" && (
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] px-3 py-2.5 rounded-xl text-xs",
                    msg.role === "user"
                      ? "bg-emerald-500 text-white font-medium rounded-tr-sm"
                      : "bg-[#1a2d42]/50 rounded-tl-sm border border-[#1a2d42]/60"
                  )}
                >
                  {msg.role === "user" ? (
                    <p>{msg.text}</p>
                  ) : (
                    <RichText text={msg.text} />
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                </div>
                <div className="px-3 py-2.5 rounded-xl bg-[#1a2d42]/50 rounded-tl-sm border border-[#1a2d42]/60">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.9s" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg border border-[#1a2d42] text-[#415a72] hover:border-[#243d56] hover:text-[#8ca4be] hover:bg-[#0f1929] transition-all font-medium"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 border-t border-[#1a2d42] pt-3">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[#1a2d42] bg-[#080d1a] focus-within:border-emerald-500/40 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about your SEO data..."
                disabled={isTyping}
                className="flex-1 text-[11px] bg-transparent text-[#f0f4f8] placeholder:text-[#2a3f55] outline-none disabled:opacity-60"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || isTyping}
                className="p-1 rounded-md text-[#415a72] hover:text-emerald-400 disabled:opacity-40 transition-colors"
                aria-label="Send"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200",
          "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
          open
            ? "bg-[#0c1322] border border-[#1a2d42] text-[#415a72] hover:text-[#8ca4be] hover:border-[#243d56]"
            : "bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
        )}
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-300 border-2 border-[#080d1a] animate-pulse" />
        )}
      </button>
    </>
  );
}
