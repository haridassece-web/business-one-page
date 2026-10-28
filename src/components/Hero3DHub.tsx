import React, { useState, useRef } from "react";
import QuantumCore3D from "./QuantumCore3D";

interface Hero3DHubProps {
  onHireClick?: () => void;
  onRequestQuote?: () => void;
}

export default function Hero3DHub({ onHireClick, onRequestQuote }: Hero3DHubProps) {
  const [activeTab, setActiveTab] = useState<"hub3d" | "quantum">("hub3d");
  const [theme, setTheme] = useState<"cyber" | "light">("cyber");
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const iframeSrc = `./3d-hub/index.html?embed=true&theme=${theme}`;

  const handleResetCamera = () => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  return (
    <>
      <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
        {/* Ambient Neon Atmosphere Glow Behind Card */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-purple-600/20 opacity-40 blur-3xl -z-10 pointer-events-none transition-all duration-700" />

        {/* Outer Cyber Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-cyan-400/40 shadow-2xl shadow-cyan-950/80 bg-[#050a1c] transition-all duration-300">
          {/* Top Switcher & Control Header */}
          <div className="p-3 sm:p-3.5 bg-[#030614]/95 border-b border-cyan-500/30 flex items-center justify-between gap-2 flex-wrap">
            {/* View Mode Tabs: 3D Tech Hub vs Quantum Core */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("hub3d")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "hub3d"
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
                <span>3D TECH HUB</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-black/20 font-mono hidden xs:inline">
                  LIVE
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("quantum")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "quantum"
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>⚛️</span>
                <span>QUANTUM CORE</span>
              </button>
            </div>

            {/* Quick Utility Actions (for 3D Hub) */}
            {activeTab === "hub3d" && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setTheme(theme === "cyber" ? "light" : "cyber")}
                  title="Toggle 3D Theme"
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 text-xs font-mono transition-all cursor-pointer"
                >
                  {theme === "cyber" ? "☀️ Studio" : "🌙 Cyber"}
                </button>

                <button
                  type="button"
                  onClick={handleResetCamera}
                  title="Reset Camera Angle"
                  className="p-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono transition-all cursor-pointer"
                >
                  🔄
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  title="Fullscreen 3D Theater"
                  className="p-1.5 px-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 text-xs font-mono transition-all cursor-pointer"
                >
                  ⛶
                </button>

                <a
                  href="./3d-hub/index.html"
                  target="_blank"
                  rel="noreferrer"
                  title="Open standalone 3D site"
                  className="p-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono transition-all"
                >
                  ↗
                </a>
              </div>
            )}
          </div>

          {/* MAIN STAGE CONTENT */}
          {activeTab === "hub3d" ? (
            <div className="relative">
              {/* Interactive 3D Canvas Frame */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full bg-[#050a18] overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050a18]/90 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin mb-2" />
                    <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest animate-pulse">
                      Rendering Nexus 3D Hub…
                    </span>
                  </div>
                )}

                <iframe
                  key={iframeKey}
                  src={iframeSrc}
                  title="Nexus Creative Interactive 3D Hero Hub"
                  onLoad={() => setIsLoading(false)}
                  className="w-full h-full border-0 block"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                />

                {/* Floating In-Canvas Badge Overlays */}
                <div className="absolute top-3 left-3 pointer-events-none hidden sm:flex items-center gap-2">
                  <div className="bg-[#050914]/85 backdrop-blur-md border border-cyan-500/40 rounded-lg px-2.5 py-1 text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5 shadow-md">
                    <span>💻</span>
                    <span>DIGITAL SOLUTIONS</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 pointer-events-none hidden sm:flex items-center gap-2">
                  <div className="bg-[#050914]/85 backdrop-blur-md border border-emerald-500/40 rounded-lg px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1.5 shadow-md">
                    <span>🖧</span>
                    <span>NETWORK INFRASTRUCTURE</span>
                  </div>
                </div>

                {/* Floating Bottom Hint */}
                <div className="absolute bottom-3 left-3 pointer-events-none hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#050914]/85 border border-white/10 text-[10px] font-mono text-slate-400 backdrop-blur-md">
                  <span className="text-cyan-400">🎮</span>
                  <span>Drag to orbit • Scroll to zoom</span>
                </div>
              </div>

              {/* Bottom Telemetry & Quick Action Strip */}
              <div className="p-3.5 sm:p-4 bg-[#070e24]/95 border-t border-cyan-500/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono text-slate-300">
                      Two Divisions. One Unified 3D Architecture.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href="#3d-hub"
                    className="px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/10 text-cyan-300 text-xs font-bold transition-all text-center"
                  >
                    Deep Dive 3D →
                  </a>
                  <a
                    href="#contact"
                    onClick={onHireClick}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs transition-all shadow-md shadow-cyan-400/20 text-center"
                  >
                    Request Project Quote →
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2 sm:p-3">
              <QuantumCore3D onHireClick={onHireClick} />
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN 3D THEATER MODAL */}
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
                    HERO INTERACTIVE 3D
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
                <span>Drag to orbit • Scroll to zoom • Touch to rotate</span>
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
    </>
  );
}
