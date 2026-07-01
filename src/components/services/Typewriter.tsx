"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface TypewriterProps {
  text: string;
  className?: string;
  /** Milliseconds per character. */
  speed?: number;
}

/**
 * Lightweight typewriter reveal (no library). Characters appear one-by-one at a
 * fast pace when the element first scrolls into view, with a blinking caret
 * while typing. The full text is exposed to assistive tech via aria-label so
 * screen readers read it once, whole. Under prefers-reduced-motion the text is
 * shown instantly with no caret.
 */
export default function Typewriter({ text, className, speed = 55 }: TypewriterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // Kick off once the eyebrow is scrolled into view.
  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, text.length]);

  // Advance one character per tick while typing.
  useEffect(() => {
    if (!started || reduced || count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [started, count, text.length, speed, reduced]);

  const done = reduced || count >= text.length;

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!done && (
        <span
          aria-hidden="true"
          className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-current align-baseline"
        />
      )}
    </span>
  );
}
