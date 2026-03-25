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
  const [, navigate] = useLocation();

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -12, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col h-full"
    >
      {/* Real image preview - Scrollable container for tall images */}
      <div className="flex-1 rounded-sm overflow-hidden relative group/pane border border-foreground/5 bg-black/40">
        <div className="w-full h-full overflow-y-auto custom-scrollbar-hide bg-background">
          <img
            src={project.visual}
            alt={project.title}
            className="w-full h-auto object-cover opacity-90 group-hover/pane:opacity-100 transition-all duration-700"
          />
        </div>

        {/* Overlay gradient - visible on hover to highlight CTA */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover/pane:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 translate-y-4 group-hover/pane:translate-y-0 opacity-0 group-hover/pane:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-[#ff6600] hover:text-white transition-colors"
                title="Visit Live Site"
              >
                <ArrowUpRight size={18} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                title="View Source on GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
          </div>
          <button
            onClick={() => navigate(`/projects/${project.slug}`)}
            className="w-full py-3 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-[#ff6600] hover:text-white transition-colors rounded-sm shadow-xl"
          >
            Explore Case Study
          </button>
        </div>
      </div>

      {/* Stack pills */}
      <div className="pt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border rounded-sm"
            style={{
              borderColor: stackColors[tech] === "#ffffff" ? "hsl(var(--foreground))" : `${stackColors[tech] || "#fff"}20`,
              color: stackColors[tech] === "#ffffff" ? "hsl(var(--foreground))" : `${stackColors[tech] || "#fff"}90`,
            }}
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="text-[10px] font-mono text-foreground/25">+{project.stack.length - 5}</span>
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
              className="flex items-center gap-2 text-xs font-medium text-foreground/40 hover:text-foreground/80 transition-colors border-b border-foreground/10 hover:border-foreground/30 pb-0.5 whitespace-nowrap"
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
          <div className="border-t border-border/40">
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
                className="group border-b border-border/40 cursor-pointer"
              >
                <div className="py-8 flex items-center gap-6 md:gap-10">

                  {/* Number */}
                  <span
                    className="text-4xl md:text-5xl font-bold font-mono shrink-0 transition-colors duration-300 select-none opacity-20 group-hover:opacity-100"
                    style={{ color: hoveredId === project.id ? "#ff6600" : "hsl(var(--foreground))" }}
                  >
                    {project.index}
                  </span>

                  {/* Title + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-foreground transition-colors duration-200">
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
                            borderColor: stackColors[tech] === "#ffffff" ? "hsl(var(--foreground))" : `${stackColors[tech] || "#fff"}20`,
                            color: stackColors[tech] === "#ffffff" ? "hsl(var(--foreground))" : `${stackColors[tech] || "#fff"}90`,
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
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Detail
                      </span>
                      <ArrowRight
                        size={18}
                        className="text-foreground/15 group-hover:text-[#ff6600] group-hover:translate-x-1.5 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: sticky hover preview */}
          <div className="hidden xl:block">
            <div className="sticky top-32 h-[420px] border border-foreground/10 rounded-sm p-5 overflow-hidden bg-foreground/2">
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
                      className="w-12 h-12 rounded-sm border border-border/40 flex items-center justify-center bg-[#ff6600]/5"
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
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50">
                Other Notable Work
              </span>
              <div className="flex-1 h-px bg-border/40" />
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
                  className="group flex flex-col justify-between p-5 border border-border/40 rounded-sm hover:border-[#ff6600]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <FaGithub size={16} className="text-foreground/40 group-hover:text-foreground/70 transition-colors" />
                      <ArrowUpRight size={14} className="text-foreground/30 group-hover:text-[#ff6600] transition-colors" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground transition-colors mb-2">
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
