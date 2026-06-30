"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import BodyModel from "./BodyModel";

interface HeroCanvasProps {
  reducedMotion: boolean;
  /** Disable postprocessing on mid-tier devices for performance headroom. */
  enableEffects?: boolean;
  /**
   * Fired when the WebGL context is lost and the browser can't (or hasn't yet)
   * restored it. Lets the parent swap in the static fallback so the hero is
   * never left blank — common on software renderers / virtualized GPUs.
   */
  onContextLost?: () => void;
}

export default function HeroCanvas({
  reducedMotion,
  enableEffects = true,
  onContextLost,
}: HeroCanvasProps) {
  return (
    <Canvas
      // aria-hidden: the canvas isn't crawlable; SEO text lives in the real <h1>.
      aria-hidden="true"
      camera={{ position: [0, -0.05, 6.2], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reducedMotion ? "demand" : "always"}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        canvas.addEventListener(
          "webglcontextlost",
          (e) => {
            // preventDefault signals we want the browser to try restoring the
            // context (fires "webglcontextrestored" if it succeeds).
            e.preventDefault();
            console.warn(
              "[HeroCanvas] WebGL context lost — falling back to static hero."
            );
            onContextLost?.();
          },
          { once: false }
        );
      }}
    >
      {/* Keep DPR/events adaptive so weaker GPUs stay smooth. */}
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />

      {/* Stylized manual lighting — no HDR/image-based lighting. Keeps the look
          clean + modern and avoids fetching a multi-MB .hdr environment map.
          - ambient: soft base fill
          - key: main directional, casts the shadow
          - fill: dim cool fill from the opposite side to shape the form
          - rim: teal point-light behind for a soft brand-colored edge glow */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.55} color="#cfe9df" />
      <pointLight position={[0, 1.5, -4]} intensity={6} distance={14} color="#1D9E75" />

      <BodyModel reducedMotion={reducedMotion} />

      {enableEffects && !reducedMotion && (
        <EffectComposer>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
