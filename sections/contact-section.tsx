"use client";

import { useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { intro } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/section-heading";
import { useSceneReveal } from "@/hooks/use-scene-reveal";

const contacts = [
  { label: "Email", value: intro.email, href: `mailto:${intro.email}`, icon: FiMail },
  { label: "Phone", value: intro.phone, href: `tel:${intro.phone.replace(/\s+/g, "")}`, icon: FiPhone },
  { label: "LinkedIn", value: "ankit-kumar-s25", href: intro.linkedin, icon: FiLinkedin },
  { label: "GitHub", value: "anku83", href: intro.github, icon: FiGithub }
];

export function ContactSection() {
  const ref = useRef<HTMLElement | null>(null);
  useSceneReveal(ref);

  return (
    <section ref={ref} id="contact" className="section-frame pb-28 sm:pb-32">
      <div className="container-lux">
        <div className="rounded-[16px] border border-[#232326] bg-[#151518] p-8 shadow-ember sm:p-10 lg:p-12">
          <SectionHeading
            eyebrow="Contact"
            title="The final scene is simple: if the work resonates, let’s connect."
            copy="Open to opportunities where data, product thinking, and modern development intersect."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {contacts.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group hover-glow rounded-[16px] border border-[#232326] bg-[#111113] px-6 py-6 transition duration-300 hover:bg-[#151518]"
                  data-animate
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl border border-[#232326] bg-[#151518] p-3 text-xl text-[#E11D48] transition duration-300">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-[#A1A1AA]">{item.label}</p>
                      <p className="mt-2 text-base text-[#FAFAFA]">{item.value}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
