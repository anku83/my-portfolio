"use client";

import { useRef } from "react";
import { TiltCard } from "@/components/tilt-card";
import { education } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function EducationSection() {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="education" className="section-frame">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Education"
          title="Academic milestones framed with the same care as the project work."
          copy="The education scene keeps the tone clean and elevated: glass surfaces, warm highlights, and enough breathing room to make each milestone feel deliberate."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {education.map((item) => (
            <TiltCard
              key={item.school}
              className="glass-card glass-panel hover-glow rounded-[16px] p-7 shadow-glass transition duration-300"
              data-animate
              data-cursor="hover"
              maxTilt={8}
            >
              <p className="eyebrow">{item.period}</p>
              <h3 className="mt-4 font-display text-3xl text-[#EDEDED]">{item.school}</h3>
              <p className="mt-4 text-base leading-8 text-[#A1A1AA]">{item.detail}</p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <span className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">{item.metric}</span>
                <span className="text-sm text-[#A1A1AA]">{item.location}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
