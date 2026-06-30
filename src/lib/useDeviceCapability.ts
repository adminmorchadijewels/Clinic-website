"use client";

import { useEffect, useState } from "react";

export type Capability = "full" | "lite" | "fallback";

/**
 * Decides how much of the 3D hero to render:
 *  - "full":     WebGL + decent hardware → Canvas with postprocessing
 *  - "lite":     WebGL but mid/low hardware → Canvas, effects off
 *  - "fallback": no WebGL / very weak device / save-data → static SVG
 *
 * Returns "fallback" until mounted so SSR never ships a Canvas, avoiding
 * hydration mismatch and giving a fast first paint.
 */
export function useDeviceCapability(): { capability: Capability; ready: boolean } {
  const [capability, setCapability] = useState<Capability>("fallback");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const decide = (): Capability => {
      // WebGL availability.
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!gl) return "fallback";
      } catch {
        return "fallback";
      }

      // Respect Save-Data and obviously weak devices.
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean; effectiveType?: string };
      };
      if (nav.connection?.saveData) return "fallback";

      const cores = nav.hardwareConcurrency ?? 4;
      const mem = nav.deviceMemory ?? 4;
      const slowNet =
        nav.connection?.effectiveType === "2g" ||
        nav.connection?.effectiveType === "slow-2g";

      if (slowNet || cores <= 2 || mem <= 1) return "fallback";
      if (cores <= 4 || mem <= 4) return "lite";
      return "full";
    };

    setCapability(decide());
    setReady(true);
  }, []);

  return { capability, ready };
}
