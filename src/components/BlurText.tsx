"use client";

import { createElement, Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface BlurTextProps {
  text: string;
  /** Element to render. Defaults to a <p>. */
  as?: Tag;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  /** Initial delay before the first word (useful to chain multiple lines). */
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Word-by-word "blur up" reveal. Each word animates from
 * { opacity: 0, blur(10px), y: 20 } → { opacity: 1, blur(0), y: 0 } with a small
 * stagger, triggered once when scrolled into view.
 *
 * Accessibility/SEO: the words are real text nodes inside the chosen element, so
 * the heading stays crawlable and reads as a single heading to screen readers.
 * useGSAP runs in a layout effect (before paint), so there's no flash of the
 * pre-animation state. Under prefers-reduced-motion the text is simply shown.
 */
export default function BlurText({
  text,
  as = "p",
  className,
  stagger = 0.08,
  delay = 0,
  start = "top 85%",
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!words || !words.length) return;

      if (reducedMotion) {
        gsap.set(words, { opacity: 1, filter: "blur(0px)", y: 0 });
        return;
      }

      gsap.fromTo(
        words,
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  const words = text.split(" ");

  return createElement(
    as,
    { ref, className },
    words.map((word, i) => (
      <Fragment key={`${word}-${i}`}>
        <span
          data-word
          style={{ display: "inline-block", willChange: "transform, filter" }}
        >
          {word}
        </span>
        {/* real space text node between words → natural line wrapping */}
        {i < words.length - 1 ? " " : ""}
      </Fragment>
    ))
  );
}
