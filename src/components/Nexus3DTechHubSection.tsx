import React, { useState, useRef } from "react";

interface Nexus3DTechHubSectionProps {
  onSelectService?: (serviceName: string) => void;
  onRequestSurvey?: () => void;
}

export default function Nexus3DTechHubSection({
  onSelectService,
  onRequestSurvey,
}: Nexus3DTechHubSectionProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<"cyber" | "light">("cyber");
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHighlight, setSelectedHighlight] = useState<number>(0);

  const HIGHLIGHTS = [
    {
      id: "laptop",
      icon: "💻",
      title: "Digital Solutions Workstation",
      tag: "Full-Stack Web & Software",
      desc: "Procedurally rendered high-performance developer workstation with live brand mark and responsive UI engineering.",
      stats: "Sub-0.8s Global Speeds",
    },
    {
      id: "racks",
      icon: "🖧",
      title: "Enterprise Server Racks & Switches",
      tag: "Network Infrastructure",
      desc: "Multi-rack server chassis equipped with managed L2/L3 switches, real-time activity LEDs, and dedicated patch routing.",
      stats: "99.99% Uptime Benchmark",
    },
    {
      id: "cctv",
      icon: "📹",
      title: "Security & CCTV Surveillance",
      tag: "Premise Protection",
      desc: "Dual 3D security optics with dynamic angle tracking, IP infrared night vision, and centralized NVR recording.",
      stats: "24/7 Zero Blind Spots",
    },
    {
      id: "globe",
      icon: "🌐",
      title: "Global Telecom Orbital Globe",
      tag: "Connectivity & Cloud",
      desc: "Zero-friction spinning globe with dual orbital rings representing multi-region VPNs and global edge delivery.",
      stats: "Global Low Latency",
    },
    {
      id: "fiber",
      icon: "⚡",
      title: "Emissive Fiber Highway",
      tag: "Structured Cabling",
      desc: "Neon emissive spline paths simulating Cat6A & fiber optic pulses linking digital software to on-premise hardware.",
      stats: "10 Gbps Backbone",
    },
  ];

  const SERVICES_LIST = [
    { symbol: "⌘", title: "Website Development" },
    { symbol: "↗", title: "Digital Marketing" },
    { symbol: "⌁", title: "Routers & Switches" },
    { symbol: "⬡", title: "Firewalls" },
    { symbol: "◉", title: "CCTV & Surveillance" },
    { symbol: "⟿", title: "Fiber & Cabling" },
    { symbol: "⚙", title: "Installation & Commissioning" },
  ];

  const iframeSrc = `./3d-hub/index.html?embed=true&theme=${theme}`;

  return (
    <section id="3d-hub" className="py-20 md:py-28 relative bg-[#040817] border-b border-cyan-500/20 overflow-hidden">
      {/* Background cyber ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-500/15">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wider uppercase font-bold">NEXUS-CREATIVE-3D INTERACTIVE SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Interactive <span className="text-cyan-400 text-glow-cyan">3D Technology Hub</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience our procedural 3D world built with Three.js and React Three Fiber.
            Interact with the digital solutions workstation, enterprise server racks, CCTV optics, and orbital connectivity globe in real time.
          </p>
        </div>

        {/* Main 3D Canvas Box */}
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-[#060c20] shadow-2xl shadow-cyan-950/70">
          {/* Top Control Bar */}
          <div className="px-5 py-3.5 bg-[#030714]/95 border-b border-cyan-500/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  LIVE 3D WEBGL ENGINE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  THREE.JS / R3F
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Switcher */}
              <button
                type="button"
                onClick={() => setTheme(theme === "cyber" ? "light" : "cyber")}
                className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                title="Toggle 3D Theme"
              >
                <span>{theme === "cyber" ? "☀️ Studio Light" : "🌙 Cyber Dark"}</span>
              </button>

              {/* Reset View */}
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setIframeKey((k) => k + 1);
                }}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-all cursor-pointer flex items-center gap-1"
                title="Reset Camera & Scene"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">Reset</span>
              </button>

              {/* Fullscreen Expand */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs transition-all shadow-md shadow-cyan-400/20 cursor-pointer flex items-center gap-1.5"
                title="Expand to Fullscreen 3D Theater"
              >
                <span>⛶</span>
                <span>Fullscreen</span>
              </button>

              {/* Standalone Window */}
              <a
                href="./3d-hub/index.html"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1"
                title="Open standalone 3D site in new tab"
              >
                <span>↗</span>
                <span className="hidden sm:inline">New Tab</span>
              </a>
            </div>
          </div>

          {/* 3D Viewport Stage */}
          <div className="relative w-full h-[520px] sm:h-[620px] bg-[#050a18]">
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050a18]/90 backdrop-blur-md">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin mb-3" />
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest animate-pulse">
                  Rendering 3D Hub Scene…
                </span>
                <span className="text-[11px] text-slate-400 mt-1">Procedural Three.js Geometries</span>
              </div>
            )}

            {/* Embedded Interactive 3D Frame */}
            <iframe
              key={iframeKey}
              src={iframeSrc}
              title="Nexus Creative Interactive 3D Hub"
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />

            {/* Floating Interaction Helper */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#040817]/85 border border-cyan-500/30 text-slate-300 text-xs font-mono backdrop-blur-md">
              <span className="text-cyan-400">🎮</span>
              <span>Drag to orbit • Scroll to zoom • Touch to rotate</span>
            </div>
          </div>

          {/* Interactive Feature Highlights Bar */}
          <div className="p-4 sm:p-6 bg-[#04091a] border-t border-cyan-500/30">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>EXPLORE SCENE COMPONENTS:</span>
              <span className="text-slate-400 text-[10px]">Click any module to inspect</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {HIGHLIGHTS.map((hl, idx) => {
                const isSelected = selectedHighlight === idx;
                return (
                  <button
                    key={hl.id}
                    type="button"
                    onClick={() => setSelectedHighlight(idx)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                        : "bg-white/5 border-white/10 text-slate-300 hover:border-cyan-500/30 hover:bg-white/10"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg">{hl.icon}</span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {hl.tag.split(" ")[0]}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-tight">{hl.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{hl.desc}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-300 font-bold">
                      {hl.stats}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 7 Core Services Modeled in the 3D Hub */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="text-cyan-400">✦</span>
              <span>Services Modeled in the 3D Technology Hub</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Click any service to request proposal
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {SERVICES_LIST.map((srv, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (onSelectService) onSelectService(srv.title);
                  else {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="p-3.5 rounded-2xl bg-[#060b1e] border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 text-center transition-all group cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <span className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 group-hover:scale-110 transition-transform flex items-center justify-center text-lg font-bold border border-cyan-500/30">
                  {srv.symbol}
                </span>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                  {srv.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Ribbon */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/30 via-cyan-900/20 to-purple-900/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Ready to deploy a custom 3D web experience or enterprise network?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Nexus Creative combines interactive 3D WebGL frontends with rock-solid IT networking infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onRequestSurvey && (
              <button
                type="button"
                onClick={onRequestSurvey}
                className="px-4 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold transition-all"
              >
                Request Site Survey
              </button>
            )}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl glow-blue-btn text-white text-xs font-bold transition-all shadow-lg"
            >
              Start Project Brief →
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN 3D THEATER MODAL                                              */}
      {/* ========================================================================= */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full h-full max-w-7xl max-h-[92vh] rounded-3xl border border-cyan-400/50 bg-[#050a18] shadow-2xl shadow-cyan-500/30 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-cyan-500/30 bg-[#030714] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>NEXUS 3D THEATER</span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    FULLSCREEN INTERACTIVE MODE
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTheme(theme === "cyber" ? "light" : "cyber")}
                  className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono"
                >
                  {theme === "cyber" ? "☀️ Studio Light" : "🌙 Cyber Dark"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
                  title="Close Fullscreen"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Viewport */}
            <div className="relative flex-1 w-full bg-black">
              <iframe
                src={iframeSrc}
                title="Nexus Creative 3D Theater Fullscreen"
                className="w-full h-full border-0 block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#030714] border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">🎮</span>
                <span>Orbit with mouse or finger gestures · Scroll to zoom</span>
              </span>
              <a
                href="./3d-hub/index.html"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
              >
                Open Standalone Site ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
