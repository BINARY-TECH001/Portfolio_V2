import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, stackColors } from "@/data/projects";

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

/* ─── Hover preview panel ─── */
function PreviewPane({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -12, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col h-full"
    >
      {/* Mock preview visual */}
      <div
        className="flex-1 rounded-sm overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #0f1f38, #0c1627, #101830)" }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Orange glow */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 70% 30%, rgba(255,102,0,0.08), transparent 70%)" }}
        />
        {/* Floating UI mock */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <div className="w-2 h-2 rounded-full bg-green-400/60" />
              <div className="flex-1 h-5 bg-white/5 rounded-sm ml-2 max-w-[120px]" />
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-white/5 rounded-sm w-3/4" />
              <div className="h-2 bg-white/5 rounded-sm w-1/2" />
              <div className="h-2 bg-[#ff6600]/20 rounded-sm w-2/3 mt-3" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="border border-white/8 rounded-sm p-2.5 text-center">
                <div className="text-sm font-bold font-mono text-[#ff6600]">{m.value}</div>
                <div className="text-[9px] text-foreground/30 mt-0.5 leading-tight">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stack pills */}
      <div className="pt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2 py-0.5 border rounded-sm"
            style={{
              borderColor: `${stackColors[tech] || "#fff"}20`,
              color: `${stackColors[tech] || "#fff"}70`,
            }}
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="text-xs font-mono text-foreground/25">+{project.stack.length - 5}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [, navigate] = useLocation();

  const hoveredProject = projects.find((p) => p.id === hoveredId) ?? null;

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* ── Section heading ── */}
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

        {/* ── Featured projects — editorial numbered list + hover preview ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 mb-28">

          {/* Left: numbered list */}
          <div className="border-t border-white/8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/projects/${project.slug}`)}
                data-testid={`card-project-${project.id}`}
                className="group border-b border-white/8 cursor-pointer"
              >
                <div className="py-8 flex items-center gap-6 md:gap-10">

                  {/* Number */}
                  <span
                    className="text-4xl md:text-5xl font-bold font-mono shrink-0 transition-colors duration-300 select-none"
                    style={{ color: hoveredId === project.id ? "#ff6600" : "rgba(255,255,255,0.06)" }}
                  >
                    {project.index}
                  </span>

                  {/* Title + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-200">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-foreground/25 hidden sm:block">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/45 group-hover:text-foreground/60 transition-colors duration-200 line-clamp-1">
                      {project.tagline}
                    </p>

                    {/* Tags — slide in on hover */}
                    <div
                      className="flex flex-wrap gap-1.5 mt-3 overflow-hidden transition-all duration-300"
                      style={{ maxHeight: hoveredId === project.id ? "40px" : "0px", opacity: hoveredId === project.id ? 1 : 0 }}
                    >
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2 py-0.5 border rounded-sm"
                          style={{
                            borderColor: `${stackColors[tech] || "#fff"}20`,
                            color: `${stackColors[tech] || "#fff"}60`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Year + arrow */}
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className="text-xs font-mono text-foreground/25">{project.year}</span>
                    <ArrowRight
                      size={18}
                      className="text-foreground/15 group-hover:text-[#ff6600] group-hover:translate-x-1.5 transition-all duration-200"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: sticky hover preview */}
          <div className="hidden xl:block">
            <div className="sticky top-32 h-[420px] border border-white/8 rounded-sm p-5 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.01)" }}
            >
              <AnimatePresence mode="wait">
                {hoveredProject ? (
                  <PreviewPane key={hoveredProject.id} project={hoveredProject} />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center gap-3"
                  >
                    <div
                      className="w-12 h-12 rounded-sm border border-white/8 flex items-center justify-center"
                      style={{ background: "rgba(255,102,0,0.05)" }}
                    >
                      <ArrowRight size={16} className="text-[#ff6600]/30" />
                    </div>
                    <p className="text-xs font-mono text-foreground/20 text-center">
                      Hover a project<br />to preview
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Secondary projects ── */}
        <div>
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
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
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
