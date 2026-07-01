"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { ArrowRight } from "../Icons";
import BlurText from "../BlurText";

/**
 * SECTION 7 — Closing CTA. Same teal banner style as the homepage FinalCTA,
 * with a single primary action.
 */
export default function AboutCTA() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-cta-reveal]",
    variant: "fade-up",
    stagger: 0.1,
  });

  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div
        ref={ref}
        className="container-content relative overflow-hidden rounded-[2rem] bg-teal px-6 py-16 text-center sm:px-12 sm:py-24"
      >
        {/* Decorative glow accents (purely visual). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-teal-bright/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-coral/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl">
          <BlurText
            as="h2"
            text="Ready to start your recovery?"
            className="font-heading text-3xl font-light leading-tight text-white sm:text-5xl"
          />
          <p data-cta-reveal className="mt-4 text-lg text-white/80">
            Book an appointment with Dr. Ajay Agarwal today.
          </p>
          <div data-cta-reveal className="mt-9 flex justify-center">
            <Link
              href="/contact#booking"
              className="btn-primary focus-visible:outline-white"
            >
              Book Appointment
              <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
