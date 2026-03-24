"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { intro, heroStats } from "@/lib/portfolio-data";
import { MagneticButton } from "@/components/magnetic-button";
import { GlassCard } from "@/components/glass-card";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

export function HeroSection({ onPreviewCV }: { onPreviewCV: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  const [profileSrc, setProfileSrc] = useState(intro.profileImage);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="home" className="section-frame min-h-screen pt-36 sm:pt-40">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10">
          <p className="eyebrow" data-animate>
            Cinematic Data Storytelling
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.92] text-[#EDEDED] sm:text-7xl lg:text-[6.4rem]" data-animate>
            {intro.name}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.24em] text-[#A1A1AA]" data-animate>
            <span>{intro.title}</span>
            <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
            <span>{intro.location}</span>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-[#A1A1AA] sm:text-xl" data-animate>
            {intro.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#A1A1AA]" data-animate>
            {intro.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-4" data-animate>
            <MagneticButton href="#projects">View Work</MagneticButton>
            <MagneticButton onClick={onPreviewCV} className="bg-[#121212] text-[#EDEDED] border border-white/10 hover:bg-[rgba(255,255,255,0.02)]">
              Preview CV
            </MagneticButton>
            <MagneticButton href="/cv/ankit-kumar-cv.docx" download className="bg-[#121212] text-[#EDEDED] border border-white/10 hover:bg-[rgba(255,255,255,0.02)]">
              Download CV
            </MagneticButton>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3" data-animate>
            {heroStats.map((item) => (
              <GlassCard key={item.label} className="rounded-[24px] px-5 py-5">
                <p className="text-3xl font-semibold text-[#EDEDED]">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-[#A1A1AA]">{item.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="relative z-10" data-animate>
          <GlassCard className="relative overflow-hidden rounded-[34px] p-5 shadow-ember sm:p-7">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
            <div className="hero-portrait-shell glass-card glass-panel relative rounded-[28px] p-4 sm:p-6">
              <div className="hero-portrait-glow absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[#D4AF37]/20 blur-3xl" />
              <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="hero-portrait-frame relative z-10 overflow-hidden rounded-[24px]">
                <div className="hero-portrait-ring" />
                <div className="hero-portrait-shimmer" />
                <div className="hero-portrait-overlay" />
                <Image
                  src={profileSrc}
                  alt="Portrait of Ankit Kumar"
                  width={720}
                  height={920}
                  priority
                  onError={() => setProfileSrc("/profile-placeholder.svg")}
                  className="hero-portrait relative z-10 aspect-[4/5] w-full rounded-[24px] object-cover object-[center_18%]"
                />
              </div>
              <div className="glass-card glass-panel relative z-10 mt-5 rounded-[20px] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.34em] text-[#A1A1AA]">Current focus</p>
                <p className="mt-3 text-lg leading-8 text-[#EDEDED]">
                  Building stronger instincts in analytics, machine learning, and product-minded front-end development.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
