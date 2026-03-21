"use client";

import { MutableRefObject } from "react";
import { useRevealObserver } from "@/hooks/use-reveal-observer";

export function useSceneReveal(ref: MutableRefObject<HTMLElement | null>, selector = "[data-animate]") {
  useRevealObserver(ref, selector);
}
