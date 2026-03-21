"use client";

import clsx from "clsx";
import { gsap } from "gsap";
import type { MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "cv" },
  { label: "Achievements", id: "achievements" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export function SiteNavbar({ name }: { name: string }) {
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const activeIdRef = useRef("home");
  const ids = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  useEffect(() => {
    const header = headerRef.current;
    const shell = shellRef.current;
    const navList = navListRef.current;
    const indicator = indicatorRef.current;
    if (!header || !shell || !navList || !indicator) return;

    let cleanup = () => {};

    const ctx = gsap.context(() => {
      const links = navItems
        .map((item) => linkRefs.current[item.id])
        .filter(Boolean) as HTMLAnchorElement[];

      const moveIndicator = (id: string, immediate = false) => {
        const target = linkRefs.current[id];
        if (!target) return;

        const listRect = navList.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const x = targetRect.left - listRect.left;
        const width = Math.max(targetRect.width, 1);

        gsap.to(indicator, {
          x,
          scaleX: width,
          opacity: 1,
          duration: immediate ? 0 : 0.28,
          ease: immediate ? "none" : "power3.out",
          overwrite: true,
        });
      };

      activeIdRef.current = activeSection;

      gsap.set(shell, {
        willChange: "transform, opacity",
        force3D: true,
      });
      gsap.set(links, {
        willChange: "transform, opacity",
        force3D: true,
      });
      gsap.set(indicator, {
        x: 0,
        scaleX: 1,
        opacity: 0,
        transformOrigin: "left center",
        willChange: "transform, opacity",
        force3D: true,
      });

      gsap.fromTo(
        shell,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          clearProps: "willChange",
        }
      );

      gsap.fromTo(
        links,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.045,
          ease: "power3.out",
          clearProps: "willChange",
          onComplete: () => moveIndicator(activeIdRef.current, true),
        }
      );

      const handleResize = () => moveIndicator(activeIdRef.current, true);
      const cleanups: Array<() => void> = [];

      links.forEach((link) => {
        const id = link.getAttribute("href")?.slice(1) ?? "";

        const handleEnter = () => {
          gsap.to(link, {
            y: -2,
            scale: link.getAttribute("aria-current") === "page" ? 1.05 : 1.04,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
          moveIndicator(id);
        };

        const handleLeave = () => {
          gsap.to(link, {
            y: 0,
            scale: link.getAttribute("aria-current") === "page" ? 1.02 : 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
          moveIndicator(activeIdRef.current);
        };

        const handlePress = () => {
          gsap.to(link, {
            scale: 0.98,
            duration: 0.1,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(indicator, {
            scaleY: 1.35,
            duration: 0.12,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const handleRelease = () => {
          gsap.to(link, {
            scale: link.getAttribute("aria-current") === "page" ? 1.02 : 1,
            duration: 0.18,
            ease: "power3.out",
            overwrite: true,
          });
          gsap.to(indicator, {
            scaleY: 1,
            duration: 0.18,
            ease: "power3.out",
            overwrite: true,
          });
        };

        link.addEventListener("pointerenter", handleEnter, { passive: true });
        link.addEventListener("pointerleave", handleLeave, { passive: true });
        link.addEventListener("pointerdown", handlePress, { passive: true });
        link.addEventListener("pointerup", handleRelease, { passive: true });
        link.addEventListener("pointercancel", handleRelease, { passive: true });

        cleanups.push(() => {
          link.removeEventListener("pointerenter", handleEnter);
          link.removeEventListener("pointerleave", handleLeave);
          link.removeEventListener("pointerdown", handlePress);
          link.removeEventListener("pointerup", handleRelease);
          link.removeEventListener("pointercancel", handleRelease);
        });
      });

      window.addEventListener("resize", handleResize, { passive: true });

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        cleanups.forEach((run) => run());
        gsap.killTweensOf([shell, indicator, ...links]);
      };
    }, header);

    return () => {
      cleanup();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    activeIdRef.current = activeSection;

    const indicator = indicatorRef.current;
    const navList = navListRef.current;
    if (!indicator || !navList) return;

    const links = navItems
      .map((item) => linkRefs.current[item.id])
      .filter(Boolean) as HTMLAnchorElement[];

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeSection}`;

      gsap.to(link, {
        y: 0,
        scale: isActive ? 1.02 : 1,
        opacity: 1,
        duration: isActive ? 0.26 : 0.2,
        ease: isActive ? "power3.out" : "power2.out",
        overwrite: true,
      });

      if (isActive) {
        gsap.fromTo(
          link,
          { y: 5, opacity: 0.78, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1.02,
            duration: 0.28,
            ease: "power3.out",
            overwrite: true,
          }
        );
      }
    });

    const activeLink = linkRefs.current[activeSection];
    if (!activeLink) return;

    const listRect = navList.getBoundingClientRect();
    const activeRect = activeLink.getBoundingClientRect();

    gsap.to(indicator, {
      x: activeRect.left - listRect.left,
      scaleX: Math.max(activeRect.width, 1),
      opacity: 1,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });
  }, [activeSection]);

  const handleNavigate = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    activeIdRef.current = id;

    const link = linkRefs.current[id];
    if (link) {
      gsap.fromTo(
        link,
        { y: 0, scale: 0.97 },
        {
          keyframes: [
            { y: 1, scale: 0.97, duration: 0.08, ease: "power2.out" },
            { y: -2, scale: 1.04, duration: 0.12, ease: "power2.out" },
            { y: 0, scale: 1.02, duration: 0.16, ease: "power3.out" },
          ],
          overwrite: true,
        }
      );
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-[75]">
      <div className="container-lux pt-4 sm:pt-5">
        <div
          ref={shellRef}
          className="flex items-center justify-between rounded-full border border-white/10 bg-[rgba(10,10,10,0.72)] px-4 py-3 backdrop-blur-[8px] sm:px-6"
        >
          <a
            href="#home"
            onClick={handleNavigate("home")}
            className="nav-logo text-sm font-bold uppercase tracking-[0.28em] text-[#EDEDED] sm:text-[0.95rem]"
            data-cursor="hover"
          >
            {name}
          </a>

          <nav aria-label="Primary">
            <ul ref={navListRef} className="relative flex items-center gap-1 sm:gap-2">
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="nav-indicator pointer-events-none absolute bottom-0 left-0 h-px w-px origin-left"
              />
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    ref={(node) => {
                      linkRefs.current[item.id] = node;
                    }}
                    href={`#${item.id}`}
                    onClick={handleNavigate(item.id)}
                    data-cursor="hover"
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={clsx(
                      "nav-link rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#A1A1AA] transition-colors duration-300 sm:px-4",
                      activeSection === item.id && "text-[#EDEDED]"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
