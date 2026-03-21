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
  maxTilt = 14,
  ...props
}: TiltCardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const rotateXRef = useRef<gsap.QuickToFunc | null>(null);
  const rotateYRef = useRef<gsap.QuickToFunc | null>(null);
  const glowXRef = useRef<gsap.QuickToFunc | null>(null);
  const glowYRef = useRef<gsap.QuickToFunc | null>(null);
  const glowOpacityRef = useRef<gsap.QuickToFunc | null>(null);
  const contentXRef = useRef<gsap.QuickToFunc | null>(null);
  const contentYRef = useRef<gsap.QuickToFunc | null>(null);
  const contentZRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !tilt) return;

    const ctx = gsap.context(() => {
      gsap.set(node, {
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        force3D: true,
        willChange: "transform",
      });

      rotateXRef.current = gsap.quickTo(node, "rotateX", { duration: 0.22, ease: "power3.out" });
      rotateYRef.current = gsap.quickTo(node, "rotateY", { duration: 0.22, ease: "power3.out" });

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          force3D: true,
          willChange: "transform, opacity",
        });
        glowXRef.current = gsap.quickTo(glowRef.current, "x", { duration: 0.35, ease: "power3.out" });
        glowYRef.current = gsap.quickTo(glowRef.current, "y", { duration: 0.35, ease: "power3.out" });
        glowOpacityRef.current = gsap.quickTo(glowRef.current, "opacity", { duration: 0.22, ease: "power3.out" });
      }

      if (contentRef.current) {
        gsap.set(contentRef.current, {
          transformStyle: "preserve-3d",
          force3D: true,
          willChange: "transform",
          z: 0,
        });
        contentXRef.current = gsap.quickTo(contentRef.current, "x", { duration: 0.24, ease: "power3.out" });
        contentYRef.current = gsap.quickTo(contentRef.current, "y", { duration: 0.24, ease: "power3.out" });
        contentZRef.current = gsap.quickTo(contentRef.current, "z", { duration: 0.24, ease: "power3.out" });
      }
    }, node);

    return () => {
      ctx.revert();
      rotateXRef.current = null;
      rotateYRef.current = null;
      glowXRef.current = null;
      glowYRef.current = null;
      glowOpacityRef.current = null;
      contentXRef.current = null;
      contentYRef.current = null;
      contentZRef.current = null;
    };
  }, [tilt]);

  const handleEnter = () => {
    if (!tilt || !ref.current) return;

    gsap.to(ref.current, {
      scale: 1.04,
      duration: 0.22,
      ease: "power3.out",
      overwrite: true,
    });
    glowOpacityRef.current?.(0.82);
    contentZRef.current?.(22);
  };

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!tilt || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const normalizedX = (px - 0.5) * 2;
    const normalizedY = (py - 0.5) * 2;
    const rotateY = normalizedX * maxTilt;
    const rotateX = -normalizedY * maxTilt;

    rotateXRef.current?.(rotateX);
    rotateYRef.current?.(rotateY);
    glowXRef.current?.(normalizedX * rect.width * 0.32);
    glowYRef.current?.(normalizedY * rect.height * 0.32);
    glowOpacityRef.current?.(1);
    contentXRef.current?.(normalizedX * 14);
    contentYRef.current?.(normalizedY * 12);
    contentZRef.current?.(28);
  };

  const handleLeave = () => {
    if (!tilt || !ref.current) return;

    gsap.to(ref.current, {
      scale: 1,
      duration: 0.26,
      ease: "power3.out",
      overwrite: true,
    });
    rotateXRef.current?.(0);
    rotateYRef.current?.(0);
    glowXRef.current?.(0);
    glowYRef.current?.(0);
    glowOpacityRef.current?.(0);
    contentXRef.current?.(0);
    contentYRef.current?.(0);
    contentZRef.current?.(0);
  };

  return (
    <Component
      ref={ref}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={clsx("relative transform-gpu [transform-style:preserve-3d] motion-reduce:transform-none", className)}
      {...props}
    >
      {tilt ? (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-[1] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),rgba(225,29,72,0.05),rgba(255,255,255,0)_72%)] opacity-0"
        />
      ) : null}
      <div ref={contentRef} className="relative z-[2]">
        {children}
      </div>
    </Component>
  );
}
