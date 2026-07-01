"use client";

import { createElement, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface ClipRevealProps {
  text: string;
  as?: Tag;
  className?: string;
  start?: string;
  duration?: number;
}

/**
 * Horizontal clip-path reveal — the text is masked behind
 * `clip-path: inset(0 100% 0 0)` and wipes open left-to-right to
 * `inset(0 0% 0 0)` when scrolled into view. A distinctly different entrance
 * from the homepage's word-by-word blur-in. Reduced motion → shown statically.
 */
export default function ClipReveal({
  text,
  as = "h2",
  className,
  start = "top 82%",
  duration = 0.8,
}: ClipRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { clipPath: "none", opacity: 1 });
        return;
      }
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    },
    { scope: ref, dependencies: [reduced] }
  );

  // Inline initial clip avoids any flash before useGSAP's layout effect runs.
  return createElement(
    as,
    {
      ref,
      className,
      style: { clipPath: reduced ? "none" : "inset(0 100% 0 0)" },
    },
    text
  );
}
