import { useState } from "react";

// Theme Definitions
type ThemeId = "warm" | "cyber" | "clean" | "luxury";

interface ThemeStyle {
  id: ThemeId;
  name: string;
  icon: string;
  badge: string;
  pageBg: string;
  textPrimary: string;
  textMuted: string;
  navBg: string;
  navBorder: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  accentPrimary: string;
  accentPrimaryBg: string;
  accentPrimaryText: string;
  accentSecondary: string;
  contrastBlockBg: string;
  contrastBlockText: string;
  headingFont: string; // 'font-editorial' or "font-['Space_Grotesk']"
  isDark: boolean;
}

const THEMES: Record<ThemeId, ThemeStyle> = {
  warm: {
    id: "warm",
    name: "Warm Studio",
    icon: "🌾",
    badge: "Editorial & Warm",
    pageBg: "bg-[#fff9f2]",
    textPrimary: "text-[#1e1927]",
    textMuted: "text-[#6b6375]",
    navBg: "bg-[#fff9f2]/90 border-[#e5ded2]",
    navBorder: "border-[#e5ded2]",
    cardBg: "bg-white",
    cardBorder: "border-[#e5ded2]",
    cardHoverBorder: "hover:border-[#ff6b4a]",
    accentPrimary: "text-[#ff6b4a]",
    accentPrimaryBg: "bg-[#ff6b4a] hover:bg-[#ff5530]",
    accentPrimaryText: "text-white",
    accentSecondary: "text-[#ffc145]",
    contrastBlockBg: "bg-[#1e1927]",
    contrastBlockText: "text-[#fff9f2]",
    headingFont: "font-editorial",
    isDark: false,
  },
  cyber: {
    id: "cyber",
    name: "Cyber Midnight",
    icon: "🌌",
    badge: "Dark Neon & High-Tech",
    pageBg: "bg-[#0b0f19]",
    textPrimary: "text-slate-100",
    textMuted: "text-slate-400",
    navBg: "bg-[#0b0f19]/90 border-white/10",
    navBorder: "border-white/10",
    cardBg: "bg-[#121827]",
    cardBorder: "border-white/10",
    cardHoverBorder: "hover:border-indigo-500",
    accentPrimary: "text-indigo-400",
    accentPrimaryBg: "bg-indigo-600 hover:bg-indigo-500",
    accentPrimaryText: "text-white",
    accentSecondary: "text-cyan-400",
    contrastBlockBg: "bg-[#070a12]",
    contrastBlockText: "text-white",
    headingFont: "font-['Space_Grotesk']",
    isDark: true,
  },
  clean: {
    id: "clean",
    name: "Clean Tech",
    icon: "⚡",
    badge: "Stripe & Apple Minimal",
    pageBg: "bg-[#f8fafc]",
    textPrimary: "text-[#0f172a]",
    textMuted: "text-[#64748b]",
    navBg: "bg-white/95 border-slate-200",
    navBorder: "border-slate-200",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardHoverBorder: "hover:border-blue-600",
    accentPrimary: "text-blue-600",
    accentPrimaryBg: "bg-blue-600 hover:bg-blue-700",
    accentPrimaryText: "text-white",
    accentSecondary: "text-teal-600",
    contrastBlockBg: "bg-[#0f172a]",
    contrastBlockText: "text-white",
    headingFont: "font-['Space_Grotesk']",
    isDark: false,
  },
  luxury: {
    id: "luxury",
    name: "Obsidian & Gold",
    icon: "👑",
    badge: "Luxury Boutique",
    pageBg: "bg-[#09090b]",
    textPrimary: "text-[#fafafa]",
    textMuted: "text-[#a1a1aa]",
    navBg: "bg-[#09090b]/90 border-zinc-800",
    navBorder: "border-zinc-800",
    cardBg: "bg-[#141418]",
    cardBorder: "border-zinc-800",
    cardHoverBorder: "hover:border-amber-500",
    accentPrimary: "text-amber-400",
    accentPrimaryBg: "bg-amber-500 hover:bg-amber-400",
    accentPrimaryText: "text-black",
    accentSecondary: "text-emerald-400",
    contrastBlockBg: "bg-[#000000]",
    contrastBlockText: "text-zinc-100",
    headingFont: "font-editorial",
    isDark: true,
  },
};

// Types
type ServicePillar = "web-dev" | "ui-ux" | "marketing" | "all";
type ScopeTier = "starter" | "growth" | "enterprise";
type TimelineUrgency = "urgent" | "standard" | "flexible";

interface CaseStudy {
  id: string;
  category: "Web Development" | "UI/UX Design" | "Digital Marketing";
  title: string;
  client: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  badgeColor: string;
  tags: string[];
  challenge: string;
  solution: string;
  deliverables: string[];
  results: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "apex-fintech",
    category: "Web Development",
    title: "Apex Next-Gen Fintech Portal",
    client: "Apex Financial Inc.",
    tagline: "Ultra-fast Next.js banking dashboard with sub-second real-time trade settlement.",
    metric: "0.4s",
    metricLabel: "Initial Load Speed",
    badgeColor: "bg-[#2ba5b5]",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "WebSockets", "Stripe API"],
    challenge: "The legacy portal suffered from high latency (3.8s load times) and dropping mobile transactions during peak trading hours.",
    solution: "Engineered a headless Next.js architecture with edge rendering, WebSocket price tickers, and automated banking compliance checks.",
    deliverables: ["Full-Stack Next.js Web App", "Financial Ledger Architecture", "Responsive Dashboard", "SOC2 Compliance Integration"],
    results: ["Reduced bounce rate by 54%", "Handled 120,000+ daily concurrent sessions", "0.4s average page load speed across all devices"],
  },
  {
    id: "lumina-health",
    category: "UI/UX Design",
    title: "Lumina Telehealth Design System",
    client: "Lumina Care Network",
    tagline: "Accessible, human-centric design system and patient booking app for 200k+ patients.",
    metric: "+68%",
    metricLabel: "Booking Completion Rate",
    badgeColor: "bg-[#7b59ef]",
    tags: ["Figma", "Design System", "WCAG 2.1 AA", "User Research", "Prototyping"],
    challenge: "Patients found the multi-step consultation scheduling confusing, resulting in a 42% drop-off rate prior to appointment confirmation.",
    solution: "Conducted 35 user interviews and designed a 3-step frictionless appointment flow with micro-interactions, high-contrast accessible typography, and dark/light modes.",
    deliverables: ["Figma Master Design System (120+ Components)", "Interactive High-Fidelity Prototype", "Doctor & Patient Flow Diagrams", "Usability Audit Report"],
    results: ["+68% increase in completed appointment bookings", "89 Net Promoter Score (NPS) from patient feedback", "Zero WCAG accessibility compliance defects"],
  },
  {
    id: "aura-luxury",
    category: "Digital Marketing",
    title: "Aura Luxury Apparel Growth Funnel",
    client: "Aura Apparel Global",
    tagline: "Full-funnel Meta & Google Performance Max campaign generating 4.2x ROAS in 90 days.",
    metric: "4.2x",
    metricLabel: "Verified Blended ROAS",
    badgeColor: "bg-[#ff6b4a]",
    tags: ["Google Ads", "Meta Ads", "Technical SEO", "CRO", "Attribution Modeling"],
    challenge: "Customer acquisition costs were rising due to saturated generic keywords and unoptimized product detail page funnels.",
    solution: "Restructured ad campaigns into high-intent search tiers, paired with dynamic lifestyle UGC video ads, and redesigned product page checkout funnels for instant conversions.",
    deliverables: ["Full-Funnel Ad Campaign Architecture", "A/B Landing Page Optimizations", "Conversion API & GA4 Tracking Setup", "Weekly Growth Performance Reports"],
    results: ["4.2x return on ad spend (ROAS)", "+310% growth in month-over-month online revenue", "Lowered Customer Acquisition Cost (CAC) by 38%"],
  },
  {
    id: "hyperion-saas",
    category: "Web Development",
    title: "Hyperion AI Workflow Platform",
    client: "Hyperion Intelligence",
    tagline: "Scalable B2B SaaS web application with collaborative workspaces and AI prompt engineering tools.",
    metric: "99.99%",
    metricLabel: "Uptime & Reliability",
    badgeColor: "bg-[#2ba5b5]",
    tags: ["React 19", "Node.js", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
    challenge: "Required an intuitive interface to configure complex AI pipelines without code, needing zero-lag drag-and-drop nodes.",
    solution: "Built a high-performance interactive canvas web application with state management optimized for 100+ simultaneous canvas nodes.",
    deliverables: ["Node-based Flow Builder", "Subscription Billing Portal", "API Key Management Dashboard", "Granular Team Permissions"],
    results: ["Adopted by over 45 Enterprise teams in Month 1", "0 lag render time on 100+ active nodes", "Processed 4.5M AI queries in first quarter"],
  },
  {
    id: "veloce-mobility",
    category: "UI/UX Design",
    title: "Veloce EV Companion App UI",
    client: "Veloce Motors",
    tagline: "Next-gen electric vehicle mobile & in-car touchscreen interface with real-time telematics.",
    metric: "4.9 ★",
    metricLabel: "App Store User Rating",
    badgeColor: "bg-[#ffc145]",
    tags: ["Mobile UI/UX", "Automotive HMI", "Motion Design", "Figma", "Design Tokens"],
    challenge: "Drivers needed critical range and climate data accessible in a split second without cognitive overload while driving.",
    solution: "Designed high-contrast glances, haptic feedback triggers, charging station live locator, and battery climate scheduling UI.",
    deliverables: ["iOS & Android Mobile UI Design", "12.8-inch Dashboard Screen UI Kit", "Micro-Interaction Motion Specs", "Comprehensive Design Tokens"],
    results: ["Featured on Apple App Store 'New & Notable'", "4.9-star average rating with 15k+ downloads", "Reduced interaction steps for charging by 60%"],
  },
  {
    id: "echo-acoustics",
    category: "Digital Marketing",
    title: "Echo Acoustics SEO & Brand Authority",
    client: "Echo Sound Labs",
    tagline: "Dominated organic search for high-ticket audiophile gear through programmatic SEO & PR outreach.",
    metric: "+480%",
    metricLabel: "Organic Traffic Growth",
    badgeColor: "bg-[#ff6b4a]",
    tags: ["Programmatic SEO", "Content Strategy", "Backlink Outreach", "Schema Markup", "Technical Audit"],
    challenge: "The brand was virtually invisible on Google search for commercial acoustic solutions against decades-old competitors.",
    solution: "Executed a comprehensive technical SEO overhaul, implemented structured schema data, and published 50+ data-driven acoustic calculation guides.",
    deliverables: ["Technical SEO Infrastructure", "50+ In-Depth Search Pillar Pages", "Acoustic Calculator Interactive Widget", "Digital PR & Backlink Campaign"],
    results: ["Ranked #1 for 85+ high-intent buyer keywords", "+480% organic organic traffic in 6 months", "Generated over 420 inbound B2B quote inquiries"],
  },
];

