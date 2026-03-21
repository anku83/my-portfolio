"use client";

import { MutableRefObject, useEffect } from "react";

export function useRevealObserver(ref: MutableRefObject<HTMLElement | null>, selector = "[data-animate]") {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * 70}ms`);
      item.dataset.revealed = "false";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.dataset.revealed = "true";
          observer.unobserve(target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [ref, selector]);
}
