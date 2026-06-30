"use client";

/**
 * High-quality static fallback shown when WebGL is unavailable or the device is
 * detected as low-end. Self-contained SVG (no network) of an assembled, on-brand
 * figure so the hero never renders blank.
 *
 * TODO: optionally replace with a pre-rendered hero image of the 3D body for
 * an even richer fallback.
 */
export default function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center"
    >
      <svg
        viewBox="0 0 240 420"
        className="h-[78%] max-h-[560px] w-auto drop-shadow-[0_20px_40px_rgba(15,110,86,0.18)]"
        role="presentation"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6ded7" />
            <stop offset="100%" stopColor="#aebcb1" />
          </linearGradient>
          <radialGradient id="jointGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1D9E75" />
            <stop offset="100%" stopColor="#0F6E56" />
          </radialGradient>
        </defs>
        {/* Head */}
        <circle cx="120" cy="40" r="26" fill="url(#bodyGrad)" />
        {/* Neck + torso */}
        <rect x="110" y="62" width="20" height="18" rx="9" fill="url(#bodyGrad)" />
        <rect x="86" y="78" width="68" height="120" rx="32" fill="url(#bodyGrad)" />
        {/* Arms */}
        <rect x="60" y="92" width="22" height="110" rx="11" fill="url(#bodyGrad)" />
        <rect x="158" y="92" width="22" height="110" rx="11" fill="url(#bodyGrad)" />
        {/* Legs */}
        <rect x="92" y="196" width="24" height="160" rx="12" fill="url(#bodyGrad)" />
        <rect x="124" y="196" width="24" height="160" rx="12" fill="url(#bodyGrad)" />
        {/* Highlighted joints */}
        <circle cx="71" cy="96" r="12" fill="url(#jointGrad)" />
        <circle cx="169" cy="96" r="12" fill="url(#jointGrad)" />
        <circle cx="104" cy="210" r="13" fill="url(#jointGrad)" />
        <circle cx="136" cy="210" r="13" fill="url(#jointGrad)" />
        <circle cx="104" cy="300" r="12" fill="url(#jointGrad)" />
        <circle cx="136" cy="300" r="12" fill="url(#jointGrad)" />
        <circle cx="120" cy="150" r="11" fill="url(#jointGrad)" />
      </svg>
    </div>
  );
}
