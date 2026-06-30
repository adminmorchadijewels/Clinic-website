import type { ReactElement, SVGProps } from "react";

// Consistent 24×24 stroke icon set used across the site.
// Keeping them inline (vs an icon lib) keeps the bundle lean.

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <path d="M3 21l1.8-5A8.5 8.5 0 1 1 8 19.2L3 21z" />
    <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5.6 0 1-.5 1-1l-.2-1.2-2-.6-1 1a5.3 5.3 0 0 1-2.5-2.5l1-1-.6-2L10 7.5c-.5 0-1 .4-1 1z" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Star = ({ filled = true, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base({ strokeWidth: 1.2, ...p })} fill={filled ? "currentColor" : "none"}>
    <path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19.5l1-5.8L3.5 9.6l5.9-.8z" />
  </svg>
);

// Generic keyed icon (stats / services / pillars).
const PATHS: Record<string, ReactElement> = {
  // stats
  years: <path d="M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />,
  patients: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 5a3 3 0 0 1 0 6M21 20c0-2-1.5-3.5-3.5-4.2" />
    </>
  ),
  rating: <path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19.5l1-5.8L3.5 9.6l5.9-.8z" />,
  conditions: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  // services
  spine: (
    <>
      <path d="M12 3v18" />
      <path d="M9 6h6M8.5 9.5h7M8 13h8M8.5 16.5h7" />
    </>
  ),
  knee: (
    <>
      <path d="M8 3v6a4 4 0 0 0 4 4 4 4 0 0 1 4 4v4" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  shoulder: (
    <>
      <circle cx="8" cy="8" r="3" />
      <path d="M11 9c3 0 6 2 6 6v3M8 11v9" />
    </>
  ),
  sports: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18M3 12h18M5.5 6l13 12M18.5 6l-13 12" />
    </>
  ),
  rehab: (
    <>
      <path d="M4 8h2l2 8h8l2-8h2" />
      <path d="M9 8V5h6v3M12 11v2" />
    </>
  ),
  neuro: (
    <>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 4 3 3 0 0 0 5 1V4.5A2.5 2.5 0 0 0 9 4z" />
      <path d="M12 7h2a2 2 0 0 1 2 2M12 13h3a2 2 0 0 1 2 2" />
    </>
  ),
  // pillars
  assess: (
    <>
      <path d="M3 12h4l2 5 4-12 2 7h6" />
    </>
  ),
  tech: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 5a3 3 0 0 1 0 6M21 20c0-2-1.5-3.5-3.5-4.2" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function Icon({ name, ...p }: IconProps & { name: string }) {
  return <svg {...base(p)}>{PATHS[name] ?? PATHS.conditions}</svg>;
}
