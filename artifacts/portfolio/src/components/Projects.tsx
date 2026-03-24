import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  image: string;
  github?: string;
  live?: string;
  metrics?: string[];
  featured: boolean;
  accentColor: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "DevPulse Analytics",
    problem: "Engineering teams lacked real-time visibility into their deployment pipeline health and team productivity metrics.",
    solution: "Built a real-time dashboard aggregating GitHub, Jira, and CI/CD data into actionable insights — reducing incident response time by 40%.",
    stack: ["React", "Node.js", "PostgreSQL", "WebSocket", "Docker"],
    image: "analytics",
    github: "https://github.com/binarytech001",
    live: "#",
    metrics: ["40% faster incident response", "150+ daily active teams", "99.9% uptime"],
    featured: true,
    accentColor: "#ff6600",
  },
  {
    id: 2,
    title: "QuickCart Commerce",
    problem: "Small businesses in emerging markets couldn't afford enterprise e-commerce platforms with complex setup requirements.",
    solution: "Created a zero-config storefront builder with mobile-first checkout, WhatsApp order integration, and offline-capable PWA.",
    stack: ["Next.js", "TypeScript", "Stripe", "Redis", "MongoDB"],
    image: "commerce",
    github: "https://github.com/binarytech001",
    live: "#",
    metrics: ["3x faster checkout", "500+ stores launched", "M-Pesa integration"],
    featured: true,
    accentColor: "#ff6600",
  },
  {
    id: 3,
    title: "CodeCollab",
    problem: "Remote engineering teams struggled with synchronous code reviews and pair programming sessions.",
    solution: "Built a real-time collaborative code editor with live cursors, in-line comments, and video calling — no setup required.",
    stack: ["React", "Socket.io", "Node.js", "WebRTC", "Redis"],
    image: "collab",
    github: "https://github.com/binarytech001",
    metrics: ["Real-time collab", "5ms latency", "1000+ sessions"],
    featured: false,
    accentColor: "#ff6600",
  },
  {
    id: 4,
    title: "NexLog API Gateway",
    problem: "Microservice architectures had no unified layer for auth, rate limiting, and observability.",
    solution: "Built a lightweight, zero-dependency API gateway with JWT auth, circuit breakers, and structured logging.",
    stack: ["Node.js", "TypeScript", "Redis", "Prometheus"],
    image: "gateway",
    github: "https://github.com/binarytech001",
    metrics: ["1M+ req/day", "sub-2ms overhead", "99.99% uptime"],
    featured: false,
    accentColor: "#ff6600",
  },
];

const stackColors: Record<string, string> = {
  React: "#61dafb",
  "Next.js": "#fff",
  TypeScript: "#3178c6",
  "Node.js": "#68a063",
  PostgreSQL: "#336791",
  MongoDB: "#47a248",
  Redis: "#d82c20",
  Docker: "#2496ed",
  Stripe: "#635bff",
  WebSocket: "#ff6600",
  WebRTC: "#ff9900",
  "Socket.io": "#010101",
  Prometheus: "#e6522c",
};

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const iconMap: Record<string, string> = {
    analytics: "📊",
    commerce: "🛒",
    collab: "👥",
    gateway: "🔗",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      data-testid={`card-project-${project.id}`}
      className="group relative border border-white/8 rounded-sm overflow-hidden hover:border-white/15 transition-all duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative bg-[#0f1e3a] p-10 md:p-12 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="section-label">Featured Project</span>
              <span className="text-4xl opacity-20">{iconMap[project.image]}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold tracking-wider text-foreground/30 uppercase">The Problem</span>
                <p className="mt-1 text-sm text-foreground/60 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <span className="text-xs font-semibold tracking-wider text-foreground/30 uppercase">The Solution</span>
                <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 border border-white/10 text-foreground/50 rounded-sm"
                style={{ borderColor: `${stackColors[tech] || "#fff"}20`, color: stackColors[tech] ? `${stackColors[tech]}90` : undefined }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col justify-between p-10 bg-[#0d1a30]">
          <div>
            <span className="text-xs font-semibold tracking-wider text-foreground/30 uppercase">Impact Metrics</span>
            <div className="mt-4 space-y-3">
              {project.metrics?.map((metric, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#ff6600]" />
                  <span className="text-sm text-foreground/70 font-mono">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div
              className="w-full h-32 rounded-sm border border-white/5 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}08 0%, transparent 100%)` }}
            >
              <div className="text-5xl opacity-10">{iconMap[project.image]}</div>
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-github-${project.id}`}
                  className="flex items-center gap-2 text-xs font-medium text-foreground/50 hover:text-foreground transition-colors"
                >
                  <FaGithub size={14} />
                  Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-live-${project.id}`}
                  className="flex items-center gap-2 text-xs font-medium text-[#ff6600]/70 hover:text-[#ff6600] transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SecondaryProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-testid={`card-project-secondary-${project.id}`}
      className="group border border-white/8 p-6 rounded-sm hover:border-[#ff6600]/30 transition-all duration-300 hover-elevate"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">
              <FaGithub size={16} />
            </a>
          )}
          <ArrowUpRight size={16} className="text-[#ff6600]" />
        </div>
      </div>
      <p className="text-sm text-foreground/50 leading-relaxed mb-4">{project.solution}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="text-xs font-mono px-2 py-0.5 border border-white/8 text-foreground/40 rounded-sm">
            {tech}
          </span>
        ))}
      </div>
      {project.metrics && (
        <div className="mt-4 flex flex-wrap gap-3">
          {project.metrics.slice(0, 2).map((m, i) => (
            <span key={i} className="text-xs text-[#ff6600]/60 font-mono">{m}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">Selected Work</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl leading-tight">
            Projects built with{" "}
            <span className="font-serif italic text-[#ff6600]">intention</span>
          </h2>
        </motion.div>

        <div className="space-y-4 mb-20">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mb-10">
          <span className="section-label">More Projects</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondary.map((project) => (
              <SecondaryProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://github.com/binarytech001"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-all-projects"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground border-b border-white/20 hover:border-white/50 pb-0.5 transition-all duration-200"
          >
            <FaGithub size={14} />
            See all projects on GitHub
            <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
