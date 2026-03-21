"use client";

import { useRef } from "react";
import { aboutBullets } from "@/lib/portfolio-data";
import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function AboutSection() {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="about" className="section-frame">
      <div className="container-lux">
        <SectionHeading
          eyebrow="About"
          title="I like building the bridge between numbers, insight, and interface."
          copy="The work that excites me most sits in the overlap of analytical thinking and thoughtful execution, where a dashboard can influence decisions and a product surface can make complexity feel simple."
        />

        <GlassCard className="mt-12 rounded-[34px] p-8 transition-transform duration-200 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div data-animate>
              <p className="eyebrow">Who I Am</p>
              <h3 className="mt-4 font-display text-3xl text-[#FAFAFA] sm:text-4xl">
                Analytical by instinct, visual by practice, always learning by building.
              </h3>
            </div>
            <div className="space-y-4">
              {aboutBullets.map((bullet) => (
                <div key={bullet} className="rounded-[22px] border border-white/10 bg-white/[0.03] px-5 py-5" data-animate>
                  <p className="text-base leading-8 text-[#A1A1AA]">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
