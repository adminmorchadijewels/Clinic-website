import { create } from "zustand";
import type { BodyRegionId } from "./data";

/**
 * Shared hero state. Both the 3D scene (BodyScene) and the surrounding 2D UI
 * (info cards / overlay) read from this single source of truth so they never
 * drift out of sync.
 */
interface HeroState {
  /** Region currently hovered (desktop) or tapped (mobile). null = none. */
  activeRegion: BodyRegionId | null;
  /** Whether the explode→assemble animation has finished. */
  assembled: boolean;
  setActiveRegion: (region: BodyRegionId | null) => void;
  setAssembled: (assembled: boolean) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  activeRegion: null,
  assembled: false,
  setActiveRegion: (region) => set({ activeRegion: region }),
  setAssembled: (assembled) => set({ assembled }),
}));