const PRICING_TIERS = [
  {
    name: "Starter Launchpad",
    badge: "7–10 Day Delivery",
    description: "Ideal for founders and growing businesses needing a fast, high-converting website or UI/UX sprint.",
    projectPrice: "₹24,999",
    retainerPrice: "₹19,999 / mo",
    timeline: "7 – 10 Days",
    features: [
      "Custom 5-Page Responsive Web Development",
      "Modern Figma UI/UX Design System",
      "Mobile-First, 95+ Core Web Vitals",
      "Technical On-Page SEO & Meta Tags",
      "Contact Form & WhatsApp Chat Integration",
      "Free Domain & Hosting Setup Assistance",
      "30 Days Post-Launch Bug Fix Support",
    ],
    popular: false,
    ctaText: "Select Launchpad",
  },
  {
    name: "Growth Engine",
    badge: "Most Popular",
    description: "Our signature agency package: bespoke Web Development, conversion-focused UI/UX, and foundational Digital Marketing.",
    projectPrice: "₹49,999",
    retainerPrice: "₹34,999 / mo",
    timeline: "2 – 3 Weeks",
    features: [
      "Full Custom Next.js / React Web App (Up to 12 Pages)",
      "Bespoke UI/UX Wireframes & Interactive Figma Prototype",
      "Complete Technical SEO & Speed Optimization (< 0.8s Load)",
      "Google Analytics 4, Meta Pixel & Heatmap Setup",
      "Google Search & Social Media Ad Campaign Strategy",
      "Content Management System (CMS) for Easy Updates",
      "Payment Gateway (Razorpay/Stripe) Integration",
      "60 Days Dedicated Maintenance & Growth Support",
    ],
    popular: true,
    ctaText: "Select Growth Engine",
  },
  {
    name: "Enterprise Custom",
    badge: "Full-Scale Scale",
    description: "Built for established brands and scale-ups demanding market dominance, complex apps, and multi-channel marketing.",
    projectPrice: "₹99,999+",
    retainerPrice: "₹69,999 / mo",
    timeline: "4 – 6 Weeks",
    features: [
      "Enterprise Web App / Complex E-commerce Platform",
      "Complete Brand Identity, Logo & Multi-Platform Design System",
      "Multi-Channel Digital Marketing (Google Ads + Meta + SEO)",
      "High-Converting Landing Page A/B Testing Matrix",
      "Custom Backend API, Database & CRM Integrations",
      "Weekly Strategic Growth Sprints & ROAS Optimization",
      "Priority 24/7 Developer & Designer Support SLA",
      "Full IP Transfer & Comprehensive Code Documentation",
    ],
    popular: false,
    ctaText: "Book Enterprise Consultation",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    role: "Founder & CEO",
    company: "FinMatrix Solutions",
    content:
      "Nexus Creative completely transformed our digital presence. They rebuilt our core web application in Next.js and designed a UI that our users constantly praise. Our conversion rate shot up by 180% within 45 days of launch.",
    rating: 5,
    highlight: "+180% Conversion Lift",
    service: "Web Dev & UI/UX",
  },
  {
    name: "Priya Sundaram",
    role: "Marketing Director",
    company: "Aura Lifestyle",
    content:
      "Their digital marketing team is world-class. Instead of burning budget on vanity metrics, they dialed in our Google Performance Max and Meta campaigns to deliver a verified 4.2x ROAS. Best agency investment we've ever made.",
    rating: 5,
    highlight: "4.2x ROAS",
    service: "Digital Marketing",
  },
  {
    name: "Arun Krishnan",
    role: "Product Lead",
    company: "Zest Cloud Systems",
    content:
      "The UI/UX design deliverables blew our executive team away. The Figma prototypes felt like a live app before writing a single line of code. Clean typography, thoughtful micro-interactions, and blazing fast delivery.",
    rating: 5,
    highlight: "Flawless Delivery",
    service: "UI/UX Design",
  },
  {
    name: "Sarah Jenkins",
    role: "VP of Operations",
    company: "OmniHealth Global",
    content:
      "Working with Nexus felt like having an in-house SWAT team of senior developers and designers. Clean code, 98+ PageSpeed scores, and continuous marketing support that kept our lead volume skyrocketing.",
    rating: 5,
    highlight: "98+ PageSpeed Score",
    service: "Full Growth Bundle",
  },
];

const FAQS = [
  {
    q: "How do your Web Development, UI/UX Design, and Digital Marketing pillars integrate?",
    a: "We believe great digital products require all three to work harmoniously. Our UI/UX designers create high-converting interfaces, our web developers build them for lightning-fast speeds and clean code, and our digital marketing strategists ensure they rank #1 on search engines and convert paid traffic profitably.",
  },
  {
    q: "What tech stack do you use for web development?",
    a: "We specialize in modern, high-performance stacks including React 19, Next.js 15, TypeScript, Tailwind CSS, Node.js, and headless CMS platforms like Sanity or Strapi. For e-commerce, we build custom Shopify Plus or Stripe-powered web apps with 95+ Core Web Vitals.",
  },
  {
    q: "How does the UI/UX design phase work before coding begins?",
    a: "We follow a 3-step design process: 1) Wireframing and user journey mapping, 2) High-fidelity Figma visual design with design system tokens, and 3) Interactive clickable prototyping. You review and approve the exact look and feel before any development starts.",
  },
  {
    q: "When can we expect results from your Digital Marketing & SEO campaigns?",
    a: "Paid advertising (Google Ads & Meta Ads) produces immediate qualified traffic and conversions within the first 48 to 72 hours of launch. For organic SEO, notable keyword ranking increases and traffic gains typically compound within 60 to 90 days.",
  },
  {
    q: "What is your project payment structure and timeline?",
    a: "We typically work with milestone-based billing: 40% initial deposit to kickoff discovery and UI/UX design, 30% upon approval of development staging, and 30% upon final quality verification and live launch. We also offer flexible monthly growth retainers.",
  },
  {
    q: "Do you offer post-launch maintenance, hosting, and updates?",
    a: "Yes! Every project includes complimentary post-launch support (30 to 60 days). We also provide ongoing maintenance plans covering security patches, speed optimizations, server management, and content updates so you never have to worry about downtime.",
  },
];

