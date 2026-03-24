import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface Project {
  id: number;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  github?: string;
  live?: string;
  accentColor: string;
  visual: string;
}

const projects: Project[] = [
  {
    id: 1,
    index: "01",
    title: "DevPulse Analytics",
    tagline: "Real-time engineering intelligence",
    problem: "Engineering teams lacked visibility into pipeline health and productivity, flying blind during incidents.",
    solution: "A live dashboard aggregating GitHub, Jira, CI/CD metrics into actionable signals — cutting incident response by 40%.",
    stack: ["React", "Node.js", "WebSocket", "PostgreSQL", "Redis", "Docker"],
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
    index: "02",
    title: "QuickCart Commerce",
    tagline: "E-commerce for emerging markets",
    problem: "Small businesses couldn't afford enterprise e-commerce — setup was complex and expensive.",
    solution: "Zero-config storefront builder with mobile-first checkout, WhatsApp order integration, offline-capable PWA.",
    stack: ["Next.js", "TypeScript", "Stripe", "Redis", "MongoDB", "PWA"],
    metrics: [
      { label: "Checkout Speed", value: "3x" },
      { label: "Stores Launched", value: "500+" },
      { label: "Avg Order Value", value: "+28%" },
    ],
    github: "https://github.com/binarytech001",
    live: "#",
    accentColor: "#ff6600",
    visual: "commerce",
  },
  {
    id: 3,
    index: "03",
    title: "CodeCollab",
    tagline: "Real-time collaborative code editor",
    problem: "Remote engineering teams had no good solution for synchronous pair programming — existing tools were clunky.",
    solution: "Browser-based collaborative editor with live cursors, in-line comments, and WebRTC video — zero setup.",
    stack: ["React", "Socket.io", "Node.js", "WebRTC", "Redis", "TypeScript"],
    metrics: [
      { label: "Sync Latency", value: "<5ms" },
      { label: "Daily Sessions", value: "1000+" },
      { label: "Setup Time", value: "0min" },
    ],
    github: "https://github.com/binarytech001",
    accentColor: "#ff6600",
    visual: "collab",
  },
  {
    id: 4,
    index: "04",
    title: "NexLog Gateway",
    tagline: "API gateway for microservice architectures",
    problem: "Microservices had no unified auth, rate limiting, or observability layer — each service reimplemented its own.",
    solution: "Lightweight, zero-dependency API gateway with JWT auth, circuit breakers, structured logging, Prometheus metrics.",
    stack: ["Node.js", "TypeScript", "Redis", "Prometheus", "Docker"],
    metrics: [
      { label: "Requests/Day", value: "1M+" },
      { label: "Added Latency", value: "<2ms" },
      { label: "Uptime", value: "99.99%" },
    ],
    github: "https://github.com/binarytech001",
    accentColor: "#ff6600",
    visual: "gateway",
  },
];

const stackColors: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "#ffffff",
  TypeScript: "#3178c6",
  "Node.js": "#68a063",
  PostgreSQL: "#336791",
  MongoDB: "#47a248",
  Redis: "#d82c20",
  Docker: "#2496ed",
  Stripe: "#635bff",
  WebSocket: "#ff9900",
  WebRTC: "#ff9900",
  "Socket.io": "#aaaaaa",
  Prometheus: "#e6522c",
  PWA: "#5a0fc8",
  GraphQL: "#e10098",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
};

