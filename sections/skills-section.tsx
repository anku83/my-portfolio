"use client";

import { useRef } from "react";
import { TiltCard } from "@/components/tilt-card";
import { skills } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function SkillsSection() {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="skills" className="section-frame">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Skills"
          title="A premium grid of tools, languages, libraries, and concepts I work with."
          copy="Each card is treated like a capability module: stable foundations, visual depth, and a little energy on hover to keep the surface feeling alive."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <TiltCard
                key={skill.name}
                data-animate
                data-cursor="hover"
                maxTilt={10}
                className="group hover-glow relative overflow-hidden rounded-[16px] border border-[#232326] bg-[#151518] p-6 shadow-glass transition duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.accent} opacity-0 transition duration-500 group-hover:opacity-[0.16]`} />
                <div className="relative flex items-start justify-between gap-6">
                  <div className="rounded-2xl border border-[#232326] bg-[#111113] p-3 text-2xl text-[#E11D48] transition duration-300 group-hover:scale-110">
                    <Icon />
                  </div>
                  <span className="tag border border-white/10 text-[10px] uppercase tracking-[0.26em]">
                    {skill.category}
                  </span>
                </div>
                <h3 className="relative mt-7 font-display text-3xl text-[#FAFAFA]">{skill.name}</h3>
                <p className="relative mt-3 text-sm leading-7 text-[#A1A1AA]">
                  Crafted into my workflow for analysis, product execution, or interface development.
                </p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
