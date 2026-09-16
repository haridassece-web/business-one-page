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
];

// Flat list of all individual services with their parent category
export interface FlatService {
  name: string;
  categoryId: string;
  categoryName: string;
  icon: string;
}

export const ALL_FLAT_SERVICES: FlatService[] = SERVICES_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({
    name: item,
    categoryId: cat.id,
    categoryName: cat.name,
    icon: cat.icon,
  }))
);