export default function App() {
  // Theme State
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>("warm");
  const theme = THEMES[currentThemeId];

  // Mobile Menu & Filters
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<string>("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [pricingPeriod, setPricingPeriod] = useState<"project" | "retainer">("project");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Estimator State
  const [estService, setEstService] = useState<ServicePillar>("all");
  const [estScope, setEstScope] = useState<ScopeTier>("growth");
  const [estTimeline, setEstTimeline] = useState<TimelineUrgency>("standard");
  const [estAddons, setEstAddons] = useState<{ [key: string]: boolean }>({
    seo: true,
    cms: true,
    ads: false,
    speed: true,
  });

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development & UI/UX Design",
    budget: "₹25,000 - ₹50,000",
    message: "",
  });

  // Calculate live estimate in INR
  const calculateEstimate = () => {
    let base = 25000;
    if (estService === "web-dev") base = 30000;
    else if (estService === "ui-ux") base = 22000;
    else if (estService === "marketing") base = 25000;
    else if (estService === "all") base = 55000;

    let multiplier = 1.0;
    if (estScope === "starter") multiplier = 0.75;
    else if (estScope === "growth") multiplier = 1.0;
    else if (estScope === "enterprise") multiplier = 1.8;

    let urgencyCost = 0;
    if (estTimeline === "urgent") urgencyCost = 10000;

    let addonCost = 0;
    if (estAddons.seo) addonCost += 6000;
    if (estAddons.cms) addonCost += 8000;
    if (estAddons.ads) addonCost += 10000;
    if (estAddons.speed) addonCost += 4000;

    const total = Math.round((base * multiplier) + urgencyCost + addonCost);
    return total.toLocaleString("en-IN");
  };

  const filteredCaseStudies = activePortfolioCategory === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((item) => item.category === activePortfolioCategory);

  const toggleAddon = (key: string) => {
    setEstAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const serviceName =
      estService === "all"
        ? "All-in-One (Web Dev + UI/UX + Marketing)"
        : estService === "web-dev"
        ? "Web Development"
        : estService === "ui-ux"
        ? "UI/UX Design"
        : "Digital Marketing";

    const text = encodeURIComponent(
      `Hello Nexus Creative! I'm interested in starting a project.\n\n` +
      `📌 Service: ${serviceName}\n` +
      `🎯 Scope: ${estScope.toUpperCase()}\n` +
      `⏱️ Timeline: ${estTimeline.toUpperCase()}\n` +
      `💰 Ballpark Estimate: ₹${calculateEstimate()}\n\n` +
      `I'd love to discuss requirements and get a detailed proposal!`
    );
    return `https://wa.me/917010231792?text=${text}`;
  };

  return (
    <div className={`${theme.pageBg} ${theme.textPrimary} min-h-screen transition-colors duration-300 relative selection:bg-[#ff6b4a] selection:text-white`}>
      {/* Decorative Canvas Background Shapes */}
      {theme.id === "warm" && (
        <>
          <div className="fixed top-12 -right-24 w-96 h-96 rounded-full bg-[#ffc145]/20 blur-[90px] pointer-events-none -z-10 animate-float" />
          <div className="fixed top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-[#ff6b4a]/15 blur-[100px] pointer-events-none -z-10" />
        </>
      )}
      {theme.id === "cyber" && (
        <>
          <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
          <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        </>
      )}
      {theme.id === "luxury" && (
        <>
          <div className="fixed top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="fixed bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        </>
      )}

      {/* ========================================================================= */}
      {/* FLOATING STYLE SWITCHER TOOLBAR (FIXED BOTTOM CENTER) */}
      {/* ========================================================================= */}
      <aside aria-label="Style Switcher" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-2 rounded-full backdrop-blur-xl bg-black/85 border border-white/20 shadow-2xl transition-all">
        <span className="text-[11px] font-mono text-white/70 px-2.5 hidden sm:inline-flex items-center gap-1">
          <span>🎨</span>
          <span className="font-semibold">Style:</span>
        </span>
        {(Object.keys(THEMES) as ThemeId[]).map((tId) => {
          const t = THEMES[tId];
          const active = currentThemeId === tId;
          return (
            <button
              key={tId}
              onClick={() => setCurrentThemeId(tId)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                active
                  ? "bg-white text-black shadow-lg scale-105 font-bold"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{t.icon}</span>
              <span className="text-[11px] whitespace-nowrap">{t.name}</span>
            </button>
          );
        })}
      </aside>

      {/* ========================================================================= */}
      {/* 1. STICKY HEADER */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b ${theme.navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-full ${theme.accentPrimaryBg} flex items-center justify-center ${theme.accentPrimaryText} shadow-md group-hover:scale-105 transition-transform font-bold`}>
              ✦
            </div>
            <div className="flex flex-col">
              <span className={`${theme.headingFont} font-bold text-xl tracking-tight ${theme.textPrimary} leading-none`}>
                Nexus <span className={`italic ${theme.accentPrimary}`}>Creative</span>
              </span>
              <span className={`text-[10px] tracking-widest uppercase ${theme.accentPrimary} font-mono font-semibold mt-1`}>nexuscreative.site</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-8 text-sm font-medium ${theme.textPrimary}`}>
            <a href="#services" className={`hover:${theme.accentPrimary} transition-colors`}>Core Pillars</a>
            <a href="#work" className={`hover:${theme.accentPrimary} transition-colors`}>Case Studies</a>
            <a href="#estimator" className={`hover:${theme.accentPrimary} transition-colors flex items-center gap-1.5`}>
              <span>Cost Estimator</span>
              <span className="bg-red-500/15 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">Interactive</span>
            </a>
            <a href="#pricing" className={`hover:${theme.accentPrimary} transition-colors`}>Pricing</a>
            <a href="#reviews" className={`hover:${theme.accentPrimary} transition-colors`}>Testimonials</a>
            <a href="#faq" className={`hover:${theme.accentPrimary} transition-colors`}>FAQ</a>
          </nav>

          {/* Quick CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/917010231792"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold ${theme.cardBg} border ${theme.cardBorder} hover:border-[#25D366] transition-all shadow-sm`}
            >
              <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="#contact"
              className={`px-6 py-2.5 rounded-full text-xs font-semibold ${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-md transition-all`}
            >
              Start a Project
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl ${theme.cardBg} border ${theme.cardBorder} ${theme.textPrimary}`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t ${theme.navBorder} ${theme.pageBg} px-6 py-6 space-y-4 shadow-xl`}>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${theme.textPrimary} font-medium py-2`}
            >
              Core Pillars (Web Dev, UI/UX, Marketing)
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${theme.textPrimary} font-medium py-2`}
            >
              Selected Case Studies
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${theme.accentPrimary} font-medium py-2`}
            >
              Instant Cost Estimator
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${theme.textPrimary} font-medium py-2`}
            >
              Transparent Pricing Plans
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${theme.textPrimary} font-medium py-2`}
            >
              Testimonials
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${theme.textPrimary} font-medium py-2`}
            >
              FAQ
            </a>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="https://wa.me/917010231792"
                className={`w-full text-center py-3 rounded-full font-semibold ${theme.textPrimary} ${theme.cardBg} border ${theme.cardBorder}`}
              >
                Chat on WhatsApp (+91 70102 31792)
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-3 rounded-full font-semibold ${theme.accentPrimaryBg} ${theme.accentPrimaryText}`}
              >
                Get Free Project Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Top pill status badge */}
            <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full ${theme.cardBg} border ${theme.cardBorder} text-xs font-mono ${theme.textPrimary} shadow-sm animate-float`}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nexuscreative.site • Full-Service Agency • Web Dev • UI/UX • Marketing</span>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold ${theme.headingFont} tracking-tight ${theme.textPrimary} leading-[1.08]`}>
              We Engineer High-Performing <br />
              <span className={`italic ${theme.accentPrimary}`}>Websites</span>, Bespoke{" "}
              <span className="italic text-[#7b59ef]">UI/UX</span>, &amp; Scalable{" "}
              <span className="italic text-[#2ba5b5]">Marketing</span>.
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl ${theme.textMuted} max-w-2xl mx-auto font-normal leading-relaxed`}>
              Hand-crafted web applications, high-converting Figma design systems, and data-driven ad campaigns built for founders who refuse generic templates.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#estimator"
                className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm ${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-lg shadow-black/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group`}
              >
                <span>Calculate Project Cost</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#work"
                className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm ${theme.cardBg} border ${theme.cardBorder} ${theme.textPrimary} transition-all flex items-center justify-center gap-2 shadow-sm`}
              >
                <span>Explore Selected Work ↓</span>
              </a>
            </div>

            {/* Live Stats Row */}
            <div className={`pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t ${theme.cardBorder} max-w-4xl mx-auto`}>
              <div className={`${theme.cardBg} p-5 rounded-3xl border ${theme.cardBorder} text-center shadow-sm`}>
                <p className={`text-3xl sm:text-4xl font-bold ${theme.headingFont} ${theme.accentPrimary}`}>180+</p>
                <p className={`text-xs ${theme.textMuted} mt-1 font-mono uppercase tracking-wider`}>Projects Shipped</p>
              </div>
              <div className={`${theme.cardBg} p-5 rounded-3xl border ${theme.cardBorder} text-center shadow-sm`}>
                <p className={`text-3xl sm:text-4xl font-bold ${theme.headingFont} text-emerald-400`}>99.4%</p>
                <p className={`text-xs ${theme.textMuted} mt-1 font-mono uppercase tracking-wider`}>Client Delight</p>
              </div>
              <div className={`${theme.cardBg} p-5 rounded-3xl border ${theme.cardBorder} text-center shadow-sm`}>
                <p className={`text-3xl sm:text-4xl font-bold ${theme.headingFont} ${theme.accentSecondary}`}>3.8x</p>
                <p className={`text-xs ${theme.textMuted} mt-1 font-mono uppercase tracking-wider`}>Avg. Client ROI</p>
              </div>
              <div className={`${theme.cardBg} p-5 rounded-3xl border ${theme.cardBorder} text-center shadow-sm`}>
                <p className={`text-3xl sm:text-4xl font-bold ${theme.headingFont} text-[#7b59ef]`}>&lt; 0.8s</p>
                <p className={`text-xs ${theme.textMuted} mt-1 font-mono uppercase tracking-wider`}>Page Load Speed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CAPABILITIES MARQUEE */}
      {/* ========================================================================= */}
      <div className={`relative w-full overflow-hidden py-4 ${theme.contrastBlockBg} ${theme.contrastBlockText}`}>
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
          {[0, 1].map((copyIdx) => (
            <div key={copyIdx} className="flex items-center gap-8 shrink-0">
              <span className={`flex items-center gap-2 ${theme.accentSecondary} font-semibold`}>
                ✦ React 19 &amp; Next.js 15
              </span>
              <span className="flex items-center gap-2 font-semibold">
                ✦ Figma UI/UX Design Systems
              </span>
              <span className={`flex items-center gap-2 ${theme.accentPrimary} font-semibold`}>
                ✦ Google Performance Max Ads
              </span>
              <span className="flex items-center gap-2 text-[#2ba5b5] font-semibold">
                ✦ Technical On-Page SEO
              </span>
              <span className="flex items-center gap-2 text-[#7b59ef] font-semibold">
                ✦ Meta Ads &amp; Creative Strategy
              </span>
              <span className="flex items-center gap-2 font-semibold">
                ✦ E-Commerce &amp; Payment Funnels
              </span>
              <span className={`flex items-center gap-2 ${theme.accentSecondary} font-semibold`}>
                ✦ Conversion Rate Optimization
              </span>
              <span className={`flex items-center gap-2 ${theme.accentPrimary} font-semibold`}>
                ✦ 95+ Core Web Vitals Guaranteed
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. THREE CORE PILLARS (SERVICES) */}
      {/* ========================================================================= */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className={`text-xs font-mono uppercase tracking-widest ${theme.accentPrimary}`}>What We Do</p>
          <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} ${theme.textPrimary} tracking-tight`}>
            One Studio. Three Core Pillars.
          </h2>
          <p className={`${theme.textMuted} text-base sm:text-lg`}>
            We unite Web Development, UI/UX Design, and Digital Marketing into a single cohesive flywheel for business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1: Web Development */}
          <div className={`${theme.cardBg} rounded-[32px] p-8 border ${theme.cardBorder} ${theme.cardHoverBorder} transition-all flex flex-col justify-between relative overflow-hidden group shadow-sm`}>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2ba5b5]/15 border border-[#2ba5b5]/30 flex items-center justify-center mb-6 text-[#2ba5b5] group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#2ba5b5]/15 text-[#2ba5b5] text-xs font-mono font-semibold mb-3">
                PILLAR 01
              </div>
              <h3 className={`text-2xl font-bold ${theme.headingFont} ${theme.textPrimary} mb-3`}>Web Development</h3>
              <p className={`${theme.textMuted} text-sm leading-relaxed mb-6`}>
                Engineered for sub-second speeds, rock-solid security, and flawless scalability across phones, tablets, and desktop workstations.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#2ba5b5] font-bold">✓</span>
                  <span>React 19 &amp; Next.js 15 Server-Side Rendering (SSR)</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#2ba5b5] font-bold">✓</span>
                  <span>Core Web Vitals &gt; 95+ PageSpeed Guarantee</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#2ba5b5] font-bold">✓</span>
                  <span>E-Commerce &amp; Secure Payment Gateways (Stripe / Razorpay)</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#2ba5b5] font-bold">✓</span>
                  <span>Headless CMS Integration (Sanity, Strapi, WordPress)</span>
                </div>
              </div>
            </div>

            <div className={`pt-6 border-t ${theme.cardBorder}`}>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Next.js", "TypeScript", "Tailwind", "Node.js", "REST / GraphQL"].map((tag) => (
                  <span key={tag} className={`text-[11px] px-2.5 py-1 rounded-md ${theme.pageBg} border ${theme.cardBorder} ${theme.textMuted} font-mono`}>
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#estimator" className="text-xs font-bold text-[#2ba5b5] hover:underline flex items-center gap-1">
                <span>Estimate Web Project</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Pillar 2: UI/UX Design */}
          <div className={`${theme.cardBg} rounded-[32px] p-8 border ${theme.cardBorder} ${theme.cardHoverBorder} transition-all flex flex-col justify-between relative overflow-hidden group shadow-sm`}>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#7b59ef]/15 border border-[#7b59ef]/30 flex items-center justify-center mb-6 text-[#7b59ef] group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#7b59ef]/15 text-[#7b59ef] text-xs font-mono font-semibold mb-3">
                PILLAR 02
              </div>
              <h3 className={`text-2xl font-bold ${theme.headingFont} ${theme.textPrimary} mb-3`}>UI/UX Design</h3>
              <p className={`${theme.textMuted} text-sm leading-relaxed mb-6`}>
                Bespoke, human-centric interfaces and design systems crafted to captivate visitors, inspire confidence, and maximize conversions.
              </p>

              <div className="space-y-2.5 mb-8">
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#7b59ef] font-bold">✓</span>
                  <span>End-to-End User Research &amp; Customer Journey Mapping</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#7b59ef] font-bold">✓</span>
                  <span>Clickable High-Fidelity Figma Prototyping</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#7b59ef] font-bold">✓</span>
                  <span>Scalable Design Systems &amp; Component Tokens</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className="text-[#7b59ef] font-bold">✓</span>
                  <span>WCAG 2.1 AA Accessibility &amp; Usability Auditing</span>
                </div>
              </div>
            </div>

            <div className={`pt-6 border-t ${theme.cardBorder}`}>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Figma", "Design Tokens", "Wireframing", "Micro-Interactions", "UX Research"].map((tag) => (
                  <span key={tag} className={`text-[11px] px-2.5 py-1 rounded-md ${theme.pageBg} border ${theme.cardBorder} ${theme.textMuted} font-mono`}>
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#estimator" className="text-xs font-bold text-[#7b59ef] hover:underline flex items-center gap-1">
                <span>Estimate UI/UX Sprint</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Pillar 3: Digital Marketing */}
          <div className={`${theme.cardBg} rounded-[32px] p-8 border ${theme.cardBorder} ${theme.cardHoverBorder} transition-all flex flex-col justify-between relative overflow-hidden group shadow-sm`}>
            <div>
              <div className={`w-14 h-14 rounded-2xl ${theme.accentPrimaryBg}/15 border ${theme.accentPrimaryBg}/30 flex items-center justify-center mb-6 ${theme.accentPrimary} group-hover:scale-110 transition-transform`}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full ${theme.accentPrimaryBg}/15 ${theme.accentPrimary} text-xs font-mono font-semibold mb-3`}>
                PILLAR 03
              </div>
              <h3 className={`text-2xl font-bold ${theme.headingFont} ${theme.textPrimary} mb-3`}>Digital Marketing</h3>
              <p className={`${theme.textMuted} text-sm leading-relaxed mb-6`}>
                Data-driven growth strategies that lower customer acquisition costs (CAC) and deliver measurable, repeatable return on ad spend (ROAS).
              </p>

              <div className="space-y-2.5 mb-8">
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className={`${theme.accentPrimary} font-bold`}>✓</span>
                  <span>Google Search, Display &amp; Performance Max Campaigns</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className={`${theme.accentPrimary} font-bold`}>✓</span>
                  <span>Meta Ads (Instagram / Facebook) High-ROAS Funnels</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className={`${theme.accentPrimary} font-bold`}>✓</span>
                  <span>Technical, On-Page &amp; Local Google SEO Dominance</span>
                </div>
                <div className={`flex items-start gap-2.5 text-xs ${theme.textPrimary}`}>
                  <span className={`${theme.accentPrimary} font-bold`}>✓</span>
                  <span>Conversion Rate Optimization (CRO) &amp; A/B Split Testing</span>
                </div>
              </div>
            </div>

            <div className={`pt-6 border-t ${theme.cardBorder}`}>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Google Ads", "Meta Ads", "Technical SEO", "GA4 Analytics", "CRO"].map((tag) => (
                  <span key={tag} className={`text-[11px] px-2.5 py-1 rounded-md ${theme.pageBg} border ${theme.cardBorder} ${theme.textMuted} font-mono`}>
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#estimator" className={`text-xs font-bold ${theme.accentPrimary} hover:underline flex items-center gap-1`}>
                <span>Estimate Marketing Campaign</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE PORTFOLIO & CASE STUDIES */}
      {/* ========================================================================= */}
      <section id="work" className={`py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t ${theme.cardBorder}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <p className={`text-xs font-mono uppercase tracking-widest ${theme.accentPrimary}`}>Selected Portfolio</p>
            <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} ${theme.textPrimary} tracking-tight`}>
              Recent Client Canvases.
            </h2>
            <p className={`${theme.textMuted} text-sm sm:text-base max-w-xl`}>
              Explore how our code, design, and growth campaigns drive undeniable business results for our partners.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex flex-wrap gap-2 p-1.5 ${theme.cardBg} rounded-full border ${theme.cardBorder} shadow-sm w-fit`}>
            {["All", "Web Development", "UI/UX Design", "Digital Marketing"].map((category) => (
              <button
                key={category}
                onClick={() => setActivePortfolioCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activePortfolioCategory === category
                    ? `${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-sm`
                    : `${theme.textMuted} hover:${theme.textPrimary}`
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCaseStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedCaseStudy(study)}
              className={`${theme.cardBg} rounded-[32px] p-6 border ${theme.cardBorder} ${theme.cardHoverBorder} cursor-pointer flex flex-col justify-between group shadow-sm transition-all`}
            >
              <div>
                {/* Header tag & metric */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[11px] font-mono font-semibold px-3 py-1 rounded-full ${theme.pageBg} ${theme.textPrimary} border ${theme.cardBorder}`}>
                    {study.category}
                  </span>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${theme.headingFont} ${theme.accentPrimary}`}>{study.metric}</span>
                    <span className={`block text-[10px] ${theme.textMuted} font-mono`}>{study.metricLabel}</span>
                  </div>
                </div>

                {/* Card visual banner mockup */}
                <div className={`w-full h-44 rounded-2xl ${study.badgeColor} text-white p-5 flex flex-col justify-between mb-5 relative shadow-inner`}>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                    </div>
                    <span className="text-[10px] font-mono bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                      {study.client}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-xl font-bold ${theme.headingFont}`}>
                      {study.title}
                    </h4>
                    <p className="text-xs text-white/90 line-clamp-2 mt-1">
                      {study.tagline}
                    </p>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={`text-[10px] px-2.5 py-0.5 rounded-md ${theme.pageBg} ${theme.textMuted} border ${theme.cardBorder} font-mono`}>
                      {tag}
                    </span>
                  ))}
                  {study.tags.length > 3 && (
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-md ${theme.pageBg} ${theme.textMuted} border ${theme.cardBorder} font-mono`}>
                      +{study.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action trigger */}
              <div className={`pt-4 border-t ${theme.cardBorder} flex items-center justify-between`}>
                <span className={`text-xs font-bold ${theme.textPrimary} group-hover:${theme.accentPrimary} transition-colors`}>
                  View Full Case Study
                </span>
                <div className={`w-8 h-8 rounded-full ${theme.pageBg} border ${theme.cardBorder} flex items-center justify-center ${theme.textPrimary} group-hover:${theme.accentPrimaryBg} group-hover:${theme.accentPrimaryText} transition-all`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative space-y-6 shadow-2xl`}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className={`absolute top-6 right-6 p-2 rounded-full ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary} hover:scale-110 transition-transform`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-mono px-3 py-1 rounded-full ${theme.pageBg} border ${theme.cardBorder} ${theme.accentPrimary} font-semibold`}>
                  {selectedCaseStudy.category}
                </span>
                <span className={`text-xs ${theme.textMuted} font-mono`}>• {selectedCaseStudy.client}</span>
              </div>
              <h3 className={`text-2xl sm:text-3xl font-bold ${theme.headingFont} ${theme.textPrimary}`}>
                {selectedCaseStudy.title}
              </h3>
            </div>

            {/* Key Metric highlight banner */}
            <div className={`p-4 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} flex items-center justify-between`}>
              <div>
                <p className={`text-xs ${theme.textMuted} uppercase tracking-widest font-mono font-semibold`}>Key Achievement</p>
                <p className={`text-3xl font-bold ${theme.headingFont} ${theme.accentPrimary}`}>{selectedCaseStudy.metric}</p>
              </div>
              <span className={`text-xs font-medium ${theme.textPrimary} font-mono`}>{selectedCaseStudy.metricLabel}</span>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h4 className={`text-xs font-mono uppercase tracking-widest ${theme.accentPrimary} mb-1 font-semibold`}>The Challenge</h4>
                <p className={`p-4 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textMuted}`}>{selectedCaseStudy.challenge}</p>
              </div>
              <div>
                <h4 className={`text-xs font-mono uppercase tracking-widest ${theme.accentPrimary} mb-1 font-semibold`}>Our Strategy &amp; Solution</h4>
                <p className={`p-4 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textMuted}`}>{selectedCaseStudy.solution}</p>
              </div>
            </div>

            {/* Deliverables & Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className={`${theme.pageBg} p-4 rounded-2xl border ${theme.cardBorder}`}>
                <h4 className={`text-xs font-mono uppercase tracking-widest ${theme.textPrimary} mb-2 font-semibold`}>Deliverables</h4>
                <ul className={`space-y-1.5 text-xs ${theme.textMuted}`}>
                  {selectedCaseStudy.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className={`${theme.accentPrimary} font-bold`}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${theme.pageBg} p-4 rounded-2xl border ${theme.cardBorder}`}>
                <h4 className={`text-xs font-mono uppercase tracking-widest ${theme.textPrimary} mb-2 font-semibold`}>Verified Results</h4>
                <ul className={`space-y-1.5 text-xs ${theme.textMuted}`}>
                  {selectedCaseStudy.results.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#2ba5b5] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className={`pt-4 border-t ${theme.cardBorder} flex flex-col sm:flex-row gap-3`}>
              <a
                href="#estimator"
                onClick={() => setSelectedCaseStudy(null)}
                className={`flex-1 py-3 text-center rounded-full font-bold text-xs ${theme.accentPrimaryBg} ${theme.accentPrimaryText} transition-all shadow-md`}
              >
                Estimate Similar Project
              </a>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className={`py-3 px-6 rounded-full font-semibold text-xs ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary}`}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE PROJECT COST ESTIMATOR */}
      {/* ========================================================================= */}
      <section id="estimator" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${theme.cardBg} rounded-[40px] p-6 sm:p-12 border ${theme.cardBorder} relative overflow-hidden shadow-xl`}>
          <div className="max-w-3xl mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full ${theme.accentPrimaryBg}/15 ${theme.accentPrimary} text-xs font-mono font-semibold mb-3`}>
              <span>Interactive Pricing Engine</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} ${theme.textPrimary} tracking-tight`}>
              Instant Project <span className={`italic ${theme.accentPrimary}`}>Cost Estimator</span>.
            </h2>
            <p className={`${theme.textMuted} text-sm sm:text-base mt-2`}>
              Select your requirements below to calculate a transparent ballpark budget. No hidden fees or gatekeeping.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Options Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Select Service Pillar */}
              <div className="space-y-3">
                <label className={`text-xs font-mono uppercase tracking-wider ${theme.textMuted} font-semibold block`}>
                  Step 1: Choose Primary Service Pillar
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "all", label: "All-in-One", sub: "Web + UI + Ads" },
                    { id: "web-dev", label: "Web Dev", sub: "Next.js / React" },
                    { id: "ui-ux", label: "UI/UX Design", sub: "Figma System" },
                    { id: "marketing", label: "Marketing", sub: "Google & Meta" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstService(item.id as ServicePillar)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        estService === item.id
                          ? `${theme.contrastBlockBg} ${theme.contrastBlockText} border-transparent shadow-md`
                          : `${theme.cardBg} ${theme.cardBorder} ${theme.textPrimary} ${theme.cardHoverBorder}`
                      }`}
                    >
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className={`text-[10px] mt-0.5 ${estService === item.id ? "text-amber-400" : theme.textMuted}`}>{item.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Project Scope */}
              <div className="space-y-3">
                <label className={`text-xs font-mono uppercase tracking-wider ${theme.textMuted} font-semibold block`}>
                  Step 2: Project Scale &amp; Complexity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "starter", name: "Starter MVP", desc: "1-5 Pages or landing flow" },
                    { id: "growth", name: "Growth Scale", desc: "Full custom web + SEO (Recommended)" },
                    { id: "enterprise", name: "Enterprise Custom", desc: "Advanced apps & multi-funnels" },
                  ].map((scope) => (
                    <button
                      key={scope.id}
                      type="button"
                      onClick={() => setEstScope(scope.id as ScopeTier)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        estScope === scope.id
                          ? `${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-md`
                          : `${theme.cardBg} ${theme.cardBorder} ${theme.textPrimary} ${theme.cardHoverBorder}`
                      }`}
                    >
                      <p className="text-xs font-bold">{scope.name}</p>
                      <p className={`text-[11px] mt-1 ${estScope === scope.id ? "opacity-90" : theme.textMuted}`}>{scope.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Urgency / Timeline */}
              <div className="space-y-3">
                <label className={`text-xs font-mono uppercase tracking-wider ${theme.textMuted} font-semibold block`}>
                  Step 3: Timeline Requirements
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "urgent", name: "Urgent Sprint", time: "7–14 Days" },
                    { id: "standard", name: "Standard", time: "3–4 Weeks" },
                    { id: "flexible", name: "Flexible", time: "6+ Weeks" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEstTimeline(t.id as TimelineUrgency)}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        estTimeline === t.id
                          ? `${theme.contrastBlockBg} ${theme.contrastBlockText} border-transparent`
                          : `${theme.cardBg} ${theme.cardBorder} ${theme.textPrimary} ${theme.cardHoverBorder}`
                      }`}
                    >
                      <p className="text-xs font-bold">{t.name}</p>
                      <p className={`text-[11px] font-mono mt-0.5 ${estTimeline === t.id ? "text-amber-400" : "text-[#2ba5b5]"}`}>{t.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Optional Add-ons */}
              <div className="space-y-3">
                <label className={`text-xs font-mono uppercase tracking-wider ${theme.textMuted} font-semibold block`}>
                  Step 4: Strategic Growth Add-ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { key: "seo", label: "Technical SEO & Schema Setup", cost: "+₹6,000" },
                    { key: "cms", label: "Headless Content CMS (Sanity)", cost: "+₹8,000" },
                    { key: "ads", label: "Google & Meta Ads Strategy", cost: "+₹10,000" },
                    { key: "speed", label: "Ultra-Fast Load (<0.8s) Tuning", cost: "+₹4,000" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleAddon(item.key)}
                      className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                        estAddons[item.key]
                          ? `${theme.pageBg} border-indigo-500/50 ${theme.textPrimary}`
                          : `${theme.cardBg} ${theme.cardBorder} ${theme.textMuted}`
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold ${estAddons[item.key] ? `${theme.accentPrimaryBg} ${theme.accentPrimaryText}` : `border ${theme.cardBorder}`}`}>
                          {estAddons[item.key] && "✓"}
                        </div>
                        <span className="text-xs font-semibold">{item.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono ${theme.accentPrimary} font-bold`}>{item.cost}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Breakdown Card */}
            <div className={`lg:col-span-5 ${theme.contrastBlockBg} ${theme.contrastBlockText} rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl relative border border-white/10`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider opacity-80 font-semibold">Estimated Budget</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                  Live Calculated
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-bold ${theme.headingFont}`}>
                    ₹{calculateEstimate()}
                  </span>
                  <span className="text-xs opacity-60 font-mono">INR</span>
                </div>
                <p className="text-xs opacity-70 mt-2">
                  *Transparent ballpark estimate including development, custom design system, and verified milestone deliveries.
                </p>
              </div>

              {/* Selected summary */}
              <div className="space-y-2.5 text-xs bg-white/[0.06] p-4 rounded-2xl border border-white/[0.08]">
                <div className="flex justify-between">
                  <span className="opacity-60">Pillar:</span>
                  <span className="font-semibold uppercase">{estService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Scale:</span>
                  <span className="font-semibold uppercase">{estScope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Timeline:</span>
                  <span className={`font-semibold ${theme.accentSecondary} uppercase`}>{estTimeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Active Add-ons:</span>
                  <span className={`font-semibold ${theme.accentPrimary} font-mono`}>
                    {Object.values(estAddons).filter(Boolean).length} Selected
                  </span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-full font-bold text-xs text-white bg-[#25D366] hover:bg-[#20ba59] flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
                  </svg>
                  <span>Send Estimate to WhatsApp</span>
                </a>

                <a
                  href="#contact"
                  className="w-full py-3.5 rounded-full font-semibold text-xs opacity-90 hover:opacity-100 bg-white/10 hover:bg-white/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Submit Inquiry Form Below</span>
                  <span>↓</span>
                </a>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] opacity-70">
                  Prefer a direct phone conversation? Call <a href="tel:7010231792" className={`font-semibold hover:underline ${theme.accentSecondary}`}>+91 70102 31792</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRANSPARENT PRICING PLANS */}
      {/* ========================================================================= */}
      <section id="pricing" className={`py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t ${theme.cardBorder}`}>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className={`text-xs font-mono uppercase tracking-widest ${theme.accentPrimary}`}>Predictable Investments</p>
          <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} ${theme.textPrimary} tracking-tight`}>
            Curated Studio Packages.
          </h2>
          <p className={`${theme.textMuted} text-sm sm:text-base`}>
            Whether you need a focused sprint or continuous monthly growth, we offer transparent, high-ROI agreements.
          </p>

          {/* Toggle Switch */}
          <div className={`inline-flex items-center p-1.5 ${theme.cardBg} rounded-full border ${theme.cardBorder} shadow-sm mt-6`}>
            <button
              onClick={() => setPricingPeriod("project")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                pricingPeriod === "project"
                  ? `${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-sm`
                  : `${theme.textMuted} hover:${theme.textPrimary}`
              }`}
            >
              Fixed Project Pricing
            </button>
            <button
              onClick={() => setPricingPeriod("retainer")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                pricingPeriod === "retainer"
                  ? `${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-sm`
                  : `${theme.textMuted} hover:${theme.textPrimary}`
              }`}
            >
              Monthly Retainer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[32px] p-8 border flex flex-col justify-between relative transition-all ${
                tier.popular
                  ? `${theme.contrastBlockBg} ${theme.contrastBlockText} border-transparent shadow-2xl scale-[1.02]`
                  : `${theme.cardBg} ${theme.textPrimary} ${theme.cardBorder} shadow-sm ${theme.cardHoverBorder}`
              }`}
            >
              {tier.popular && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full ${theme.accentPrimaryBg} ${theme.accentPrimaryText} text-[11px] font-bold uppercase tracking-widest shadow-md`}>
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-2xl font-bold ${theme.headingFont}`}>{tier.name}</h3>
                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-semibold ${tier.popular ? "bg-white/10 text-white" : `${theme.pageBg} ${theme.accentPrimary} border ${theme.cardBorder}`}`}>
                    {tier.badge}
                  </span>
                </div>

                <p className={`text-xs mb-6 leading-relaxed min-h-[36px] ${tier.popular ? "opacity-80" : theme.textMuted}`}>
                  {tier.description}
                </p>

                <div className={`mb-6 p-5 rounded-2xl border ${tier.popular ? "bg-white/5 border-white/10" : `${theme.pageBg} ${theme.cardBorder}`}`}>
                  <p className={`text-xs font-mono mb-1 ${tier.popular ? "opacity-60" : theme.textMuted}`}>
                    {pricingPeriod === "project" ? "One-Time Investment" : "Monthly Retainer"}
                  </p>
                  <p className={`text-3xl font-bold ${theme.headingFont}`}>
                    {pricingPeriod === "project" ? tier.projectPrice : tier.retainerPrice}
                  </p>
                  <p className={`text-[11px] font-mono mt-1 ${theme.accentPrimary}`}>Est. Turnaround: {tier.timeline}</p>
                </div>

                <div className="space-y-3 mb-8">
                  <p className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${tier.popular ? "opacity-70" : theme.textMuted}`}>Included Deliverables:</p>
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span className={tier.popular ? "opacity-90" : theme.textPrimary}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-6 border-t ${tier.popular ? "border-white/10" : theme.cardBorder}`}>
                <a
                  href="#contact"
                  className={`w-full py-3.5 rounded-full text-center font-bold text-xs flex items-center justify-center transition-all ${
                    tier.popular
                      ? `${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-md`
                      : `${theme.contrastBlockBg} ${theme.contrastBlockText}`
                  }`}
                >
                  {tier.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLIENT TESTIMONIALS */}
      {/* ========================================================================= */}
      <section id="reviews" className={`py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t ${theme.cardBorder}`}>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className={`text-xs font-mono uppercase tracking-widest ${theme.accentPrimary}`}>Client Feedback</p>
          <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} ${theme.textPrimary} tracking-tight`}>
            Backed by Ambitious Founders.
          </h2>
          <p className={`${theme.textMuted} text-sm sm:text-base`}>
            Here's what our partners say about our development speed, design polish, and measurable revenue lift.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className={`${theme.cardBg} rounded-[32px] p-8 border ${theme.cardBorder} flex flex-col justify-between space-y-6 shadow-sm`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#ffc145]">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-base">★</span>
                    ))}
                  </div>
                  <span className={`text-[11px] font-mono px-3 py-1 rounded-full ${theme.pageBg} ${theme.accentPrimary} border ${theme.cardBorder} font-semibold`}>
                    {t.highlight}
                  </span>
                </div>

                <p className={`${theme.textPrimary} text-base leading-relaxed italic ${theme.headingFont}`}>
                  "{t.content}"
                </p>
              </div>

              <div className={`pt-4 border-t ${theme.cardBorder} flex items-center justify-between`}>
                <div>
                  <h4 className={`font-bold text-sm ${theme.textPrimary}`}>{t.name}</h4>
                  <p className={`text-xs ${theme.textMuted}`}>{t.role} • {t.company}</p>
                </div>
                <span className={`text-[11px] font-mono ${theme.accentPrimary} bg-white/10 px-3 py-1 rounded-full font-semibold border ${theme.cardBorder}`}>
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PROVEN 4-STEP PROCESS */}
      {/* ========================================================================= */}
      <section className={`py-20 ${theme.contrastBlockBg} ${theme.contrastBlockText} rounded-[40px] max-w-7xl mx-auto px-6 sm:px-12 my-12 shadow-2xl border border-white/10`}>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className={`text-xs font-mono uppercase tracking-widest ${theme.accentSecondary}`}>How We Operate</p>
          <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} tracking-tight`}>
            Four Steps. Zero Surprises.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Discovery & Strategy",
              desc: "Deep dive into your business model, customer personas, competitor benchmarks, and conversion metrics.",
              accent: theme.accentSecondary,
            },
            {
              step: "02",
              title: "UI/UX & Prototyping",
              desc: "Interactive Figma wireframes and visual design prototypes approved before writing any production code.",
              accent: "text-[#7b59ef]",
            },
            {
              step: "03",
              title: "High-Speed Development",
              desc: "Modern Next.js / React engineering, responsive testing across all device viewports, and 95+ PageSpeed.",
              accent: "text-[#2ba5b5]",
            },
            {
              step: "04",
              title: "Launch & Ad Growth",
              desc: "Production release, search engine indexing, ad campaigns rollout, and continuous weekly ROAS optimization.",
              accent: theme.accentPrimary,
            },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4">
              <span className={`text-4xl font-bold ${theme.headingFont} ${item.accent}`}>
                {item.step}
              </span>
              <h3 className={`text-lg font-bold ${theme.headingFont}`}>{item.title}</h3>
              <p className="text-xs opacity-75 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className={`text-xs font-mono uppercase tracking-widest ${theme.accentPrimary}`}>Common Queries</p>
          <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} ${theme.textPrimary} tracking-tight`}>
            Frequently Asked Questions.
          </h2>
          <p className={`${theme.textMuted} text-sm sm:text-base`}>
            Everything you need to know about partnering with our web development, UI/UX, and marketing team.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={`${theme.cardBg} rounded-3xl border ${theme.cardBorder} overflow-hidden transition-all shadow-sm`}
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className={`font-bold text-base ${theme.textPrimary} ${theme.headingFont}`}>
                  {faq.q}
                </span>
                <span className={`${theme.accentPrimary} text-2xl font-bold`}>
                  {openFaqIndex === idx ? "−" : "+"}
                </span>
              </button>
              {openFaqIndex === idx && (
                <div className={`px-6 pb-6 text-xs sm:text-sm ${theme.textMuted} leading-relaxed border-t ${theme.cardBorder} pt-4`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. CONTACT & INQUIRY FORM */}
      {/* ========================================================================= */}
      <section id="contact" className={`py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t ${theme.cardBorder}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.accentPrimaryBg}/15 ${theme.accentPrimary} text-xs font-mono font-semibold`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Now Accepting Q2/Q3 Client Projects</span>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-bold ${theme.headingFont} ${theme.textPrimary} tracking-tight`}>
                Let's Build Something <span className={`italic ${theme.accentPrimary}`}>Remarkable</span>.
              </h2>
              <p className={`${theme.textMuted} text-sm sm:text-base leading-relaxed`}>
                Whether you need a high-performance web redesign, bespoke UI/UX prototyping, or high-ROAS marketing funnels, we're here to help.
              </p>
            </div>

            {/* Direct contact cards */}
            <div className="space-y-4">
              <a
                href="https://wa.me/917010231792"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-4 p-4 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} hover:border-[#25D366] transition-all group shadow-sm`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted} font-mono`}>Chat Directly via WhatsApp</p>
                  <p className={`text-sm font-bold ${theme.textPrimary}`}>+91 70102 31792</p>
                </div>
              </a>

              <a
                href="mailto:RBWealthandrealty@gmail.com"
                className={`flex items-center gap-4 p-4 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} hover:border-[#ff6b4a] transition-all group shadow-sm`}
              >
                <div className={`w-12 h-12 rounded-2xl ${theme.accentPrimaryBg}/15 flex items-center justify-center ${theme.accentPrimary} group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted} font-mono`}>Official Email</p>
                  <p className={`text-sm font-bold ${theme.textPrimary}`}>RBWealthandrealty@gmail.com</p>
                </div>
              </a>

              <a
                href="https://nexuscreative.site"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-4 p-4 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} hover:border-[#ff6b4a] transition-all group shadow-sm`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-[#ff6b4a]/15 flex items-center justify-center ${theme.accentPrimary} group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted} font-mono`}>Official Website Domain</p>
                  <p className={`text-sm font-bold ${theme.textPrimary}`}>Nexuscreative.site</p>
                </div>
              </a>

              <a
                href="tel:7010231792"
                className={`flex items-center gap-4 p-4 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} hover:border-[#7b59ef] transition-all group shadow-sm`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7b59ef]/15 flex items-center justify-center text-[#7b59ef] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted} font-mono`}>Phone Call</p>
                  <p className={`text-sm font-bold ${theme.textPrimary}`}>+91 70102 31792</p>
                </div>
              </a>

              <div className={`flex items-start gap-4 p-4 rounded-3xl ${theme.cardBg} border ${theme.cardBorder} shadow-sm`}>
                <div className="w-12 h-12 rounded-2xl bg-[#2ba5b5]/15 flex items-center justify-center text-[#2ba5b5] shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted} font-mono`}>Studio Office Address</p>
                  <p className={`text-xs font-semibold ${theme.textPrimary} leading-relaxed mt-0.5`}>
                    Plot 11, S1, 2nd Floor, Greenwood Apartment,<br />
                    Navasakthi Nagar, Noombal Road, Chennai - 600077
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className={`lg:col-span-7 ${theme.cardBg} rounded-[40px] p-8 sm:p-10 border ${theme.cardBorder} shadow-xl`}>
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className={`w-16 h-16 rounded-full ${theme.accentPrimaryBg}/20 flex items-center justify-center ${theme.accentPrimary} text-3xl mx-auto`}>
                  ✓
                </div>
                <h3 className={`text-2xl font-bold ${theme.headingFont} ${theme.textPrimary}`}>
                  Proposal Request Received!
                </h3>
                <p className={`text-sm ${theme.textMuted} max-w-md mx-auto`}>
                  Thank you, <span className={`${theme.textPrimary} font-semibold`}>{formData.name}</span>. Our senior technical director is reviewing your brief and will respond with a full scope proposal within 24 hours.
                </p>
                <div className="pt-4">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-colors"
                  >
                    <span>Follow Up on WhatsApp Now</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <h3 className={`text-2xl font-bold ${theme.headingFont} ${theme.textPrimary}`}>
                    Request a Project Brief
                  </h3>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>
                    Tell us about your requirements and we will send a detailed proposal and timeline within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${theme.textPrimary} font-semibold`}>Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary} placeholder:opacity-50 text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${theme.textPrimary} font-semibold`}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary} placeholder:opacity-50 text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${theme.textPrimary} font-semibold`}>Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary} placeholder:opacity-50 text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${theme.textPrimary} font-semibold`}>Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary} text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
                    >
                      <option value="Web Development & UI/UX Design">Web Development &amp; UI/UX Design</option>
                      <option value="Web Development (Next.js / React)">Web Development (Next.js / React)</option>
                      <option value="UI/UX Design & Prototyping">UI/UX Design &amp; Prototyping</option>
                      <option value="Digital Marketing & Paid Ads (Google / Meta)">Digital Marketing &amp; Paid Ads</option>
                      <option value="All-in-One Full Digital Growth Bundle">All-in-One Full Digital Growth Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-mono ${theme.textPrimary} font-semibold`}>Estimated Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary} text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
                  >
                    <option value="₹20,000 - ₹35,000">₹20,000 – ₹35,000 (Starter Project)</option>
                    <option value="₹35,000 - ₹60,000">₹35,000 – ₹60,000 (Growth Platform)</option>
                    <option value="₹60,000 - ₹1,20,000">₹60,000 – ₹1,20,000 (Enterprise Custom)</option>
                    <option value="₹1,20,000+">₹1,20,000+ (Full Suite & Retainer)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-mono ${theme.textPrimary} font-semibold`}>Tell us about your vision</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your goals, desired timeline, or any reference websites you admire..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl ${theme.pageBg} border ${theme.cardBorder} ${theme.textPrimary} placeholder:opacity-50 text-xs focus:outline-none focus:border-indigo-500 transition-colors`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-full font-bold text-xs ${theme.accentPrimaryBg} ${theme.accentPrimaryText} shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2`}
                >
                  <span>Submit Project Inquiry</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FOOTER */}
      {/* ========================================================================= */}
      <footer className={`border-t ${theme.cardBorder} ${theme.contrastBlockBg} ${theme.contrastBlockText} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Agency info */}
            <div className="md:col-span-2 space-y-4">
              <a href="#" className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${theme.accentPrimaryBg} flex items-center justify-center ${theme.accentPrimaryText} font-bold`}>
                  ✦
                </div>
                <span className={`font-bold text-xl ${theme.headingFont} tracking-tight`}>
                  Nexus <span className={`italic ${theme.accentPrimary}`}>Creative</span>
                </span>
              </a>
              <p className="text-xs opacity-75 max-w-sm leading-relaxed">
                A premier digital agency delivering bespoke Web Development, human-centric UI/UX Design, and revenue-driving Digital Marketing campaigns.
              </p>
              <div className="flex gap-4 pt-2">
                {["LinkedIn", "Twitter/X", "GitHub", "Dribbble", "Instagram"].map((network) => (
                  <a
                    key={network}
                    href="#"
                    className={`text-xs opacity-60 hover:opacity-100 transition-opacity font-mono`}
                  >
                    {network}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest font-semibold">Capabilities</p>
              <ul className="space-y-2 text-xs opacity-75">
                <li><a href="#services" className="hover:underline">Web Development</a></li>
                <li><a href="#services" className="hover:underline">UI/UX Design Systems</a></li>
                <li><a href="#services" className="hover:underline">Google &amp; Meta Ads</a></li>
                <li><a href="#services" className="hover:underline">Technical SEO Audit</a></li>
                <li><a href="#estimator" className="hover:underline">Live Cost Estimator</a></li>
              </ul>
            </div>

            {/* Direct Contacts */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest font-semibold">Direct Contact</p>
              <ul className="space-y-2 text-xs opacity-80 font-mono">
                <li>🌐 <a href="https://nexuscreative.site" target="_blank" rel="noreferrer" className={`hover:${theme.accentPrimary} transition-colors font-semibold`}>Nexuscreative.site</a></li>
                <li>📞 <a href="tel:7010231792" className={`hover:${theme.accentSecondary} transition-colors`}>+91 70102 31792</a></li>
                <li>💬 <a href="https://wa.me/917010231792" target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp: +91 70102 31792</a></li>
                <li>✉️ <a href="mailto:RBWealthandrealty@gmail.com" className={`hover:${theme.accentPrimary} transition-colors`}>RBWealthandrealty@gmail.com</a></li>
                <li className="leading-relaxed opacity-70 text-[11px]">📍 Plot 11, S1, 2nd Floor, Greenwood Apartment, Navasakthi Nagar, Noombal Road, Chennai - 600077</li>
                <li className="text-emerald-400 font-bold">🟢 Open for Q2/Q3 Projects</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60 font-mono">
            <p>© 2026 Nexus Creative (Nexuscreative.site). All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
