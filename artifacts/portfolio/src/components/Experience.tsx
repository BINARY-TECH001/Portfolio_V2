import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "2024",
    period: "2024 — Present",
    role: "Senior Full-Stack Engineer",
    company: "Freelance / Consulting",
    type: "Contract",
    impact: "Architected and shipped 6+ production applications for clients across fintech, logistics, and e-commerce. Reduced API latency by 60% through caching strategy overhauls.",
    highlights: [
      "Built real-time dashboards processing 50K+ events/day",
      "Led migration from monolith to microservices for a logistics startup",
      "Mentored 3 junior engineers across project delivery cycles",
    ],
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    color: "#ff6600",
  },
  {
    year: "2023",
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    company: "Remote Product Studio",
    type: "Full-time",
    impact: "Owned the entire frontend codebase for a SaaS platform serving 3,000+ daily active users. Shipped the mobile app (React Native) in 10 weeks from zero.",
    highlights: [
      "Rebuilt authentication system reducing login failures by 85%",
      "Shipped React Native app — App Store & Google Play in 10 weeks",
      "Implemented CI/CD pipelines cutting deployment time from 45min to 8min",
    ],
    stack: ["React", "React Native", "GraphQL", "Node.js", "MongoDB", "AWS"],
    color: "#ff6600",
  },
  {
    year: "2022",
    period: "2022 — 2023",
    role: "Frontend Engineer",
    company: "Startup (Seed Stage)",
    type: "Full-time",
    impact: "Core engineer on a B2B payments platform. Designed and built the core dashboard from scratch, achieving a 92% satisfaction score in user testing.",
    highlights: [
      "Built component library used across 4 product surfaces",
      "Optimized Web Vitals — LCP from 4.2s to 1.1s",
      "Integrated 3 payment processors (Stripe, Paystack, Flutterwave)",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Stripe"],
    color: "#ff6600",
  },
  {
    year: "2021",
    period: "2020 — 2022",
    role: "Junior Developer",
    company: "Digital Agency",
    type: "Full-time",
    impact: "First professional role. Shipped 12 client websites and learned the value of clean code, client communication, and delivering under pressure.",
    highlights: [
      "Built 12 production websites across diverse industries",
      "Introduced React to a previously vanilla JS codebase",
      "Reduced page load time by 40% on flagship client project",
    ],
    stack: ["JavaScript", "React", "CSS", "PHP", "MySQL", "WordPress"],
    color: "#ff6600",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const panels = document.querySelectorAll(".exp-panel");
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const active = experiences[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="section-label">Career Journey</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Built through{" "}
            <span className="font-serif italic text-[#ff6600]">real work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div
            ref={stickyRef}
            className="hidden lg:block sticky top-32"
          >
            <div className="space-y-1">
              {experiences.map((exp, i) => (
                <motion.button
                  key={exp.year}
                  onClick={() => {
                    document.querySelector(`.exp-panel-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="w-full text-left group"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div
                    className={`flex items-center gap-4 py-3 px-4 rounded-sm transition-all duration-300 ${
                      activeIndex === i
                        ? "bg-[#ff6600]/10 border-l-2 border-[#ff6600]"
                        : "border-l-2 border-transparent hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`text-2xl font-bold font-mono transition-colors duration-300 ${
                        activeIndex === i ? "text-[#ff6600]" : "text-foreground/20 group-hover:text-foreground/40"
                      }`}
                    >
                      {exp.year}
                    </span>
                    <div className="hidden xl:block">
                      <div
                        className={`text-xs font-medium transition-colors duration-300 ${
                          activeIndex === i ? "text-foreground/80" : "text-foreground/30"
                        }`}
                      >
                        {exp.role}
                      </div>
                      <div className={`text-xs transition-colors duration-300 ${activeIndex === i ? "text-[#ff6600]/70" : "text-foreground/20"}`}>
                        {exp.type}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 p-5 border border-white/8 rounded-sm"
            >
              <div className="text-xs font-semibold tracking-wider text-foreground/30 uppercase mb-3">
                Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-1 border border-white/10 text-foreground/50 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <div
                key={exp.year}
                className={`exp-panel exp-panel-${i} py-16 border-b border-white/5 last:border-0`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="text-xs font-mono text-[#ff6600] mb-2 tracking-wider">
                        {exp.period}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground/50 text-sm">{exp.company}</span>
                        <span className="text-foreground/20 text-xs">·</span>
                        <span className="text-xs font-medium px-2 py-0.5 border border-white/10 text-foreground/40 rounded-sm">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl font-bold font-mono text-[#ff6600]/20 lg:hidden">
                      {exp.year}
                    </div>
                  </div>

                  <p className="text-foreground/60 leading-relaxed mb-6 text-sm md:text-base">
                    {exp.impact}
                  </p>

                  <div className="space-y-2 mb-6">
                    {exp.highlights.map((h, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.1 + 0.2, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-1 h-1 rounded-full bg-[#ff6600] mt-2 shrink-0" />
                        <span className="text-sm text-foreground/55">{h}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 lg:hidden">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-1 border border-white/10 text-foreground/40 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
