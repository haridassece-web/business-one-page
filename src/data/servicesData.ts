export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  row: 1 | 2;
  items: string[];
}

export const SERVICES_CATEGORIES: ServiceCategory[] = [
  // Row 1 Categories (as seen in Screenshot 2)
  {
    id: "websites",
    name: "Websites",
    icon: "🌐",
    shortDesc: "Pixel-perfect modern websites tailored for conversions",
    row: 1,
    items: [
      "Website Designing",
      "Website Redesigning",
      "Dynamic Website",
      "Angular Js Website",
      "Single Page Website",
      "UI/UX Website Designing",
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    icon: "💻",
    shortDesc: "Scalable full-stack web applications and architectures",
    row: 1,
    items: [
      "Software Development",
      "Dynamic Web Development",
      "PHP Web Development",
      "Node Js Development",
      "Python Web Development",
      "Codeigniter Web Development",
      "IOT Website Development",
      "Customized Web Development",
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: "🛒",
    shortDesc: "High-volume online storefronts with seamless checkouts",
    row: 1,
    items: [
      "E-Commerce Website",
      "Opencart Website",
      "Magento Website",
      "PrestaShop Ecommerce",
      "Shopify E-Commerce",
      "WooCommerce Website",
    ],
  },
  {
    id: "mobile-application",
    name: "Mobile Application",
    icon: "📱",
    shortDesc: "Native and cross-platform high-performance apps",
    row: 1,
    items: [
      "Android App Development",
      "IOS",
      "IoT",
      "Kiosk Mobile Application Development",
    ],
  },
  {
    id: "cms",
    name: "CMS",
    icon: "📑",
    shortDesc: "Content management solutions for rapid digital publishing",
    row: 1,
    items: [
      "Drupal Website",
      "Wordpress Website",
    ],
  },

  // Row 2 Categories (as seen in Screenshot 1 & 2)
  {
    id: "softwares",
    name: "Softwares",
    icon: "🏢",
    shortDesc: "Tailored industry ERPs, booking portals, and management suites",
    row: 2,
    items: [
      "Hospital Management",
      "Hotel Booking",
      "Taxi Booking",
      "Event Management",
      "Enquiry Management",
      "Package Management",
      "Inventory Management",
      "Matrimony Website",
      "Job Portal",
    ],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    icon: "🚀",
    shortDesc: "Omnichannel customer acquisition and performance ROI",
    row: 2,
    items: [
      "Social Media Marketing",
      "SEO Company",
      "Search Engine Marketing",
      "Social Media Optimization",
      "Content Marketing",
      "SMS MARKETING",
    ],
  },
  {
    id: "market-place",
    name: "Market Place",
    icon: "🏪",
    shortDesc: "Multi-vendor marketplaces and B2B trade platforms",
    row: 2,
    items: [
      "B2B Marketplace",
      "Magento Website",
      "Open Cart Website",
    ],
  },
  {
    id: "domain-hosting",
    name: "Domain & Hosting",
    icon: "☁️",
    shortDesc: "High-uptime cloud infrastructure, domains, and enterprise security",
    row: 2,
    items: [
      "Web Hosting Services",
      "Windows Hosting",
      "Linux Hosting",
      "Cloud Hosting Company",
      "VPN Server Provider",
      "Domain Registration",
      "Domain Renewal & Transfer",
      "SSL Certificate",
    ],
  },
  {
    id: "networking-hardware",
    name: "Networking Solutions",
    icon: "🖧",
    shortDesc: "Routers, switches, firewalls, CCTV surveillance, LAN/WAN/fiber & 24/7 AMC",
    row: 2,
    items: [
      "Routers, Switches & Firewalls",
      "CCTV & Surveillance Systems",
      "LAN, WAN, Wi-Fi & Fiber Networks",
      "Installation & Commissioning",
      "Troubleshooting & AMC Support",
      "Router Configuration & Setup",
      "Enterprise Firewall Installation",
      "Network Switch Configuration (L2/L3)",
      "Hardware Installation & Rack Mounting",
      "VLAN & Network Segmentation",
      "VPN & Site-to-Site Tunneling",
      "Structured Cabling & Termination",
    ],
  },
];

// Tailored descriptions and hardware/technical tags for specialized services
const SERVICE_METADATA_MAP: Record<string, { desc: string; tags: string[] }> = {
  "Routers, Switches & Firewalls": {
    desc: "End-to-end deployment, VLAN trunking, NAT rules, and policy hardening for Cisco, Fortinet, and MikroTik hardware.",
    tags: ["Routers", "Switches", "Firewalls", "Cisco & Fortinet"],
  },
  "CCTV & Surveillance Systems": {
    desc: "High-definition IP cameras, NVR/DVR cloud storage, motion analytics, night vision, and 24/7 remote mobile surveillance.",
    tags: ["IP Cameras", "NVR/DVR", "Surveillance", "Remote Monitoring"],
  },
  "LAN, WAN, Wi-Fi & Fiber Networks": {
    desc: "Campus LAN/WAN routing, high-density Wi-Fi 6 APs, single-mode/multi-mode fiber optics, and gigabit backbone interconnects.",
    tags: ["LAN/WAN", "Wi-Fi 6", "Fiber Optic", "High Speed"],
  },
  "Installation & Commissioning": {
    desc: "Turnkey on-site hardware deployment, server rack mounting, patch panel punch-downs, testing, and system commissioning.",
    tags: ["Turnkey", "Commissioning", "Rack Mounting", "Certified"],
  },
  "Troubleshooting & AMC Support": {
    desc: "Proactive annual maintenance contracts (AMC), 99.9% uptime SLA, latency diagnostics, and 24/7 emergency network recovery.",
    tags: ["24/7 AMC", "SLA Support", "Diagnostics", "Maintenance"],
  },
  "Router Configuration & Setup": {
    desc: "Cisco, MikroTik & Ubiquiti routing, multi-WAN load balancing, BGP/OSPF dynamic routing, and failover redundancy.",
    tags: ["Cisco", "MikroTik", "Dual-WAN", "Routing"],
  },
  "Enterprise Firewall Installation": {
    desc: "Fortinet FortiGate, Sophos, Cisco & pfSense firewall deployment with UTM inspection, NAT policies, and zero-day threat prevention.",
    tags: ["Fortinet", "Sophos", "pfSense", "UTM Security"],
  },
  "Network Switch Configuration (L2/L3)": {
    desc: "Managed Layer-2/3 switch configuration, 802.1Q VLAN trunking, link aggregation (LACP), spanning tree (STP), and PoE+ power budgeting.",
    tags: ["L2/L3 Switches", "VLANs", "PoE+", "LACP Trunking"],
  },
  "Hardware Installation & Rack Mounting": {
    desc: "Server rack mounting (4U–42U), patch panel punch-down, cable comb dressing, PDU power management, and UPS setup.",
    tags: ["Rack Mounting", "Patch Panels", "Hardware Setup", "PDU & UPS"],
  },
  "LAN / WAN Network Architecture": {
    desc: "Enterprise campus network topology design, IPv4/IPv6 subnetting, high-availability core switching, and DHCP pool infrastructure.",
    tags: ["LAN/WAN", "Campus Network", "Subnetting", "Core Routing"],
  },
  "Enterprise Wi-Fi & AP Deployment": {
    desc: "Zero-deadzone Wi-Fi 6/6E coverage with controller-managed APs (UniFi, Aruba), seamless roaming, and captive portals.",
    tags: ["Wi-Fi 6", "UniFi", "Aruba", "Fast Roaming"],
  },
  "VLAN & Network Segmentation": {
    desc: "Isolated network zoning separating workstations, VoIP phones, CCTV security cameras, and guest visitors to prevent lateral attacks.",
    tags: ["802.1Q VLAN", "Segmentation", "CCTV & VoIP", "Zero-Trust"],
  },
  "VPN & Site-to-Site Tunneling": {
    desc: "Hardware-accelerated IPsec/IKEv2, WireGuard, and OpenVPN tunnels linking multi-location offices and remote staff securely.",
    tags: ["IPsec VPN", "WireGuard", "Branch Interconnect", "SSL VPN"],
  },
  "Structured Cabling & Termination": {
    desc: "Cat6/Cat6A & Single-mode/Multi-mode fiber optic cabling, keystones, faceplates, conduit dressing, and Fluke certification.",
    tags: ["Cat6A", "Fiber Optic", "Cable Dressing", "Fluke Tested"],
  },
  "Network AMC & 24/7 Troubleshooting": {
    desc: "Proactive SNMP network telemetry, packet loss diagnostics, firmware security hardening, and on-call engineer AMC support.",
    tags: ["24/7 AMC", "SNMP Telemetry", "Firmware Hardening", "SLA Support"],
  },
};

// Flat list of all individual services with their parent category
export interface FlatService {
  name: string;
  categoryId: string;
  categoryName: string;
  icon: string;
  shortDesc?: string;
  tags?: string[];
}

export const ALL_FLAT_SERVICES: FlatService[] = SERVICES_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => {
    const meta = SERVICE_METADATA_MAP[item];
    return {
      name: item,
      categoryId: cat.id,
      categoryName: cat.name,
      icon: cat.icon,
      shortDesc: meta?.desc,
      tags: meta?.tags,
    };
  })
);
