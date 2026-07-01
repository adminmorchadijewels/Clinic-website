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
  /** Element to render. Defaults to a <h1>. */
  as?: Tag;
  className?: string;
  /** Initial delay before the reveal starts. */
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Clip-path horizontal reveal — the heading wipes in left→right from
 * { clipPath: inset(0 100% 0 0) } → { inset(0 0% 0 0) }. Used on non-home page
 * headings to stay distinct from the homepage word-by-word BlurText, while
 * sharing the same GSAP/useGSAP animation stack.
 *
 * Accessibility/SEO: the text is a single real text node inside the chosen
 * heading element, so it stays crawlable and reads as one heading. useGSAP runs
 * before paint, so there's no flash of the pre-animation state. Under
 * prefers-reduced-motion the text is simply shown, fully revealed.
 */
export default function ClipReveal({
  text,
  as = "h1",
  className,
  delay = 0,
  start = "top 85%",
}: ClipRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { opacity: 1, clipPath: "inset(0 0% 0 0)" });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return createElement(
    as,
    { ref, className, style: { willChange: "clip-path" } },
    text
  );
}
