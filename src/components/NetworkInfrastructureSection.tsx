import React, { useState } from "react";

interface NetworkInfrastructureSectionProps {
  onRequestSiteSurvey: () => void;
  onGetProjectQuote: () => void;
  onAnnualMaintenance: () => void;
  onSelectService: (serviceName: string) => void;
}

export default function NetworkInfrastructureSection({
  onRequestSiteSurvey,
  onGetProjectQuote,
  onAnnualMaintenance,
  onSelectService,
}: NetworkInfrastructureSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeIndustryTab, setActiveIndustryTab] = useState<number>(0);

  const CORE_MODULES = [
    {
      id: "routing",
      name: "Router & Routing Services",
      shortTitle: "Router & Routing",
      icon: "🌐",
      accent: "cyan",
      badge: "Layer 3 Routing",
      tagline: "Enterprise WAN/LAN gateways, dynamic routing & high-availability connectivity",
      items: [
        { title: "Router supply, installation and configuration", desc: "Enterprise routers (Cisco, MikroTik, Ubiquiti, DrayTek) tailored for scale" },
        { title: "LAN/WAN and internet connectivity", desc: "Dual-WAN failover, load-balancing, leased line & broadband integration" },
        { title: "Static routing, OSPF and BGP configuration", desc: "Dynamic route calculation, autonomous system routing & multi-homing" },
        { title: "Branch-to-branch connectivity", desc: "Site-to-site IPsec tunnels connecting head office, branches & cloud nodes" },
        { title: "Network troubleshooting and optimization", desc: "Packet loss diagnostics, route flapping mitigation & bandwidth traffic shaping" },
      ],
      deliverables: ["Dual-WAN Load Balancing", "BGP / OSPF / Static Routes", "QoS Voice & Data Prioritization", "Automated Failover"],
    },
    {
      id: "switching",
      name: "Switching & LAN Services",
      shortTitle: "Switching & LAN",
      icon: "🖧",
      accent: "blue",
      badge: "Layer 2 / Layer 3",
      tagline: "High-throughput managed switching, VLAN segregation & wire-speed transmission",
      items: [
        { title: "Managed and unmanaged switches", desc: "Cisco Catalyst, Aruba, TP-Link Omada & D-Link enterprise deployment" },
        { title: "VLAN configuration and trunking", desc: "802.1Q tagged VLANs separating guest, staff, VoIP & security streams" },
        { title: "Layer 2 and Layer 3 switching", desc: "Hardware-accelerated inter-VLAN routing, ACL filters & IGMP snooping" },
        { title: "STP, link aggregation and port configuration", desc: "Spanning Tree (RSTP/MSTP) loop prevention & LACP port bonding" },
        { title: "Office LAN setup and expansion", desc: "Scalable access layer expansion for new departments and growing workforces" },
      ],
      deliverables: ["802.1Q VLANs & Trunking", "LACP Link Aggregation", "PoE+ 802.3at Power Delivery", "RSTP Loop Defense"],
    },
    {
      id: "firewall",
      name: "Firewall & Network Security",
      shortTitle: "Firewall & Security",
      icon: "🛡️",
      accent: "emerald",
      badge: "Next-Gen Cybersecurity",
      tagline: "Perimeter defense, UTM deep packet inspection & encrypted remote access",
      disclaimer: "Subject to customer authorization, licensed products and available technical expertise.",
      items: [
        { title: "Firewall installation and commissioning", desc: "Fortinet FortiGate, Sophos XG, Cisco Firepower & pfSense deployment" },
        { title: "Security policies, NAT and access rules", desc: "Port forwarding, source/destination NAT, DMZ zoning & malware filtering" },
        { title: "Site-to-site and remote-access VPN", desc: "WireGuard, IPsec & SSL VPN client setup with multi-factor authentication" },
        { title: "Network segmentation and access control", desc: "Zero-Trust micro-segmentation preventing lateral malware movement" },
        { title: "Firewall health checks and configuration backup", desc: "Automated off-site config snapshots, firmware patching & vulnerability audits" },
      ],
      deliverables: ["Next-Gen Firewall (NGFW)", "Deep Packet Inspection (DPI)", "IPsec & SSL VPN Gateways", "Zero-Trust Segmentation"],
    },
    {
      id: "cctv",
      name: "CCTV & Video Surveillance",
      shortTitle: "CCTV & Surveillance",
      icon: "📹",
      accent: "purple",
      badge: "24/7 Visual Security",
      tagline: "Ultra-HD IP cameras, smart NVR storage & remote mobile monitoring",
      items: [
        { title: "IP CCTV and analog camera installation", desc: "Dome, bullet & PTZ cameras with starlight night vision & optical zoom" },
        { title: "NVR/DVR setup and camera configuration", desc: "Network Video Recorder provisioning with RAID storage & H.265+ compression" },
        { title: "PoE switches and structured cabling", desc: "Dedicated surveillance VLANs on high-budget Gigabit PoE switches" },
        { title: "Storage, recording and playback testing", desc: "Multi-day continuous retention planning, motion bookmarking & archive export" },
        { title: "Remote viewing configuration and maintenance", desc: "Encrypted iOS/Android mobile streaming & desktop multi-screen CMS software" },
      ],
      deliverables: ["4K IP Dome & Bullet Cameras", "H.265+ NVR RAID Storage", "Remote Mobile Streaming", "Dedicated Surveillance VLAN"],
    },
    {
      id: "cabling",
      name: "Structured Cabling & Fiber",
      shortTitle: "Cabling & Fiber",
      icon: "🔌",
      accent: "amber",
      badge: "Physical Infrastructure",
      tagline: "Certified Cat6/Cat6A copper, single/multi-mode fiber & rack management",
      items: [
        { title: "Cat6/Cat6A copper cabling", desc: "High-density 10Gbps rated Cat6/Cat6A UTP/STP cable pulling & conduit dressing" },
        { title: "Fiber-optic cable installation and termination", desc: "Single-mode (OS2) & Multi-mode (OM3/OM4) fusion splicing & LC/SC termination" },
        { title: "Patch panels, racks and cable management", desc: "Neat vertical/horizontal cable comb dressing, labeled patch bays & brush plates" },
        { title: "Fiber testing and Ethernet cable certification", desc: "Fluke Networks cable certification, optical power loss & OTDR trace verification" },
        { title: "Office, campus and branch connectivity", desc: "Inter-building fiber backbones, floor-to-floor risers & workstation drop boxes" },
      ],
      deliverables: ["Fluke Certified Cat6/Cat6A", "Fusion Spliced Fiber Optics", "Numbered Patch Panels", "Server Rack Cable Combs"],
    },
    {
      id: "commissioning",
      name: "Installation, Configuration & Commissioning",
      shortTitle: "Turnkey Commissioning",
      icon: "🛠️",
      accent: "teal",
      badge: "Turnkey Execution",
      tagline: "Rigorous site assessment, FAT/SAT acceptance testing & handover blueprints",
      items: [
        { title: "Site survey and technical assessment", desc: "Physical walkthrough, RF spectrum analysis, cable pathway audit & bill of materials" },
        { title: "Equipment installation and configuration", desc: "Rack mounting, power distribution unit (PDU) balancing & device staging" },
        { title: "FAT/SAT or agreed acceptance testing", desc: "Factory & Site Acceptance Testing under full enterprise traffic load" },
        { title: "Connectivity, redundancy and performance testing", desc: "Failover latency measurement, ping jitter benchmarking & bandwidth stress runs" },
        { title: "As-built diagrams, IP plans and handover documentation", desc: "Comprehensive Visio network topology schematics, port maps & admin credentials" },
      ],
      deliverables: ["On-Site Technical Survey", "FAT / SAT Acceptance Runs", "As-Built Visio Diagrams", "Complete IP Address Plans"],
    },
  ];

  const ADDITIONAL_SERVICES = [
    {
      category: "Wi-Fi & Wireless",
      icon: "📡",
      services: "Access points, controllers, coverage planning, seamless roaming & captive portals",
    },
    {
      category: "Enterprise Networks",
      icon: "🏢",
      services: "VLANs, routing, VPN, multi-branch WAN interconnectivity & SD-WAN readiness",
    },
    {
      category: "Network Monitoring",
      icon: "📊",
      services: "24/7 availability, latency, packet loss telemetry, automated SNMP alerts & health dashboards",
    },
    {
      category: "AMC & Maintenance",
      icon: "🕒",
      services: "Preventive maintenance, scheduled firmware security patches, break-fix support & SLA guarantees",
    },
    {
      category: "Network Migration",
      icon: "🔄",
      services: "Legacy equipment replacement, zero-downtime configuration migration & cutover coordination",
    },
    {
      category: "IT Infrastructure",
      icon: "🗄️",
      services: "Server racks (4U–42U), patch panels, PDU power management & online UPS coordination",
    },
    {
      category: "Remote Support",
      icon: "🎧",
      services: "Rapid-response remote troubleshooting, configuration updates and emergency incident support",
    },
    {
      category: "Network Audit",
      icon: "🔍",
      services: "Hardware inventory, physical topology review, configuration security checks & gap analysis",
    },
  ];

  const TARGET_INDUSTRIES = [
    {
      title: "Corporate Offices & IT Companies",
      icon: "🏢",
      badge: "High Density & Low Latency",
      desc: "Robust office LAN, high-speed Wi-Fi 6, next-gen perimeter firewalls, site-to-site VPNs, and secure branch connectivity for productive engineering teams.",
      highlights: ["Gigabit Workstation Drops", "Zero-Trust Firewalls", "Secure Remote-Access VPNs", "Redundant Internet Lines"],
    },
    {
      title: "Retail, Showrooms & Commercial Buildings",
      icon: "🛍️",
      badge: "Surveillance & POS Uptime",
      desc: "High-definition CCTV coverage, PoE switches for digital signage & billing POS, structured cabling, and isolated customer Wi-Fi networks.",
      highlights: ["High-Definition IP CCTV", "PoE Powered Billing Counters", "Guest Wi-Fi Captive Portal", "Isolated POS Security VLAN"],
    },
    {
      title: "Factories, Warehouses & Institutions",
      icon: "🏭",
      badge: "Industrial & Long Distance",
      desc: "Ruggedized industrial connectivity, long-distance single-mode fiber backbones, large-area perimeter surveillance, and ongoing preventive maintenance.",
      highlights: ["Armor-Clad Fiber Runs", "Warehouse Wi-Fi Handheld Coverage", "Perimeter Video Analytics", "Industrial Din-Rail Switches"],
    },
    {
      title: "SMEs, Schools, Hospitals & Multi-Branch",
      icon: "🏥",
      badge: "Turnkey Setup & AMC",
      desc: "End-to-end networking from ground-up installation and turnkey commissioning to dependable 24/7 annual maintenance contracts (AMC).",
      highlights: ["Turnkey Site Commissioning", "Predictable Annual AMC Cost", "Emergency Break-Fix SLA", "Complete Network Blueprints"],
    },
  ];

  const currentModule = CORE_MODULES[activeTab];

  return (
    <section
      id="network-infrastructure"
      className="py-20 md:py-28 relative bg-[#030712] border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ===================================================================== */}
        {/* SECTION HEADER & BRANDING                                             */}
        {/* ===================================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-xs font-mono text-emerald-300 shadow-lg shadow-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">
              NETWORKING &amp; IT INFRASTRUCTURE DIVISION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Build, Secure &amp; Maintain{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Business Networks.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            <strong className="text-white">Nexus Creative</strong> delivers enterprise-grade network infrastructure — from hardware supply and turnkey commissioning to structured fiber cabling, CCTV surveillance, and proactive 24/7 AMC maintenance.
          </p>

          {/* ================================================================= */}
          {/* THE 4 RECOMMENDED ENQUIRY CTA BUTTONS                            */}
          {/* ================================================================= */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onRequestSiteSurvey}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>📋</span>
              <span>Request a Site Survey</span>
            </button>

            <button
              type="button"
              onClick={onGetProjectQuote}
              className="px-5 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>💼</span>
              <span>Get a Project Quote</span>
            </button>

            <button
              type="button"
              onClick={onAnnualMaintenance}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>🛡️</span>
              <span>Annual Maintenance (AMC)</span>
            </button>

            <a
              href="https://wa.me/917010231792?text=Hello%20Nexus%20Creative!%20I%20am%20interested%20in%20your%20Networking%20%26%20IT%20Infrastructure%20solutions."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>💬</span>
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 1. COMPLETE SERVICE PORTFOLIO: 6 CORE MODULES (INTERACTIVE TABS)      */}
        {/* ===================================================================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                01 • COMPLETE SERVICE PORTFOLIO
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Core Engineering Capabilities
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden md:inline">
              Select module to view technical scope &amp; deliverables
            </span>
          </div>

          {/* Module Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {CORE_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  activeTab === idx
                    ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-[#091126]/80 hover:bg-[#0c1633] border-white/10 text-slate-300"
                }`}
              >
                <div className="text-2xl mb-2">{mod.icon}</div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Mod 0{idx + 1}
                  </div>
                  <div className="text-xs font-extrabold leading-tight mt-0.5">{mod.shortTitle}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Module Showcase Card */}
          <div className="glass-cyber-card rounded-3xl p-6 sm:p-10 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
            <div className="space-y-8">
              {/* Card Title & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-3xl font-bold shadow-inner shrink-0">
                    {currentModule.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-2xl sm:text-3xl font-black text-white">
                        {currentModule.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {currentModule.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-medium mt-1">
                      {currentModule.tagline}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(currentModule.name)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Inquire This Solution →
                </button>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentModule.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all flex items-start gap-3.5"
                  >
                    <span className="text-emerald-400 font-bold text-sm mt-0.5">✔</span>
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer if present */}
              {currentModule.disclaimer && (
                <div className="text-[11px] font-mono text-slate-400 bg-black/40 border border-white/10 p-3 rounded-xl flex items-center gap-2">
                  <span className="text-amber-400">ℹ️</span>
                  <span>{currentModule.disclaimer}</span>
                </div>
              )}

              {/* Deliverable Tags Ribbon */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400 mr-2">Core Deliverables:</span>
                {currentModule.deliverables.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold"
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. ADDITIONAL SPECIALIZED SERVICES                                    */}
        {/* ===================================================================== */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              02 • SPECIALIZED IT &amp; NETWORK SERVICES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Extended Operational Offerings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDITIONAL_SERVICES.map((add, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#091126]/80 border border-cyan-500/20 hover:border-cyan-400/60 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{add.icon}</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {add.category}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{add.services}</p>
                </div>

                <div className="pt-4 mt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectService(add.category)}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Details</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. TARGET INDUSTRIES SHOWCASE                                         */}
        {/* ===================================================================== */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              03 • INDUSTRY SOLUTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Tailored for Enterprise Verticals
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TARGET_INDUSTRIES.map((ind, idx) => (
              <div
                key={idx}
                className="glass-cyber-card rounded-3xl p-6 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-400 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{ind.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      {ind.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {ind.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">{ind.desc}</p>

                  <div className="space-y-1.5 pt-2">
                    {ind.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <span className="text-emerald-400">✦</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onGetProjectQuote}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-black text-emerald-300 border border-emerald-500/30 font-bold text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
                  >
                    Get Industry Quote →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4 & 5. BUSINESS MODEL & ITEMIZED QUOTATION TRANSPARENCY               */}
        {/* ===================================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#07132a] via-[#050c1e] to-[#030612] border border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                04 &amp; 05 • BUSINESS MODEL &amp; PROJECT DELIVERY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Transparent Itemized Proposals &amp; Dedicated Partner Network
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Nexus Creative delivers complete network infrastructure turnkey solutions through our in-house engineering and qualified on-site installation partners.
              </p>
            </div>

            <button
              type="button"
              onClick={onRequestSiteSurvey}
              className="px-6 py-3.5 rounded-xl glow-blue-btn text-white font-extrabold text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-lg"
            >
              Book Site Survey Assessment →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Project Commissioning</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Equipment supply, mounting, patch panel cabling, FAT/SAT testing &amp; final handover.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">Service Engagements</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Network audits, configuration migrations, Wi-Fi coverage surveys &amp; incident troubleshooting.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-blue-400 uppercase">Recurring AMC Contracts</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scheduled preventive visits, break-fix replacement, firmware upgrades &amp; 24/7 SLA helpline.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-purple-400 uppercase">Itemized Quote Guarantee</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transparent lines for Hardware, Software Licences, Cabling, Labour, Travel &amp; Commissioning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
