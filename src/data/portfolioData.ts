import icatImg from "../assets/portfolio/icat-dashboard.png";
import astroImg from "../assets/portfolio/astro-web.png";
import gangaiImg from "../assets/portfolio/gangaiamman.png";
import cargoImg from "../assets/portfolio/cargo-agenda.png";

export interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  title: string;
  company: string;
  technology: string;
  image: string;
  description: string;
  metrics?: string;
  liveUrl: string;
}

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: "icat-dashboard",
    name: "I-CAT Dashboard",
    category: "Web Application / SaaS Dashboard",
    title: "Interactive Media & Asset Management Dashboard",
    company: "I-CAT Media College",
    technology: "HTML5, CSS3, JavaScript, REST API, Chart.js",
    image: icatImg,
    liveUrl: "https://i-cat-dashboard-vgwo.vercel.app/login.html",
    description:
      "Full-featured media and academic portal dashboard built for I-CAT with student media tracking, automated telemetry reports, interactive analytics, and responsive authentication system.",
    metrics: "5,000+ Assets Managed • 99.9% Uptime",
  },
  {
    id: "astro-web",
    name: "Astro Web",
    category: "Modern Web Development",
    title: "Next-Gen Web Architecture & Performance Framework Showcase",
    company: "Astro Web Studios",
    technology: "Astro, React, Tailwind CSS, TypeScript, Vercel",
    image: astroImg,
    liveUrl: "https://astro-web-91ps.vercel.app/",
    description:
      "Ultra-fast zero-JS baseline web showcase engineered with Astro and modern component architecture, delivering 100/100 Lighthouse performance scores, dark aesthetics, and fluid micro-interactions.",
    metrics: "100/100 Lighthouse Speed • <0.4s LCP",
  },
  {
    id: "gangaiamman",
    name: "Gangai Amman",
    category: "Cultural & Heritage Web Portal",
    title: "Arulmigu Gangai Amman Temple Heritage & Darshan Portal",
    company: "Gangai Amman Thirukovil Trust",
    technology: "React, Tailwind CSS, Netlify, Devotional Audio Engine",
    image: gangaiImg,
    liveUrl: "https://gangaiamman.netlify.app/",
    description:
      "Sacred cultural heritage and devotee portal featuring integrated devotional audio stream, festival announcements, daily pooja timings, history archives, and 100% mobile-first devotion interface.",
    metrics: "50,000+ Devotee Visits • Zero Latency Audio",
  },
  {
    id: "cargo-agenda",
    name: "RB Wealth & Realty",
    category: "Real Estate & Land Development",
    title: "DTCP Approved Residential Plots & Land Investment Platform",
    company: "RB Wealth and Realty",
    technology: "React, Tailwind CSS, Vite, Figma Make Engine",
    image: cargoImg,
    liveUrl: "https://cargo-agenda-90736930.figma.site/",
    description:
      "High-converting prime property investment portal spotlighting DTCP-approved layouts, interactive master plans, price calculator, verified plots, and instant direct consultation pipelines.",
    metrics: "250+ Verified Buyer Inquiries • DTCP Certified",
  },
];
