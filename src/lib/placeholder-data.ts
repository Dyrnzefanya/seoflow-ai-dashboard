// ─── Traffic ────────────────────────────────────────────────────────────────

export const trafficData = [
  { date: "Jan", organic: 11200, paid: 2100 },
  { date: "Feb", organic: 13600, paid: 2400 },
  { date: "Mar", organic: 12400, paid: 2900 },
  { date: "Apr", organic: 15800, paid: 2600 },
  { date: "May", organic: 17200, paid: 3100 },
  { date: "Jun", organic: 16400, paid: 3600 },
  { date: "Jul", organic: 20100, paid: 3800 },
  { date: "Aug", organic: 22600, paid: 3500 },
  { date: "Sep", organic: 21300, paid: 4100 },
  { date: "Oct", organic: 25800, paid: 4400 },
  { date: "Nov", organic: 27400, paid: 4900 },
  { date: "Dec", organic: 31200, paid: 5300 },
];

// ─── Keywords ───────────────────────────────────────────────────────────────

export const keywordData = [
  { keyword: "ai seo platform",             position: 2,  change: +3,  volume: 12400, difficulty: 68, intent: "Commercial" },
  { keyword: "generative engine optimization", position: 4, change: +1, volume: 4800,  difficulty: 44, intent: "Informational" },
  { keyword: "ai visibility tracker",        position: 5,  change: +7,  volume: 5900,  difficulty: 56, intent: "Commercial" },
  { keyword: "seo dashboard software",       position: 8,  change: +4,  volume: 6200,  difficulty: 58, intent: "Commercial" },
  { keyword: "seo analytics dashboard",      position: 9,  change:  0,  volume: 7400,  difficulty: 63, intent: "Commercial" },
  { keyword: "geo optimization guide",       position: 13, change: +5,  volume: 3400,  difficulty: 42, intent: "Informational" },
  { keyword: "aeo monitoring platform",      position: 15, change: +2,  volume: 2800,  difficulty: 39, intent: "Commercial" },
  { keyword: "ai seo tool free",             position: 17, change: -2,  volume: 9100,  difficulty: 72, intent: "Commercial" },
  { keyword: "ai search visibility",         position: 19, change: -3,  volume: 2100,  difficulty: 35, intent: "Informational" },
  { keyword: "chatgpt seo optimization",     position: 24, change: +6,  volume: 8800,  difficulty: 71, intent: "Commercial" },
  { keyword: "llm seo strategy",             position: 28, change: +4,  volume: 4400,  difficulty: 52, intent: "Informational" },
  { keyword: "perplexity ai seo",            position: 31, change: +9,  volume: 3200,  difficulty: 48, intent: "Informational" },
];

// ─── AI Visibility ──────────────────────────────────────────────────────────

export const aiVisibilityData = [
  { platform: "Google AI",     score: 84, change: +3,  color: "#4285F4" },
  { platform: "ChatGPT",       score: 73, change: +9,  color: "#10a37f" },
  { platform: "Gemini",        score: 62, change: +7,  color: "#7c3aed" },
  { platform: "Perplexity",    score: 57, change: +13, color: "#f59e0b" },
  { platform: "Bing Copilot",  score: 48, change: -2,  color: "#0078d4" },
];

// ─── Recommendations ────────────────────────────────────────────────────────

export const recommendations = [
  {
    id: "1",
    priority: "high" as const,
    category: "Technical SEO",
    title: "Fix 14 pages with missing meta descriptions",
    impact: "High",
    effort: "Low",
    estGain: "+8–12% CTR",
    description:
      "14 high-traffic pages have no meta description. Pages with optimized meta descriptions see an average 18% higher CTR from organic search results.",
  },
  {
    id: "2",
    priority: "high" as const,
    category: "AI Visibility",
    title: "Implement FAQ schema on 5 core service pages",
    impact: "High",
    effort: "Medium",
    estGain: "3× AI citations",
    description:
      "Structured FAQ markup makes your content up to 3× more likely to be cited in ChatGPT, Perplexity, and Google AI Overviews. Your top 5 service pages have zero schema markup.",
  },
  {
    id: "3",
    priority: "high" as const,
    category: "Content",
    title: "Build a GEO optimization pillar page",
    impact: "High",
    effort: "High",
    estGain: "+22% cluster traffic",
    description:
      "Your domain has strong authority in the GEO space (DA 67). A comprehensive pillar page supported by 4–5 subtopics could rank in the top 3 within 60–90 days.",
  },
  {
    id: "4",
    priority: "medium" as const,
    category: "Keywords",
    title: "Target 8 low-competition keywords under difficulty 40",
    impact: "Medium",
    effort: "Low",
    estGain: "+4,200 monthly visits",
    description:
      "8 keywords with combined monthly volume of 14,600 sit below KD 40. Your site already has the topical authority to rank in the top 5 for these terms with targeted content.",
  },
  {
    id: "5",
    priority: "medium" as const,
    category: "Technical SEO",
    title: "Improve Core Web Vitals on mobile (LCP: 3.2s)",
    impact: "Medium",
    effort: "High",
    estGain: "+4–6 rank positions",
    description:
      "Mobile LCP is 3.2s against the 2.5s target. Lazy-loading hero images and deferring non-critical scripts could move LCP to 2.1s and recover ranking ground on mobile SERPs.",
  },
  {
    id: "6",
    priority: "medium" as const,
    category: "AI Visibility",
    title: "Add HowTo schema to 3 tutorial-style blog posts",
    impact: "Medium",
    effort: "Low",
    estGain: "+18% AI answer rate",
    description:
      "3 of your top-performing blog posts follow a step-by-step format but lack HowTo schema. Adding it takes under 2 hours and significantly increases inclusion in AI-generated how-to answers.",
  },
  {
    id: "7",
    priority: "low" as const,
    category: "Content",
    title: "Refresh 6 blog posts older than 18 months",
    impact: "Low",
    effort: "Medium",
    estGain: "+5–8% impressions",
    description:
      "6 posts published before October 2023 are losing impressions at 2–3% per month. Updating statistics, adding internal links, and re-optimizing titles could stabilize and recover rankings.",
  },
  {
    id: "8",
    priority: "low" as const,
    category: "Technical SEO",
    title: "Resolve 3 crawl errors on service pages",
    impact: "Low",
    effort: "Low",
    estGain: "Improved crawl budget",
    description:
      "Google Search Console flags 3 service pages with soft 404 errors. These are indexed but returning inconsistent content, which wastes crawl budget and sends mixed signals.",
  },
];

