"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { useSnapCarousel } from "@/lib/useSnapCarousel";

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

// An airy two-column split item: an oversized teal index number (01 / 02) to
// the left of a bold teal heading and large, generously-spaced body text, with
// a subtle teal left-border accent instead of a heavy card.
function MissionCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number];
  index: number;
}) {
  return (
    <div className="flex gap-6 border-l-2 border-teal/30 pl-6 sm:gap-8 sm:pl-8">
      <span
        aria-hidden="true"
        className="font-heading text-5xl font-light leading-none text-teal/40 sm:text-6xl"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h2 className="font-heading text-2xl font-medium text-teal sm:text-3xl">
          {card.label}
        </h2>
        <p className="mt-5 text-lg leading-loose text-charcoal/75 sm:text-xl">
          {card.body}
        </p>
      </div>
    </div>
  );
}

/**
 * SECTION 3 — Mission & Vision. Side-by-side two-column split on desktop; on
 * mobile the two items become a horizontal snap-scroll carousel with dot
 * indicators to save vertical space.
 */
export default function MissionVision() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.12,
  });
  const { containerRef, activeIndex } = useSnapCarousel<HTMLDivElement>();

  return (
    <section className="section-padding bg-white">
      <div ref={ref} className="container-content">
        {/* Desktop (md+): two-column split. */}
        <div className="hidden gap-12 md:grid md:grid-cols-2 md:gap-16">
          {CARDS.map((card, i) => (
            <div key={card.label} data-reveal>
              <MissionCard card={card} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile (below md): horizontal snap-scroll carousel + dots. */}
        <div className="md:hidden">
          <div
            ref={containerRef}
            className="scrollbar-hide -mx-5 flex snap-x snap-mandatory flex-row gap-4 overflow-x-auto px-5 pb-4"
          >
            {CARDS.map((card, i) => (
              <div key={card.label} className="w-[85vw] shrink-0 snap-center">
                <MissionCard card={card} index={i} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-2">
            {CARDS.map((card, i) => (
              <span
                key={card.label}
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  activeIndex === i ? "bg-teal" : "bg-teal/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
