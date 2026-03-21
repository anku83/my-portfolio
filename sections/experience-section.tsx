"use client";

import { useLayoutEffect, useRef } from "react";
import { experience } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { ensureGsapPlugins } from "@/lib/gsap";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

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
            className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px origin-top bg-[#232326] lg:block"
          />

          {experience.map((item) => (
            <div key={item.title} className="grid gap-5 lg:grid-cols-[80px_1fr] lg:items-start">
              <div className="relative hidden lg:block">
                <div
                  className="absolute left-0 top-4 h-10 w-10 rounded-full border border-[#2E2E32] bg-[#151518]"
                  data-animate
                />
              </div>
              <div className="rounded-[30px] border border-white/10 bg-white/[0.05] p-7 shadow-glass" data-animate>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow">{item.subtitle}</p>
                    <h3 className="mt-3 font-display text-3xl text-[#FAFAFA]">{item.title}</h3>
                  </div>
                  <span className="text-xs uppercase tracking-[0.26em] text-[#E11D48]">{item.period}</span>
                </div>
                <div className="mt-7 grid gap-4">
                  {item.points.map((point) => (
                    <div key={point} className="rounded-[14px] border border-[#232326] bg-[#111113] px-4 py-4 text-base leading-8 text-[#A1A1AA]">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