const visuals: Record<string, React.ReactNode> = {
  analytics: (
    <div className="w-full h-full flex flex-col justify-end p-6 gap-3">
      {[80, 55, 90, 65, 45, 75, 95].map((h, i) => (
        <motion.div
          key={i}
          className="flex items-end gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.08 }}
          viewport={{ once: true }}
        >
          <div
            className="w-full rounded-sm"
            style={{ height: `${h}%`, maxHeight: 60, background: i === 6 ? "#ff6600" : `rgba(255,102,0,${0.1 + i * 0.04})` }}
          />
        </motion.div>
      ))}
      <div className="absolute top-6 left-6 right-6">
        <div className="text-xs font-mono text-foreground/30 mb-1">Live Pipeline Health</div>
        <div className="text-2xl font-bold text-foreground font-mono">99.9%</div>
      </div>
    </div>
  ),
  commerce: (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-6">
      <div className="border border-white/10 rounded-sm p-4 w-full max-w-[180px]">
        <div className="text-xs text-foreground/30 font-mono mb-2">Checkout</div>
        <div className="space-y-2">
          {["Product", "Shipping", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${i < 2 ? "border-[#ff6600] bg-[#ff6600]/20" : "border-white/20"}`}>
                {i < 2 && <div className="w-1.5 h-1.5 rounded-full bg-[#ff6600]" />}
              </div>
              <span className={`text-xs ${i < 2 ? "text-foreground/70" : "text-foreground/30"}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#ff6600] font-mono">3x</div>
        <div className="text-xs text-foreground/40">faster checkout</div>
      </div>
    </div>
  ),
  collab: (
    <div className="w-full h-full flex flex-col p-6 gap-3">
      <div className="text-xs font-mono text-foreground/30 mb-1">Live Session</div>
      <div className="flex gap-2 mb-2">
        {["#ff6600", "#61dafb", "#68a063"].map((c, i) => (
          <div key={i} className="w-5 h-5 rounded-full border-2 border-background" style={{ background: c }} />
        ))}
        <span className="text-xs text-foreground/30 self-center">3 collaborators</span>
      </div>
      <div className="space-y-1.5 font-mono text-xs">
        <div className="text-foreground/50"><span className="text-[#61dafb]">const</span> <span className="text-foreground/70">handler</span> <span className="text-foreground/40">=</span> <span className="text-foreground/40">(</span></div>
        <div className="pl-4 text-foreground/40">req<span className="text-foreground/30">,</span> res</div>
        <div className="text-foreground/50"><span className="text-foreground/40">)</span> <span className="text-[#61dafb]">=&gt;</span> <span className="text-foreground/40">{"{"}</span></div>
        <div className="pl-4 text-[#68a063]">// cursor: @user2</div>
        <div className="pl-4 text-foreground/40">res<span className="text-foreground/30">.</span>send<span className="text-foreground/30">(</span>data<span className="text-foreground/30">)</span></div>
        <div className="text-foreground/40">{"}"}</div>
      </div>
    </div>
  ),
  gateway: (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-6">
      <div className="relative flex flex-col items-center gap-2">
        {["Client A", "Client B", "Client C"].map((c, i) => (
          <div key={c} className="flex items-center gap-2">
            <div className="text-xs font-mono text-foreground/40">{c}</div>
            <motion.div
              className="w-8 h-px bg-[#ff6600]/40"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
            />
          </div>
        ))}
        <div className="border border-[#ff6600]/40 px-3 py-2 rounded-sm mt-2">
          <div className="text-xs font-mono text-[#ff6600]">NexLog Gateway</div>
        </div>
        <motion.div
          className="w-px h-6 bg-[#ff6600]/40"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <div className="text-xs font-mono text-foreground/40">Services</div>
      </div>
    </div>
  ),
};

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      data-testid={`card-project-${project.id}`}
      className="group relative"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/8 rounded-sm overflow-hidden hover:border-white/15 transition-all duration-700 ${
          !isEven ? "lg:[direction:rtl]" : ""
        }`}
      >
        <div className={`relative min-h-[480px] bg-[#0d1a30] overflow-hidden ${!isEven ? "lg:[direction:ltr]" : ""}`}>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `radial-gradient(circle at ${isEven ? "80% 20%" : "20% 80%"}, ${project.accentColor}, transparent 60%)`,
            }}
          />
          <div className="absolute top-6 left-6">
            <span className="text-xs font-mono text-[#ff6600]/50">{project.index}</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-between p-10">
            <div>
              <div className="mb-4">
                <span className="section-label">Featured Project</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-[#ff6600]/80 font-medium mb-6">{project.tagline}</p>

              <div className="space-y-5">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-1.5">
                    Problem
                  </div>
                  <p className="text-sm text-foreground/55 leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-1.5">
                    Solution
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{project.solution}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 border rounded-sm transition-colors"
                    style={{
                      borderColor: `${stackColors[tech] || "#fff"}25`,
                      color: `${stackColors[tech] || "#fff"}80`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-github-${project.id}`}
                    className="flex items-center gap-1.5 text-xs font-medium text-foreground/40 hover:text-foreground transition-colors"
                  >
                    <FaGithub size={14} /> Source
                  </a>
                )}
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-live-${project.id}`}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#ff6600]/60 hover:text-[#ff6600] transition-colors"
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`relative min-h-[480px] bg-[#0b1626] ${!isEven ? "lg:[direction:ltr]" : ""}`}>
          <motion.div style={{ y }} className="h-full">
            <div className="h-full flex flex-col">
              <div className="flex-1 relative overflow-hidden">
                {visuals[project.visual]}
              </div>

              <div className="border-t border-white/5 p-8">
                <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-5">
                  Impact
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-xl md:text-2xl font-bold font-mono text-[#ff6600] mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-foreground/40 leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const secondaryProjects = [
  {
    title: "AuthFlow SDK",
    desc: "Drop-in OAuth2 + JWT authentication library for Node.js microservices.",
    stack: ["Node.js", "TypeScript", "JWT"],
    github: "https://github.com/binarytech001",
  },
  {
    title: "PriceWatch Bot",
    desc: "Telegram bot that monitors e-commerce prices and sends real-time alerts.",
    stack: ["Python", "Redis", "Telegram API"],
    github: "https://github.com/binarytech001",
  },
  {
    title: "FormFlow",
    desc: "Headless form builder with conditional logic, multi-step flows, and analytics.",
    stack: ["React", "TypeScript"],
    github: "https://github.com/binarytech001",
  },
  {
    title: "ChainWatch",
    desc: "Portfolio tracker for crypto assets with real-time price feeds.",
    stack: ["React", "WebSocket", "Node.js"],
    github: "https://github.com/binarytech001",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="section-label">Selected Work</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-6" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl leading-tight">
              Projects built with{" "}
              <span className="font-serif italic text-[#ff6600]">intention</span>
            </h2>
            <a
              href="https://github.com/binarytech001"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-all-projects"
              className="flex items-center gap-2 text-xs font-medium text-foreground/40 hover:text-foreground/70 transition-colors border-b border-white/10 hover:border-white/30 pb-0.5 whitespace-nowrap"
            >
              <FaGithub size={13} />
              All repositories
              <ArrowUpRight size={11} />
            </a>
          </div>
        </motion.div>

        <div className="space-y-6 mb-28">
          {projects.map((project, i) => (
            <FeaturedProject key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30">
                Other Notable Work
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {secondaryProjects.map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`card-secondary-project-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group flex flex-col justify-between p-5 border border-white/8 rounded-sm hover:border-[#ff6600]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <FaGithub size={16} className="text-foreground/30 group-hover:text-foreground/60 transition-colors" />
                      <ArrowUpRight size={14} className="text-foreground/20 group-hover:text-[#ff6600] transition-colors" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-white transition-colors mb-2">
                      {project.title}
                    </h4>
                    <p className="text-xs text-foreground/45 leading-relaxed">{project.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-foreground/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
