"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight ambient particle field for the hero — soft, slow-drifting teal
 * "motes of dust" rendered with the plain Canvas 2D API. Deliberately NOT
 * Three.js/WebGL: no GPU context to lose, negligible cost, safe everywhere
 * (cloud browsers, low-end mobile, software renderers).
 *
 * Perf choices:
 *  - particles drawn from a single pre-rendered soft-circle sprite (no per-frame
 *    gradients), just drawImage + globalAlpha.
 *  - modest count, further reduced on small viewports.
 *  - DPR capped at 2.
 *  - animation pauses when the tab is hidden.
 *  - honours prefers-reduced-motion: renders one static frame, no rAF loop.
 */

type Particle = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  // sinusoidal wobble so motion feels suspended/organic, not linear.
  phase: number;
  drift: number;
  twinkle: number;
};

const TEAL = { r: 29, g: 158, b: 117 }; // #1D9E75

export default function HeroParticles({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement ?? canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Pre-render one soft circular sprite we can stamp cheaply per particle.
    const SPRITE = 64;
    const sprite = document.createElement("canvas");
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(
        SPRITE / 2,
        SPRITE / 2,
        0,
        SPRITE / 2,
        SPRITE / 2,
        SPRITE / 2
      );
      g.addColorStop(0, `rgba(${TEAL.r},${TEAL.g},${TEAL.b},1)`);
      g.addColorStop(0.4, `rgba(${TEAL.r},${TEAL.g},${TEAL.b},0.55)`);
      g.addColorStop(1, `rgba(${TEAL.r},${TEAL.g},${TEAL.b},0)`);
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, SPRITE, SPRITE);
    }

    const countForWidth = (w: number) => {
      if (w < 640) return 26; // phones — keep it light
      if (w < 1024) return 40;
      return 54;
    };

    const makeParticles = (n: number) => {
      const next: Particle[] = [];
      for (let i = 0; i < n; i++) {
        next.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1.5 + Math.random() * 3, // radius in CSS px
          baseAlpha: 0.06 + Math.random() * 0.12, // low opacity
          vx: (Math.random() - 0.5) * 0.18, // gentle horizontal drift
          vy: (Math.random() - 0.5) * 0.14, // gentle vertical drift
          phase: Math.random() * Math.PI * 2,
          drift: 0.15 + Math.random() * 0.35, // wobble amplitude (px)
          twinkle: 0.3 + Math.random() * 0.6, // alpha-pulse speed factor
        });
      }
      return next;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = countForWidth(width);
      if (particles.length === 0) {
        particles = makeParticles(target);
      } else if (target !== particles.length) {
        // keep existing motion, just add/trim to the new target count.
        if (target > particles.length) {
          particles = particles.concat(
            makeParticles(target - particles.length)
          );
        } else {
          particles = particles.slice(0, target);
        }
      }
    };

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      for (const p of particles) {
        const wobble = Math.sin(t * 0.0006 * p.twinkle + p.phase) * p.drift;
        const alpha =
          p.baseAlpha * (0.7 + 0.3 * Math.sin(t * 0.001 * p.twinkle + p.phase));
        const size = p.r * 4; // sprite is soft, so stamp larger than radius
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.drawImage(
          sprite,
          p.x + wobble - size / 2,
          p.y - size / 2,
          size,
          size
        );
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min(now - last, 50); // clamp after tab switches
      last = now;
      t += dt;
      for (const p of particles) {
        p.x += p.vx * (dt / 16.67);
        p.y += p.vy * (dt / 16.67);
        // wrap softly around the edges so the field stays full
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    let raf = 0;
    let last = 0;

    const start = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame((now) => {
        last = now;
        raf = requestAnimationFrame(step);
      });
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();

    // Static single frame for reduced-motion users — no animation loop.
    if (reducedMotion) {
      draw();
      const ro = new ResizeObserver(() => {
        resize();
        draw();
      });
      ro.observe(parent);
      return () => ro.disconnect();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
