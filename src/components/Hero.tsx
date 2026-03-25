import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const roles = ["Software Engineer", "Product Builder", "Full-Stack Developer", "Mobile App Developer"];

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1,
        ease: "power3.inOut",
        transformOrigin: "left center",
        delay: 0.1,
      });
    });

    let currentRole = 0;
    const rotateRole = () => {
      if (!roleRef.current) return;
      gsap.to(roleRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          currentRole = (currentRole + 1) % roles.length;
          if (roleRef.current) roleRef.current.textContent = roles[currentRole];
          gsap.fromTo(roleRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
        },
      });
    };
    const interval = setInterval(rotateRole, 2800);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Portrait Background */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-end pointer-events-none overflow-hidden">
          <img 
            src="/assets/binary2-nobg.png" 
            alt="Mubarak" 
            className="w-full max-w-[95vw] md:max-w-3xl lg:max-w-6xl xl:max-w-7xl h-auto max-h-[90vh] object-contain object-bottom opacity-[0.16] dark:opacity-10 mix-blend-luminosity grayscale"
          />
        </div>

        {/* Color overlay to fade it beautifully into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

        <div
          className="absolute right-[-10%] top-1/3 w-[700px] h-[700px] rounded-full"
          style={{ background: "#ff6600", filter: "blur(160px)", opacity: 0.03 }}
        />
        <div className="absolute left-0 top-0 w-full h-full opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[3fr_1.2fr] gap-12 items-end"
        >
          <div>
            <motion.div variants={item} className="flex items-center gap-3 mb-10">
              <div ref={lineRef} className="w-12 h-px bg-[#ff6600]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/30">
                Portfolio · {currentYear}
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-foreground/30 font-mono">Available</span>
              </div>
            </motion.div>

            <div className="overflow-visible mb-2">
              <motion.h1
                variants={item}
                className="font-bold leading-[0.95] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
              >
                Abdulrafiu
              </motion.h1>
            </div>
            <div className="overflow-visible mb-2">
              <motion.h1
                variants={item}
                className="font-bold leading-[0.95] tracking-tight text-foreground/40"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
              >
                Mubarak
              </motion.h1>
            </div>
            <div className="overflow-visible mb-10">
              <motion.h1
                variants={item}
                className="font-bold leading-[0.95] tracking-tight text-foreground/20"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
              >
                Ishola
              </motion.h1>
            </div>

            <motion.div variants={item} className="flex items-center gap-3 mb-10">
              <span className="text-foreground/30 font-mono">—</span>
              <span
                ref={roleRef}
                className="text-lg md:text-2xl font-light text-[#ff6600]"
              >
                {roles[0]}
              </span>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToAbout}
                data-testid="button-hero-view-work"
                className="group flex items-center gap-3 px-8 py-3.5 bg-[#ff6600] text-white text-sm font-semibold tracking-wide hover:bg-[#e55a00] transition-all duration-300 rounded-sm"
              >
                Explore Work
                <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </button>
              <a
                href="https://github.com/binary-tech001"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-hero-github"
                className="flex items-center gap-2 px-8 py-3.5 border border-border/60 text-foreground/80 text-sm font-medium hover:border-foreground/30 hover:text-foreground transition-all duration-300 rounded-sm"
              >
                <FaGithub size={15} />
                GitHub
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="hidden lg:flex flex-col justify-end gap-6 pb-4"
          >
            <div className="p-5 border border-border/40 rounded-sm">
              <div className="text-xs font-mono text-foreground/50 mb-3 tracking-wider">Current Stack</div>
              <div className="space-y-1.5 font-mono text-xs">
                {[
                  { color: "#61dafb", text: "React, NextJs, React Native + TypeScript" },
                  { color: "#68a063", text: "Node.js / Express" },
                  { color: "#336791", text: "PostgreSQL / Redis" },
                  { color: "#ff6600", text: "AWS / Docker" },
                ].map(({ color, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    <span className="text-foreground/50">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 border border-border/40 rounded-sm">
              <div className="text-xs font-mono text-foreground/50 mb-3 tracking-wider">At a glance</div>
              <div className="space-y-2">
                {[
                  { v: "5+", l: "Years experience" },
                  { v: "20+", l: "Projects shipped" },
                  { v: "10+", l: "Satisfied clients" },
                ].map(({ v, l }) => (
                  <div key={l} className="flex items-baseline gap-2">
                    <span className="text-lg font-bold font-mono text-[#ff6600]">{v}</span>
                    <span className="text-xs text-foreground/35">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={scrollToAbout}
        data-testid="button-scroll-cue"
        className="absolute bottom-10 right-12 flex items-center gap-2 text-foreground/25 hover:text-foreground/50 transition-colors text-xs font-mono tracking-widest rotate-90"
      >
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          →
        </motion.span>
        scroll
      </motion.button>
    </section>
  );
}
