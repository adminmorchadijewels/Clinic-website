"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { useHeroStore } from "@/lib/store";
import { BODY_REGIONS, type BodyRegionId } from "@/lib/data";
import {
  BODY_PARTS,
  REGION_ANCHORS,
  explodedTransform,
  type StaggerGroup,
} from "./heroBodyParts";

gsap.registerPlugin(ScrollTrigger);

// Per-group assemble windows (stagger): core settles first, then limbs, then
// extremities. Each is [start, end] within the global 0→1 progress.
const GROUP_WINDOW: Record<StaggerGroup, [number, number]> = {
  core: [0.0, 0.5],
  limb: [0.22, 0.78],
  extremity: [0.45, 1.0],
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

const TEAL = new THREE.Color("#1D9E75");
const BODY_COLOR = new THREE.Color("#cfd8d0");

const DEFAULT_CAM = new THREE.Vector3(0, -0.05, 6.2);
const DEFAULT_TARGET = new THREE.Vector3(0, -0.05, 0);

interface BodyModelProps {
  reducedMotion: boolean;
}

export default function BodyModel({ reducedMotion }: BodyModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const activeRegion = useHeroStore((s) => s.activeRegion);
  const setActiveRegion = useHeroStore((s) => s.setActiveRegion);
  const setAssembled = useHeroStore((s) => s.setAssembled);

  const { camera } = useThree();

  // Precompute assembled + exploded vectors per part once.
  const parts = useMemo(
    () =>
      BODY_PARTS.map((part, i) => {
        const ex = explodedTransform(part, i);
        return {
          part,
          assembledPos: new THREE.Vector3(...part.pos),
          assembledRot: new THREE.Euler(...part.rot),
          explodedPos: new THREE.Vector3(...ex.pos),
          explodedRot: new THREE.Euler(...ex.rot),
          window: GROUP_WINDOW[part.group],
        };
      }),
    []
  );

  // Assemble progress sources (auto timer + scroll), combined as the max so
  // scrolling can accelerate assembly but the auto-timeline still guarantees it.
  const autoProgress = useRef(reducedMotion ? 1 : 0);
  const scrollProgress = useRef(0);
  const lookTarget = useRef(DEFAULT_TARGET.clone());
  const reportedAssembled = useRef(false);

  useGSAP(
    () => {
      if (reducedMotion) {
        autoProgress.current = 1;
        return;
      }
      // Auto-assemble after a short beat even if the user never scrolls.
      const proxy = { v: 0 };
      const tween = gsap.to(proxy, {
        v: 1,
        duration: 2.3,
        delay: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          autoProgress.current = proxy.v;
        },
      });

      // Tie progress to scroll across the hero's height.
      const st = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });

      return () => {
        tween.kill();
        st.kill();
      };
    },
    { dependencies: [reducedMotion] }
  );

  useEffect(() => {
    // Cursor affordance on interactive joints.
    if (activeRegion) document.body.style.cursor = "pointer";
    else document.body.style.cursor = "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [activeRegion]);

  useFrame((state, delta) => {
    const p = reducedMotion
      ? 1
      : Math.max(autoProgress.current, scrollProgress.current);

    // Report assembled state once (gates hover UI hints in 2D layer).
    if (!reportedAssembled.current && p > 0.97) {
      reportedAssembled.current = true;
      setAssembled(true);
    }

    const damp = 1 - Math.pow(0.0001, delta); // frame-rate independent lerp

    for (let i = 0; i < parts.length; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const { part, assembledPos, assembledRot, explodedPos, explodedRot, window } =
        parts[i];

      const local = easeOutCubic(
        clamp01((p - window[0]) / (window[1] - window[0]))
      );

      mesh.position.lerpVectors(explodedPos, assembledPos, local);
      mesh.rotation.x = THREE.MathUtils.lerp(explodedRot.x, assembledRot.x, local);
      mesh.rotation.y = THREE.MathUtils.lerp(explodedRot.y, assembledRot.y, local);
      mesh.rotation.z = THREE.MathUtils.lerp(explodedRot.z, assembledRot.z, local);

      // Hover highlight: scale + emissive pulse on the active region's parts.
      const isActive = !!part.region && part.region === activeRegion;
      const targetScale = isActive ? 1.18 : 1;
      const s = THREE.MathUtils.lerp(mesh.scale.x, targetScale, damp);
      mesh.scale.setScalar(s);

      const mat = mesh.material as THREE.MeshStandardMaterial;
      const pulse = isActive ? 0.55 + 0.25 * Math.sin(state.clock.elapsedTime * 4) : 0;
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        pulse,
        damp
      );
    }

    // Gentle idle sway once assembled (skipped under reduced motion).
    if (groupRef.current) {
      const targetRotY =
        !reducedMotion && p > 0.95 && !activeRegion
          ? Math.sin(state.clock.elapsedTime * 0.3) * 0.12
          : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        damp * 0.6
      );
    }

    // Camera rig: ease toward the active region, else back to framed default.
    // Skipped entirely under reduced motion (hover still works, no camera move).
    if (!reducedMotion) {
      let camTarget = DEFAULT_CAM;
      let look = DEFAULT_TARGET;
      if (activeRegion) {
        const a = REGION_ANCHORS[activeRegion];
        const anchor = new THREE.Vector3(a[0], a[1], a[2]);
        const dir = anchor.clone().sub(DEFAULT_TARGET).normalize();
        camTarget = anchor.clone().add(dir.multiplyScalar(0)).add(
          new THREE.Vector3(a[0] * 0.4, a[1] * 0.15, 3.4)
        );
        look = anchor;
      }
      camera.position.lerp(camTarget, damp * 0.7);
      lookTarget.current.lerp(look, damp * 0.7);
      camera.lookAt(lookTarget.current);
    } else {
      camera.position.copy(DEFAULT_CAM);
      camera.lookAt(DEFAULT_TARGET);
    }
  });

  const handleEnter = (region: BodyRegionId) => () => setActiveRegion(region);
  const handleLeave = () => setActiveRegion(null);

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {parts.map(({ part }, i) => (
        <mesh
          key={part.id}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          castShadow
          receiveShadow
          onPointerOver={
            part.region
              ? (e) => {
                  e.stopPropagation();
                  handleEnter(part.region!)();
                }
              : undefined
          }
          onPointerOut={part.region ? handleLeave : undefined}
          onPointerDown={
            part.region
              ? (e) => {
                  e.stopPropagation();
                  // Tap-to-toggle on touch devices.
                  setActiveRegion(
                    activeRegion === part.region ? null : part.region!
                  );
                }
              : undefined
          }
        >
          {/* Modest segment counts — these are small stylized primitives, so
              24×16 spheres / 16-radial capsules read as smooth while keeping the
              whole figure low-poly (~20k tris across all 27 parts). */}
          {part.geo.type === "sphere" ? (
            <sphereGeometry args={[part.geo.radius, 24, 16]} />
          ) : (
            <capsuleGeometry args={[part.geo.radius, part.geo.length, 6, 16]} />
          )}
          {/* Matte stylized surface. metalness 0 because there's no environment
              map to reflect — keeps the look clean rather than flat-dark. */}
          <meshStandardMaterial
            color={BODY_COLOR}
            emissive={TEAL}
            emissiveIntensity={0}
            roughness={0.5}
            metalness={0}
          />
        </mesh>
      ))}

      {/* Anchored info card for the active region. */}
      {activeRegion && (
        <Html
          position={REGION_ANCHORS[activeRegion]}
          center
          distanceFactor={7}
          zIndexRange={[40, 0]}
          style={{ pointerEvents: "auto" }}
        >
          <RegionCard region={activeRegion} onClose={handleLeave} />
        </Html>
      )}
    </group>
  );
}

function RegionCard({
  region,
  onClose,
}: {
  region: BodyRegionId;
  onClose: () => void;
}) {
  const info = BODY_REGIONS[region];
  return (
    <div
      className="w-52 -translate-y-24 rounded-2xl border border-teal/15 bg-white/95 p-4 shadow-soft backdrop-blur"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <p className="eyebrow mb-1">{info.label}</p>
      <p className="mb-3 text-sm leading-snug text-charcoal/80">
        {info.description}
      </p>
      <a
        href={`/services/${info.serviceSlug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-coral transition-colors hover:text-[#b8481f]"
      >
        View treatments →
      </a>
      {/* Tap-away affordance for touch users. */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-muted transition-colors hover:bg-surface"
      >
        ×
      </button>
    </div>
  );
}
