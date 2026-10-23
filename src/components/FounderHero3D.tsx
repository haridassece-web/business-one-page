import React, { useState, useRef } from "react";
import haridass3dImg from "../assets/haridass-3d-cinematic.jpg";
import founderOriginalImg from "../assets/founder-haridass-original.jpg";

interface FounderHero3DProps {
  onHireClick?: () => void;
}

export default function FounderHero3D({ onHireClick }: FounderHero3DProps) {
  const [photoMode, setPhotoMode] = useState<"3d" | "original">("3d");
  const [tilt, setTilt] = useState({ x: 0, y: 0, glossX: 50, glossY: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    const glossX = (x / rect.width) * 100;
    const glossY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glossX, glossY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glossX: 50, glossY: 50 });
  };

  return (
    <div className="relative mx-auto max-w-md lg:max-w-none w-full">
      {/* Photo Style Toggle Pill */}
      <div className="flex items-center justify-between pb-3 px-1">
        <div className="inline-flex p-1 rounded-xl bg-[#091126]/90 border border-cyan-500/30 backdrop-blur-md text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setPhotoMode("3d")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              photoMode === "3d"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-extrabold shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D CINEMATIC (CASUAL)</span>
          </button>
          <button
            type="button"
            onClick={() => setPhotoMode("original")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              photoMode === "original"
                ? "bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span>ORIGINAL PHOTO</span>
          </button>
        </div>

        <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider hidden sm:inline">
          {photoMode === "3d" ? "CINEMATIC 3D AVATAR" : "STUDIO REFERENCE"}
        </span>
      </div>

      {/* Outer 3D Interactive Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-3xl p-1 transition-transform duration-200 ease-out will-change-transform group cursor-pointer"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Glowing background halo */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/35 via-blue-600/30 to-purple-600/35 blur-2xl -z-10 group-hover:opacity-100 transition-opacity" />

        {/* Main Frame Container */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/25 bg-[#0a1128]">
          {/* Portrait Image */}
          <div className="relative aspect-square w-full overflow-hidden bg-black/50">
            <img
              src={photoMode === "3d" ? haridass3dImg : founderOriginalImg}
              alt={
                photoMode === "3d"
                  ? "Haridass - Founder & Creative Director in 3D Animation Cinematic Casual Style"
                  : "Haridass - Founder & Creative Director"
              }
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Specular Gloss Highlight Overlay tracking mouse */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${tilt.glossX}% ${tilt.glossY}%, rgba(6,182,212,0.35) 0%, transparent 60%)`,
              }}
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b1c] via-transparent to-black/30 pointer-events-none" />

            {/* Top-Left Floating Badge: 3D Animation Indicator */}
            <div className="absolute top-4 left-4 bg-[#050914]/85 backdrop-blur-md border border-cyan-400/40 rounded-xl px-3 py-1.5 text-[11px] flex items-center gap-1.5 shadow-lg">
              <span className="text-cyan-400">✦</span>
              <span className="font-mono text-cyan-300 font-bold">
                {photoMode === "3d" ? "3D Cinematic View" : "Original Portrait"}
              </span>
            </div>

            {/* Top-Right Floating Badge: Top Lead Status */}
            <div className="absolute top-4 right-4 bg-[#050914]/85 backdrop-blur-md border border-cyan-400/40 rounded-xl px-3.5 py-1.5 text-xs flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-cyan-300 font-bold">Founder & Tech Lead</span>
            </div>

            {/* Floating Tech Chips in mid-card */}
            <div className="absolute top-16 left-4 flex flex-col gap-1.5 pointer-events-none hidden sm:flex">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-slate-300 backdrop-blur-sm">
                ⚡ Casual Tech Founder
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/60 border border-cyan-500/30 text-cyan-300 backdrop-blur-sm">
                ✦ 3D UI/UX & Full-Stack
              </span>
            </div>

            {/* Bottom Glassmorphic HUD Banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#050914]/92 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <div>
                <div className="text-[11px] text-cyan-400 font-mono tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>HARIDASS • FOUNDER & PRINCIPAL ARCHITECT</span>
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <span>Nexus Creative Studio</span>
                  <span className="text-xs text-slate-400 font-normal hidden xs:inline">• Chennai, India</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/917010231792?text=Hello%20Haridass!%20I%20would%20like%20to%20consult%20with%20Nexus%20Creative%20on%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  title="Direct WhatsApp Consultation with Founder"
                  className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all flex items-center justify-center shrink-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 01-5.83 2.41c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.26-4.49c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={onHireClick}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-extrabold text-xs tracking-wide shadow-md shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  Consult Founder →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
