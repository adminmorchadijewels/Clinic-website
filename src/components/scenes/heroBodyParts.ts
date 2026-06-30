import type { BodyRegionId } from "@/lib/data";

// =============================================================================
// Stylized geometric humanoid — part definitions for the 3D hero.
//
// APPROACH NOTE: the hero body is built from THREE primitives (capsules +
// spheres) arranged anatomically, NOT a sourced GLTF. This keeps the asset
// pipeline dependency-free, lets us drive each part independently for the
// explode→assemble choreography, and degrades gracefully. Swapping in a real
// rigged GLTF later is a separate follow-up task.
// =============================================================================

export type GeoType = "capsule" | "sphere";

export type StaggerGroup = "core" | "limb" | "extremity";

export interface BodyPart {
  id: string;
  /** Interactive region this part belongs to (omit = non-interactive). */
  region?: BodyRegionId;
  group: StaggerGroup;
  geo:
    | { type: "sphere"; radius: number }
    | { type: "capsule"; radius: number; length: number };
  /** Assembled (resting) transform. */
  pos: [number, number, number];
  rot: [number, number, number];
}

// Deterministic pseudo-random in [0,1) — stable across renders (no Math.random,
// so SSR/hydration and resume stay consistent).
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Assembled standing figure, arms at sides. Y up; spans roughly y ∈ [-2.2, 1.9].
export const BODY_PARTS: BodyPart[] = [
  { id: "head", group: "core", geo: { type: "sphere", radius: 0.33 }, pos: [0, 1.66, 0], rot: [0, 0, 0] },
  { id: "neck", group: "core", geo: { type: "capsule", radius: 0.11, length: 0.12 }, pos: [0, 1.38, 0], rot: [0, 0, 0] },
  { id: "chest", group: "core", geo: { type: "capsule", radius: 0.34, length: 0.5 }, pos: [0, 0.85, 0], rot: [0, 0, 0] },
  // Lower torso doubles as the interactive "spine" region anchor.
  { id: "abdomen", region: "spine", group: "core", geo: { type: "capsule", radius: 0.3, length: 0.4 }, pos: [0, 0.3, 0], rot: [0, 0, 0] },
  { id: "pelvis", group: "core", geo: { type: "capsule", radius: 0.32, length: 0.18 }, pos: [0, -0.08, 0], rot: [0, 0, Math.PI / 2] },

  // Left arm
  { id: "shoulderL", region: "shoulder", group: "limb", geo: { type: "sphere", radius: 0.17 }, pos: [-0.46, 1.12, 0], rot: [0, 0, 0] },
  { id: "upperArmL", group: "limb", geo: { type: "capsule", radius: 0.12, length: 0.5 }, pos: [-0.52, 0.7, 0], rot: [0, 0, 0.04] },
  { id: "elbowL", region: "elbow", group: "extremity", geo: { type: "sphere", radius: 0.12 }, pos: [-0.54, 0.36, 0], rot: [0, 0, 0] },
  { id: "forearmL", group: "extremity", geo: { type: "capsule", radius: 0.1, length: 0.45 }, pos: [-0.55, 0.02, 0], rot: [0, 0, 0.02] },
  { id: "handL", group: "extremity", geo: { type: "sphere", radius: 0.12 }, pos: [-0.56, -0.3, 0], rot: [0, 0, 0] },

  // Right arm
  { id: "shoulderR", region: "shoulder", group: "limb", geo: { type: "sphere", radius: 0.17 }, pos: [0.46, 1.12, 0], rot: [0, 0, 0] },
  { id: "upperArmR", group: "limb", geo: { type: "capsule", radius: 0.12, length: 0.5 }, pos: [0.52, 0.7, 0], rot: [0, 0, -0.04] },
  { id: "elbowR", region: "elbow", group: "extremity", geo: { type: "sphere", radius: 0.12 }, pos: [0.54, 0.36, 0], rot: [0, 0, 0] },
  { id: "forearmR", group: "extremity", geo: { type: "capsule", radius: 0.1, length: 0.45 }, pos: [0.55, 0.02, 0], rot: [0, 0, -0.02] },
  { id: "handR", group: "extremity", geo: { type: "sphere", radius: 0.12 }, pos: [0.56, -0.3, 0], rot: [0, 0, 0] },

  // Hips
  { id: "hipL", region: "hip", group: "limb", geo: { type: "sphere", radius: 0.16 }, pos: [-0.2, -0.32, 0], rot: [0, 0, 0] },
  { id: "hipR", region: "hip", group: "limb", geo: { type: "sphere", radius: 0.16 }, pos: [0.2, -0.32, 0], rot: [0, 0, 0] },

  // Left leg
  { id: "thighL", group: "limb", geo: { type: "capsule", radius: 0.15, length: 0.55 }, pos: [-0.2, -0.78, 0], rot: [0, 0, 0] },
  { id: "kneeL", region: "knee", group: "extremity", geo: { type: "sphere", radius: 0.15 }, pos: [-0.2, -1.2, 0], rot: [0, 0, 0] },
  { id: "shinL", group: "extremity", geo: { type: "capsule", radius: 0.12, length: 0.5 }, pos: [-0.2, -1.62, 0], rot: [0, 0, 0] },
  { id: "ankleL", region: "ankle", group: "extremity", geo: { type: "sphere", radius: 0.11 }, pos: [-0.2, -2.0, 0], rot: [0, 0, 0] },
  { id: "footL", group: "extremity", geo: { type: "capsule", radius: 0.1, length: 0.2 }, pos: [-0.2, -2.12, 0.12], rot: [Math.PI / 2, 0, 0] },

  // Right leg
  { id: "thighR", group: "limb", geo: { type: "capsule", radius: 0.15, length: 0.55 }, pos: [0.2, -0.78, 0], rot: [0, 0, 0] },
  { id: "kneeR", region: "knee", group: "extremity", geo: { type: "sphere", radius: 0.15 }, pos: [0.2, -1.2, 0], rot: [0, 0, 0] },
  { id: "shinR", group: "extremity", geo: { type: "capsule", radius: 0.12, length: 0.5 }, pos: [0.2, -1.62, 0], rot: [0, 0, 0] },
  { id: "ankleR", region: "ankle", group: "extremity", geo: { type: "sphere", radius: 0.11 }, pos: [0.2, -2.0, 0], rot: [0, 0, 0] },
  { id: "footR", group: "extremity", geo: { type: "capsule", radius: 0.1, length: 0.2 }, pos: [0.2, -2.12, 0.12], rot: [Math.PI / 2, 0, 0] },
];

