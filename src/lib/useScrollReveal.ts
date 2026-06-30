"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export type RevealVariant = "fade-up" | "scale" | "clip";

interface RevealOptions {
  /** CSS selector for the elements to reveal (within the scoped container). */
  selector: string;
  variant?: RevealVariant;
  stagger?: number;
  /** When the trigger should start (ScrollTrigger start string). */
  start?: string;
  duration?: number;
}

/**
 * Scoped scroll-reveal. Returns a ref to attach to a container; all matching
 * children animate in on scroll. Under prefers-reduced-motion the elements are
 * simply made visible with no motion. Animates transform/opacity/clip-path only
 * (no layout thrash).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  selector,
  variant = "fade-up",
  stagger = 0.12,
  start = "top 85%",
  duration = 0.7,
}: RevealOptions) {
  const containerRef = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      if (!targets.length) return;

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, clearProps: "transform,clipPath" });
        return;
      }

      const fromVars: gsap.TweenVars =
        variant === "scale"
          ? { opacity: 0, scale: 0.92 }
          : variant === "clip"
            ? { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 20 }
            : { opacity: 0, y: 32 };

      const toVars: gsap.TweenVars =
        variant === "scale"
          ? { opacity: 1, scale: 1 }
          : variant === "clip"
            ? { opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0 }
            : { opacity: 1, y: 0 };

      gsap.fromTo(targets, fromVars, {
        ...toVars,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true, // reveal once; don't replay on scroll-back
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return containerRef;
}
