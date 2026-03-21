"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { CustomCursor } from "@/components/custom-cursor";
import { ParticleCanvas } from "@/components/particle-canvas";
import { ScrollProgress } from "@/components/scroll-progress";
import { CVModal } from "@/components/cv-modal";
import { HeroSection } from "@/sections/hero-section";
import { AboutSection } from "@/sections/about-section";
import { SkillsSection } from "@/sections/skills-section";
import { ProjectsSection } from "@/sections/projects-section";
import { ExperienceSection } from "@/sections/experience-section";
import { EducationSection } from "@/sections/education-section";
import { AchievementsSection } from "@/sections/achievements-section";
import { CVSection } from "@/sections/cv-section";
import { ContactSection } from "@/sections/contact-section";

export function PortfolioExperience() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  useLenis();

  return (
    <main className="page-shell">
      <ParticleCanvas />
      <ScrollProgress />
      <CustomCursor />

      <div className="relative z-10">
        <HeroSection onPreviewCV={() => setIsCVOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <CVSection onPreviewCV={() => setIsCVOpen(true)} />
        <ContactSection />
      </div>

      <CVModal open={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </main>
  );
}