// Compute a deterministic exploded transform for a part (scattered outward).
export function explodedTransform(part: BodyPart, index: number): {
  pos: [number, number, number];
  rot: [number, number, number];
} {
  const [x, y, z] = part.pos;
  const sx = (rand(index) - 0.5) * 2; // -1..1
  const sy = (rand(index + 7) - 0.5) * 2;
  const sz = rand(index + 13); // 0..1, pushed toward viewer
  return {
    pos: [
      x * 2.3 + sx * 1.6,
      y * 1.25 + sy * 1.4,
      z + (sz * 2.4 - 0.6),
    ],
    rot: [
      part.rot[0] + (rand(index + 3) - 0.5) * 2.6,
      part.rot[1] + (rand(index + 5) - 0.5) * 2.6,
      part.rot[2] + (rand(index + 9) - 0.5) * 2.6,
    ],
  };
}

// One focus anchor per interactive region (for Html cards + camera framing).
export const REGION_ANCHORS: Record<BodyRegionId, [number, number, number]> = {
  spine: [0, 0.3, 0.34],
  shoulder: [0.46, 1.12, 0.2],
  elbow: [0.54, 0.36, 0.18],
  hip: [0.2, -0.32, 0.2],
  knee: [0.2, -1.2, 0.2],
  ankle: [0.2, -2.0, 0.2],
};
