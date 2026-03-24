import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { Send, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/binarytech001", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/binary-tech001", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/binarytech001", label: "X" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.querySelectorAll(".word") ?? [], {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10) errs.message = "Message too short";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  const words = ["Let's", "build", "something", "meaningful."];

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Get In Touch</span>
              <div className="w-8 h-0.5 bg-[#ff6600] mt-3 mb-10" />
            </motion.div>

            <div ref={headingRef} className="mb-8 overflow-hidden">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {words.map((word, i) => (
                  <span key={i} className="word inline-block mr-3">
                    {i === 2 ? (
                      <span className="font-serif italic text-[#ff6600]">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-foreground/50 leading-relaxed mb-10 max-w-md">
                Whether you have a project, a collaboration idea, or just want to say hello — 
                my inbox is always open. I reply within 24 hours.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { label: "Email", value: "mubarak@binarytech.dev", href: "mailto:mubarak@binarytech.dev" },
                  { label: "Location", value: "Nigeria (GMT+1)", href: null },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex items-baseline gap-4">
                    <span className="text-xs font-semibold tracking-wider text-foreground/30 uppercase w-20 shrink-0">{label}</span>
                    {href ? (
                      <a href={href} className="text-sm text-foreground/60 hover:text-[#ff6600] transition-colors font-mono">
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground/60 font-mono">{value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-footer-social-${label.toLowerCase()}`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-foreground/40 hover:text-[#ff6600] hover:border-[#ff6600]/40 transition-colors rounded-sm"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <div className="border border-[#ff6600]/30 rounded-sm p-10 text-center">
                <div className="text-4xl mb-4 text-[#ff6600]">
                  <ArrowUpRight size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Message sent!</h3>
                <p className="text-foreground/50 text-sm">
                  I'll get back to you within 24 hours. Looking forward to connecting.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 text-xs text-foreground/40 hover:text-foreground transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-white/8 rounded-sm p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs font-semibold tracking-wider text-foreground/30 uppercase block mb-2">
                      Name
                    </label>
                    <motion.div
                      animate={{ borderColor: focused === "name" ? "#ff6600" : errors.name ? "#ef4444" : "rgba(255,255,255,0.08)" }}
                      transition={{ duration: 0.2 }}
                      className="border rounded-sm overflow-hidden"
                    >
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        data-testid="input-contact-name"
                        placeholder="Your name"
                        className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none"
                      />
                    </motion.div>
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold tracking-wider text-foreground/30 uppercase block mb-2">
                      Email
                    </label>
                    <motion.div
                      animate={{ borderColor: focused === "email" ? "#ff6600" : errors.email ? "#ef4444" : "rgba(255,255,255,0.08)" }}
                      transition={{ duration: 0.2 }}
                      className="border rounded-sm overflow-hidden"
                    >
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        data-testid="input-contact-email"
                        placeholder="your@email.com"
                        className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none"
                      />
                    </motion.div>
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-semibold tracking-wider text-foreground/30 uppercase block mb-2">
                    Message
                  </label>
                  <motion.div
                    animate={{ borderColor: focused === "message" ? "#ff6600" : errors.message ? "#ef4444" : "rgba(255,255,255,0.08)" }}
                    transition={{ duration: 0.2 }}
                    className="border rounded-sm overflow-hidden"
                  >
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      data-testid="input-contact-message"
                      placeholder="Tell me what you're building or thinking about..."
                      rows={5}
                      className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none resize-none"
                    />
                  </motion.div>
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  data-testid="button-contact-submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#ff6600] text-white text-sm font-semibold tracking-wide hover:bg-[#e55a00] transition-colors duration-200 rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
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
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs text-foreground/30 font-mono">
              Designed & built by{" "}
              <span className="font-serif italic text-foreground/50">Abdulrafiu Mubarak Ishola</span>
            </p>
            <p className="text-xs text-foreground/20 mt-1">
              {new Date().getFullYear()} · Built with React + TypeScript + GSAP
            </p>
          </div>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-footer-bottom-${label.toLowerCase()}`}
                className="text-foreground/25 hover:text-[#ff6600] transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
