"use client";

import { useEffect } from "react";
import { CV_FILE_PATH } from "@/lib/cv";

const CV_PREVIEW_PATH = "/cv/Specialised%20CV%20Template%20Ankit%20org%20(2).pdf";

export function CVModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-8">
      <button className="absolute inset-0 bg-black/70" aria-label="Close CV preview" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[16px] border border-white/10 bg-[#121212] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 sm:px-8">
          <div>
            <p className="eyebrow">Resume</p>
            <h3 className="mt-2 font-display text-2xl text-[#EDEDED]">Preview CV</h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CV_FILE_PATH}
              download
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#EDEDED] transition hover:border-[rgba(212,175,55,0.5)] hover:bg-[rgba(255,255,255,0.02)]"
              data-cursor="hover"
            >
              Download CV
            </a>
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#A1A1AA] transition hover:border-[rgba(212,175,55,0.5)] hover:text-[#FACC15]"
              data-cursor="hover"
            >
              Close
            </button>
          </div>
        </div>
        <div className="min-h-[70vh] bg-black/20 p-3 sm:p-4">
          <iframe title="Ankit Kumar CV Preview" src={CV_PREVIEW_PATH} className="h-[70vh] w-full rounded-[24px] border border-white/10 bg-white" />
        </div>
      </div>
    </div>
  );
}
