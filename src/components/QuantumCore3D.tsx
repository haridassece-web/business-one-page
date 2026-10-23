import React, { useState, useRef, useEffect } from "react";
import coreImg from "../assets/cinematic-3d-core.jpg";
import agencyImg from "../assets/cinematic-3d-agency.jpg";
import tunnelImg from "../assets/cinematic-3d-tunnel.jpg";
import chromeImg from "../assets/cinematic-3d-chrome.jpg";

export type Cinematic3DStyle = "core" | "agency" | "tunnel" | "chrome";

interface StyleMeta {
  id: Cinematic3DStyle;
  title: string;
  badge: string;
  desc: string;
  image: string;
  accent: string;
  telemetry: { label: string; value: string }[];
}

const CINEMATIC_STYLES: StyleMeta[] = [
  {
    id: "core",
    title: "Quantum Core 3D",
    badge: "Apple Pro Hologram",
    desc: "Refractive 3D glass torus with oscillating quantum plasma core & live HUD telemetry.",
    image: coreImg,
    accent: "from-cyan-400 via-sky-400 to-blue-500",
    telemetry: [
      { label: "QUANTUM STABILITY", value: "99.8%" },
      { label: "CORE TEMP", value: "2.7 K" },
      { label: "FLUX BANDWIDTH", value: "10 Gbps" },
      { label: "NEURAL LINK", value: "ACTIVE" },
    ],
  },
  {
    id: "agency",
    title: "The Command Center",
    badge: "Cyber Agency Hub",
    desc: "Isometric 3D agency studio with multi-screen holographic interfaces & live city data.",
    image: agencyImg,
    accent: "from-purple-400 via-pink-400 to-cyan-400",
    telemetry: [
      { label: "ACTIVE SPRINT UNITS", value: "14 PODS" },
      { label: "GLOBAL PIPELINE", value: "99.9%" },
      { label: "DATA STREAM", value: "REAL-TIME" },
      { label: "SHIPPED BUILDS", value: "180+ PROD" },
    ],
  },
  {
    id: "tunnel",
    title: "Hyperspace Warp Matrix",
    badge: "Kinetic Adrenaline",
    desc: "Infinite hyper-speed digital conduit of neon laser lines & floating icosahedrons.",
    image: tunnelImg,
    accent: "from-cyan-400 via-teal-300 to-emerald-400",
    telemetry: [
      { label: "WARP VELOCITY", value: "MACH 9.4" },
      { label: "DATA THROUGHPUT", value: "100 TB/s" },
      { label: "LATENCY INDEX", value: "< 0.8 ms" },
      { label: "CORRIDOR DRIFT", value: "0.00%" },
    ],
  },
  {
    id: "chrome",
    title: "Liquid Chrome Fluid",
    badge: "Haute Luxury Tech",
    desc: "Molten zero-gravity mercury fluid with iridescent studio rim reflections.",
    image: chromeImg,
    accent: "from-indigo-400 via-purple-300 to-pink-500",
    telemetry: [
      { label: "FLUID VISCOSITY", value: "DENSE" },
      { label: "SURFACE CAUSTICS", value: "OCTANE 8K" },
      { label: "CHROMATIC SHEEN", value: "IRIDESCENT" },
      { label: "PHYSICS ENGINE", value: "GLSL MESH" },
    ],
  },
];

interface QuantumCore3DProps {
  onHireClick?: () => void;
}

