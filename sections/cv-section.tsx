"use client";

import { useRef } from "react";
import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { MagneticButton } from "@/components/magnetic-button";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function CVSection({ onPreviewCV }: { onPreviewCV: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="cv" className="section-frame">
      <div className="container-lux">
        <GlassCard className="p-8 shadow-ember sm:p-10 lg:p-12">
          <SectionHeading
            eyebrow="Curriculum Vitae"
            title="A high-end resume preview flow designed to feel native to the portfolio."
            copy="Preview the CV in an animated modal, then download either the local PDF preview or the original DOCX version."
          />
          <div className="mt-10 flex flex-wrap gap-4" data-animate>
            <MagneticButton onClick={onPreviewCV}>Preview CV</MagneticButton>
            <MagneticButton href="/cv/ankit-kumar-cv-preview.pdf" download className="bg-[#121212] text-[#EDEDED] border border-white/10 hover:bg-[rgba(255,255,255,0.02)]">
              Download PDF
            </MagneticButton>
            <MagneticButton href="/cv/ankit-kumar-cv.docx" download className="bg-[#121212] text-[#EDEDED] border border-white/10 hover:bg-[rgba(255,255,255,0.02)]">
              Download DOCX
            </MagneticButton>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
