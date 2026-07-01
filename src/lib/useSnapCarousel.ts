"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which child of a horizontal snap-scroll container is currently in
 * view — used to drive the mobile carousel dot indicators. Attach `containerRef`
 * to the scroll container; `activeIndex` reflects the most-visible child.
 */
export function useSnapCarousel<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(container.children) as HTMLElement[];
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return { containerRef, activeIndex };
}
