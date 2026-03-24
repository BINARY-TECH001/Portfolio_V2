import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "Years Building" },
  { value: "20+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients" },
  { value: "∞", label: "Lines of Code" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-stat", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Who I Am</span>
              <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-8" />
            </motion.div>

            <motion.div
              ref={textRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-snug text-foreground">
                A developer who cares about
                {" "}<span className="font-serif italic text-[#ff6600]">craft</span>
                {" "}as much as code.
              </h2>

              <p className="text-foreground/60 leading-relaxed">
                I'm Abdulrafiu Mubarak Ishola — a full-stack software engineer based in Nigeria. 
                I specialize in building products that are as performant as they are beautiful, 
                bridging the gap between engineering precision and product thinking.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                My work spans React ecosystems, Node.js backends, and everything in between. 
                I'm not just here to write code — I'm here to solve problems that actually matter, 
                with the kind of attention to detail that separates good from remarkable.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                When I'm not building, I'm thinking about how to build better. That's just who I am.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {["Problem Solver", "Clean Code Advocate", "Product Thinker", "Open Source"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 border border-white/10 text-foreground/50 rounded-sm tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="about-stat border border-white/8 p-6 rounded-sm hover-elevate"
                >
                  <div className="text-4xl font-bold text-[#ff6600] font-mono mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-foreground/50 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border border-white/8 p-6 rounded-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-foreground/50">Currently open to opportunities</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Looking for roles where I can own problems end-to-end and build 
                things that reach real people at scale.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
