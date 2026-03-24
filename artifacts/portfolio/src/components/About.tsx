import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">About Me</span>
            <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-8" />

            <div className="sticky top-32 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                A developer who cares about{" "}
                <span className="font-serif italic text-[#ff6600]">craft</span>{" "}
                as much as code.
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "3+", l: "Years" },
                  { v: "20+", l: "Projects" },
                  { v: "10+", l: "Clients" },
                  { v: "∞", l: "Commits" },
                ].map(({ v, l }) => (
                  <motion.div
                    key={l}
                    whileHover={{ scale: 1.02 }}
                    className="border border-white/8 p-4 rounded-sm"
                  >
                    <div className="text-2xl font-bold font-mono text-[#ff6600] mb-1">{v}</div>
                    <div className="text-xs text-foreground/40 font-medium uppercase tracking-wider">{l}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-2 border border-white/8 rounded-sm p-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <span className="text-xs font-mono text-foreground/45">
                  Open to full-time roles & freelance work
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-8"
          >
            <div className="space-y-5 text-foreground/60 leading-relaxed">
              <p className="text-lg font-light">
                I'm <span className="text-foreground font-medium">Abdulrafiu Mubarak Ishola</span> — a full-stack engineer based in Nigeria, with a deep passion for building things that work beautifully and solve real problems.
              </p>
              <p>
                My work sits at the intersection of engineering precision and product thinking. I don't just write code — I think about architecture, user experience, business logic, and long-term maintainability. Everything I build, I build to last.
              </p>
              <p>
                I specialize in React ecosystems, Node.js backends, and scalable data layers. I've worked with startups from seed to Series A, led small engineering teams, and shipped products used by thousands daily.
              </p>
              <p>
                When I'm not building, I'm writing about what I've learned, contributing to open source, or thinking deeply about how to build better — which is really just another way of building.
              </p>
            </div>

            <div className="pt-4">
              <div className="text-xs font-semibold tracking-widest text-foreground/25 uppercase mb-4">
                Core Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Systems Thinking",
                  "Clean Architecture",
                  "Performance Obsessed",
                  "Product Minded",
                  "API Design",
                  "Team Leadership",
                  "Open Source",
                  "Type Safety",
                ].map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ borderColor: "#ff6600", color: "#ff6600" }}
                    className="text-xs font-medium px-3 py-1.5 border border-white/8 text-foreground/40 rounded-sm tracking-wide cursor-default transition-colors duration-200"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
