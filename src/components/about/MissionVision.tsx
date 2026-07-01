"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const CARDS = [
  {
    label: "Our Mission",
    body: "To provide evidence-based physiotherapy and advanced manual therapy that helps patients recover from pain, restore mobility, and improve their quality of life. We deliver personalized care for spine, knee, and musculoskeletal conditions through modern rehabilitation techniques, compassionate service, and patient education.",
  },
  {
    label: "Our Vision",
    body: "To become a trusted center of excellence in physiotherapy and rehabilitation, known for delivering outstanding results in spine and knee care. We aim to empower people to live pain-free, active, and healthy lives by combining clinical expertise, innovative therapies, and a patient-first approach.",
  },
] as const;

/**
 * SECTION 3 — Mission & Vision. Two soft sage-tint cards with a teal left
 * border accent. Two columns on desktop, stacked on mobile.
 */
export default function MissionVision() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.12,
  });

  return (
    <section className="section-padding bg-white">
      <div
        ref={ref}
        className="container-content grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
      >
        {CARDS.map((card) => (
          <div
            key={card.label}
            data-reveal
            className="rounded-2xl border-l-4 border-teal bg-surface p-7 sm:p-9"
          >
            <h2 className="font-heading text-2xl font-medium text-charcoal">
              {card.label}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
