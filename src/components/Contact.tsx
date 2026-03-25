import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/binary-tech001", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/binarytech001", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/binarytech001", label: "X" },
];

emailjs.init("Cwl_ctWeYj4U7KcGz");

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll(".reveal-word");
      if (!words?.length) return;
      gsap.from(words, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        y: 80,
        opacity: 0,
        rotationX: -40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        transformOrigin: "top center",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (form.message.trim().length < 10) errs.message = "Too short";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);

    try {
      console.log("Sending email with params:", {
        title: "Portfolio Contact",
        name: form.name,
        email: form.email,
        message: form.message,
      });

      const result = await emailjs.send(
        "service_p502n5q",
        "template_jid26yo",
        {
          title: "Portfolio Contact",
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "Cwl_ctWeYj4U7KcGz"
      );

      console.log("EmailJS Result:", result.status, result.text);

      if (result.text === "OK") {
        toast.success("Message sent successfully!");
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const heading = ["Let's", "build", "something", "meaningful."];

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: "#ff6600", filter: "blur(200px)", opacity: 0.018 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="section-label">Get In Touch</span>
          <div className="w-8 h-0.5 bg-[#ff6600] mt-3" />
        </motion.div>

        <div
          ref={headingRef}
          className="mb-16 overflow-hidden"
          style={{ perspective: "800px" }}
        >
          <h2
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {heading.map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-4">
                {i === 2 ? (
                  <span className="font-serif italic text-[#ff6600]">{word}</span>
                ) : (
                  <span className="text-foreground">{word}</span>
                )}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <div className="border border-[#ff6600]/20 rounded-sm p-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-[#ff6600]/40 flex items-center justify-center mx-auto mb-5">
                    <Send size={20} className="text-[#ff6600]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message sent.</h3>
                  <p className="text-sm text-foreground/50 mb-6">
                    I'll reply within 24 hours. Looking forward to connecting.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="title" value="Portfolio Contact" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "Name", placeholder: "Your name", type: "text" },
                    { id: "email", label: "Email", placeholder: "your@email.com", type: "email" },
                  ].map(({ id, label, placeholder, type }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        className="text-xs font-semibold tracking-wider text-foreground/25 uppercase block mb-2"
                      >
                        {label}
                      </label>
                      <motion.div
                        animate={{
                          borderColor:
                            focused === id
                              ? "#ff6600"
                              : errors[id as keyof typeof errors]
                              ? "#ef4444"
                              : "hsl(var(--border))",
                        }}
                        transition={{ duration: 0.2 }}
                        className="border overflow-hidden rounded-sm"
                      >
                          <input
                            id={id}
                            name={id}
                            type={type}
                            value={form[id as keyof typeof form]}
                            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                            onFocus={() => setFocused(id)}
                            onBlur={() => setFocused(null)}
                            data-testid={`input-contact-${id}`}
                            placeholder={placeholder}
                            className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none"
                          />
                      </motion.div>
                      {errors[id as keyof typeof errors] && (
                        <p className="text-xs text-red-400/80 mt-1">{errors[id as keyof typeof errors]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-semibold tracking-wider text-foreground/25 uppercase block mb-2">
                    Message
                  </label>
                  <motion.div
                    animate={{
                      borderColor:
                        focused === "message"
                          ? "#ff6600"
                          : errors.message
                          ? "#ef4444"
                          : "hsl(var(--border))",
                    }}
                    transition={{ duration: 0.2 }}
                    className="border overflow-hidden rounded-sm"
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      data-testid="input-contact-message"
                      placeholder="Tell me what you're building or thinking about..."
                      rows={5}
                      className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none resize-none"
                    />
                  </motion.div>
                  {errors.message && <p className="text-xs text-red-400/80 mt-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  data-testid="button-contact-submit"
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#ff6600] text-white text-sm font-semibold tracking-wide hover:bg-[#e55a00] transition-colors duration-200 rounded-sm disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>Send Message <Send size={14} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-10"
          >
            <div className="space-y-5">
              {[
                { label: "Email", value: "mubarakbdlrf@gmail.com", href: "mailto:mubarakbdlrf@gmail.com" },
                { label: "Location", value: "Nigeria · GMT+1", href: null },
                { label: "Response", value: "Within 24 hours", href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="border-b border-border/40 pb-5">
                  <div className="text-xs font-semibold tracking-wider text-foreground/50 uppercase mb-1">
                    {label}
                  </div>
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

            <div>
              <div className="text-xs font-semibold tracking-wider text-foreground/25 uppercase mb-4">
                Socials
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-social-footer-${label.toLowerCase()}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 border border-border/40 flex items-center justify-center text-foreground/60 hover:text-[#ff6600] hover:border-[#ff6600]/30 transition-all rounded-sm"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs text-foreground/25 leading-relaxed font-mono">
                Open to full-time roles, freelance projects, and technical consulting.
                If you're building something ambitious, I'd love to be part of it.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-24 pt-10 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs text-foreground/25 font-mono">
              Designed &amp; built by{" "}
              <span className="font-serif italic text-foreground/40">
                Abdulrafiu Mubarak Ishola
              </span>
            </p>
            <p className="text-xs text-foreground/15 mt-0.5">
              {new Date().getFullYear()} · React · TypeScript · GSAP · Framer Motion
            </p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-footer-bottom-${label.toLowerCase()}`}
                className="text-foreground/20 hover:text-[#ff6600] transition-colors"
                aria-label={label}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