// ─── Top Pages ───────────────────────────────────────────────────────────────

export const topPages = [
  { page: "/blog/ai-seo-guide",         clicks: 5840, impressions: 41200, ctr: "14.2%", position: 2.1 },
  { page: "/features/geo-optimization", clicks: 3620, impressions: 32400, ctr: "11.2%", position: 3.9 },
  { page: "/",                           clicks: 3110, impressions: 21800, ctr: "14.3%", position: 2.8 },
  { page: "/blog/aeo-checklist",         clicks: 2680, impressions: 25600, ctr: "10.5%", position: 5.4 },
  { page: "/pricing",                    clicks: 2240, impressions: 14900, ctr: "15.0%", position: 2.6 },
  { page: "/blog/chatgpt-seo",           clicks: 1980, impressions: 18300, ctr: "10.8%", position: 6.2 },
];

// ─── AEO Opportunities ───────────────────────────────────────────────────────

export const aeoOpportunities = [
  { page: "/blog/ai-seo-guide",         type: "FAQ Schema",      potential: "High",   status: "Missing",  aiPlatforms: ["ChatGPT", "Perplexity"] },
  { page: "/features/geo-optimization", type: "HowTo Schema",    potential: "High",   status: "Missing",  aiPlatforms: ["Google AI", "ChatGPT"] },
  { page: "/blog/aeo-checklist",        type: "FAQ Schema",      potential: "High",   status: "Partial",  aiPlatforms: ["Perplexity"] },
  { page: "/services",                  type: "Service Schema",  potential: "Medium", status: "Missing",  aiPlatforms: ["Bing Copilot"] },
  { page: "/blog/chatgpt-seo",          type: "HowTo Schema",    potential: "Medium", status: "Missing",  aiPlatforms: ["ChatGPT"] },
  { page: "/about",                     type: "Organization",    potential: "Low",    status: "Partial",  aiPlatforms: ["Google AI"] },
];

// ─── Weekly Report ───────────────────────────────────────────────────────────

export const weeklyReport = {
  weekOf: "May 5–11, 2025",
  organicTraffic:  { value: 31200, change: +14.2 },
  keywords:        { value: 847,   change: +23 },
  aiVisibility:    { value: 68,    change: +9 },
  seoScore:        { value: 81,    change: +4 },
  topGainer:       { keyword: "generative engine optimization", positionChange: +4, newPosition: 4 },
};

// ─── Workflow Tasks ──────────────────────────────────────────────────────────

export const workflowTasks = [
  { id: "1", title: "Fix 14 pages with missing meta descriptions",  status: "todo",        priority: "high" as const,   due: "May 15" },
  { id: "2", title: "Implement FAQ schema on service pages",        status: "in-progress", priority: "high" as const,   due: "May 14" },
  { id: "3", title: "Publish GEO optimization pillar page",         status: "in-progress", priority: "high" as const,   due: "May 17" },
  { id: "4", title: "Research 8 new keyword opportunities",         status: "todo",        priority: "medium" as const, due: "May 18" },
  { id: "5", title: "Add HowTo schema to 3 blog tutorials",         status: "todo",        priority: "medium" as const, due: "May 20" },
  { id: "6", title: "Update homepage title tag and meta",           status: "done",        priority: "low" as const,    due: "May 10" },
  { id: "7", title: "Submit updated sitemap to Google",             status: "done",        priority: "low" as const,    due: "May 9" },
  { id: "8", title: "Resolve 3 crawl errors on service pages",      status: "done",        priority: "low" as const,    due: "May 11" },
];
