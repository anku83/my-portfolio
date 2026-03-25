"use client";

import { useRef } from "react";
import { achievements } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function AchievementsSection() {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="achievements" className="section-frame">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Achievements"
          title="Certifications and wins presented as luminous badges of momentum."
          copy="This section is intentionally compact and collectible, giving each certificate and recognition the feeling of a premium credential."
        />

        <div className="mt-14 flex flex-wrap gap-4">
          {achievements.map((achievement) => (
            <a
              key={achievement.label}
              href={achievement.href}
              target={achievement.href ? "_blank" : undefined}
              rel={achievement.href ? "noreferrer" : undefined}
              className="tag hover-glow border border-white/10 bg-[#121212] px-5 py-4 text-sm uppercase tracking-[0.18em] text-[#EDEDED] shadow-none transition duration-300"
              data-animate
              data-cursor="hover"
            >
              {achievement.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
