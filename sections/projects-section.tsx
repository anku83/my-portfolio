"use client";

import Image from "next/image";
import { useRef } from "react";
import { TiltCard } from "@/components/tilt-card";
import { projects } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { MagneticButton } from "@/components/magnetic-button";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function ProjectsSection() {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="projects" className="section-frame">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Projects"
          title="Every project is presented as a layered showcase instead of a flat list."
          copy="The goal here is depth: strong visual framing, restrained motion, and enough structure to help the work feel considered before a single repository link is clicked."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <TiltCard
              as="article"
              key={project.title}
              data-animate
              data-cursor="hover"
              maxTilt={7}
              className="glass-card glass-panel group hover-glow relative overflow-hidden rounded-[16px] p-7 shadow-glass transition duration-300"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_55%)] opacity-70" />
              <div className="relative">
                <div className="project-image relative mb-7 overflow-hidden rounded-[22px] border border-white/10">
                  <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(11,11,12,0.16),transparent_44%)]" />
                  <Image
                    src="/project-placeholder.svg"
                    alt={`${project.title} placeholder preview`}
                    width={1200}
                    height={720}
                    className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="tag border border-white/10 text-[10px] uppercase tracking-[0.24em]">
                    0{index + 1}
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-[#A1A1AA]">{project.period}</span>
                </div>
                <h3 className="mt-8 font-display text-4xl leading-tight text-[#EDEDED]">{project.title}</h3>
                <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[#D4AF37]">{project.highlight}</p>
                <p className="mt-6 text-base leading-8 text-[#A1A1AA]">{project.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="tag border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.18em]">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-10">
                  <MagneticButton href={project.href} className="text-[11px]">
                    View GitHub
                  </MagneticButton>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
