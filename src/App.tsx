import { useState, useId } from "react";
import heroCreativeImg from "./assets/hero-creative.jpg";
import mobileTabletImg from "./assets/mobile-tablet-ui.jpg";
import desktopWorkspaceImg from "./assets/desktop-workspace-ui.jpg";
import laptopMegaphoneImg from "./assets/laptop-megaphone-marketing.jpg";

// View mode switcher: Unified, Template 1 (Agency), Template 2 (Marketing)
type ViewMode = "unified" | "agency" | "marketing";

interface MarketingNode {
  id: string;
  name: string;
  category: "left" | "right";
  icon: string;
  shortDesc: string;
  metric: string;
  kpi: string;
  details: string[];
}

const MARKETING_NODES: MarketingNode[] = [
  {
    id: "target-audience",
    name: "Target Audience",
    category: "left",
    icon: "🎯",
    shortDesc: "Hyper-segmented behavioral buyer personas",
    metric: "3.4x",
    kpi: "Higher Lead Relevancy",
    details: [
      "Deep psychographic profiling & intent scoring",
      "Lookalike modeling from high LTV customers",
      "Dynamic negative-audience exclusion lists",
    ],
  },
  {
    id: "seo",
    name: "SEO",
    category: "left",
    icon: "🔍",
    shortDesc: "Technical & Programmatic Search Dominance",
    metric: "+480%",
    kpi: "Organic Traffic Growth",
    details: [
      "Core Web Vitals & technical indexing audit",
      "High-intent commercial keyword mapping",
      "Authoritative digital PR & backlink acquisition",
    ],
  },
  {
    id: "social-media",
    name: "Social Media",
    category: "left",
    icon: "👥",
    shortDesc: "Viral community & social proof building",
    metric: "98.3K",
    kpi: "Active Engagement",
    details: [
      "Multi-platform short-form video strategy (Reels/TikTok)",
      "Interactive founder branding & community loops",
      "Automated social listening & sentiment tracking",
    ],
  },
  {
    id: "content-marketing",
    name: "Content Marketing",
    category: "left",
    icon: "🎬",
    shortDesc: "High-retention storytelling & video assets",
    metric: "4.2M",
    kpi: "Qualified Impressions",
    details: [
      "In-depth industry research whitepapers & guides",
      "Dynamic UGC lifestyle video production",
      "Repurposing flywheel across 6 digital channels",
    ],
  },
  {
    id: "performance-analytics",
    name: "Performance Analytics",
    category: "right",
    icon: "📈",
    shortDesc: "Real-time revenue & attribution telemetry",
    metric: "100%",
    kpi: "Transparent Tracking",
    details: [
      "GA4 server-side tracking & Conversion API (CAPI)",
      "Multi-touch blended ROAS & MER attribution",
      "Custom Looker Studio executive dashboards",
    ],
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    category: "right",
    icon: "✉️",
    shortDesc: "High-converting automated retention flows",
    metric: "42.8%",
    kpi: "Average Open Rate",
    details: [
      "Abandoned checkout & browse recovery sequences",
      "VIP customer loyalty & re-engagement drips",
      "Deliverability optimization & BIMI verification",
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "right",
    icon: "🔺",
    shortDesc: "Performance Max & high-intent Search Ads",
    metric: "5.4x",
    kpi: "Search Campaign ROAS",
    details: [
      "Exact match negative keyword harvesting",
      "Smart Bidding strategy aligned with tCPA/tROAS",
      "High-converting landing page A/B split experiments",
    ],
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    category: "right",
    icon: "♾️",
    shortDesc: "Advantage+ catalog & creative scaling",
    metric: "12.9K",
    kpi: "Monthly Conversions",
    details: [
      "Dynamic creative testing (DCT) matrix framework",
      "First-party custom audience lookalike scaling",
      "Rapid creative iteration for ad fatigue elimination",
    ],
  },
];

const UI_UX_SERVICES = [
  {
    id: "ui-design",
    title: "UI Design",
    icon: "🪟",
    accentColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
    description:
      "Pixel-perfect, visually arresting user interfaces crafted with precision design tokens, responsive typography, and tactile micro-interactions.",
    details: [
      "Multi-platform Design Systems (Figma tokens & variables)",
      "High-contrast accessible color harmony (WCAG AA certified)",
      "Dynamic component libraries for React & Tailwind CSS",
      "Micro-animations & seamless state transitions",
    ],
    metric: "100% Pixel Perfect",
  },
  {
    id: "ux-experience",
    title: "UX Experience",
    icon: "🧠",
    accentColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    btnColor: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500",
    description:
      "Data-backed user journey architectures, cognitive empathy research, and friction-free conversion funnels designed to maximize engagement.",
    details: [
      "User research interviews & heat-map telemetry audits",
      "Frictionless 3-step checkout & onboarding journeys",
      "Interactive clickable high-fidelity wireframe prototypes",
      "Usability testing with quantitative task-completion metrics",
    ],
    metric: "+68% Conversion Lift",
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: "⚙️",
    accentColor: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    btnColor: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
    description:
      "Lightning-fast, modern full-stack web applications engineered with React, Next.js, and TypeScript, delivering sub-second load speeds.",
    details: [
      "Modern React 19 / Next.js 15 headless architecture",
      "Core Web Vitals guaranteed 95+ PageSpeed benchmark",
      "SEO-first semantic structure & automated OpenGraph data",
      "Stripe, Razorpay, and REST/GraphQL API integrations",
    ],
    metric: "< 0.8s Global Load",
  },
];

const EXPERTISE_CARDS = [
  {
    title: "Strategy & Planning",
    icon: "💡",
    desc: "Comprehensive roadmap with competitor market gaps, audience segmentation, and channel forecasting.",
    stat: "14-Day",
    statLabel: "Sprint Delivery",
  },
  {
    title: "Automation & Tools",
    icon: "⚙️",
    desc: "Seamless CRM sync, webhook triggers, email drips, and programmatic workflows that work 24/7.",
    stat: "99.9%",
    statLabel: "Pipeline Uptime",
  },
  {
    title: "Conversion Optimization",
    icon: "📊",
    desc: "Relentless A/B testing on headlines, CTAs, hero visuals, and checkout checkout funnels.",
    stat: "3.2x",
    statLabel: "Avg. Lift",
  },
  {
    title: "ROI Focused",
    icon: "💲",
    desc: "Every single dollar spent is mapped directly to qualified pipeline, customers, and bottom-line profit.",
    stat: "4.2x",
    statLabel: "Blended ROAS",
  },
];

const TRUST_BADGES = [
  { label: "Result Driven Strategies", icon: "🛡️" },
  { label: "Data Backed Decisions", icon: "🚀" },
  { label: "Transparent & Reliable", icon: "🔒" },
  { label: "Dedicated Support", icon: "👥" },
];

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("unified");
  const [selectedServiceModal, setSelectedServiceModal] = useState<typeof UI_UX_SERVICES[0] | null>(null);
  const [selectedMarketingNode, setSelectedMarketingNode] = useState<MarketingNode | null>(MARKETING_NODES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estimator State
  const [servicePillar, setServicePillar] = useState<"agency" | "marketing" | "both">("both");
  const [scopeTier, setScopeTier] = useState<"starter" | "growth" | "enterprise">("growth");
  const [urgency, setUrgency] = useState<"standard" | "urgent">("standard");
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    seo: true,
    ads: true,
    cms: true,
    speed: true,
  });

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Full Agency + Digital Marketing Bundle",
    budget: "₹50,000 - ₹1,00,000",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formId = useId();

  // Price estimate calculation in INR
  const calculateEstimate = () => {
    let base = 35000;
    if (servicePillar === "agency") base = 30000;
    if (servicePillar === "marketing") base = 32000;
    if (servicePillar === "both") base = 58000;

    let multiplier = 1.0;
    if (scopeTier === "starter") multiplier = 0.75;
    if (scopeTier === "growth") multiplier = 1.0;
    if (scopeTier === "enterprise") multiplier = 1.85;

    let urgencyFee = urgency === "urgent" ? 12000 : 0;
    let addonSum = 0;
    if (addons.seo) addonSum += 6000;
    if (addons.ads) addonSum += 8000;
    if (addons.cms) addonSum += 7000;
    if (addons.speed) addonSum += 4000;

    return Math.round(base * multiplier + urgencyFee + addonSum).toLocaleString("en-IN");
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Nexus Creative! I am interested in your services.\n\n` +
        `• Service: ${servicePillar.toUpperCase()}\n` +
        `• Tier: ${scopeTier.toUpperCase()}\n` +
        `• Timeline: ${urgency.toUpperCase()}\n` +
        `• Estimated Budget: ₹${calculateEstimate()}\n\n` +
        `Please share your availability for a discovery call!`
    );
    return `https://wa.me/917010231792?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 selection:bg-cyan-500 selection:text-black relative font-display">
      {/* Ambient Cyber Neon Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-blue-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-[35%] -left-32 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px] animate-float" />
        <div className="absolute top-[65%] -right-32 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[160px] animate-float-reverse" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] bg-blue-500/10 rounded-full blur-[140px]" />
      </div>

      {/* ========================================================================= */}
      {/* 0. FLOATING TEMPLATE SELECTOR DOCK (TOP PILL) */}
      {/* ========================================================================= */}
      <div className="bg-[#0b1329]/90 backdrop-blur-md border-b border-cyan-500/20 py-2.5 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-slate-300 font-mono hidden sm:inline">
              LIVE TEMPLATE SHOWCASE:
            </span>
            <span className="text-cyan-400 font-semibold">
              Digital Agency & Digital Marketing Hub
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-[#050914] p-1 rounded-full border border-white/10">
            <button
              onClick={() => setViewMode("unified")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                viewMode === "unified"
                  ? "bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Unified Experience
            </button>
            <button
              onClick={() => setViewMode("agency")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                viewMode === "agency"
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Agency Design (T1)
            </button>
            <button
              onClick={() => setViewMode("marketing")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                viewMode === "marketing"
                  ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Digital Marketing (T2)
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/917010231792"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1.5"
            >
              <span>● WhatsApp:</span>
              <span className="font-bold">+91 70102 31792</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MAIN NAVIGATION HEADER */}
      {/* ========================================================================= */}
      <header className="border-b border-white/10 bg-[#060c1d]/80 backdrop-blur-xl sticky top-[49px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#050914] rounded-2xl flex items-center justify-center text-cyan-400 font-black text-xl">
                ✦
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                NEXUS <span className="text-cyan-400 text-glow-cyan">CREATIVE</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-1">
                DESIGNED FOR YOUR SUCCESS
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-cyan-400 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">
              Services
            </a>
            <a href="#marketing-hub" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>Marketing Hub</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono">
                3D Hub
              </span>
            </a>
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">
              Portfolio
            </a>
            <a href="#estimator" className="hover:text-cyan-400 transition-colors">
              Estimator
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Quick CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/917010231792"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
              </svg>
              <span>Instant Chat</span>
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl glow-blue-btn text-white text-xs font-bold tracking-wide"
            >
              Get Started →
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070e22] border-b border-cyan-500/20 px-6 py-6 space-y-4">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              UI/UX Layout & Services
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              Device Showcases (Mobile & Desktop)
            </a>
            <a
              href="#marketing-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-cyan-400 font-semibold py-1"
            >
              Digital Marketing 3D Hub
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              Live Project Estimator
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              Contact & WhatsApp
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Chat on WhatsApp (+91 70102 31792)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: TEMPLATE 1 - HERO SECTION ("CREATIVE DIGITAL AGENCY") */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <section
          id="home"
          className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-cyber border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Hero Text */}
              <div className="lg:col-span-7 space-y-7 text-left">
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-300 font-mono shadow-lg shadow-cyan-500/10">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>PREMIUM DIGITAL AGENCY & GROWTH ACCELERATOR</span>
                </div>

                {/* Big Bold Headline matching Template 1 */}
                <div className="space-y-2">
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
                    CREATIVE
                  </h2>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan">
                    DIGITAL AGENCY
                  </h1>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-slate-300 font-normal max-w-xl leading-relaxed">
                  We build stunning digital experiences that drive success. From bespoke UI/UX
                  interfaces to enterprise full-stack development and ROI-engineered marketing.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#services"
                    className="px-8 py-4 rounded-xl glow-blue-btn text-white font-bold text-sm tracking-wider uppercase shadow-xl"
                  >
                    GET STARTED
                  </a>
                  <a
                    href="#marketing-hub"
                    className="px-7 py-4 rounded-xl border border-cyan-500/40 bg-[#0b1329]/80 hover:bg-cyan-500/10 text-cyan-300 font-bold text-sm tracking-wide transition-all flex items-center gap-2"
                  >
                    <span>Explore Marketing Hub</span>
                    <span>→</span>
                  </a>
                </div>

                {/* Live Micro Metric Badges */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-400">99.4%</div>
                    <div className="text-xs text-slate-400 font-sans mt-0.5">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-blue-400">180+</div>
                    <div className="text-xs text-slate-400 font-sans mt-0.5">Projects Shipped</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-purple-400">&lt; 0.8s</div>
                    <div className="text-xs text-slate-400 font-sans mt-0.5">Core Web Vitals</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Asset (Profile with Electric Blue Backdrop) */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Glowing background halo */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-blue-600/30 to-purple-600/30 blur-2xl -z-10" />

                  {/* Frame Container */}
                  <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 bg-[#0a1128]">
                    <img
                      src={heroCreativeImg}
                      alt="Creative Digital Agency Lead"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    />

                    {/* Floating HUD chips */}
                    <div className="absolute top-4 right-4 bg-[#050914]/85 backdrop-blur-md border border-cyan-400/40 rounded-xl px-3.5 py-2 text-xs flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-mono text-cyan-300 font-bold">Top Agency 2026</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-[#050914]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 font-mono">Performance Matrix</div>
                        <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                          <span>A+ Web Vitals Certified</span>
                          <span className="text-cyan-400">⚡</span>
                        </div>
                      </div>
                      <a
                        href="#contact"
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all"
                      >
                        Hire Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* ABOUT SECTION: WHO WE ARE */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <section
          id="about"
          className="relative py-20 md:py-24 bg-[#040815] border-b border-white/10 overflow-hidden"
        >
          {/* Subtle Glow Top Divider */}
          <div className="glow-divider w-full absolute top-0 left-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-7">
              {/* Requested Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-500/10">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-semibold tracking-wide">
                  Nexuscreative.site • Award-Winning Studio • Web Dev • UI/UX • Growth
                </span>
              </div>

              {/* Requested Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                We Engineer High-Performing{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan">
                  Web Applications, Bespoke UI/UX,
                </span>{" "}
                &amp; Scalable Marketing.
              </h2>

              {/* Requested Subtitle / Paragraph */}
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
                Hand-crafted web applications, high-converting Figma design systems, and data-driven
                ad campaigns built for founders who refuse generic templates.
              </p>

              {/* Core Philosophy Highlights Grid */}
              <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="glass-cyber-card rounded-2xl p-6 border border-cyan-500/30">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-xl font-bold mb-3">
                    ⚡
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Sub-Second Performance</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero bloat. Built from scratch with React 19, Vite, and Next.js for flawless 95+ Core Web Vitals.
                  </p>
                </div>

                <div className="glass-cyber-card rounded-2xl p-6 border border-purple-500/30">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center text-xl font-bold mb-3">
                    🎨
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Bespoke UI/UX Systems</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Meticulously organized Figma token architectures, accessible WCAG color scales, and human-first friction-free flows.
                  </p>
                </div>

                <div className="glass-cyber-card rounded-2xl p-6 border border-blue-500/30">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center text-xl font-bold mb-3">
                    📈
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Algorithmic Growth</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Full-funnel Google Performance Max and Meta Advantage+ campaigns engineered for verifiable blended ROAS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: TEMPLATE 1 - "UI/UX LAYOUT" 3-CARD SHOWCASE */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <section id="services" className="py-20 md:py-28 relative bg-[#060a17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Title matching Template 1 */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Core Service Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                UI/UX LAYOUT
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                Crafted with mathematical precision, psychological empathy, and high-performance
                modern code.
              </p>
            </div>

            {/* 3 Glowing Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {UI_UX_SERVICES.map((srv) => (
                <div
                  key={srv.id}
                  className="glass-cyber-card rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle top light bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover:via-cyan-400 transition-all" />

                  <div className="space-y-6">
                    {/* Glowing Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl shadow-inner ${srv.accentColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {srv.icon}
                    </div>

                    {/* Card Title */}
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                        {srv.title}
                      </h3>
                      <div className="mt-1 text-xs font-mono text-cyan-400/90">{srv.metric}</div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">{srv.description}</p>

                    {/* Key points */}
                    <ul className="space-y-2 pt-2 text-xs text-slate-400">
                      {srv.details.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-cyan-400">✔</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button matching Template 1 "LEARN MORE" */}
                  <div className="pt-8">
                    <button
                      onClick={() => setSelectedServiceModal(srv)}
                      className={`w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-lg transition-all ${srv.btnColor}`}
                    >
                      LEARN MORE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: TEMPLATE 1 - MULTI-DEVICE SHOWCASE (MOBILE/TABLET & DESKTOP) */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <section id="portfolio" className="py-20 md:py-28 bg-[#040813] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                Responsive Design Systems
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                MULTI-SCREEN EXCELLENCE
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                Flawless fidelity across smartphones, tablets, and ultra-wide studio monitors.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Showcase: Mobile & Tablet */}
              <div className="lg:col-span-5 glass-cyber-card-purple rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase">
                      Touch & Gesture UI
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2.5 py-1 rounded-full font-mono font-semibold">
                      iOS & Android
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">MODERN UI DESIGN</h3>
                  <p className="text-slate-300 text-sm">
                    Fluid abstract motion, adaptive glass styling, and haptic feedback micro-interactions.
                  </p>
                </div>

                <div className="my-6 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl relative group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={mobileTabletImg}
                    alt="Modern UI Design Mobile and Tablet"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
                  <span>Fluid 60FPS UI Animations</span>
                  <a
                    href="#contact"
                    className="text-purple-400 font-bold hover:text-purple-300 flex items-center gap-1"
                  >
                    <span>Request Demo</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Right Showcase: Desktop Workstation */}
              <div className="lg:col-span-7 glass-cyber-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                      Desktop Web App Architecture
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full font-mono font-semibold">
                      4K Ultra-Wide Ready
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">CREATIVE WEBSITE DESIGN</h3>
                  <p className="text-slate-300 text-sm">
                    Full-width data visualizers, responsive design systems, and lightning-fast edge rendering.
                  </p>
                </div>

                <div className="my-6 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl relative group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={desktopWorkspaceImg}
                    alt="Creative Website Design Desktop Monitor"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
                  <span>99+ PageSpeed Desktop Score</span>
                  <a
                    href="#contact"
                    className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Inspect System</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: TEMPLATE 2 - DIGITAL MARKETING & 3D MEGAPHONE HUB */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "marketing") && (
        <section
          id="marketing-hub"
          className="py-24 md:py-32 relative bg-[#040714] overflow-hidden border-t border-cyan-500/20"
        >
          {/* Concentric ambient background rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-cyan-500/10 pointer-events-none -z-10 animate-ripple-ring" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-blue-500/15 pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header matching Template 2 */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              {/* Brand mark */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="text-cyan-400">✦</span>
                <span className="font-extrabold tracking-wider">NEXUS CREATIVE</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">DESIGNED FOR YOUR SUCCESS</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                DIGITAL <span className="text-cyan-400 text-glow-cyan">MARKETING</span>
              </h2>

              <p className="text-lg sm:text-xl font-bold tracking-wide uppercase text-slate-300">
                SMART STRATEGIES, REAL RESULTS
              </p>
            </div>

            {/* Central 3D Laptop Dais with 8 Orbiting Nodes */}
            <div className="relative my-8">
              {/* Desktop grid layout: 4 Nodes Left, Center 3D visual, 4 Nodes Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left 4 Orbiting Nodes */}
                <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
                  {MARKETING_NODES.filter((n) => n.category === "left").map((node) => {
                    const active = selectedMarketingNode?.id === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedMarketingNode(node)}
                        className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex items-center gap-3.5 ${
                          active
                            ? "bg-cyan-950/70 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105"
                            : "bg-[#0a1128]/70 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-[#0e1938]"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
                          {node.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 truncate">
                            {node.name}
                          </div>
                          <div className="text-[11px] text-cyan-400 font-semibold truncate">
                            {node.metric} • {node.kpi}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center: 3D Megaphone Laptop Visual */}
                <div className="lg:col-span-6 relative order-1 lg:order-2 text-center">
                  <div className="relative mx-auto max-w-lg">
                    {/* Glowing circular Dais */}
                    <div className="absolute -inset-6 rounded-full bg-gradient-to-b from-cyan-500/20 via-blue-600/20 to-transparent blur-xl -z-10" />

                    <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/30 bg-[#060b1c] group">
                      <img
                        src={laptopMegaphoneImg}
                        alt="Digital Marketing 3D Megaphone Laptop"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Live Analytics HUD Overlays */}
                      <div className="absolute top-4 left-4 bg-[#050914]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl px-3.5 py-2 text-left shadow-lg">
                        <div className="text-[10px] text-slate-400 font-mono uppercase">Total Reach</div>
                        <div className="text-sm font-black text-cyan-300 flex items-center gap-1">
                          <span>45.6K</span>
                          <span className="text-emerald-400 text-xs font-semibold">+18.2%</span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-[#050914]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl px-3.5 py-2 text-left shadow-lg">
                        <div className="text-[10px] text-slate-400 font-mono uppercase">Conversions</div>
                        <div className="text-sm font-black text-cyan-300 flex items-center gap-1">
                          <span>12.9K</span>
                          <span className="text-emerald-400 text-xs font-semibold">+35.7%</span>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 whitespace-nowrap">
                        <span>📈 GROW YOUR BRAND ONLINE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 4 Orbiting Nodes */}
                <div className="lg:col-span-3 space-y-4 order-3">
                  {MARKETING_NODES.filter((n) => n.category === "right").map((node) => {
                    const active = selectedMarketingNode?.id === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedMarketingNode(node)}
                        className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex items-center gap-3.5 ${
                          active
                            ? "bg-cyan-950/70 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105"
                            : "bg-[#0a1128]/70 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-[#0e1938]"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
                          {node.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 truncate">
                            {node.name}
                          </div>
                          <div className="text-[11px] text-cyan-400 font-semibold truncate">
                            {node.metric} • {node.kpi}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Node Strategy Breakdown Card */}
              {selectedMarketingNode && (
                <div className="mt-12 max-w-4xl mx-auto glass-cyber-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 relative animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedMarketingNode.icon}</span>
                      <div>
                        <h4 className="text-xl font-bold text-white">
                          {selectedMarketingNode.name} Blueprint
                        </h4>
                        <p className="text-xs text-slate-400">
                          {selectedMarketingNode.shortDesc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-cyan-500/20 border border-cyan-500/40 px-3.5 py-1.5 rounded-xl text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">Proven Impact</div>
                        <div className="text-sm font-bold text-cyan-300">
                          {selectedMarketingNode.metric} ({selectedMarketingNode.kpi})
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-xs">
                    {selectedMarketingNode.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5"
                      >
                        <span className="text-cyan-400 font-bold">0{idx + 1}.</span>
                        <span className="text-slate-300 leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* "OUR EXPERTISE" 4-PILLAR GRID */}
            {/* ========================================================================= */}
            <div className="mt-24 pt-16 border-t border-cyan-500/20">
              <div className="text-center mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  OUR EXPERTISE
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold uppercase text-white mt-4">
                  Full-Cycle Digital Growth
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {EXPERTISE_CARDS.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-cyber-card rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">{item.statLabel}:</span>
                      <span className="text-cyan-400 font-bold">{item.stat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* TRUST BADGES STRIP */}
            {/* ========================================================================= */}
            <div className="mt-16 bg-[#081026] border border-cyan-500/30 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {TRUST_BADGES.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Domain Footer Banner */}
            <div className="mt-8 text-center text-xs font-mono text-cyan-400 flex items-center justify-center gap-2">
              <span>🌐</span>
              <a
                href="https://nexuscreative.site"
                className="hover:underline tracking-widest uppercase font-semibold"
              >
                www.nexuscreative.site
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: INSTANT PROJECT COST ESTIMATOR */}
      {/* ========================================================================= */}
      <section id="estimator" className="py-20 md:py-28 bg-[#050914] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Transparent Pricing Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white">
              INSTANT PROJECT ESTIMATOR
            </h2>
            <p className="text-slate-400 text-sm">
              Calculate realistic deliverables, sprint timelines, and transparent costs in INR.
            </p>
          </div>

          <div className="glass-cyber-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Config Options */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Service Type */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2">
                    1. Select Core Pillar
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    <button
                      onClick={() => setServicePillar("agency")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        servicePillar === "agency"
                          ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Agency UI & Web
                    </button>
                    <button
                      onClick={() => setServicePillar("marketing")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        servicePillar === "marketing"
                          ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Digital Marketing
                    </button>
                    <button
                      onClick={() => setServicePillar("both")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        servicePillar === "both"
                          ? "bg-cyan-500 text-black border-cyan-400 font-bold"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      All-in-One Bundle
                    </button>
                  </div>
                </div>

                {/* 2. Scope Tier */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2">
                    2. Project Scope Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    <button
                      onClick={() => setScopeTier("starter")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        scopeTier === "starter"
                          ? "bg-blue-600 text-white border-blue-400 font-bold"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Starter Launchpad
                    </button>
                    <button
                      onClick={() => setScopeTier("growth")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        scopeTier === "growth"
                          ? "bg-blue-600 text-white border-blue-400 font-bold"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Growth Scale (Rec.)
                    </button>
                    <button
                      onClick={() => setScopeTier("enterprise")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        scopeTier === "enterprise"
                          ? "bg-blue-600 text-white border-blue-400 font-bold"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Enterprise Suite
                    </button>
                  </div>
                </div>

                {/* 3. Addon Checkboxes */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2">
                    3. High-Impact Add-ons
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { id: "seo", label: "Technical SEO & Schema (+₹6,000)" },
                      { id: "ads", label: "Google & Meta Ad Setup (+₹8,000)" },
                      { id: "cms", label: "Headless CMS Portal (+₹7,000)" },
                      { id: "speed", label: "Sub-Second Speed Pack (+₹4,000)" },
                    ].map((addon) => (
                      <label
                        key={addon.id}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10"
                      >
                        <input
                          type="checkbox"
                          checked={addons[addon.id]}
                          onChange={() =>
                            setAddons((prev) => ({ ...prev, [addon.id]: !prev[addon.id] }))
                          }
                          className="rounded border-cyan-500 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                        />
                        <span className="text-slate-200">{addon.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Delivery Speed */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2">
                    4. Sprint Urgency
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      onClick={() => setUrgency("standard")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        urgency === "standard"
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-white/5 border-white/10 text-slate-400"
                      }`}
                    >
                      Standard (14–21 Days)
                    </button>
                    <button
                      onClick={() => setUrgency("urgent")}
                      className={`py-2.5 px-3 rounded-xl border transition-all ${
                        urgency === "urgent"
                          ? "bg-amber-500 text-black border-amber-400 font-bold"
                          : "bg-white/5 border-white/10 text-slate-400"
                      }`}
                    >
                      ⚡ Rapid Sprint (7–10 Days)
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimate Summary Box */}
              <div className="lg:col-span-5 bg-[#081026] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                    Ballpark Estimate
                  </div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-white">
                      ₹{calculateEstimate()}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-1">
                      Transparent milestone-based quote
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Core Architecture:</span>
                      <span className="font-bold text-white capitalize">{servicePillar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Selected Tier:</span>
                      <span className="font-bold text-white capitalize">{scopeTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sprint Timeline:</span>
                      <span className="font-bold text-white capitalize">
                        {urgency === "urgent" ? "7–10 Days" : "14–21 Days"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">IP Rights:</span>
                      <span className="font-bold text-emerald-400">100% Client Ownership</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <span>Confirm Estimate on WhatsApp</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#contact"
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold text-center block transition-all"
                  >
                    Send Formal RFP Proposal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CONTACT & PROJECT PROPOSAL */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 md:py-28 bg-[#040714] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACCEPTING NEW CLIENTS FOR Q3/Q4</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                LET'S BUILD SOMETHING EXTRAORDINARY
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Whether you need a high-converting UI/UX design, custom web application, or full-funnel
                digital marketing campaigns, we're ready to engineer your growth.
              </p>

              <div className="space-y-4 pt-4 text-sm">
                <a
                  href="https://wa.me/917010231792"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all"
                >
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                    💬
                  </span>
                  <div>
                    <div className="text-xs text-slate-400">Direct WhatsApp</div>
                    <div className="font-bold text-white">+91 70102 31792</div>
                  </div>
                </a>

                <a
                  href="mailto:Haridass@nexuscreative.site"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <span className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl">
                    ✉️
                  </span>
                  <div>
                    <div className="text-xs text-slate-400">Official Email</div>
                    <div className="font-bold text-white">Haridass@nexuscreative.site</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl">
                    📍
                  </span>
                  <div>
                    <div className="text-xs text-slate-400">Headquarters</div>
                    <div className="font-bold text-white">Chennai, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-cyber-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 text-3xl flex items-center justify-center mx-auto">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you for reaching out! Our lead strategist will review your project brief
                      and send a customized proposal within 4 business hours.
                    </p>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold"
                    >
                      Fast-Track via WhatsApp
                    </a>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`${formId}-name`}
                          className="block text-xs font-mono text-slate-300 mb-1"
                        >
                          Full Name *
                        </label>
                        <input
                          id={`${formId}-name`}
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${formId}-email`}
                          className="block text-xs font-mono text-slate-300 mb-1"
                        >
                          Work Email *
                        </label>
                        <input
                          id={`${formId}-email`}
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`${formId}-phone`}
                          className="block text-xs font-mono text-slate-300 mb-1"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id={`${formId}-phone`}
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${formId}-budget`}
                          className="block text-xs font-mono text-slate-300 mb-1"
                        >
                          Target Budget
                        </label>
                        <select
                          id={`${formId}-budget`}
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0b1329] border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                        >
                          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                          <option value="₹1,00,000+">₹1,00,000+ (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-service`}
                        className="block text-xs font-mono text-slate-300 mb-1"
                      >
                        Interested Service
                      </label>
                      <select
                        id={`${formId}-service`}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1329] border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      >
                        <option value="Full Agency + Digital Marketing Bundle">
                          Full Agency + Digital Marketing Bundle
                        </option>
                        <option value="UI/UX Design & High-Fidelity Prototype">
                          UI/UX Design & High-Fidelity Prototype
                        </option>
                        <option value="Custom Web Development (React / Next.js)">
                          Custom Web Development (React / Next.js)
                        </option>
                        <option value="Digital Marketing & Ads (Google + Meta + SEO)">
                          Digital Marketing & Ads (Google + Meta + SEO)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${formId}-message`}
                        className="block text-xs font-mono text-slate-300 mb-1"
                      >
                        Project Brief & Goals *
                      </label>
                      <textarea
                        id={`${formId}-message`}
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your brand, current bottlenecks, and target launch timeline..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl glow-cyan-btn text-black font-extrabold text-sm uppercase tracking-wider shadow-lg"
                    >
                      Submit Project Brief →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 bg-[#02040b] py-14 text-slate-400 text-xs relative overflow-hidden">
        {/* Glow Divider Line */}
        <div className="glow-divider w-full absolute top-0 left-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
                ✦
              </div>
              <div>
                <div className="text-white font-black tracking-wider text-base">
                  NEXUS CREATIVE
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Official Contact: Haridass@nexuscreative.site • Headquarters: Chennai, India
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
              <a href="#home" className="hover:text-cyan-400">
                Home
              </a>
              <a href="#about" className="hover:text-cyan-400">
                About
              </a>
              <a href="#services" className="hover:text-cyan-400">
                UI/UX
              </a>
              <a href="#marketing-hub" className="hover:text-cyan-400">
                Marketing Hub
              </a>
              <a href="#estimator" className="hover:text-cyan-400">
                Estimator
              </a>
              <a href="#contact" className="hover:text-cyan-400">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917010231792"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold font-mono"
              >
                WhatsApp (+91 70102 31792)
              </a>
            </div>
          </div>

          {/* Footer Copyright & Agency Info */}
          <div className="pt-8 border-t border-white/10 text-center font-mono space-y-2">
            <div className="text-[11px] tracking-[0.15em] uppercase text-cyan-400/90 font-bold">
              © 2026 NEXUS CREATIVE • ALL RIGHTS RESERVED • CHENNAI, INDIA
            </div>
            <div className="text-[10px] text-slate-500 tracking-wider">
              OFFICIAL EMAIL: HARIDASS@NEXUSCREATIVE.SITE • WEB APPLICATIONS, BESPOKE UI/UX & SCALABLE MARKETING
            </div>
          </div>
        </div>
      </footer>



      {/* ========================================================================= */}
      {/* SERVICE DETAILS MODAL (When clicking "LEARN MORE" on UI/UX Layout cards) */}
      {/* ========================================================================= */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#081026] border border-cyan-400/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedServiceModal.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedServiceModal.title}</h3>
                <span className="text-xs font-mono text-cyan-400">
                  {selectedServiceModal.metric}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedServiceModal.description}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Key Deliverables & Specifications:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedServiceModal.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="py-2.5 px-4 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold hover:bg-white/15"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedServiceModal(null)}
                className="py-2.5 px-5 rounded-xl glow-cyan-btn text-black font-bold text-xs"
              >
                Request Quote For This Service →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
