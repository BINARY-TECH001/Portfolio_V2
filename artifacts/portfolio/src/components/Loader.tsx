import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    const chars = nameRef.current?.querySelectorAll(".loader-char") ?? [];
    const line = lineRef.current;
    const overlay = overlayRef.current;

    gsap.set(chars, { y: 80, opacity: 0, rotationX: -90 });
    gsap.set(line, { scaleX: 0, opacity: 0 });
    gsap.set(overlay, { opacity: 1 });

    tl.to(line, {
      scaleX: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut",
      transformOrigin: "left center",
    })
      .to(
        chars,
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.2"
      )
      .to({}, { duration: 0.4 })
      .to(chars, {
        y: -80,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.in",
      })
      .to(
        line,
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.3,
          transformOrigin: "right center",
        },
        "-=0.3"
      )
      .to(
        overlay,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.1"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const name = "Abdulrafiu Mubarak Ishola";
  const words = name.split(" ");

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0a1628" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div
          ref={lineRef}
          className="w-12 h-0.5"
          style={{ backgroundColor: "#ff6600" }}
        />
        <div
          ref={nameRef}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 perspective-[600px]"
          style={{ perspective: "600px" }}
        >
          {words.map((word, wi) => (
            <div key={wi} className="flex overflow-hidden">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="loader-char inline-block text-3xl md:text-5xl font-bold tracking-tight text-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {char}
                </span>
              ))}
              {wi < words.length - 1 && (
                <span
                  className="loader-char inline-block text-3xl md:text-5xl font-bold text-[#ff6600] ml-1"
                >
                  {" "}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="loader-char text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Portfolio
          </span>
          <span className="loader-char text-[#ff6600] text-xs">·</span>
          <span
            className="loader-char text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            2025
          </span>
        </div>
      </div>
    </div>
  );
}
