"use client";

import clsx from "clsx";
import type { HTMLAttributes } from "react";
import { TiltCard } from "@/components/tilt-card";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  tilt?: boolean;
};

export function GlassCard({ className, tilt = true, children, ...props }: GlassCardProps) {
  return (
    <TiltCard
      className={clsx("glass-panel rounded-[28px] border border-white/10", className)}
      tilt={tilt}
      {...props}
    >
      {children}
    </TiltCard>
  );
}
