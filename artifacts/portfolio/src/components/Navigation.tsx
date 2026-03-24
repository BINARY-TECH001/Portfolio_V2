import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
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
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
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
            ? "py-3 border-b border-white/5 backdrop-blur-xl bg-[#0c1629]/80"
            : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div ref={logoRef}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-testid="button-logo"
              className="group flex items-center gap-2 focus:outline-none"
            >
              <span className="text-sm font-mono font-bold tracking-widest text-[#ff6600] group-hover:opacity-80 transition-opacity">
                AMI
              </span>
              <span className="w-1 h-1 rounded-full bg-[#ff6600]" />
            </button>
          </div>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                  className={`nav-link ${activeSection === link.href.slice(1) ? "active text-foreground" : ""}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-foreground/50 hover:text-[#ff6600] transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              data-testid="button-cta-nav"
              className="ml-2 px-5 py-2 text-xs font-semibold tracking-widest uppercase border border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-white transition-all duration-300 rounded-sm"
            >
              Hire Me
            </button>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none z-[60] relative"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-foreground"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-4 h-0.5 bg-[#ff6600]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-foreground"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0a1020] flex flex-col"
          >
            <div className="flex flex-col justify-center h-full px-10 pt-24 pb-12">
              <nav className="flex flex-col gap-2 mb-16">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.5, ease: "easeOut" }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                      className="group flex items-center gap-4 text-4xl font-bold text-foreground/80 hover:text-white transition-colors duration-200 py-2"
                    >
                      <span className="text-xs font-mono text-[#ff6600] opacity-60 group-hover:opacity-100 transition-opacity">
                        0{i + 1}
                      </span>
                      {link.label}
                    </button>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center gap-6"
              >
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/50 hover:text-[#ff6600] transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
