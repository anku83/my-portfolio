"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

export function MagneticButton({
  href,
  children,
  className,
  onClick,
  download
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  download?: boolean;
}) {
  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const node = event.currentTarget;
    const bounds = node.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    node.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0) scale(1.02)`;
  };

  const reset = (event: React.MouseEvent<HTMLElement>) => {
    const node = event.currentTarget;
    node.style.transform = "translate3d(0,0,0) scale(1)";
  };

  const shared = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: clsx(
      "group btn-primary relative inline-flex items-center justify-center overflow-hidden rounded-[12px] border border-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[rgba(225,29,72,0.2)]",
      className
    ),
    "data-cursor": "hover"
  } as const;

  if (href) {
    const useAnchor = download || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    return useAnchor ? (
      <a href={href} target={download ? undefined : "_blank"} rel="noreferrer" download={download} {...shared}>
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)] opacity-0 transition group-hover:opacity-100" />
        <span className="relative z-10">{children}</span>
      </a>
    ) : (
      <Link href={href} {...shared}>
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)] opacity-0 transition group-hover:opacity-100" />
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} {...shared}>
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)] opacity-0 transition group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
