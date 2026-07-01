"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import BlurText from "../BlurText";

/**
 * SECTION 1 — Page hero. Eyebrow + BlurText headline reveal + subheading.
 * Extra top padding clears the fixed (transparent-at-top) Header. No CTA —
 * the page is meant to breathe here.
 */
export default function AboutHero() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.1,
  });

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:pb-24">
      {/* Soft branded glows (purely decorative). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-teal-bright/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-28 h-64 w-64 rounded-full bg-coral/10 blur-3xl"
      />

      <div ref={ref} className="container-content relative mx-auto max-w-3xl text-center">
        <p data-reveal className="eyebrow mb-4">
          About Elavive Physio
        </p>
        <BlurText
          as="h1"
          text="We treat the cause. Not just the pain."
          className="font-heading text-4xl font-light leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl"
        />
        <p
          data-reveal
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          Founded in Jaipur with a focus on spine and knee rehabilitation,
          Elavive Physio combines evidence-based physiotherapy with genuine,
          attentive care.
        </p>
      </div>
    </section>
  );
}
