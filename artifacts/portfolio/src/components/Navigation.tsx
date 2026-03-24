import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/binarytech001", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/binary-tech001", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/binarytech001", label: "X (Twitter)" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    const el = navRef.current;
    gsap.set(el, { y: -60, opacity: 0 });
    const timer = setTimeout(() => {
      gsap.to(el, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const allSections = [...navLinks.map((l) => l.href.slice(1))];
      for (const id of [...allSections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 border-b border-white/5 backdrop-blur-xl"
            : "py-6"
        }`}
        style={scrolled ? { backgroundColor: "rgba(12,22,39,0.85)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="button-logo"
            className="group flex items-center gap-2 focus:outline-none"
          >
            <span className="text-sm font-mono font-bold tracking-widest text-[#ff6600] group-hover:opacity-75 transition-opacity">
              AMI
            </span>
            <span className="w-1 h-1 rounded-full bg-[#ff6600]" />
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                  className={`text-xs font-medium tracking-wider transition-colors duration-200 ${
                    activeSection === link.href.slice(1)
                      ? "text-[#ff6600]"
                      : "text-foreground/40 hover:text-foreground/80"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-${label.toLowerCase()}`}
                className="text-foreground/30 hover:text-foreground/70 transition-colors"
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              data-testid="link-hire-me"
              className="ml-2 px-5 py-2 border border-[#ff6600] text-[#ff6600] text-xs font-semibold tracking-wider hover:bg-[#ff6600] hover:text-white transition-all duration-200 rounded-sm"
            >
              HIRE ME
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
            className="md:hidden flex flex-col gap-1.5 group focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="w-6 h-px bg-foreground/60 block origin-center transition-colors"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="w-4 h-px bg-foreground/60 block"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="w-6 h-px bg-foreground/60 block origin-center"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ backgroundColor: "#0a1628" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  onClick={() => handleNavClick(link.href)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                  className="text-4xl font-bold text-foreground/80 hover:text-[#ff6600] transition-colors tracking-tight"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex items-center gap-6"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-mobile-social-${label.toLowerCase()}`}
                  className="text-foreground/30 hover:text-[#ff6600] transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
