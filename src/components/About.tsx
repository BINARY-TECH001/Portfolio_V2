import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgColRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const stats = [
    { v: "5+", l: "Years Experience" },
    { v: "20+", l: "Projects Shipped" },
    { v: "10+", l: "Happy Clients" },
    { v: "∞", l: "Commits" },
  ];

  const strengths = [
    "Systems Thinking",
    "Clean Architecture",
    "Performance Obsessed",
    "Product Minded",
    "API Design",
    "Team Leadership",
    "Open Source",
    "Type Safety",
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label">About Me</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3" />
        </motion.div>

        {/* Main grid: images left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 xl:gap-24 items-start">

          {/* ── Left: two stacked images ── */}
          <motion.div
            ref={imgColRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:flex flex-col items-start gap-4"
          >
            {/* Image 1 — tall portrait, offset right */}
            <motion.div
              style={{ y: imgY1 }}
              className="relative self-end w-[75%] aspect-[4/5] rounded-sm overflow-hidden border border-border/40"
            >
              {/* Placeholder photo area — replace src attr with real photo */}
              <img
                src="/assets/me1.JPG"
                alt="Abdulrafiu Mubarak Ishola"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />

              {/* Orange accent line */}
              <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-[#ff6600]/40" />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 border border-border/40 rounded-sm px-3 py-2 bg-background/80 backdrop-blur-md">
                <div className="text-xs font-mono text-[#ff6600]">Full-Stack Engineer</div>
                <div className="text-xs text-foreground/30 mt-0.5">Ibadan, Nigeria · GMT+1</div>
              </div>
            </motion.div>

            {/* Image 2 — shorter landscape, offset left */}
            <motion.div
              style={{ y: imgY2 }}
              className="relative self-start w-[65%] aspect-[4/3] rounded-sm overflow-hidden border border-border/40 -mt-8"
            >
              <img
                src="/assets/binary5.JPG"
                alt="Candid shot"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />

              {/* Year badge */}
              <div className="absolute top-4 right-4 text-3xl font-bold font-mono opacity-20 text-foreground mix-blend-difference select-none leading-none">
                '24
              </div>
            </motion.div>

            {/* Decorative dot grid */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
          </motion.div>

          {/* ── Right: content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug mb-6">
                A developer who cares about{" "}
                <span className="font-serif italic text-[#ff6600]">craft</span>{" "}
                as much as code.
              </h2>
              <div className="space-y-4 text-foreground/55 leading-relaxed">
                <p className="text-base">
                  I'm <span className="text-foreground font-medium">Abdulrafiu Mubarak Ishola</span> — a full-stack engineer based in Nigeria with a deep passion for building things that work beautifully and solve real problems.
                </p>
                <p>
                  My work sits at the intersection of engineering precision and product thinking. I don't just write code — I think about architecture, user experience, business logic, and long-term maintainability. Everything I build, I build to last.
                </p>
                <p>
                  I specialize in React ecosystems, Node.js backends, and scalable data layers. I've worked with startups from seed to Series A, led small engineering teams, and shipped products used by thousands daily.
                </p>
              </div>
            </div>

            {/* Stats — inline row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(({ v, l }, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="border border-border/40 p-4 rounded-sm text-center"
                >
                  <div className="text-2xl font-bold font-mono text-[#ff6600] mb-1">{v}</div>
                  <div className="text-xs text-foreground/35 font-medium tracking-wide">{l}</div>
                </motion.div>
              ))}
            </div>

            {/* Availability */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 border border-border/40 rounded-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <span className="text-xs font-mono text-foreground/45">
                  Open to full-time roles &amp; freelance
                </span>
              </div>
              
              <div className="flex items-center gap-4 sm:ml-auto">
                <a
                  href="/assets/ABDULRAFIU MUBARAK - CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground transition-colors font-mono"
                >
                  <Download size={13} /> Download CV
                </a>
                <span className="w-px h-3 bg-border/40 hidden sm:block" />
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-testid="link-about-contact"
                  className="text-xs text-[#ff6600]/60 hover:text-[#ff6600] transition-colors font-mono"
                >
                  Let's talk →
                </a>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-4">
                Core Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {strengths.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ borderColor: "rgba(255,102,0,0.5)", color: "rgba(255,102,0,0.8)" }}
                    className="text-xs font-medium px-3 py-1.5 border border-border/40 text-foreground/40 rounded-sm tracking-wide cursor-default transition-colors duration-200"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Mobile image row (only visible on small screens) */}
            <div className="flex gap-4 lg:hidden">
              <div className="flex-1 aspect-[4/5] rounded-sm overflow-hidden border border-border/40">
                <img src="/assets/me1.JPG" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="w-1/3 aspect-[3/4] rounded-sm overflow-hidden border border-border/40 self-end">
                <img src="/assets/binary2.JPG" className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
