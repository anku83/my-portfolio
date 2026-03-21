"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapPlugins() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({
      nullTargetWarn: false,
    });
    registered = true;
  }

  return { gsap, ScrollTrigger };
}
