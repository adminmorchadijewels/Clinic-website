"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's prefers-reduced-motion setting. Returns `false` during SSR
 * and on first client paint, then updates after mount — so animations are only
 * ever skipped when we're certain the user opted out.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
