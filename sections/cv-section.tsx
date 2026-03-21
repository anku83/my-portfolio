"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/section-heading";
import { MagneticButton } from "@/components/magnetic-button";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function CVSection({ onPreviewCV }: { onPreviewCV: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="cv" className="section-frame">
      <div className="container-lux">
        <div className="rounded-[16px] border border-[#232326] bg-[#151518] p-8 shadow-ember sm:p-10 lg:p-12">
          <SectionHeading
            eyebrow="Curriculum Vitae"
            title="A high-end resume preview flow designed to feel native to the portfolio."
            copy="Preview the CV in an animated modal, then download either the local PDF preview or the original DOCX version."
          />
          <div className="mt-10 flex flex-wrap gap-4" data-animate>
            <MagneticButton onClick={onPreviewCV}>Preview CV</MagneticButton>
            <MagneticButton href="/cv/ankit-kumar-cv-preview.pdf" download className="bg-[#151518] text-[#FAFAFA] border border-[#232326] hover:bg-[#1A1A1D]">
              Download PDF
            </MagneticButton>
            <MagneticButton href="/cv/ankit-kumar-cv.docx" download className="bg-[#151518] text-[#FAFAFA] border border-[#232326] hover:bg-[#1A1A1D]">
              Download DOCX
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
