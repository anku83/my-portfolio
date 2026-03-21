"use client";

import { FiGithub, FiLinkedin } from "react-icons/fi";

export function SiteFooter({
  name,
  tagline,
  github,
  linkedin
}: {
  name: string;
  tagline: string;
  github: string;
  linkedin: string;
}) {
  return (
    <footer className="relative z-10 border-t border-[#232326] bg-[#0B0B0C]">
      <div className="container-lux flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-[#FAFAFA]">{name}</p>
          <p className="mt-2 text-sm text-[#A1A1AA]">{tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="footer-link inline-flex items-center gap-2 rounded-full border border-[#232326] px-4 py-2 text-sm text-[#A1A1AA] transition duration-300"
            data-cursor="hover"
          >
            <FiGithub className="footer-icon text-base" />
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="footer-link inline-flex items-center gap-2 rounded-full border border-[#232326] px-4 py-2 text-sm text-[#A1A1AA] transition duration-300"
            data-cursor="hover"
          >
            <FiLinkedin className="footer-icon text-base" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
