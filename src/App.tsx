import { useState, useId } from "react";
import mobileTabletImg from "./assets/mobile-tablet-ui.jpg";
import desktopWorkspaceImg from "./assets/desktop-workspace-ui.jpg";
import laptopMegaphoneImg from "./assets/laptop-megaphone-marketing.jpg";
import { SERVICES_CATEGORIES, ALL_FLAT_SERVICES } from "./data/servicesData";
import { PORTFOLIO_PROJECTS, PortfolioItem } from "./data/portfolioData";
import nexusLogoImg from "./assets/nexus-logo.png";
import QuantumCore3D from "./components/QuantumCore3D";
import NetworkInfrastructureSection from "./components/NetworkInfrastructureSection";
import Nexus3DTechHubSection from "./components/Nexus3DTechHubSection";
import Hero3DHub from "./components/Hero3DHub";

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
  {
    id: "networking-hardware",
    title: "Networking & IT Infrastructure",
    icon: "🖧",
    accentColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    btnColor: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
    description:
      "Enterprise router, firewall & managed switch configuration, structured Cat6A/fiber cabling, server rack installations, and 24/7 network security AMC.",
    details: [
      "Router & Firewall Configuration (Fortinet, Cisco, pfSense, Sophos)",
      "Managed L2/L3 Switch Deployment & 802.1Q VLAN Segmentation",
      "Hardware Installation, Server Rack Mounting & Patch Panels",
      "Site-to-Site IPsec VPN, Wi-Fi 6 APs & 24/7 AMC Maintenance",
    ],
    metric: "99.99% Network Uptime",
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

export interface RegisteredLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  service: string;
  message: string;
  submittedAt: string;
  status: "New" | "Contacted" | "Closed";
  emailSent?: boolean;
}

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("unified");
  const [selectedServiceModal, setSelectedServiceModal] = useState<typeof UI_UX_SERVICES[0] | null>(null);
  const [selectedMarketingNode, setSelectedMarketingNode] = useState<MarketingNode | null>(MARKETING_NODES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Services Mega Menu & Directory States
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [servicesSearch, setServicesSearch] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [directorySearch, setDirectorySearch] = useState("");
  const [mobileServicesAccordion, setMobileServicesAccordion] = useState(false);
  const [inquiryToast, setInquiryToast] = useState<string | null>(null);

  // Portfolio Modal State
  const [selectedPortfolioModal, setSelectedPortfolioModal] = useState<PortfolioItem | null>(null);

  // Contact Form & Lead System State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    service: "",
    message: "",
  });
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatusText, setSubmitStatusText] = useState("");
  const formId = useId();

  // Admin Leads Inbox Drawer State
  const [adminLeadsOpen, setAdminLeadsOpen] = useState(false);
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [registeredLeads, setRegisteredLeads] = useState<RegisteredLead[]>(() => {
    try {
      const saved = localStorage.getItem("nexus_registered_leads_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [web3FormsKey, setWeb3FormsKey] = useState<string>(() => {
    return localStorage.getItem("nexus_web3forms_key") || "";
  });
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem("nexus_admin_email") || "haridass@nexuscreative.site";
  });

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Nexus Creative!\n\n` +
        `I submitted a project inquiry from your website:\n` +
        `• Name: ${formData.name || "Client"}\n` +
        `• Email: ${formData.email || "N/A"}\n` +
        `• Mobile: ${formData.phone || "N/A"}\n` +
        `• Category: ${formData.category || "General"}\n` +
        `• Service: ${formData.service || "General"}\n` +
        `• Project Details: ${formData.message || "Discovery Call"}\n\n` +
        `Looking forward to connecting!`
    );
    return `https://wa.me/917010231792?text=${text}`;
  };

  const getServiceWhatsAppUrl = (serviceName: string) => {
    const text = encodeURIComponent(
      `Hello Nexus Creative! I would like to inquire about your "${serviceName}" service.\n` +
        `Please provide more details regarding project scope, estimated timeline, and quote.`
    );
    return `https://wa.me/917010231792?text=${text}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaChecked) {
      alert("Please verify that you are not a robot by clicking the checkbox.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatusText("Recording registration & dispatching notifications...");

    const newLead: RegisteredLead = {
      id: "LEAD-" + Date.now().toString(36).toUpperCase(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category: formData.category || "General",
      service: formData.service || "General Inquiry",
      message: formData.message,
      submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      status: "New",
      emailSent: false,
    };

    // Save lead to local storage immediately so it's NEVER lost
    let currentList: RegisteredLead[] = [];
    try {
      const saved = localStorage.getItem("nexus_registered_leads_v1");
      if (saved) currentList = JSON.parse(saved);
    } catch {}

    const updatedList = [newLead, ...currentList.filter((l) => l.id !== newLead.id)];
    setRegisteredLeads(updatedList);
    try {
      localStorage.setItem("nexus_registered_leads_v1", JSON.stringify(updatedList));
    } catch (err) {
      console.error("Storage error:", err);
    }

    let dispatched = false;

    // 1. Dispatch via Web3Forms API endpoint (Free / Keyed email delivery)
    try {
      const apiKey = web3FormsKey || "a3c94291-7299-4d69-b5f7-876b32b851bf";
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `🔥 New Registration: ${formData.name} - ${formData.service || formData.category}`,
          from_name: "Nexus Creative Portal",
          to_email: adminEmail,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          service: formData.service,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        dispatched = true;
      }
    } catch (wErr) {
      console.log("Web3Forms notice:", wErr);
    }

    // 2. Dispatch via PHP server script (/send-email.php)
    try {
      const pRes = await fetch("./send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          service: formData.service,
          message: formData.message,
          admin_email: adminEmail,
        }),
      });
      if (pRes.ok) {
        const pData = await pRes.json();
        if (pData.success) {
          dispatched = true;
        }
      }
    } catch (pErr) {
      console.log("PHP endpoint notice:", pErr);
    }

    // Mark emailSent in stored lead
    newLead.emailSent = dispatched;
    const finalizedList = [newLead, ...currentList.filter((l) => l.id !== newLead.id)];
    setRegisteredLeads(finalizedList);
    try {
      localStorage.setItem("nexus_registered_leads_v1", JSON.stringify(finalizedList));
    } catch {}

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  const exportLeadsCSV = () => {
    if (registeredLeads.length === 0) {
      alert("No registered leads available to export.");
      return;
    }
    const headers = ["Lead ID", "Name", "Email", "Phone", "Category", "Service", "Message", "Submitted At", "Status", "Email Sent"];
    const rows = registeredLeads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.category.replace(/"/g, '""')}"`,
      `"${l.service.replace(/"/g, '""')}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${l.submittedAt}"`,
      `"${l.status}"`,
      `"${l.emailSent ? "Dispatched" : "Logged in Local Inbox"}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexus_creative_customer_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteLead = (leadId: string) => {
    if (confirm("Are you sure you want to remove this customer record?")) {
      const filtered = registeredLeads.filter((l) => l.id !== leadId);
      setRegisteredLeads(filtered);
      localStorage.setItem("nexus_registered_leads_v1", JSON.stringify(filtered));
    }
  };

  const handleSelectService = (serviceName: string) => {
    const foundCat = SERVICES_CATEGORIES.find((cat) => cat.items.includes(serviceName));
    setFormData((prev) => ({
      ...prev,
      category: foundCat ? foundCat.name : "",
      service: serviceName,
    }));
    setServicesMenuOpen(false);
    setMobileMenuOpen(false);
    setInquiryToast(serviceName);
    setTimeout(() => setInquiryToast(null), 6000);

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRequestSiteSurvey = () => {
    setFormData((prev) => ({
      ...prev,
      category: "Networking Solutions",
      service: "Installation & Commissioning",
      message:
        "Hi Nexus Creative, I would like to request an on-site technical survey and infrastructure assessment for our premises.",
    }));
    setInquiryToast("Site Survey Request Brief Loaded");
    setTimeout(() => setInquiryToast(null), 6000);

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetProjectQuote = () => {
    setFormData((prev) => ({
      ...prev,
      category: "Networking Solutions",
      service: "Routers, Switches & Firewalls",
      message:
        "Hi Nexus Creative, I would like to request an itemized project quote with equipment supply, cabling, and commissioning breakdown.",
    }));
    setInquiryToast("Project Quote Brief Loaded");
    setTimeout(() => setInquiryToast(null), 6000);

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAnnualMaintenance = () => {
    setFormData((prev) => ({
      ...prev,
      category: "Networking Solutions",
      service: "Troubleshooting & AMC Support",
      message:
        "Hi Nexus Creative, I would like to inquire about an Annual Maintenance Contract (AMC) and preventive support for our business network.",
    }));
    setInquiryToast("AMC Inquiry Brief Loaded");
    setTimeout(() => setInquiryToast(null), 6000);

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getProjectWhatsAppUrl = (project: PortfolioItem) => {
    const text = encodeURIComponent(
      `Hello Nexus Creative! I saw your "${project.name}" (${project.title}) project in your portfolio.\n` +
        `I would like to consult with you on building a similar ${project.category} solution.`
    );
    return `https://wa.me/917010231792?text=${text}`;
  };

  const handleInquireProject = (project: PortfolioItem) => {
    setFormData((prev) => ({
      ...prev,
      category: "Web Development",
      service: `${project.name} Custom Solution`,
      message: `Hi Nexus Creative, I am interested in building a solution similar to your ${project.name} project (${project.title}) built with ${project.technology}.`,
    }));
    setInquiryToast(`${project.name} Portfolio Case Study`);
    setTimeout(() => setInquiryToast(null), 6000);
    setSelectedPortfolioModal(null);

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filtered services for Mega Menu search
  const filteredMegaServices = servicesSearch.trim()
    ? ALL_FLAT_SERVICES.filter(
        (s) =>
          s.name.toLowerCase().includes(servicesSearch.toLowerCase()) ||
          s.categoryName.toLowerCase().includes(servicesSearch.toLowerCase())
      )
    : null;

  // Filtered services for in-page directory
  const filteredDirectoryServices = ALL_FLAT_SERVICES.filter((service) => {
    const matchesCategory =
      activeCategoryFilter === "all" || service.categoryId === activeCategoryFilter;
    const matchesSearch =
      !directorySearch.trim() ||
      service.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      service.categoryName.toLowerCase().includes(directorySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      {/* 1. MAIN NAVIGATION HEADER (CLEAN, PROPORTIONAL, STICKY TOP-0)              */}
      {/* ========================================================================= */}
      <header className="border-b border-white/10 bg-[#050914]/95 backdrop-blur-xl sticky top-0 z-50 shadow-xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-all flex items-center justify-center border border-cyan-400/40 overflow-hidden shrink-0">
              <img
                src={nexusLogoImg}
                alt="Nexus Creative Official Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-none flex items-center gap-1.5 whitespace-nowrap">
                NEXUS <span className="text-cyan-400 text-glow-cyan">CREATIVE</span>
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 mt-1 whitespace-nowrap hidden xs:inline">
                DIGITAL SOLUTIONS &amp; NETWORK INFRASTRUCTURE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Clean, single-line, proportional) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium text-slate-300 whitespace-nowrap">
            <a href="#home" className="hover:text-cyan-400 transition-colors">
              Home
            </a>
            <a href="#core-pillars" className="hover:text-cyan-400 transition-colors">
              Divisions
            </a>
            <a
              href="#3d-hub"
              className="text-cyan-300 hover:text-cyan-200 transition-colors font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>3D Tech Hub</span>
            </a>
            <a
              href="#network-infrastructure"
              className="text-emerald-300 hover:text-emerald-200 transition-colors font-semibold flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Network &amp; IT</span>
            </a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </a>

            {/* SERVICES MEGA MENU TRIGGER */}
            <div
              className="relative py-2"
              onMouseEnter={() => setServicesMenuOpen(true)}
              onMouseLeave={() => setServicesMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  servicesMenuOpen ? "text-cyan-400 font-bold" : "hover:text-cyan-400 text-slate-200"
                }`}
                aria-expanded={servicesMenuOpen}
              >
                <span>Services</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesMenuOpen ? "rotate-180 text-cyan-400" : "text-slate-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </button>
            </div>

            <a href="#marketing-hub" className="hover:text-cyan-400 transition-colors">
              Marketing Hub
            </a>
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Quick CTA Actions (Proportional, no wrapping) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/917010231792"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Chat on WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-emerald-400" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
              </svg>
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            <a
              href="#contact"
              className="px-4 py-2 rounded-xl glow-blue-btn text-white text-xs font-bold tracking-wide whitespace-nowrap shrink-0"
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

        {/* ========================================================================= */}
        {/* DESKTOP SERVICES MEGA MENU DROPDOWN PANEL (MATCHING REFERENCE SCREENSHOT) */}
        {/* ========================================================================= */}
        {servicesMenuOpen && (
          <div
            onMouseEnter={() => setServicesMenuOpen(true)}
            onMouseLeave={() => setServicesMenuOpen(false)}
            className="hidden lg:block absolute left-0 right-0 top-full bg-[#060b1c]/98 backdrop-blur-2xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-950/90 z-50 animate-fade-in max-h-[82vh] overflow-y-auto"
          >
            {/* Glowing Accent Gradient Top Bar */}
            <div className="h-[2.5px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

            <div className="max-w-7xl mx-auto px-6 py-7">
              {/* Header Bar inside Mega Menu */}
              <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-black text-base shadow-sm">
                    ✦
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2.5">
                      <span>SERVICES DIRECTORY</span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        {SERVICES_CATEGORIES.length} DIVISIONS • {ALL_FLAT_SERVICES.length} SPECIALIZED SERVICES
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Select any service below to automatically pre-fill your proposal brief or start a discovery chat.
                    </div>
                  </div>
                </div>

                {/* Instant Real-Time Search in Mega Menu */}
                <div className="relative w-80">
                  <input
                    type="text"
                    value={servicesSearch}
                    onChange={(e) => setServicesSearch(e.target.value)}
                    placeholder={`Search ${ALL_FLAT_SERVICES.length} services (e.g. Router, Firewall, Switch, Python)...`}
                    className="w-full pl-9 pr-8 py-2 bg-[#030612] border border-cyan-500/30 focus:border-cyan-400 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
                  />
                  <span className="absolute left-3 top-2 text-slate-400 text-xs">🔍</span>
                  {servicesSearch && (
                    <button
                      onClick={() => setServicesSearch("")}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* SEARCH RESULTS VIEW */}
              {filteredMegaServices ? (
                <div className="py-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      FOUND {filteredMegaServices.length} SERVICES FOR "{servicesSearch}":
                    </span>
                    <button
                      onClick={() => setServicesSearch("")}
                      className="text-xs text-slate-400 hover:text-white underline font-mono"
                    >
                      Clear search
                    </button>
                  </div>

                  {filteredMegaServices.length === 0 ? (
                    <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                      <p className="text-slate-300 text-sm">
                        No service matched "{servicesSearch}".
                      </p>
                      <p className="text-xs text-slate-400">
                        We also engineer bespoke proprietary systems! Contact us directly for a custom solution.
                      </p>
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                      >
                        Ask About Custom Engineering on WhatsApp
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {filteredMegaServices.map((service, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectService(service.name)}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 text-left transition-all group cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                              {service.name}
                            </div>
                            <div className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
                              {service.icon} {service.categoryName}
                            </div>
                          </div>
                          <span className="text-cyan-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            Select →
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* DEFAULT 2-ROW MEGA MENU GRID MATCHING THE USER'S SCREENSHOT */
                <div className="space-y-7">
                  {/* ROW 1: 5 Columns (Websites, Web Development, E-Commerce, Mobile Application, CMS) */}
                  <div className="grid grid-cols-5 gap-6">
                    {SERVICES_CATEGORIES.filter((cat) => cat.row === 1).map((cat) => (
                      <div key={cat.id} className="space-y-2.5">
                        {/* Category Heading with Distinct Cyan Underline Accent (matches screenshot) */}
                        <div className="pb-1">
                          <div className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                            <span className="text-sm">{cat.icon}</span>
                            <span>{cat.name}</span>
                          </div>
                          <div className="h-[2px] w-9 bg-cyan-400 mt-1 rounded-full shadow-sm shadow-cyan-400/50" />
                        </div>

                        {/* List of items */}
                        <ul className="space-y-1">
                          {cat.items.map((item, idx) => (
                            <li key={idx}>
                              <button
                                type="button"
                                onClick={() => handleSelectService(item)}
                                className="group flex items-start gap-1.5 text-xs text-slate-300 hover:text-cyan-300 hover:translate-x-1 transition-all text-left w-full py-0.5 cursor-pointer"
                              >
                                <span className="text-cyan-500/50 group-hover:text-cyan-400 text-[11px] mt-px transition-colors">
                                  ›
                                </span>
                                <span className="leading-snug group-hover:font-medium">{item}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Horizontal Divider Line */}
                  <div className="h-[1px] bg-white/10 w-full" />

                  {/* ROW 2: 5 Columns (Softwares, Digital Marketing, Market Place, Domain & Hosting, Networking Solutions) */}
                  <div className="grid grid-cols-5 gap-6">
                    {SERVICES_CATEGORIES.filter((cat) => cat.row === 2).map((cat) => (
                      <div key={cat.id} className="space-y-2.5">
                        {/* Category Heading with Distinct Cyan Underline Accent (matches screenshot) */}
                        <div className="pb-1">
                          <div className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                            <span className="text-sm">{cat.icon}</span>
                            <span>{cat.name}</span>
                          </div>
                          <div className="h-[2px] w-9 bg-cyan-400 mt-1 rounded-full shadow-sm shadow-cyan-400/50" />
                        </div>

                        {/* List of items */}
                        <ul className="space-y-1">
                          {cat.items.map((item, idx) => (
                            <li key={idx}>
                              <button
                                type="button"
                                onClick={() => handleSelectService(item)}
                                className="group flex items-start gap-1.5 text-xs text-slate-300 hover:text-cyan-300 hover:translate-x-1 transition-all text-left w-full py-0.5 cursor-pointer"
                              >
                                <span className="text-cyan-500/50 group-hover:text-cyan-400 text-[11px] mt-px transition-colors">
                                  ›
                                </span>
                                <span className="leading-snug group-hover:font-medium">{item}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quick Help Ribbon inside Mega Menu */}
              <div className="mt-7 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-cyan-400 font-bold">⚡ Need a custom combination or enterprise contract?</span>
                  <span className="text-slate-400 hidden sm:inline">
                    We engineer bespoke architectures, custom ERPs, and full-funnel growth campaigns.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/917010231792"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>💬 Chat on WhatsApp</span>
                  </a>
                  <a
                    href="#services"
                    onClick={() => setServicesMenuOpen(false)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all"
                  >
                    View In-Page Directory ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070e22] border-b border-cyan-500/20 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Mobile Brand Bar */}
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden border border-cyan-400/40 shrink-0">
                <img src={nexusLogoImg} alt="Nexus Creative Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-base font-black text-white">NEXUS CREATIVE</div>
                <div className="text-[10px] font-mono text-cyan-400">IDEAS • DESIGN • DIGITAL GROWTH</div>
              </div>
            </div>

            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              About
            </a>

            {/* Mobile Services Accordion */}
            <div className="border-y border-white/10 py-2.5">
              <button
                type="button"
                onClick={() => setMobileServicesAccordion(!mobileServicesAccordion)}
                className="w-full flex items-center justify-between text-slate-100 hover:text-cyan-400 py-1 font-semibold text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">✦</span>
                  <span>Services ({ALL_FLAT_SERVICES.length} Specialized Solutions)</span>
                </div>
                <span className="text-xs text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  {mobileServicesAccordion ? "Close ▲" : "Explore ▼"}
                </span>
              </button>

              {mobileServicesAccordion && (
                <div className="mt-3 space-y-4 pl-3 border-l-2 border-cyan-500/30 max-h-80 overflow-y-auto pr-1">
                  {SERVICES_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-1.5">
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2">
                        {cat.items.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectService(item)}
                            className="text-left text-xs text-slate-300 hover:text-cyan-300 py-1 block truncate"
                          >
                            • {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#core-pillars"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              Core Divisions
            </a>
            <a
              href="#3d-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-cyan-300 hover:text-cyan-200 font-bold py-1 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Interactive 3D Hub (WebGL)</span>
            </a>
            <a
              href="#network-infrastructure"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-emerald-300 hover:text-emerald-200 font-bold py-1 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Network &amp; IT Infrastructure</span>
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-cyan-400 py-1"
            >
              UI/UX Layout &amp; Capabilities
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
                Chat on WhatsApp
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
          className="relative pt-10 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-grid-cyber border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Hero Text */}
              <div className="lg:col-span-6 space-y-7 text-left">
                {/* Status Pill with Official Slogan */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-xs text-cyan-300 font-mono shadow-lg shadow-cyan-500/10">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="tracking-wide">CONNECTING BUSINESSES • EMPOWERING GROWTH</span>
                </div>

                {/* Big Bold Headline */}
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
                    NEXUS CREATIVE
                  </h2>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan leading-tight">
                    DIGITAL SOLUTIONS &amp; NETWORK INFRASTRUCTURE
                  </h1>
                </div>

                {/* Official Slogan & Subtitle */}
                <div className="space-y-2">
                  <p className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    Connecting Businesses. Empowering Growth.
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 font-normal max-w-xl leading-relaxed">
                    End-to-end technology partner delivering high-performing web platforms, scalable marketing funnels, enterprise router &amp; firewall security, and resilient IT networks.
                  </p>
                </div>

                {/* Core Capabilities Ribbon */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                  {["Web", "Digital Marketing", "Networking", "Security", "Infrastructure"].map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="text-cyan-400">✦</span>
                      <span>{pill}</span>
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#core-pillars"
                    className="px-7 py-4 rounded-xl glow-blue-btn text-white font-bold text-sm tracking-wider uppercase shadow-xl"
                  >
                    EXPLORE DIVISIONS
                  </a>
                  <a
                    href="#3d-hub"
                    className="px-6 py-4 rounded-xl border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-500/20 text-cyan-300 font-bold text-sm tracking-wide transition-all flex items-center gap-2"
                  >
                    <span>⚡ Full 3D Hub</span>
                    <span>↓</span>
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-sm tracking-wide transition-all"
                  >
                    Get Consultation →
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

              {/* Right Column: Hero Visual Asset (Interactive 3D Technology Hub) */}
              <div className="lg:col-span-6 relative">
                <Hero3DHub
                  onHireClick={() => {
                    const contactEl = document.getElementById("contact");
                    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  onRequestQuote={handleGetProjectQuote}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* CORE DIVISIONS: 1. DIGITAL SOLUTIONS & 2. NETWORKING & IT INFRASTRUCTURE   */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <section id="core-pillars" className="py-20 md:py-24 relative bg-[#040815] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>NEXUS CREATIVE CORE CAPABILITIES</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                Connecting Businesses. Empowering Growth.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nexus Creative integrates end-to-end digital presence engineering with mission-critical enterprise network infrastructure.
              </p>
            </div>

            {/* Twin Core Pillar Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pillar 1: Digital Solutions */}
              <div className="glass-cyber-card rounded-3xl p-8 sm:p-10 border border-cyan-500/30 relative overflow-hidden flex flex-col justify-between group hover:border-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-950/40">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-3xl font-bold shadow-inner group-hover:scale-105 transition-transform">
                        🌐
                      </div>
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                          Division 01
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black text-white">
                          Digital Solutions
                        </h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      Web &amp; Growth
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-cyan-300 font-semibold leading-snug">
                    "Build your digital presence and grow online."
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {[
                      { label: "Website development", desc: "Custom full-stack web applications, React 19 & Next.js architectures", icon: "💻" },
                      { label: "Landing pages", desc: "High-converting, sub-second landing pages engineered for paid ads", icon: "⚡" },
                      { label: "SEO & digital marketing", desc: "Search engine domination, Google Ads, and omnichannel organic traffic", icon: "🚀" },
                      { label: "Business branding", desc: "Memorable corporate identity, brand books, design tokens & typography", icon: "🎨" },
                      { label: "Lead generation", desc: "Automated CRM pipelines, multi-touch funnels & qualified B2B/B2C leads", icon: "📈" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all flex items-start gap-3.5"
                      >
                        <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{item.label}</span>
                            <span className="text-cyan-400 text-xs">›</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategoryFilter("web-development");
                      const el = document.getElementById("all-services");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-all border border-cyan-500/30 text-center cursor-pointer"
                  >
                    Explore Digital Services →
                  </button>
                  <a
                    href="#contact"
                    className="py-3 px-5 rounded-xl glow-blue-btn text-white font-bold text-xs uppercase tracking-wider text-center"
                  >
                    Get Quote
                  </a>
                </div>
              </div>

              {/* Pillar 2: Networking & IT Infrastructure */}
              <div className="glass-cyber-card rounded-3xl p-8 sm:p-10 border border-emerald-500/30 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-400 transition-all duration-300 shadow-xl shadow-cyan-950/40">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-3xl font-bold shadow-inner group-hover:scale-105 transition-transform">
                        🖧
                      </div>
                      <div>
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          Division 02
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black text-white">
                          Networking &amp; IT Infrastructure
                        </h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Hardware &amp; Security
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-emerald-300 font-semibold leading-snug">
                    "Build, secure and maintain business networks."
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {[
                      { label: "Routers, switches & firewalls", desc: "Cisco, Fortinet, pfSense & MikroTik configuration, VLANs & QoS", icon: "🔒" },
                      { label: "CCTV & surveillance", desc: "IP camera deployment, motion telemetry, NVR storage & remote mobile monitoring", icon: "📹" },
                      { label: "LAN, WAN, Wi-Fi & fiber", desc: "High-density Wi-Fi 6 APs, single-mode fiber backbones & campus topology", icon: "📡" },
                      { label: "Installation & commissioning", desc: "4U–42U server rack mounting, patch panels, cable dressing & turnkey setup", icon: "🛠️" },
                      { label: "Troubleshooting & AMC", desc: "99.9% uptime SLA contracts, latency diagnostics & 24/7 emergency response", icon: "🕒" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] transition-all flex items-start gap-3.5"
                      >
                        <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{item.label}</span>
                            <span className="text-emerald-400 text-xs">›</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategoryFilter("networking-hardware");
                      const el = document.getElementById("all-services");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-all border border-emerald-500/30 text-center cursor-pointer"
                  >
                    Explore Networking &amp; IT →
                  </button>
                  <a
                    href="https://wa.me/917010231792?text=Hello%20Nexus%20Creative!%20I%20am%20interested%20in%20your%20Networking%20%26%20IT%20Infrastructure%20services."
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center"
                  >
                    Direct Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* ABOUT SECTION: ABOUT NEXUS CREATIVE */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <section
          id="about"
          className="relative py-24 md:py-32 bg-[#040815] border-b border-white/10 overflow-hidden"
        >
          {/* Subtle Glow Top Divider */}
          <div className="glow-divider w-full absolute top-0 left-0" />

          {/* Background Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-teal-500/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header / Intro */}
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-500/10">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-semibold tracking-wider uppercase">
                  About Nexus Creative
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Connecting Businesses Through{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent text-glow-cyan">
                  Technology
                </span>
              </h2>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                Nexus Creative is a technology solutions provider delivering Digital Solutions and
                Networking &amp; IT Infrastructure services to businesses, startups, and organizations.
                We help businesses establish a strong digital presence, improve operational
                efficiency, and build reliable, secure, and scalable IT infrastructure.
              </p>
            </div>

            {/* Comprehensive Scope & Narrative Grid */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Dual Services Scope Card */}
              <div className="glass-cyber-card rounded-2xl p-7 md:p-8 border border-cyan-500/30 flex flex-col justify-between hover:border-cyan-400/50 transition-all duration-300">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-xl font-bold">
                      ⚡
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        Full-Lifecycle Expertise
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Digital &amp; Infrastructure Services
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    Our services span website development, landing page design, digital marketing,
                    and lead generation, alongside enterprise networking, router and switch
                    configuration, firewall solutions, CCTV surveillance, structured cabling,
                    fiber-optic connectivity, installation, configuration, commissioning,
                    troubleshooting, and annual maintenance services.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Website Development
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Landing Page Design
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Digital Marketing
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Lead Generation
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Routers &amp; Switches
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Firewall Solutions
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    CCTV Surveillance
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Structured Cabling &amp; Fiber
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    Commissioning &amp; AMC
                  </span>
                </div>
              </div>

              {/* Client-Centric Partnership Card */}
              <div className="glass-cyber-card rounded-2xl p-7 md:p-8 border border-blue-500/30 flex flex-col justify-between hover:border-blue-400/50 transition-all duration-300">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center text-xl font-bold">
                      🤝
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                        Trusted Long-Term Partnership
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Practical, Dependable Solutions
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    We focus on understanding each client&apos;s business requirements and providing
                    practical, cost-effective, and dependable technology solutions. From building a
                    professional online presence to deploying and maintaining business network
                    infrastructure, we aim to be a trusted technology partner throughout the
                    project lifecycle.
                  </p>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    At Nexus Creative, we believe technology should simplify business operations,
                    strengthen connectivity, and create opportunities for sustainable growth.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Project Lifecycle Support</span>
                  <span className="text-cyan-400 font-semibold">Reliable &amp; Scalable IT</span>
                </div>
              </div>
            </div>

            {/* Mission & Vision Highlight Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="relative rounded-2xl p-7 md:p-8 bg-gradient-to-br from-cyan-950/40 via-[#061226]/80 to-[#040815] border border-cyan-500/40 shadow-xl shadow-cyan-950/30 hover:border-cyan-400 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    🎯
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                      Our Mission
                    </div>
                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                      To deliver reliable, innovative, and cost-effective digital and IT infrastructure
                      solutions that help businesses grow with confidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision Card */}
              <div className="relative rounded-2xl p-7 md:p-8 bg-gradient-to-br from-blue-950/40 via-[#07132a]/80 to-[#040815] border border-blue-500/40 shadow-xl shadow-blue-950/30 hover:border-blue-400 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    🔭
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-mono font-bold uppercase tracking-wider text-blue-300">
                      Our Vision
                    </div>
                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                      To become a trusted technology partner for businesses by combining digital
                      innovation with dependable networking and infrastructure services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slogan Banner & Call-to-Action Bar */}
            <div className="mt-12 rounded-2xl p-6 md:p-8 bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-blue-950/60 border border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Official Technology Creed
                </span>
                <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Nexus Creative —{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Connecting Businesses Through Technology.
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#network-infrastructure"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
                >
                  Explore IT Infrastructure
                </a>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DEDICATED NETWORKING & IT INFRASTRUCTURE FLAGSHIP BLUEPRINT SECTION       */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <NetworkInfrastructureSection
          onRequestSiteSurvey={handleRequestSiteSurvey}
          onGetProjectQuote={handleGetProjectQuote}
          onAnnualMaintenance={handleAnnualMaintenance}
          onSelectService={handleSelectService}
        />
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE 3D TECHNOLOGY HUB SHOWCASE (NEXUS-CREATIVE-3D)                 */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <Nexus3DTechHubSection
          onSelectService={handleSelectService}
          onRequestSurvey={handleRequestSiteSurvey}
        />
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
                UI/UX LAYOUT &amp; INFRASTRUCTURE
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                Crafted with mathematical precision, psychological empathy, high-performance modern code, and resilient IT networks.
              </p>
            </div>

            {/* 4 Glowing Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* ========================================================================= */}
            {/* FULL SERVICES DIRECTORY & CAPABILITIES (SPECIALIZED SOLUTIONS) */}
            {/* ========================================================================= */}
            <div id="all-services" className="mt-28 pt-20 border-t border-cyan-500/20">
              {/* Directory Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{ALL_FLAT_SERVICES.length} SERVICES ACROSS {SERVICES_CATEGORIES.length} CORE DIVISIONS</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                  FULL CAPABILITIES DIRECTORY
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Browse our complete array of digital engineering, custom software, enterprise networking, cloud infrastructure, and performance marketing capabilities.
                </p>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="space-y-6 mb-10">
                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative">
                  <input
                    type="text"
                    value={directorySearch}
                    onChange={(e) => setDirectorySearch(e.target.value)}
                    placeholder={`Search ${ALL_FLAT_SERVICES.length} specialized services (e.g., Router, Firewall, Switch, Cloud, SEO)...`}
                    className="w-full pl-11 pr-10 py-3.5 bg-[#0a1128] border border-cyan-500/30 focus:border-cyan-400 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-lg shadow-cyan-950/40"
                  />
                  <span className="absolute left-4 top-3.5 text-base">🔍</span>
                  {directorySearch && (
                    <button
                      onClick={() => setDirectorySearch("")}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white text-sm bg-white/10 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
                  <button
                    onClick={() => setActiveCategoryFilter("all")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeCategoryFilter === "all"
                        ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 font-extrabold"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    All Services ({ALL_FLAT_SERVICES.length})
                  </button>
                  {SERVICES_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryFilter(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeCategoryFilter === cat.id
                          ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 font-extrabold"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="opacity-70 font-mono text-[10px]">({cat.items.length})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Counters */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 max-w-7xl mx-auto pb-4 border-b border-white/10">
                <div>
                  Showing{" "}
                  <span className="text-cyan-400 font-bold">
                    {filteredDirectoryServices.length}
                  </span>{" "}
                  of {ALL_FLAT_SERVICES.length} services
                  {activeCategoryFilter !== "all" && (
                    <span className="ml-2 text-slate-400">
                      in <span className="text-white capitalize">{activeCategoryFilter.replace("-", " ")}</span>
                    </span>
                  )}
                </div>
                {(activeCategoryFilter !== "all" || directorySearch) && (
                  <button
                    onClick={() => {
                      setActiveCategoryFilter("all");
                      setDirectorySearch("");
                    }}
                    className="text-cyan-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Service Cards Grid */}
              {filteredDirectoryServices.length === 0 ? (
                <div className="text-center py-16 bg-[#0a1128]/60 rounded-3xl border border-white/10 max-w-2xl mx-auto my-8 space-y-3">
                  <div className="text-3xl">🔍</div>
                  <h4 className="text-lg font-bold text-white">No services match your search</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Can't find what you are looking for? We build fully custom proprietary software and tailored growth stacks.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategoryFilter("all");
                      setDirectorySearch("");
                    }}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400"
                  >
                    View All {ALL_FLAT_SERVICES.length} Services
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-6">
                  {filteredDirectoryServices.map((service, idx) => (
                    <div
                      key={idx}
                      className="glass-cyber-card rounded-2xl p-5 border border-cyan-500/20 hover:border-cyan-400/80 flex flex-col justify-between group transition-all duration-300"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                            <span>{service.icon}</span>
                            <span>{service.categoryName}</span>
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                            {service.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                            {service.shortDesc || `Enterprise-grade ${service.name.toLowerCase()} designed for speed, scale, and measurable ROI.`}
                          </p>
                          {service.tags && service.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {service.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-cyan-500/30 text-cyan-300/90 font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-5 mt-4 border-t border-white/10 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectService(service.name)}
                          className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-black font-bold text-xs transition-all flex items-center justify-center gap-1 border border-cyan-500/30 group-hover:shadow-md group-hover:shadow-cyan-500/20 cursor-pointer"
                        >
                          <span>Inquire Now</span>
                          <span>→</span>
                        </button>
                        <a
                          href={getServiceWhatsAppUrl(service.name)}
                          target="_blank"
                          rel="noreferrer"
                          title={`WhatsApp inquiry for ${service.name}`}
                          className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-all flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: CLIENT PORTFOLIO & PRODUCTION SITES (MATCHING ATTACHED FORMAT) */}
      {/* ========================================================================= */}
      {(viewMode === "unified" || viewMode === "agency") && (
        <section id="portfolio" className="py-20 md:py-28 bg-[#040813] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header matching user's format */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>COMPANIES WE WORK WITH • PRODUCTION SHOWCASE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                FEATURED CLIENT PORTFOLIO
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Revolutionizing industries through bespoke engineering, intuitive interfaces, and scalable full-stack architectures.
              </p>
            </div>

            {/* Companies We Work With Brand Ticker */}
            <div className="mb-20 py-4 px-6 rounded-2xl bg-[#081026] border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>✦</span> Verified Live Client Deployments:
              </span>
              <div className="flex flex-wrap items-center gap-6 text-slate-300 font-semibold">
                <span className="hover:text-cyan-300 transition-colors">I-CAT Media College</span>
                <span className="text-slate-600">•</span>
                <span className="hover:text-cyan-300 transition-colors">Astro Web Studios</span>
                <span className="text-slate-600">•</span>
                <span className="hover:text-cyan-300 transition-colors">Gangai Amman Temple</span>
                <span className="text-slate-600">•</span>
                <span className="hover:text-cyan-300 transition-colors">RB Wealth & Realty</span>
                <span className="text-slate-600">•</span>
                <span className="hover:text-cyan-300 transition-colors">Chennai Jothi Matrimony</span>
              </div>
            </div>

            {/* Portfolio Projects - Alternating Rows in Attached Format */}
            <div className="space-y-20">
              {PORTFOLIO_PROJECTS.map((project, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div
                    key={project.id}
                    className="glass-cyber-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 hover:border-cyan-400/70 transition-all duration-300 shadow-xl"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Content Column */}
                      <div
                        className={`lg:col-span-6 space-y-6 ${
                          isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"
                        }`}
                      >
                        <div>
                          <div className="inline-block text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-3">
                            CASE STUDY #{String(idx + 1).padStart(2, "0")}
                          </div>
                          {/* Big Project Heading */}
                          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                            {project.name}
                          </h3>
                        </div>

                        {/* Structured Metadata in Attached Format */}
                        <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-5">
                          <div className="text-sm text-slate-200">
                            <strong className="text-cyan-400 font-semibold font-mono">
                              Category Name :
                            </strong>{" "}
                            <span className="font-medium text-white">{project.category}</span>
                          </div>

                          <div className="text-sm text-slate-200">
                            <strong className="text-cyan-400 font-semibold font-mono">
                              Project Title :
                            </strong>{" "}
                            <span className="font-medium text-white">{project.title}</span>
                          </div>

                          <div className="text-sm text-slate-200">
                            <strong className="text-cyan-400 font-semibold font-mono">
                              Company Name :
                            </strong>{" "}
                            <span className="font-medium text-white">{project.company}</span>
                          </div>

                          <div className="text-sm text-slate-200">
                            <strong className="text-cyan-400 font-semibold font-mono">
                              Technology :
                            </strong>{" "}
                            <span className="font-medium text-white">{project.technology}</span>
                          </div>
                        </div>

                        {/* Summary & Impact Metric */}
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {project.description}
                        </p>

                        {project.metrics && (
                          <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                            <span>✔ Proven Benchmark:</span>
                            <span className="font-bold text-white">{project.metrics}</span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          {/* "Click Here" Button matching reference screenshot */}
                          <button
                            type="button"
                            onClick={() => setSelectedPortfolioModal(project)}
                            className="px-6 py-3 rounded-xl glow-blue-btn text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer"
                          >
                            <span>Click Here</span>
                            <span>→</span>
                          </button>

                          {/* Live Site link */}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                              title="Open Live Website in New Tab"
                            >
                              <span>Live Site</span>
                              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => handleInquireProject(project)}
                            className="px-5 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-black font-bold text-xs border border-cyan-500/30 transition-all cursor-pointer"
                          >
                            Inquire Similar Solution
                          </button>

                          <a
                            href={getProjectWhatsAppUrl(project)}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all flex items-center justify-center"
                            title="Discuss on WhatsApp"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      {/* Image Column matching Attached Format */}
                      <div
                        className={`lg:col-span-6 ${
                          isEven ? "order-2 lg:order-1" : "order-2 lg:order-2"
                        }`}
                      >
                        <div className="relative rounded-[22px] overflow-hidden border border-cyan-500/30 shadow-2xl bg-[#091d3e] group">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                            style={{ borderRadius: "20px" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <button
                              onClick={() => setSelectedPortfolioModal(project)}
                              className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-lg"
                            >
                              Expand Case Study 🔍
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
      {/* SECTION 5: CONTACT US (EXACT ATTACHED FORMAT: MAP + GET IN TOUCH FORM)     */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 md:py-28 bg-[#040816] border-t border-white/10 relative overflow-hidden scroll-mt-20">
        {/* Subtle cyber background ambient glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main 2-Column Split matching Attached Screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* LEFT COLUMN: Interactive Google Map */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative flex-1 w-full rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl bg-[#081024] min-h-[480px] lg:min-h-[640px] flex flex-col">
                {/* Floating Map Info Card matching user's address */}
                <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 max-w-sm text-left animate-fade-in">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <span className="text-[#0066FF]">📍</span>
                    <span>Nexus Creative</span>
                  </div>
                  <div className="text-xs text-slate-700 font-semibold mt-1 leading-snug">
                    Plot 11, S1, 2nd Floor, Greenwood Apartment,
                  </div>
                  <div className="text-xs text-slate-600">
                    Navasakthi Nagar, Noombal Road, Chennai - 600077
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs">
                    <span className="font-bold text-amber-500">4.9</span>
                    <span className="text-amber-400 font-bold">★★★★★</span>
                    <span className="text-[11px] text-slate-400 font-medium">(21) ⓘ</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href="https://maps.google.com/?q=Plot+11,+Greenwood+Apartment,+Navasakthi+Nagar,+Noombal+Road,+Chennai+600077"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0066FF] hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <span>View larger map</span>
                      <span>↗</span>
                    </a>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Open Now
                    </span>
                  </div>
                </div>

                {/* Map Iframe */}
                <iframe
                  title="Greenwood Apartment Navasakthi Nagar Noombal Road Chennai Location"
                  src="https://maps.google.com/maps?q=Plot+11,+Greenwood+Apartment,+Navasakthi+Nagar,+Noombal+Road,+Chennai+600077&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full flex-1 min-h-[440px] lg:min-h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Bottom Quick Contact Strip */}
                <div className="p-4 bg-[#060c1d] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-cyan-400 font-bold">📍</span>
                    <span className="font-mono">
                      Plot 11, S1, Greenwood Apt, Navasakthi Nagar, Noombal Rd, Chennai - 600077
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="tel:+917010231792"
                      className="text-cyan-300 hover:text-white font-bold flex items-center gap-1.5 transition-colors font-mono"
                      title="Call Office"
                    >
                      <span>📞</span>
                      <span>+91 70102 31792</span>
                    </a>
                    <a
                      href="https://wa.me/917010231792"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-white font-bold flex items-center gap-1.5 transition-colors"
                      title="WhatsApp Direct"
                    >
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form matching Attached Format */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative flex-1 rounded-3xl p-6 sm:p-10 bg-[#ffffff] border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col justify-between">
                {/* Decorative Cyber Constellation Nodes in top-right matching screenshot */}
                <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-25 overflow-hidden">
                  <svg viewBox="0 0 200 200" className="w-full h-full text-[#0066FF]" fill="currentColor">
                    <circle cx="180" cy="20" r="3" />
                    <circle cx="140" cy="40" r="2.5" />
                    <circle cx="170" cy="70" r="3" />
                    <circle cx="110" cy="80" r="2" />
                    <circle cx="150" cy="120" r="3" />
                    <circle cx="190" cy="110" r="2.5" />
                    <line x1="180" y1="20" x2="140" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="140" y1="40" x2="170" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="170" y1="70" x2="110" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="170" y1="70" x2="150" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="150" y1="120" x2="190" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                </div>

                <div>
                  {/* Top Accent: Wavy Line & "CONTACT US" in blue */}
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-6 h-3 text-[#0066FF]" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M1 5c3-4 6-4 9 0s6 4 9 0 4-4 4-4" />
                    </svg>
                    <span className="text-xs font-black tracking-widest text-[#0066FF] uppercase">
                      CONTACT US
                    </span>
                  </div>

                  {/* Main Headings */}
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                    Have Questions?
                  </h2>
                  <h3 className="text-3xl sm:text-4xl font-black text-[#0066FF] tracking-tight mb-6">
                    Get in Touch!
                  </h3>

                  {/* Pre-fill Toast indicator if user clicked a service from Mega Menu or Portfolio */}
                  {inquiryToast && (
                    <div className="mb-5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between gap-2 animate-fade-in">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="text-[#0066FF] font-bold">✦</span>
                        Selected: <strong className="text-[#0066FF]">{inquiryToast}</strong>
                      </span>
                      <span className="text-[10px] bg-[#0066FF] text-white px-2 py-0.5 rounded font-bold uppercase">
                        Pre-filled
                      </span>
                    </div>
                  )}

                  {formSubmitted ? (
                    <div className="text-center py-10 space-y-4 animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto font-black shadow-sm">
                        ✓
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Message Received!</h4>
                      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, <strong>{formData.name || "friend"}</strong>! Our technical team has recorded your project brief for <strong>{formData.service || formData.category || "your inquiry"}</strong> and dispatched notifications to our administrative team.
                      </p>
                      
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-center gap-2 max-w-md mx-auto">
                        <span className="font-bold">✦ Notification Status:</span> Lead Logged & Transmitted
                      </div>

                      <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-md flex items-center gap-2 transition-transform hover:scale-105"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
                          </svg>
                          <span>Fast-Track via WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              category: "",
                              service: "",
                              message: "",
                            });
                          }}
                          className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3.5">
                      {/* Name* */}
                      <div>
                        <input
                          id={`${formId}-name`}
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Name*"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all shadow-xs"
                        />
                      </div>

                      {/* Email* */}
                      <div>
                        <input
                          id={`${formId}-email`}
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email*"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all shadow-xs"
                        />
                      </div>

                      {/* Enter your 10 digit mobile number * */}
                      <div>
                        <input
                          id={`${formId}-phone`}
                          type="tel"
                          required
                          maxLength={10}
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setFormData({ ...formData, phone: val });
                          }}
                          placeholder="Enter your 10 digit mobile number *"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all shadow-xs font-mono"
                        />
                      </div>

                      {/* Select Category */}
                      <div className="relative">
                        <select
                          id={`${formId}-category`}
                          value={formData.category}
                          onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value, service: "" });
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all appearance-none cursor-pointer shadow-xs"
                        >
                          <option value="">Select Category</option>
                          {SERVICES_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>

                      {/* Select Service */}
                      <div className="relative">
                        <select
                          id={`${formId}-service`}
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all appearance-none cursor-pointer shadow-xs"
                        >
                          <option value="">Select Service</option>
                          {formData.service &&
                            !SERVICES_CATEGORIES.some((c) => c.items.includes(formData.service)) && (
                              <option value={formData.service}>{formData.service}</option>
                            )}
                          {formData.category ? (
                            SERVICES_CATEGORIES.find(
                              (c) => c.name.toLowerCase() === formData.category.toLowerCase()
                            )?.items.map((srv, idx) => (
                              <option key={idx} value={srv}>
                                {srv}
                              </option>
                            ))
                          ) : (
                            SERVICES_CATEGORIES.map((cat) => (
                              <optgroup key={cat.id} label={`${cat.name} (${cat.items.length})`}>
                                {cat.items.map((srv, idx) => (
                                  <option key={idx} value={srv}>
                                    {srv}
                                  </option>
                                ))}
                              </optgroup>
                            ))
                          )}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>

                      {/* Tell Us About Project * */}
                      <div>
                        <textarea
                          id={`${formId}-message`}
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell Us About Project *"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all resize-y shadow-xs"
                        />
                      </div>

                      {/* reCAPTCHA Widget matching attached screenshot */}
                      <div className="pt-1">
                        <div className="bg-[#f9fafb] text-slate-800 rounded-lg p-3 border border-slate-300 shadow-xs max-w-[302px] flex items-center justify-between">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={captchaChecked}
                              onChange={() => {
                                if (!captchaChecked) {
                                  setCaptchaLoading(true);
                                  setTimeout(() => {
                                    setCaptchaLoading(false);
                                    setCaptchaChecked(true);
                                  }, 500);
                                } else {
                                  setCaptchaChecked(false);
                                }
                              }}
                              className="sr-only"
                            />
                            <div
                              className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                                captchaChecked
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : captchaLoading
                                  ? "border-blue-500 border-t-transparent animate-spin"
                                  : "border-slate-400 bg-white hover:border-slate-600"
                              }`}
                            >
                              {captchaChecked && (
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="text-xs font-medium text-slate-700">
                              I'm not a robot
                            </span>
                          </label>

                          <div className="flex flex-col items-center justify-center text-[9px] text-slate-400 leading-tight pl-3 border-l border-slate-200">
                            <svg className="w-6 h-6 text-[#1A73E8]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 15h-2v-2h2zm0-4h-2V7h2z" />
                            </svg>
                            <span className="font-semibold text-slate-500 text-[8px]">reCAPTCHA</span>
                            <span className="text-[7px] text-slate-400">Privacy - Terms</span>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button matching Attached Screenshot */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                            isSubmitting ? "opacity-75 cursor-wait" : ""
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Recording & Transmitting Brief...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                              </svg>
                              <span>Get in Touch</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
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
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden border border-cyan-400/40 shrink-0">
                <img
                  src={nexusLogoImg}
                  alt="Nexus Creative Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-white font-black tracking-wider text-base">
                  NEXUS CREATIVE
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  Official Contact: Haridass@nexuscreative.site • Phone: +91 70102 31792
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Headquarters: Plot 11, S1, 2nd Floor, Greenwood Apartment, Navasakthi Nagar, Noombal Road, Chennai - 600077
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
              <a href="#home" className="hover:text-cyan-400">
                Home
              </a>
              <a href="#3d-hub" className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1">
                <span>✦</span>
                <span>3D Tech Hub</span>
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
              <a href="#contact" className="hover:text-cyan-400">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdminLeadsOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>⚡ Admin Inbox ({registeredLeads.length})</span>
              </button>
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
              © 2026 NEXUS CREATIVE — DIGITAL SOLUTIONS &amp; NETWORK INFRASTRUCTURE
            </div>
            <div className="text-[10px] text-slate-300 tracking-wider font-semibold">
              CONNECTING BUSINESSES. EMPOWERING GROWTH.
            </div>
            <div className="text-[9px] text-slate-400 tracking-wider">
              WEB • DIGITAL MARKETING • NETWORKING • SECURITY • INFRASTRUCTURE
            </div>
            <div className="text-[10px] text-slate-500 tracking-wider">
              OFFICIAL EMAIL: HARIDASS@NEXUSCREATIVE.SITE • CHENNAI, INDIA
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
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    category:
                      selectedServiceModal.id === "networking-hardware"
                        ? "Networking Solutions"
                        : "Web Development",
                    service: selectedServiceModal.title,
                  }));
                  setSelectedServiceModal(null);
                }}
                className="py-2.5 px-5 rounded-xl glow-cyan-btn text-black font-bold text-xs"
              >
                Request Quote For This Service →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PORTFOLIO PROJECT CASE STUDY MODAL */}
      {/* ========================================================================= */}
      {selectedPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#081026] border border-cyan-400/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative space-y-6 my-8">
            <button
              onClick={() => setSelectedPortfolioModal(null)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer z-10"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Project Screenshot Preview */}
            <div className="rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-[#091d3e]">
              <img
                src={selectedPortfolioModal.image}
                alt={selectedPortfolioModal.title}
                className="w-full h-auto object-cover max-h-72"
              />
            </div>

            <div>
              <div className="inline-block text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-2">
                VERIFIED PRODUCTION PLATFORM
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedPortfolioModal.name}
              </h3>
            </div>

            {/* Structured Info matching screenshot */}
            <div className="space-y-2.5 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm">
              <div>
                <strong className="text-cyan-400 font-mono">Category Name :</strong>{" "}
                <span className="text-white">{selectedPortfolioModal.category}</span>
              </div>
              <div>
                <strong className="text-cyan-400 font-mono">Project Title :</strong>{" "}
                <span className="text-white">{selectedPortfolioModal.title}</span>
              </div>
              <div>
                <strong className="text-cyan-400 font-mono">Company Name :</strong>{" "}
                <span className="text-white">{selectedPortfolioModal.company}</span>
              </div>
              <div>
                <strong className="text-cyan-400 font-mono">Technology :</strong>{" "}
                <span className="text-white">{selectedPortfolioModal.technology}</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {selectedPortfolioModal.description}
            </p>

            {selectedPortfolioModal.metrics && (
              <div className="text-xs font-mono text-emerald-400">
                ✔ Key Production Benchmark:{" "}
                <span className="text-white font-bold">{selectedPortfolioModal.metrics}</span>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedPortfolioModal(null)}
                className="py-2.5 px-4 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold hover:bg-white/15 cursor-pointer"
              >
                Close Window
              </button>

              <div className="flex flex-wrap items-center gap-2.5">
                {selectedPortfolioModal.liveUrl && (
                  <a
                    href={selectedPortfolioModal.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 flex items-center gap-1.5 transition-all"
                  >
                    <span>Visit Live Site</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                <a
                  href={getProjectWhatsAppUrl(selectedPortfolioModal)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleInquireProject(selectedPortfolioModal)}
                  className="py-2.5 px-5 rounded-xl glow-cyan-btn text-black font-extrabold text-xs cursor-pointer"
                >
                  Inquire This Solution →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADMIN LEADS INBOX MODAL */}
      {/* ========================================================================= */}
      {adminLeadsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#081026] border border-cyan-400/50 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl relative space-y-6 my-8">
            <button
              onClick={() => setAdminLeadsOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white cursor-pointer z-10"
              aria-label="Close admin modal"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <h3 className="text-2xl font-black text-white">Registered Leads & Customer Submissions</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time inbox of all customer registrations submitted through the website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportLeadsCSV}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Settings / Configuration Accordion */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
                ⚙️ Notification Target Settings:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 text-[11px] font-mono mb-1">
                    Recipient Email Address:
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      localStorage.setItem("nexus_admin_email", e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. haridass@nexuscreative.site"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-[11px] font-mono mb-1">
                    Web3Forms Access Key (Optional):
                  </label>
                  <input
                    type="text"
                    value={web3FormsKey}
                    onChange={(e) => {
                      setWeb3FormsKey(e.target.value);
                      localStorage.setItem("nexus_web3forms_key", e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="Leave empty to use built-in PHP & default webhooks"
                  />
                </div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={leadSearchQuery}
                onChange={(e) => setLeadSearchQuery(e.target.value)}
                placeholder="🔍 Search leads by name, email, phone, or service..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400"
              />
              {registeredLeads.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm("Clear all registered leads history?")) {
                      setRegisteredLeads([]);
                      localStorage.removeItem("nexus_registered_leads_v1");
                    }
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Leads Table / Cards */}
            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {registeredLeads.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs border border-dashed border-slate-700 rounded-2xl">
                  <p className="font-mono text-slate-300 text-sm">No registered leads recorded yet.</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    When customers fill out the "Have Questions? Get in Touch!" form, their inquiries will appear here automatically.
                  </p>
                </div>
              ) : (
                registeredLeads
                  .filter((l) => {
                    const q = leadSearchQuery.toLowerCase();
                    return (
                      l.name.toLowerCase().includes(q) ||
                      l.email.toLowerCase().includes(q) ||
                      l.phone.includes(q) ||
                      l.service.toLowerCase().includes(q) ||
                      l.category.toLowerCase().includes(q)
                    );
                  })
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4 hover:border-cyan-400/40 transition-all"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-white text-sm">{lead.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                            {lead.service}
                          </span>
                          {lead.emailSent ? (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                              ✓ Dispatched
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                              • Stored Locally
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-300 flex flex-wrap gap-4 font-mono">
                          <span>📧 <a href={`mailto:${lead.email}`} className="hover:underline text-cyan-300">{lead.email}</a></span>
                          <span>📱 <a href={`tel:${lead.phone}`} className="hover:underline text-emerald-300">{lead.phone}</a></span>
                          <span className="text-slate-400">🕒 {lead.submittedAt}</span>
                        </div>

                        {lead.message && (
                          <p className="text-xs text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/5 leading-relaxed mt-2">
                            "{lead.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                        <a
                          href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for registering with Nexus Creative regarding ${lead.service}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold font-mono transition-all text-center w-full"
                        >
                          WhatsApp Reply
                        </a>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-bold font-mono transition-all text-center w-full cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Total Leads Saved: <strong className="text-cyan-400">{registeredLeads.length}</strong></span>
              <button
                onClick={() => setAdminLeadsOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
