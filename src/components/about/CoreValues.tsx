"use client";

import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Icon } from "../Icons";
import BlurText from "../BlurText";

const VALUES = [
  {
    icon: "heart",
    title: "Patient-First Care",
    body: "Every treatment plan is designed around the individual needs, goals, and comfort of our patients.",
  },
  {
    icon: "award",
    title: "Clinical Excellence",
    body: "We use evidence-based physiotherapy techniques and continuous learning to deliver the highest quality care.",
  },
  {
    icon: "shield",
    title: "Integrity & Trust",
    body: "We maintain honesty, transparency, and ethical practice in every interaction with our patients.",
  },
  {
    icon: "team",
    title: "Compassion & Respect",
    body: "We treat every patient with empathy, respect, and dedication to their recovery journey.",
  },
  {
    icon: "bulb",
    title: "Innovation in Rehabilitation",
    body: "We adopt advanced rehabilitation techniques and modern physiotherapy approaches to achieve faster and better outcomes.",
  },
  {
    icon: "growth",
    title: "Empowering Recovery",
    body: "We educate and guide patients so they can actively participate in their healing and long-term wellness.",
  },
] as const;

/**
 * SECTION 4 — Core values. 6 cards in a 3×2 grid (2×3 / single on smaller
 * screens) with a staggered scroll-in.
 */
export default function CoreValues() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-value]",
    stagger: 0.08,
    duration: 0.6,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const active = VALUES[activeIndex];

  return (
    <section className="section-padding">
      <div className="container-content" ref={ref}>
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">What We Stand For</p>
          <BlurText
            as="h2"
            text="Our Core Values"
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
          />
        </div>

        {/* Desktop (md+): full 3×2 card grid. */}
        <div className="hidden gap-4 sm:grid-cols-2 md:grid lg:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              data-value
              className="group rounded-2xl border border-teal/10 border-b-2 border-b-transparent bg-gradient-to-b from-white to-teal/5 p-6 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-teal/40 hover:border-b-teal hover:shadow-lift sm:p-7"
            >
              <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-teal text-white transition-transform duration-300 group-hover:scale-110">
                <Icon name={value.icon} width={26} height={26} />
              </span>
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.body}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile (below md): pill tab switcher + one card at a time. */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {VALUES.map((value, i) => (
              <button
                key={value.title}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={activeIndex === i}
                className={`truncate rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                  activeIndex === i
                    ? "bg-teal text-white"
                    : "border border-teal bg-white text-teal"
                }`}
              >
                {value.title}
              </button>
            ))}
          </div>

          <div
            key={activeIndex}
            className="mt-6 rounded-2xl border border-teal/10 bg-gradient-to-b from-white to-teal/5 p-6 motion-safe:animate-[fade-in_0.2s_ease-out]"
          >
            <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-teal text-white">
              <Icon name={active.icon} width={26} height={26} />
            </span>
            <h3 className="font-heading text-lg font-semibold text-charcoal">
              {active.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {active.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
