import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const roles = ["Software Engineer", "Product Builder", "Full-Stack Developer"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
        transformOrigin: "left center",
        delay: 0.2,
      });
    });

    let currentRole = 0;
    const rotateRole = () => {
      if (!roleRef.current) return;
      gsap.to(roleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
          currentRole = (currentRole + 1) % roles.length;
          if (roleRef.current) roleRef.current.textContent = roles[currentRole];
          gsap.to(roleRef.current, { opacity: 1, y: 0, duration: 0.4 });
        },
      });
    };
    const interval = setInterval(rotateRole, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "#ff6600", filter: "blur(120px)" }}
        />
        <div
          className="absolute -left-20 bottom-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "#ff6600", filter: "blur(80px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div ref={lineRef} className="w-16 h-0.5 bg-[#ff6600] mb-8" />
            <div className="flex items-center gap-3">
              <span className="section-label">Portfolio</span>
              <span className="text-foreground/20 text-xs">•</span>
              <span className="text-xs text-foreground/40 font-mono">Available for work</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-3"
          >
            Abdulrafiu<br />
            <span className="text-foreground/70">Mubarak</span><br />
            <span className="text-foreground/50 text-3xl md:text-4xl lg:text-5xl">Ishola</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <span className="text-sm font-mono text-foreground/40">—</span>
            <span
              ref={roleRef}
              className="text-lg md:text-xl font-light text-[#ff6600]"
            >
              {roles[0]}
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-lg mb-12 font-light"
          >
            I build things that matter — clean, performant, and thoughtfully crafted software that solves real problems. From pixel-perfect UIs to scalable backends.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToProjects}
              data-testid="button-hero-view-work"
              className="group flex items-center gap-2 px-8 py-3.5 bg-[#ff6600] text-white text-sm font-semibold tracking-wide hover:bg-[#e55a00] transition-all duration-300 rounded-sm"
            >
              View My Work
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <a
              href="https://github.com/binarytech001"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-hero-github"
              className="group flex items-center gap-2 px-8 py-3.5 border border-white/20 text-foreground/70 text-sm font-medium hover:border-white/40 hover:text-foreground transition-all duration-300 rounded-sm"
            >
              <FaGithub size={16} />
              GitHub
            </a>
          </motion.div>
        </motion.div>

        <div className="hidden lg:flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-80 h-80 border border-white/5 rounded-sm">
              <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
                <div className="w-full space-y-3 font-mono text-xs">
                  <div className="flex gap-2">
                    <span className="text-[#ff6600]">const</span>
                    <span className="text-foreground/70">engineer</span>
                    <span className="text-foreground/40">=</span>
                    <span className="text-foreground/40">{"{"}</span>
                  </div>
                  <div className="pl-4 space-y-1.5 text-foreground/50">
                    <div><span className="text-foreground/70">name</span><span className="text-foreground/30">: </span><span className="text-green-400/70">"Abdulrafiu"</span><span className="text-foreground/30">,</span></div>
                    <div><span className="text-foreground/70">role</span><span className="text-foreground/30">: </span><span className="text-green-400/70">"Full-Stack Dev"</span><span className="text-foreground/30">,</span></div>
                    <div><span className="text-foreground/70">focus</span><span className="text-foreground/30">: </span><span className="text-green-400/70">"Impact"</span><span className="text-foreground/30">,</span></div>
                    <div><span className="text-foreground/70">status</span><span className="text-foreground/30">: </span><span className="text-[#ff6600]/80">"available"</span><span className="text-foreground/30">,</span></div>
                  </div>
                  <div><span className="text-foreground/40">{"}"}</span></div>
                  <div className="flex items-center gap-1 text-foreground/30 mt-2">
                    <span>&gt;</span>
                    <span className="text-foreground/50">ready to ship</span>
                    <span className="cursor-blink text-[#ff6600]">_</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-[#ff6600]" />
              <div className="absolute -top-px -right-px w-4 h-4 border-t border-r border-[#ff6600]" />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-[#ff6600]" />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-[#ff6600]" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -bottom-8 -right-8 flex flex-col items-end gap-1"
            >
              <span className="text-xs font-mono text-foreground/30">Nigeria-based</span>
              <span className="text-xs font-mono text-foreground/20">GMT+1</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToProjects}
        data-testid="button-scroll-down"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 hover:text-foreground/60 transition-colors duration-200"
      >
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
