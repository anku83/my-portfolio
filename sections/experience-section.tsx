"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { TiltCard } from "@/components/tilt-card";
import { experience } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { ensureGsapPlugins } from "@/lib/gsap";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

const TURBINE_BLADES = Array.from({ length: 24 }, (_, index) => ({
  angle: (360 / 24) * index,
  innerClass:
    index % 3 === 0
      ? "from-[rgba(255,255,255,0.22)] via-[rgba(110,118,135,0.62)] to-[rgba(14,14,17,0.98)]"
      : index % 2 === 0
        ? "from-[rgba(255,255,255,0.16)] via-[rgba(82,90,108,0.58)] to-[rgba(12,12,15,0.96)]"
        : "from-[rgba(255,255,255,0.12)] via-[rgba(70,78,96,0.54)] to-[rgba(10,10,13,0.95)]",
}));

function TimelineFanNode() {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const rotorRef = useRef<HTMLDivElement | null>(null);
  const spinRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    const rotor = rotorRef.current;
    if (!node || !rotor) return;

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.set([node, rotor], {
        force3D: true,
        willChange: "transform, opacity",
      });

      spinRef.current = gsap.to(rotor, {
        rotate: 360,
        duration: 0.34,
        ease: "none",
        repeat: -1,
      });
      spinRef.current.timeScale(4);

      const handleEnter = () => {
        if (!spinRef.current) return;

        gsap.to(spinRef.current, {
          timeScale: 0,
          duration: 0.7,
          ease: "power2.out",
          overwrite: true,
        });
        gsap.to(node, {
          scale: 1.05,
          boxShadow: "0 0 28px rgba(212,175,55,0.24)",
          duration: 0.25,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(rotor, {
          opacity: 1,
          duration: 0.25,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const handleLeave = () => {
        if (!spinRef.current) return;

        gsap.to(spinRef.current, {
          timeScale: 4,
          duration: 0.6,
          ease: "power2.in",
          overwrite: true,
        });
        gsap.to(node, {
          scale: 1,
          boxShadow: "0 0 22px rgba(212,175,55,0.18)",
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(rotor, {
          opacity: 0.88,
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
        });
      };

      node.addEventListener("pointerenter", handleEnter, { passive: true });
      node.addEventListener("pointerleave", handleLeave, { passive: true });

      return () => {
        node.removeEventListener("pointerenter", handleEnter);
        node.removeEventListener("pointerleave", handleLeave);
        if (spinRef.current) {
          gsap.killTweensOf(spinRef.current);
          spinRef.current.kill();
          spinRef.current = null;
        }
      };
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={nodeRef}
      className="absolute left-0 top-4 h-10 w-10 rounded-full border border-white/10 bg-[#121212] shadow-[0_0_22px_rgba(212,175,55,0.18)]"
      data-animate
      data-cursor="hover"
    >
      <div className="absolute inset-[6px] rounded-full border border-[rgba(255,255,255,0.06)] bg-[radial-gradient(circle,rgba(255,255,255,0.04),rgba(21,21,24,0)_70%)]" />
      <div className="absolute inset-[8px] rounded-full border border-[rgba(255,255,255,0.04)] bg-[radial-gradient(circle,rgba(24,26,34,0.96)_0%,rgba(12,13,18,0.98)_60%,rgba(7,7,10,1)_100%)] shadow-[inset_0_0_10px_rgba(255,255,255,0.04),inset_0_0_14px_rgba(0,0,0,0.45)]" />
      <div className="absolute inset-[8px] rounded-full bg-[conic-gradient(from_12deg,rgba(212,175,55,0.14),rgba(250,204,21,0.12),rgba(255,255,255,0.03),rgba(212,175,55,0.14))] opacity-70 blur-[1px]" />
      <div ref={rotorRef} className="absolute inset-[8px] opacity-[0.92] blur-[0.15px]">
        {TURBINE_BLADES.map((blade) => (
          <span
            key={blade.angle}
            className="absolute left-1/2 top-1/2 h-[10px] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full"
            style={{ transform: `translateX(-50%) translateY(-100%) rotate(${blade.angle}deg)` }}
          >
            <span
              className={`block h-full w-full skew-x-[-18deg] rounded-t-full bg-[linear-gradient(180deg,var(--tw-gradient-stops))] ${blade.innerClass} shadow-[0_0_2px_rgba(255,255,255,0.08)]`}
            />
          </span>
        ))}
        <span className="absolute inset-[3px] rounded-full border border-[rgba(255,255,255,0.03)] shadow-[inset_0_0_8px_rgba(0,0,0,0.55)]" />
        <span className="absolute inset-[4px] rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.08),rgba(255,255,255,0),rgba(212,175,55,0.1),rgba(255,255,255,0.08))] opacity-65" />
      </div>
      <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[radial-gradient(circle,rgba(250,250,250,0.92),rgba(124,132,150,0.7)_52%,rgba(28,28,34,0.98)_100%)] shadow-[0_0_6px_rgba(255,255,255,0.08)]" />
    </div>
  );
}

export function ExperienceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  useSceneReveal(ref);

  useLayoutEffect(() => {
    if (!lineRef.current) return;

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 78%",
            end: "bottom 30%",
            scrub: true
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="experience" className="section-frame">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Experience"
          title="A vertical timeline that unfolds like a professional story, not a checklist."
          copy="Each role is introduced with a glowing node and guided by a line that reveals itself while the reader moves through the page."
        />

        <div className="relative mt-16 grid gap-10 lg:pl-10">
          <div className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-white/10 lg:block" />
          <div
            ref={lineRef}
            className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px origin-top bg-white/10 lg:block"
          />

          {experience.map((item) => (
            <div key={item.title} className="grid gap-5 lg:grid-cols-[80px_1fr] lg:items-start">
              <div className="relative hidden lg:block">
                <TimelineFanNode />
              </div>
              <TiltCard
                className="glass-card glass-panel hover-glow rounded-[30px] p-7 shadow-glass"
                data-animate
                data-cursor="hover"
                maxTilt={7}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow">{item.subtitle}</p>
                    <h3 className="mt-3 font-display text-3xl text-[#EDEDED]">{item.title}</h3>
                  </div>
                  <span className="text-xs uppercase tracking-[0.26em] text-[#D4AF37]">{item.period}</span>
                </div>
                <div className="mt-7 grid gap-4">
                  {item.points.map((point) => (
                    <div key={point} className="rounded-[14px] border border-white/10 bg-[#121212] px-4 py-4 text-base leading-8 text-[#A1A1AA] transition duration-300 hover:border-[rgba(212,175,55,0.5)] hover:bg-[rgba(255,255,255,0.02)]">
                      {point}
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
