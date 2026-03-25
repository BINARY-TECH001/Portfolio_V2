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
}

export const projects: FullProject[] = [
  {
    id: 1,
    slug: "devpulse-analytics",
    index: "01",
    title: "DevPulse Analytics",
    tagline: "Real-time engineering intelligence",
    category: "Developer Tooling",
    year: "2024",
    problem:
      "Engineering teams at a Series A startup were flying blind. Incidents took 45+ minutes to diagnose because metrics lived in six different tools — GitHub, Jira, Datadog, PagerDuty, Sentry, and Jenkins. Context switching was killing response time.",
    solution:
      "A unified real-time dashboard that aggregates pipeline health, deployment status, open incidents, and team velocity into a single pane of glass — with smart alerting and root-cause suggestions powered by pattern matching.",
    overview:
      "DevPulse started as an internal tool for a logistics startup I was consulting for. After seeing it cut incident response from 45 minutes to under 10, the client asked me to productise it. I rebuilt the architecture from scratch with multi-tenancy, WebSocket-based live updates, and a pluggable integration system so any engineering team could connect their own toolchain.",
    whatIDid: [
      {
        heading: "WebSocket-powered live engine",
        body: "Built a Node.js event bus using Socket.io that aggregates webhooks from GitHub, Jira, and CI/CD providers in real time, normalises them into a unified event schema, and pushes diffs to connected clients — keeping all dashboard panels live without polling.",
      },
      {
        heading: "Multi-tenant data architecture",
        body: "Designed PostgreSQL schema with row-level security so each engineering team sees only their own data. Used Redis for ephemeral session state and rate-limiting. Each tenant's metrics are isolated at the query level — no shared tables.",
      },
      {
        heading: "Intelligent alert routing",
        body: "Implemented a rule engine where teams can define conditions (e.g., 'if deployment frequency drops > 30% in 24h, ping #eng-ops') without writing code. Rules are stored as JSON and evaluated server-side on each incoming event.",
      },
      {
        heading: "Dashboard builder UI",
        body: "React drag-and-drop grid where teams compose their own dashboard from metric widgets. Layout persists per user. Built with custom grid logic (no external DnD library) to keep bundle size minimal.",
      },
      {
        heading: "Deployment & infrastructure",
        body: "Containerised with Docker Compose for local dev; deployed on AWS ECS with auto-scaling. Set up GitHub Actions CI/CD with staged rollouts — staging → canary → production with automated rollback on error-rate spike.",
      },
    ],
    challenges:
      "The hardest part was designing the webhook normalisation layer. GitHub, Jira, and Jenkins all emit events in completely different shapes and vocabularies. I built a provider-specific transformer pipeline that maps incoming payloads to a canonical event schema — making the downstream dashboard logic provider-agnostic.",
    stack: ["React", "Node.js", "WebSocket", "PostgreSQL", "Redis", "Docker", "AWS ECS", "GitHub Actions"],
    metrics: [
      { label: "Faster Incident Response", value: "40%" },
      { label: "Teams Using Daily", value: "150+" },
      { label: "Uptime", value: "99.9%" },
    ],
    github: "https://github.com/binarytech001",
    live: "#",
    accentColor: "#ff6600",
    visual: "analytics",
  },
  {
    id: 2,
    slug: "quickcart-commerce",
    index: "02",
    title: "QuickCart Commerce",
    tagline: "E-commerce for emerging markets",
    category: "E-Commerce Platform",
    year: "2023",
    problem:
      "Small business owners in Nigeria and Ghana were losing sales because setting up an online store required either expensive SaaS subscriptions they couldn't afford, or developers they couldn't hire. WhatsApp was their primary sales channel — but it was manual and unscalable.",
    solution:
      "A zero-config storefront builder where a merchant can go from signup to accepting payments in under 5 minutes. Mobile-first PWA. WhatsApp order integration so customers stay in their preferred channel. Stripe + Paystack + Flutterwave support depending on region.",
    overview:
      "QuickCart was a 10-week freelance build for an e-commerce startup targeting West African SMBs. I was the sole engineer on the frontend (Next.js PWA) and co-built the backend API with one other engineer. The product launched to 200 merchants in beta, scaling to 500+ stores within 3 months of GA.",
    whatIDid: [
      {
        heading: "PWA storefront engine",
        body: "Built a Next.js PWA with offline-capable product browsing using Workbox service workers and IndexedDB caching. Each merchant's store is server-side rendered at their subdomain for SEO and performance. Lighthouse score: 98.",
      },
      {
        heading: "WhatsApp order integration",
        body: "Integrated WhatsApp Business Cloud API so when a customer adds items to cart and clicks 'Order via WhatsApp', a pre-filled message with the full order details is sent to the merchant. Merchants can reply, confirm, and close sales without leaving WhatsApp.",
      },
      {
        heading: "Multi-gateway checkout",
        body: "Abstracted Stripe (international), Paystack (Nigeria), and Flutterwave (Ghana/Kenya) behind a unified checkout component. Gateway selection is automatic based on the buyer's location. Refund and webhook handling unified at the API layer.",
      },
      {
        heading: "Merchant dashboard",
        body: "Built the full merchant admin: product management (CRUD with bulk upload via CSV), order management with status tracking, analytics dashboard with revenue/orders/AOV charts using Recharts, and customer management.",
      },
      {
        heading: "Store builder UI",
        body: "Drag-and-drop store customiser (colour theme, banner image, featured products) with live preview. Theme changes persist to a JSON config stored in PostgreSQL and applied at SSR time. No-code design experience.",
      },
    ],
    challenges:
      "Handling payment failures gracefully across three different gateway APIs — each with their own error codes, webhook shapes, and retry semantics — while giving merchants and customers clear, actionable error messages was the most complex engineering problem. I built a unified payment state machine that abstracts all three gateways behind a single interface.",
    stack: ["Next.js", "TypeScript", "Stripe", "Paystack", "Flutterwave", "Redis", "MongoDB", "PWA", "Workbox"],
    metrics: [
      { label: "Checkout Speed vs. Baseline", value: "3x" },
      { label: "Stores Launched", value: "500+" },
      { label: "Avg Order Value Increase", value: "+28%" },
    ],
    github: "https://github.com/binarytech001",
    live: "#",
    accentColor: "#ff6600",
    visual: "commerce",
  },
  {
    id: 3,
    slug: "codecollab",
    index: "03",
    title: "CodeCollab",
    tagline: "Real-time collaborative code editor",
    category: "Developer Tools",
    year: "2023",
    problem:
      "Remote engineering teams doing pair programming were stuck using screen-share over Zoom — laggy, one-sided, and frustrating. Existing tools like CodeSandbox were powerful but over-engineered for quick ad-hoc sessions. Teams needed something that just works, immediately.",
    solution:
      "A browser-based collaborative code editor with real-time cursor sync, in-line threaded comments, WebRTC audio/video, and zero account setup. Share a link, start coding together in under 10 seconds.",
    overview:
      "CodeCollab was a personal project that grew into a real product used by engineering bootcamps and remote teams. I built the initial MVP in 3 weeks during a hackathon (won 2nd place), then continued developing it into a production-quality tool over 6 months. At peak it was running 1,000+ daily sessions.",
    whatIDid: [
      {
        heading: "Operational Transformation engine",
        body: "Implemented a text OT (Operational Transformation) algorithm from scratch to handle concurrent edits without conflicts. When two users type simultaneously, the server resolves the operations and broadcasts the correct merged state to all clients — with sub-5ms round-trip latency on a local network.",
      },
      {
        heading: "Live cursor presence",
        body: "Each connected user gets a uniquely coloured cursor that moves in real time across the editor. Implemented cursor position as a character offset mapped to a 2D coordinate, synced over Socket.io at 60Hz. Presence indicators in the toolbar show who's online.",
      },
      {
        heading: "WebRTC voice/video",
        body: "Built peer-to-peer audio/video using the WebRTC API with a STUN/TURN server for NAT traversal. Sessions are established via a signalling server (Socket.io). Up to 4 participants can be on audio/video simultaneously with the code editor running alongside.",
      },
      {
        heading: "In-line comment threads",
        body: "Users can highlight any line and leave comments that appear in the gutter, with threaded replies. Comments are linked to a line number and a content hash, so they remain anchored even as code is inserted above them.",
      },
      {
        heading: "Shareable sessions",
        body: "Sessions are created via a unique UUID URL. No signup required for guests — just open the link and start editing. Session state (code, comments, participants) is stored in Redis and expires after 48h of inactivity, with optional export to GitHub Gist.",
      },
    ],
    challenges:
      "The OT engine was genuinely hard to get right. Edge cases like three users editing the same character position simultaneously took weeks of debugging with carefully logged operation traces. I eventually wrote a property-based test suite using fast-check that generates random operation sequences and verifies convergence — which uncovered 6 bugs that manual testing missed.",
    stack: ["React", "Socket.io", "Node.js", "WebRTC", "Redis", "TypeScript", "fast-check"],
    metrics: [
      { label: "Sync Latency", value: "<5ms" },
      { label: "Daily Sessions", value: "1000+" },
      { label: "Setup Time", value: "0 min" },
    ],
    github: "https://github.com/binarytech001",
    accentColor: "#ff6600",
    visual: "collab",
  },
  {
    id: 4,
    slug: "nexlog-gateway",
    index: "04",
    title: "NexLog Gateway",
    tagline: "API gateway for microservice architectures",
    category: "Backend Infrastructure",
    year: "2022",
    problem:
      "A logistics startup I consulted for had grown from a monolith to 11 microservices over 18 months. Each service had rolled its own authentication, rate limiting, and logging — 11 different implementations, none compatible, all with different bugs. Onboarding a new service meant copy-pasting auth boilerplate.",
    solution:
      "A lightweight, zero-dependency API gateway that sits in front of all services and provides JWT authentication, per-route rate limiting, circuit breaking, structured logging, and Prometheus metrics — as a single deployable that any service can route through.",
    overview:
      "NexLog Gateway started as an internal tool for a single client and I open-sourced it after seeing how universally the problem applied. It's written in pure Node.js with no framework — just the http module and a handful of focused libraries. The result is a 12MB binary with <2ms added latency.",
    whatIDid: [
      {
        heading: "Zero-dependency routing core",
        body: "Built a custom HTTP router using a radix tree data structure for O(log n) route matching. Supports path parameters, wildcards, and method-based routing. The entire routing layer is under 400 lines of TypeScript with no external dependencies.",
      },
      {
        heading: "JWT authentication middleware",
        body: "Implemented RS256 JWT verification with JWKS key rotation. The gateway fetches and caches the public key set from the auth server, verifying tokens locally without a network round-trip. Supports scopes, custom claims, and service-to-service tokens.",
      },
      {
        heading: "Circuit breaker implementation",
        body: "Built a state-machine circuit breaker (Closed → Open → Half-Open) per upstream service. When error rate exceeds threshold, the breaker opens and returns 503 immediately, protecting downstream services from cascading failures. Configurable per route.",
      },
      {
        heading: "Structured logging + Prometheus metrics",
        body: "Every request logs a structured JSON line with request ID, latency, upstream service, status code, and user ID. Exposes a /metrics endpoint in Prometheus format with histograms for latency, counters for status codes, and gauges for active connections.",
      },
      {
        heading: "Configuration-driven routing",
        body: "Routes, middleware stacks, rate limits, and upstream addresses are defined in a YAML config file with hot reload. Changing routing rules doesn't require a service restart — the gateway watches the config file and applies changes within 100ms.",
      },
    ],
    challenges:
      "Making circuit breaking work correctly across a cluster of gateway instances (not just a single process) required sharing breaker state via Redis. The tricky part was ensuring the state machine transitions were atomic across instances — I used Redis Lua scripts to implement compare-and-swap on the breaker state, ensuring no two instances could simultaneously transition the breaker incorrectly.",
    stack: ["Node.js", "TypeScript", "Redis", "Prometheus", "Docker", "Kubernetes"],
    metrics: [
      { label: "Requests / Day", value: "1M+" },
      { label: "Added Latency", value: "<2ms" },
      { label: "Uptime", value: "99.99%" },
    ],
    github: "https://github.com/binarytech001",
    accentColor: "#ff6600",
    visual: "gateway",
  },
];

export const stackColors: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "#ffffff",
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
