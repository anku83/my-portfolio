"use client";

import { useRef } from "react";
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
            <div
              key={item.school}
              className="hover-glow rounded-[16px] border border-[#232326] bg-[#151518] p-7 shadow-glass transition duration-300"
              data-animate
              data-cursor="hover"
            >
              <p className="eyebrow">{item.period}</p>
              <h3 className="mt-4 font-display text-3xl text-[#FAFAFA]">{item.school}</h3>
              <p className="mt-4 text-base leading-8 text-[#A1A1AA]">{item.detail}</p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <span className="text-sm uppercase tracking-[0.2em] text-[#E11D48]">{item.metric}</span>
                <span className="text-sm text-[#A1A1AA]">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
