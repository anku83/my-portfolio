"use client";

import { MutableRefObject, useLayoutEffect } from "react";
import { ensureGsapPlugins } from "@/lib/gsap";

export function useSceneReveal(ref: MutableRefObject<HTMLElement | null>, selector = "[data-animate]") {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const { gsap } = ensureGsapPlugins();
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 48, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%"
            }
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, selector]);
}
