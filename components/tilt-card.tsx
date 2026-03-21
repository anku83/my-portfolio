"use client";

import clsx from "clsx";
import { gsap } from "gsap";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";

type TiltCardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
  tilt?: boolean;
  maxTilt?: number;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function TiltCard<T extends ElementType = "div">({
  as,
  className,
  children,
  tilt = true,
  maxTilt = 9,
  ...props
}: TiltCardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const rotateXRef = useRef<gsap.QuickToFunc | null>(null);
  const rotateYRef = useRef<gsap.QuickToFunc | null>(null);
  const glowXRef = useRef<gsap.QuickToFunc | null>(null);
  const glowYRef = useRef<gsap.QuickToFunc | null>(null);
  const glowOpacityRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !tilt) return;

    rotateXRef.current = gsap.quickTo(node, "rotationX", { duration: 0.45, ease: "power3.out" });
    rotateYRef.current = gsap.quickTo(node, "rotationY", { duration: 0.45, ease: "power3.out" });

    if (glowRef.current) {
      glowXRef.current = gsap.quickTo(glowRef.current, "left", { duration: 0.45, ease: "power3.out", unit: "%" });
      glowYRef.current = gsap.quickTo(glowRef.current, "top", { duration: 0.45, ease: "power3.out", unit: "%" });
      glowOpacityRef.current = gsap.quickTo(glowRef.current, "opacity", { duration: 0.35, ease: "power3.out" });
    }
  }, [tilt]);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!tilt || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 1.6;

    rotateXRef.current?.(rotateX);
    rotateYRef.current?.(rotateY);
    glowXRef.current?.(px * 100);
    glowYRef.current?.(py * 100);
    glowOpacityRef.current?.(0.9);
  };

  const handleLeave = () => {
    if (!tilt) return;

    rotateXRef.current?.(0);
    rotateYRef.current?.(0);
    glowXRef.current?.(50);
    glowYRef.current?.(50);
    glowOpacityRef.current?.(0);
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={clsx("relative transform-gpu [transform-style:preserve-3d]", className)}
      {...props}
    >
      {tilt ? (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-[1] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),rgba(255,255,255,0)_72%)] opacity-0"
        />
      ) : null}
      <div className="relative z-[2]">{children}</div>
    </Component>
  );
}