export default function QuantumCore3D({ onHireClick }: QuantumCore3DProps) {
  const [activeStyle, setActiveStyle] = useState<Cinematic3DStyle>("core");
  const [isPulsing, setIsPulsing] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glossX: 50, glossY: 50 });
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentMeta = CINEMATIC_STYLES.find((s) => s.id === activeStyle) || CINEMATIC_STYLES[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
    const rotateY = ((x - centerX) / centerX) * 12;

    const glossX = (x / rect.width) * 100;
    const glossY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glossX, glossY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glossX: 50, glossY: 50 });
  };

  const triggerPulse = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1200);
  };

  return (
    <>
      <div className="relative mx-auto max-w-lg lg:max-w-none w-full">
        {/* Ambient Neon Atmosphere Glow */}
        <div
          className={`absolute -inset-4 rounded-3xl bg-gradient-to-tr ${currentMeta.accent} opacity-30 blur-3xl -z-10 transition-all duration-700`}
        />

        {/* 3D Perspective Card Wrapper */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1100px",
          }}
          className="relative transition-transform duration-200 ease-out select-none"
        >
          <div
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
            className="relative rounded-3xl overflow-hidden border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 bg-[#050a1a] transition-all duration-300"
          >
            {/* Cinematic Media Layer */}
            <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-black">
              <img
                src={currentMeta.image}
                alt={currentMeta.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isPulsing ? "scale-105 brightness-125 filter" : "hover:scale-105"
                }`}
              />

              {/* Dynamic Mouse Cursor Gloss Specular Reflection */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 mix-blend-overlay"
                style={{
                  background: `radial-gradient(circle at ${tilt.glossX}% ${tilt.glossY}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
                }}
              />

              {/* Holographic Radar / Calibration Overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
                <div className="absolute inset-0 bg-grid-cyber" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-cyan-400/30 animate-rotate-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-dashed border-cyan-300/20 animate-rotate-slow-reverse" />
              </div>

              {/* Shockwave Pulse Effect on Click */}
              {isPulsing && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-cyan-300 bg-cyan-400/20 animate-ping" />
                  <div className="absolute inset-0 bg-cyan-400/20 backdrop-blur-sm transition-opacity" />
                </div>
              )}

              {/* Top Floating HUD Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-auto">
                <div className="bg-[#050914]/85 backdrop-blur-md border border-cyan-400/40 rounded-xl px-3 py-1.5 text-xs flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-cyan-300 font-bold tracking-wider text-[11px] uppercase">
                    {currentMeta.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={triggerPulse}
                    title="Pulse Core Shockwave"
                    className="p-1.5 rounded-lg bg-[#050914]/80 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>⚡</span>
                    <span className="hidden sm:inline text-[10px] font-bold">PULSE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTheaterOpen(true)}
                    title="Expand Cinematic 3D Theater"
                    className="p-1.5 rounded-lg bg-[#050914]/80 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>⛶</span>
                    <span className="hidden sm:inline text-[10px] font-bold">EXPAND</span>
                  </button>
                </div>
              </div>

              {/* Telemetry Corner Data Readouts */}
              <div className="absolute bottom-3 left-3.5 right-3.5 z-10 pointer-events-none">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {currentMeta.telemetry.map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-[#050914]/80 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-1 flex flex-col"
                    >
                      <span className="text-[8px] font-mono uppercase text-slate-400 tracking-wider">
                        {t.label}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-cyan-300">
                        {t.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Interactive Style Switcher Strip */}
            <div className="p-4 bg-[#070e24]/95 border-t border-cyan-500/30 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-xs">🎮 3D STYLE:</span>
                  <span className="font-bold text-white text-xs">{currentMeta.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono hidden xs:inline">
                  Interactive Mouse Tilt Active
                </span>
              </div>

              {/* 4 Style Selector Pills */}
              <div className="grid grid-cols-4 gap-1.5">
                {CINEMATIC_STYLES.map((style) => {
                  const isActive = style.id === activeStyle;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => {
                        setActiveStyle(style.id);
                        triggerPulse();
                      }}
                      className={`px-2 py-1.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col items-center sm:items-start ${
                        isActive
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 font-bold"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <div className="text-[11px] truncate w-full flex items-center gap-1 justify-center sm:justify-start">
                        {style.id === "core" && "⚛️"}
                        {style.id === "agency" && "🏢"}
                        {style.id === "tunnel" && "🌀"}
                        {style.id === "chrome" && "💧"}
                        <span className="hidden sm:inline">{style.title.split(" ")[0]}</span>
                      </div>
                      <span className="text-[8px] font-mono text-cyan-400/80 uppercase hidden md:inline truncate w-full">
                        {style.badge.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Call To Action */}
              <div className="pt-1 flex items-center justify-between gap-3 border-t border-white/10">
                <p className="text-[11px] text-slate-300 font-sans truncate">
                  {currentMeta.desc}
                </p>
                <a
                  href="#contact"
                  onClick={onHireClick}
                  className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-[11px] shrink-0 transition-all shadow-md shadow-cyan-400/20"
                >
                  Request 3D Web →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN CINEMATIC 3D THEATER MODAL                                    */}
      {/* ========================================================================= */}
      {isTheaterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-5xl rounded-3xl border border-cyan-400/50 bg-[#060b1c] shadow-2xl shadow-cyan-500/30 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#040817]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>CINEMATIC 3D SUITE</span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    {currentMeta.title}
                  </span>
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsTheaterOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition-all cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Main Stage */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentMeta.image}
                alt={currentMeta.title}
                className="w-full h-full object-cover"
              />

              {/* Cinema Scanlines and Radial Glow */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060b1c] via-transparent to-transparent opacity-80" />

              {/* Floating Overlay HUD Details */}
              <div className="absolute top-6 left-6 max-w-sm bg-[#050914]/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-400/40 space-y-2 hidden sm:block">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  TELEMETRY SYSTEM MATRIX
                </div>
                <div className="text-sm font-bold text-white">{currentMeta.desc}</div>
                <div className="pt-2 grid grid-cols-2 gap-2 border-t border-white/10 text-xs font-mono">
                  {currentMeta.telemetry.map((t, idx) => (
                    <div key={idx}>
                      <div className="text-[9px] text-slate-400">{t.label}</div>
                      <div className="text-cyan-300 font-bold">{t.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-6 bg-[#040817] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">SELECT EXPERIENCE:</span>
                <div className="flex gap-2">
                  {CINEMATIC_STYLES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveStyle(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        s.id === activeStyle
                          ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsTheaterOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Close Viewer
                </button>
                <a
                  href="#contact"
                  onClick={() => {
                    setIsTheaterOpen(false);
                    if (onHireClick) onHireClick();
                  }}
                  className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs transition-all shadow-lg shadow-cyan-400/30"
                >
                  Commission This 3D Experience →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
