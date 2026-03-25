import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ArrowLeft, ExternalLink, ArrowRight, Send } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, stackColors } from "@/data/projects";

function MiniContactForm({ projectTitle }: { projectTitle: string }) {
  const [form, setForm] = useState({ name: "", email: "", message: `Hi, I'd like to discuss a project similar to ${projectTitle}.` });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-10 h-10 rounded-full border border-[#ff6600]/40 flex items-center justify-center mx-auto mb-4">
          <Send size={16} className="text-[#ff6600]" />
        </div>
        <p className="text-sm text-foreground/60">Message sent. I'll be in touch within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: "name", label: "Name", placeholder: "Your name", type: "text" },
          { id: "email", label: "Email", placeholder: "your@email.com", type: "email" },
        ].map(({ id, label, placeholder, type }) => (
          <div key={id}>
            <label className="text-xs font-semibold tracking-widest text-foreground/25 uppercase block mb-1.5">
              {label}
            </label>
            <motion.div
              animate={{ borderColor: focused === id ? "#ff6600" : "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.2 }}
              className="border rounded-sm"
            >
              <input
                type={type}
                value={form[id as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
                data-testid={`input-project-contact-${id}`}
                placeholder={placeholder}
                required
                className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none"
              />
            </motion.div>
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold tracking-widest text-foreground/25 uppercase block mb-1.5">
          Message
        </label>
        <motion.div
          animate={{ borderColor: focused === "message" ? "#ff6600" : "rgba(255,255,255,0.08)" }}
          transition={{ duration: 0.2 }}
          className="border rounded-sm"
        >
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            data-testid="input-project-contact-message"
            rows={3}
            className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none resize-none"
          />
        </motion.div>
      </div>
      <button
        type="submit"
        disabled={sending}
        data-testid="button-project-contact-submit"
        className="w-full flex items-center justify-center gap-2 py-3 bg-[#ff6600] text-white text-sm font-semibold tracking-wide hover:bg-[#e55a00] transition-colors rounded-sm disabled:opacity-60"
      >
        {sending ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Sending...
          </>
        ) : (
          <>Send Message <Send size={13} /></>
        )}
      </button>
    </form>
  );
}

/* Placeholder image block */
function ImagePlaceholder({
  label,
  aspect = "16/9",
  className = "",
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-sm overflow-hidden border border-white/8 flex items-center justify-center ${className}`}
      style={{
        aspectRatio: aspect,
        background: "linear-gradient(135deg, #0f1f38 0%, #0c1627 50%, #11192e 100%)",
      }}
    >
      <div className="text-center">
        <div
          className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center mx-auto mb-3"
          style={{ background: "rgba(255,102,0,0.06)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,102,0,0.4)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <span className="text-xs font-mono text-foreground/20">{label}</span>
      </div>
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/10" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/10" />
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!headerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current.querySelectorAll(".reveal-item"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }
    );
    return () => { tl.kill(); };
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#0c1627" }}>
        <p className="text-foreground/40 font-mono text-sm">Project not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-[#ff6600] text-sm font-medium"
        >
          ← Back to home
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen"
        style={{ backgroundColor: "#0c1627" }}
      >
        {/* ── Sticky top bar ── */}
        <div
          className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between"
          style={{ backgroundColor: "rgba(12,22,39,0.9)" }}
        >
          <button
            onClick={() => navigate("/")}
            data-testid="button-back-to-projects"
            className="flex items-center gap-2 text-xs font-medium text-foreground/40 hover:text-foreground/80 transition-colors"
          >
            <ArrowLeft size={14} /> Back to work
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/projects/${prevProject.slug}`)}
              data-testid="button-prev-project"
              className="text-foreground/30 hover:text-foreground/60 transition-colors text-xs font-mono"
            >
              ← Prev
            </button>
            <span className="text-foreground/15 text-xs">/</span>
            <button
              onClick={() => navigate(`/projects/${nextProject.slug}`)}
              data-testid="button-next-project"
              className="text-foreground/30 hover:text-foreground/60 transition-colors text-xs font-mono"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-24">
          {/* ── Hero ── */}
          <div ref={headerRef} className="max-w-7xl mx-auto pt-20 pb-16 border-b border-white/5">
            <div className="reveal-item flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-[#ff6600]/50">{project.index}</span>
              <div className="h-px flex-1 bg-white/5 max-w-12" />
              <span className="text-xs font-semibold tracking-widest text-foreground/25 uppercase">{project.category}</span>
              <span className="text-foreground/15 text-xs">·</span>
              <span className="text-xs font-mono text-foreground/25">{project.year}</span>
            </div>

            <h1
              className="reveal-item font-bold text-foreground leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {project.title}
            </h1>
            <p className="reveal-item text-xl text-[#ff6600]/80 font-medium mb-8">{project.tagline}</p>

            <div className="reveal-item flex flex-wrap items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-project-github"
                  className="flex items-center gap-2 px-6 py-2.5 border border-white/15 text-foreground/60 text-xs font-medium hover:border-white/30 hover:text-foreground transition-all rounded-sm"
                >
                  <FaGithub size={14} /> View Source
                </a>
              )}
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-project-live"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#ff6600] text-white text-xs font-semibold hover:bg-[#e55a00] transition-colors rounded-sm"
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="max-w-7xl mx-auto py-20">

            {/* Metrics bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-4 border border-white/8 rounded-sm p-8 mb-20"
            >
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold font-mono text-[#ff6600] mb-2">{m.value}</div>
                  <div className="text-xs text-foreground/40 leading-tight">{m.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Problem / Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              {[
                { label: "The Problem", body: project.problem },
                { label: "The Solution", body: project.solution },
              ].map(({ label, body }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-4">{label}</div>
                  <p className="text-foreground/65 leading-relaxed text-base">{body}</p>
                </motion.div>
              ))}
            </div>

            {/* Main image placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-20"
            >
              <ImagePlaceholder label="Main project screenshot / hero image" aspect="16/7" />
            </motion.div>

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-20"
            >
              <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-4">Overview</div>
              <p className="text-foreground/70 leading-relaxed text-lg font-light">{project.overview}</p>
            </motion.div>

            {/* What I Built */}
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
              >
                <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase">What I Built</div>
                <div className="flex-1 h-px bg-white/5" />
              </motion.div>

              <div className="space-y-0">
                {project.whatIDid.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 py-10 border-b border-white/5 last:border-0 group"
                  >
                    <div className="md:pt-1 shrink-0 w-8">
                      <span className="text-xs font-mono text-[#ff6600]/40 group-hover:text-[#ff6600]/70 transition-colors">
                        0{i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-white transition-colors">
                        {section.heading}
                      </h3>
                      <p className="text-foreground/55 leading-relaxed">{section.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Two smaller image placeholders */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20"
            >
              <ImagePlaceholder label="Feature screenshot 1" aspect="4/3" />
              <ImagePlaceholder label="Feature screenshot 2" aspect="4/3" />
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-20"
            >
              <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-4">The Hard Part</div>
              <p className="text-foreground/65 leading-relaxed text-base border-l-2 border-[#ff6600]/30 pl-5">
                {project.challenges}
              </p>
            </motion.div>

            {/* Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-6">Tech Stack</div>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-4 py-2 border border-white/8 rounded-sm"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: stackColors[tech] || "#888" }}
                    />
                    <span
                      className="text-sm font-mono"
                      style={{ color: `${stackColors[tech] || "#888"}cc` }}
                    >
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA + mini contact */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="border border-white/8 rounded-sm p-8 md:p-12 mb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-4">
                    Work With Me
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    Building something{" "}
                    <span className="font-serif italic text-[#ff6600]">similar?</span>
                  </h2>
                  <p className="text-foreground/50 text-sm leading-relaxed mb-6">
                    I've solved these kinds of problems before — from real-time data pipelines to multi-tenant SaaS. If your project has technical complexity that excites you, it excites me too.
                  </p>
                  <div className="space-y-3 text-sm">
                    {[
                      "Full-stack web & mobile applications",
                      "API design and backend architecture",
                      "Performance optimisation",
                      "Technical leadership & consulting",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-foreground/40">
                        <div className="w-1 h-1 rounded-full bg-[#ff6600]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <MiniContactForm projectTitle={project.title} />
                </div>
              </div>
            </motion.div>

            {/* Next project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pb-20"
            >
              <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-6">Next Project</div>
              <button
                onClick={() => navigate(`/projects/${nextProject.slug}`)}
                data-testid="button-next-project-card"
                className="group w-full flex items-center justify-between border border-white/8 rounded-sm p-6 md:p-8 hover:border-[#ff6600]/30 transition-all duration-300"
              >
                <div className="text-left">
                  <div className="text-xs font-mono text-[#ff6600]/50 mb-2">{nextProject.index}</div>
                  <div className="text-xl md:text-2xl font-bold text-foreground group-hover:text-white transition-colors">
                    {nextProject.title}
                  </div>
                  <div className="text-sm text-foreground/40 mt-1">{nextProject.tagline}</div>
                </div>
                <ArrowRight
                  size={24}
                  className="text-foreground/20 group-hover:text-[#ff6600] group-hover:translate-x-2 transition-all duration-300 shrink-0"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
