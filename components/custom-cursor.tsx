"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const eyeLeftRef = useRef<HTMLSpanElement | null>(null);
  const eyeRightRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    const eyes = [eyeLeftRef.current, eyeRightRef.current].filter(Boolean) as HTMLSpanElement[];
    if (!cursor || !glow || eyes.length === 0) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.34, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.34, ease: "power3.out" });
    const glowXTo = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power3.out" });
    const glowYTo = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power3.out" });
    const scaleTo = gsap.quickTo(cursor, "scale", { duration: 0.25, ease: "power3.out" });
    const glowScaleTo = gsap.quickTo(glow, "scale", { duration: 0.35, ease: "power3.out" });
    const glowOpacityTo = gsap.quickTo(glow, "opacity", { duration: 0.25, ease: "power3.out" });

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      xTo(x);
      yTo(y);
      glowXTo(x);
      glowYTo(y);
    };

    const handleHoverState = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const hoveringInteractive = Boolean(target?.closest('[data-cursor="hover"]'));

      scaleTo(hoveringInteractive ? 1.14 : 1);
      glowScaleTo(hoveringInteractive ? 1.5 : 1);
      glowOpacityTo(hoveringInteractive ? 0.95 : 0.62);
    };

    const blink = () => {
      gsap.to(eyes, {
        scaleY: 0.18,
        transformOrigin: "center center",
        duration: 0.08,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        delay: 0
      });
    };

    const blinkTimer = window.setInterval(blink, 2600);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleHoverState);
    glowOpacityTo(0.62);

    return () => {
      window.clearInterval(blinkTimer);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleHoverState);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[79] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),rgba(255,255,255,0)_70%)] opacity-0 md:block"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div className="relative h-10 w-9 rounded-[14px] border border-[#2E2E32] bg-[linear-gradient(180deg,#151518,#111113)]">
          <div className="absolute inset-x-[5px] top-[5px] h-4 rounded-full border border-white/10 bg-black/25" />
          <div className="absolute left-1/2 top-[10px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#E11D48]" />
          <div className="absolute inset-x-0 top-[13px] flex justify-center gap-2">
            <span ref={eyeLeftRef} className="h-1.5 w-1 rounded-full bg-[rgba(250,250,250,0.92)]" />
            <span ref={eyeRightRef} className="h-1.5 w-1 rounded-full bg-[rgba(250,250,250,0.92)]" />
          </div>
          <div className="absolute inset-x-[7px] bottom-[7px] h-[2px] rounded-full bg-[#E11D48]" />
          <div className="absolute -left-[3px] top-3 h-2.5 w-1 rounded-full bg-[#E11D48]" />
          <div className="absolute -right-[3px] top-3 h-2.5 w-1 rounded-full bg-[#E11D48]" />
          <div className="absolute left-[8px] top-[-5px] h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
          <div className="absolute right-[8px] top-[-5px] h-1.5 w-1.5 rounded-full bg-[#E11D48]" />
          <div className="absolute left-[10px] bottom-[-6px] h-2.5 w-[2px] rounded-full bg-[#E11D48]" />
          <div className="absolute right-[10px] bottom-[-6px] h-2.5 w-[2px] rounded-full bg-[#E11D48]" />
        </div>
      </div>
    </>
  );
}
