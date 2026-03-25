export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface FullProject {
  id: number;
  slug: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  problem: string;
  solution: string;
  overview: string;
  whatIDid: ProjectSection[];
  challenges: string;
  stack: string[];
  metrics: ProjectMetric[];
  github?: string;
  live?: string;
  accentColor: string;
  visual: string;
  heroImage?: string;
  screenshots?: string[];
}

export const projects: FullProject[] = [
  {
    id: 1,
    slug: "padeespace",
    index: "01",
    title: "PadeeSpace",
    tagline:
      "A student-first collaboration and academic marketplace platform designed to connect learners, enable peer-to-peer knowledge exchange, and unlock monetization opportunities within trusted campus communities.",
    category: "EdTech / Social Platform",
    year: "2025",
    problem:
      "Students often struggle to find reliable academic help, verified collaborators, and structured environments for productive learning. Most existing tools are fragmented and lack trust systems.",
    solution:
      "Built a centralized ecosystem combining collaboration, academic support, and a student marketplace with real-time interaction.",
    overview:
      "PadeeSpace is a full-scale student ecosystem combining social networking, collaboration, and academic monetization into a single scalable platform.",
    whatIDid: [
      {
        heading: "Platform architecture",
        body: "Designed scalable frontend architecture using React and TypeScript with reusable systems.",
      },
      {
        heading: "Real-time interaction",
        body: "Implemented chat and collaboration systems enabling seamless communication.",
      },
      {
        heading: "Marketplace system",
        body: "Built structured flows for academic services including tutoring and peer support.",
      },
    ],
    challenges:
      "Balancing social interaction with academic credibility while maintaining trust and moderation.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB"],
    metrics: [
      { label: "Platform", value: "Live" },
      { label: "Users", value: "Students" },
      { label: "Core", value: "Collaboration" },
    ],
    live: "https://padeespace.com",
    visual: "/assets/padeespace/dashboard.png",
    heroImage: "/assets/padeespace/dashboard.png",
    screenshots: [
      "/assets/padeespace/app-home.png",
      "/assets/padeespace/app-wallet.png",
    ],
    accentColor: "#ff6600",
  },

  {
    id: 2,
    slug: "paypetal",
    index: "02",
    title: "PayPetal",
    tagline:
      "A modern fintech ecosystem enabling seamless payments, merchant operations, and financial management across mobile and web platforms with real-time infrastructure.",
    category: "Fintech",
    year: "2025",
    problem:
      "Financial platforms often lack unified systems for transactions, analytics, and real-time visibility across devices.",
    solution:
      "Built a cross-platform fintech system with mobile apps and dashboards for real-time financial operations.",
    overview:
      "PayPetal is a production fintech platform delivering secure transactions, analytics, and real-time updates across web and mobile.",
    whatIDid: [
      {
        heading: "Cross-platform system",
        body: "Developed mobile (React Native) and web (Next.js) applications with shared architecture.",
      },
      {
        heading: "Real-time updates",
        body: "Implemented live transaction updates and notifications.",
      },
      {
        heading: "Merchant dashboard",
        body: "Built analytics and transaction monitoring systems for merchants.",
      },
    ],
    challenges:
      "Ensuring secure financial flows while maintaining fast, consistent real-time updates.",
    stack: ["React Native", "Next.js", "TypeScript", "Node.js"],
    metrics: [
      { label: "Platform", value: "Web + Mobile" },
      { label: "System", value: "Real-time" },
      { label: "Status", value: "Production" },
    ],
    live: "https://paypetalhq.com",
    visual: "/assets/paypetal-MobileApp.png",
    heroImage: "/assets/paypetal-merchant.png",
    screenshots: [
      "/assets/paypetal-MobileApp.png",
      "/assets/paypetal-merchant.png",
    ],
    accentColor: "#ff6600",
  },

  {
    id: 3,
    slug: "our-property",
    index: "03",
    title: "Our Property NG",
    tagline:
      "A scalable real estate platform enabling property listing, management, and role-based operations for agents, admins, and users across web and mobile.",
    category: "PropTech",
    year: "2025",
    problem:
      "Real estate processes are often manual, fragmented, and lack structured systems for managing users, listings, and operations.",
    solution:
      "Built a role-based property management system with dashboards and scalable frontend architecture.",
    overview:
      "A full-stack property platform designed to support multiple user roles with efficient workflows and system structure.",
    whatIDid: [
      {
        heading: "Frontend architecture",
        body: "Led scalable frontend system using Next.js and TypeScript.",
      },
      {
        heading: "RBAC system",
        body: "Implemented role-based access control across multiple user types.",
      },
      {
        heading: "Team leadership",
        body: "Led frontend team ensuring performance, quality, and delivery.",
      },
    ],
    challenges:
      "Managing complex workflows across multiple roles while maintaining performance and usability.",
    stack: ["Next.js", "TypeScript", "React"],
    metrics: [
      { label: "Platform", value: "Web + Mobile" },
      { label: "System", value: "RBAC" },
      { label: "Role", value: "Lead Dev" },
    ],
    live: "https://ourproperty.ng",
    visual: "/assets/ourproperty/ourproperty-dashboard.png",
    heroImage: "/assets/ourproperty/ourproperty-landing.png",
    screenshots: [
      "/assets/ourproperty/ourproperty-dashboard.png",
      "/assets/ourproperty/ourproperty-landing.png",
    ],
    accentColor: "#ff6600",
  },

  {
    id: 4,
    slug: "celestifan",
    index: "04",
    title: "CelestiFan",
    tagline:
      "A fan engagement and community platform designed to connect audiences with creators, enabling interactive experiences, content sharing, and deeper digital relationships.",
    category: "Social / Fan Platform",
    year: "2025",
    problem:
      "Fans often lack direct, engaging platforms to interact with creators beyond passive content consumption on traditional social media.",
    solution:
      "Built a platform enabling active fan participation, content engagement, and stronger creator-audience relationships.",
    overview:
      "CelestiFan focuses on building meaningful fan communities through interactive features, content systems, and scalable frontend experiences.",
    whatIDid: [
      {
        heading: "Frontend system",
        body: "Developed responsive frontend using modern frameworks with focus on engagement and usability.",
      },
      {
        heading: "Engagement features",
        body: "Implemented interactive content flows to improve user participation.",
      },
      {
        heading: "Performance optimisation",
        body: "Optimised UI rendering and loading for smooth user experience across devices.",
      },
    ],
    challenges:
      "Balancing rich interactive features with performance and scalability for growing user engagement.",
    stack: ["React", "TypeScript", "Next.js"],
    metrics: [
      { label: "Focus", value: "Community" },
      { label: "System", value: "Engagement" },
      { label: "Core", value: "Fans" },
    ],
    live: "https://celestifan.com",
    visual: "/assets/celestifan.png",
    heroImage: "/assets/celestifan/celestifan-land.png",
    screenshots: [
      "/assets/celestifan/songs.png",
      "/assets/celestifan/add-song.png",
    ],
    accentColor: "#ff6600",
  },

  {
    id: 5,
    slug: "dorxelandlex",
    index: "05",
    title: "DorxelandLex Logistics",
    tagline:
      "A logistics and freight management platform built to streamline shipment coordination, delivery tracking, and operational workflows for businesses and individuals.",
    category: "Logistics / Supply Chain",
    year: "2025",
    problem:
      "Logistics operations often lack real-time visibility, efficient coordination, and centralized management systems.",
    solution:
      "Built a logistics platform enabling shipment tracking, service management, and operational transparency.",
    overview:
      "A modern logistics system designed to simplify delivery workflows and improve tracking visibility across the supply chain.",
    whatIDid: [
      {
        heading: "Tracking system",
        body: "Implemented shipment tracking with real-time status updates.",
      },
      {
        heading: "Service flows",
        body: "Structured logistics workflows for delivery and freight operations.",
      },
      {
        heading: "User experience",
        body: "Designed clean, conversion-focused interface for logistics users.",
      },
    ],
    challenges:
      "Ensuring reliable real-time updates across logistics workflows and user interactions.",
    stack: ["Next.js", "TypeScript", "Node.js"],
    metrics: [
      { label: "Focus", value: "Logistics" },
      { label: "System", value: "Tracking" },
      { label: "Core", value: "Delivery" },
    ],
    visual: "/assets/dorxel/dorxel-landing.png",
    heroImage: "/assets/dorxel/dorxel-landing.png",
    screenshots: [
      "/assets/dorxel/dorxel-services.png",
      "/assets/dorxel/about.png",
    ],
    accentColor: "#ff6600",
  },
];

export const stackColors: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "#888888",
  TypeScript: "#3178c6",
  "Node.js": "#68a063",
  PostgreSQL: "#336791",
  MongoDB: "#47a248",
  Redis: "#d82c20",
  Docker: "#2496ed",
  Stripe: "#635bff",
  Paystack: "#00c3f7",
  Flutterwave: "#f5a623",
  WebSocket: "#ff9900",
  WebRTC: "#ff9900",
  "Socket.io": "#aaaaaa",
  Prometheus: "#e6522c",
  PWA: "#5a0fc8",
  Workbox: "#ff6d00",
  GraphQL: "#e10098",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  "GitHub Actions": "#2088ff",
  "AWS ECS": "#ff9900",
  Kubernetes: "#326ce5",
  "fast-check": "#68a063",
};
