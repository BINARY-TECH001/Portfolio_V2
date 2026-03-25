import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiRedis,
  SiDocker, SiGit, SiGithub, SiLinux, SiVite,
  SiPrisma, SiGraphql, SiFirebase
} from "react-icons/si";

interface Tech {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  category: "Frontend" | "Backend" | "Tools";
  color: string;
}

const technologies: Tech[] = [
  { name: "React", icon: SiReact, category: "Frontend", color: "#61dafb" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend", color: "#3178c6" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend", color: "#06b6d4" },
  { name: "Framer Motion", icon: SiFramer, category: "Frontend", color: "#ff6600" },
  { name: "Vite", icon: SiVite, category: "Frontend", color: "#646cff" },
  { name: "Node.js", icon: SiNodedotjs, category: "Backend", color: "#68a063" },
  { name: "Express", icon: SiExpress, category: "Backend", color: "#ffffff" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Backend", color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, category: "Backend", color: "#47a248" },
  { name: "Redis", icon: SiRedis, category: "Backend", color: "#d82c20" },
  { name: "GraphQL", icon: SiGraphql, category: "Backend", color: "#e10098" },
  { name: "Prisma", icon: SiPrisma, category: "Backend", color: "#2d3748" },
  { name: "Firebase", icon: SiFirebase, category: "Tools", color: "#ffca28" },
  { name: "Docker", icon: SiDocker, category: "Tools", color: "#2496ed" },
  { name: "Git", icon: SiGit, category: "Tools", color: "#f05032" },
  { name: "GitHub", icon: SiGithub, category: "Tools", color: "#ffffff" },
  { name: "Linux", icon: SiLinux, category: "Tools", color: "#fcc624" },
];

const categories = ["Frontend", "Backend", "Tools"] as const;

function TechIcon({ tech }: { tech: Tech }) {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <div
      className="relative flex flex-col items-center gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        data-testid={`icon-tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
        className="w-12 h-12 flex items-center justify-center border border-white/8 rounded-sm cursor-default"
        style={{
          background: hovered ? `${tech.color}12` : "transparent",
          borderColor: hovered ? `${tech.color}40` : undefined,
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        <Icon
          size={22}
          style={{ color: hovered ? tech.color : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
        />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.15 }}
        className="absolute -bottom-6 text-xs font-mono text-foreground/60 whitespace-nowrap pointer-events-none z-10"
        style={{ color: tech.color }}
      >
        {tech.name}
      </motion.span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="stack" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">Tools of Trade</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl leading-tight">
            The stack I{" "}
            <span className="font-serif italic text-[#ff6600]">trust</span>
          </h2>
          <p className="mt-4 text-foreground/50 max-w-lg leading-relaxed">
            Hover over any icon to see what it is. These aren't just tools I know — they're tools I've shipped production products with.
          </p>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category, catIndex) => {
            const techs = technologies.filter((t) => t.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/30">
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="flex flex-wrap gap-8 pl-2">
                  {techs.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: catIndex * 0.15 + i * 0.05 }}
                    >
                      <TechIcon tech={tech} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
