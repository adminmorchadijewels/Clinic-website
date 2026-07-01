"use client";

import Image from "next/image";
import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

/**
 * SECTION 2 — Clinic story. Two-column on desktop (copy left, photo gallery
 * right), single column on mobile. The gallery shows real clinic photos.
 */
export default function ClinicStory() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.12,
  });
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className="container-content grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        {/* Copy */}
        <div data-reveal>
          <p className="eyebrow mb-3">Our Story</p>
          <h2 className="font-heading text-3xl font-light text-charcoal sm:text-4xl">
            Built around one belief
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            At Elavive Physio, we believe that movement is the foundation of a
            healthy and pain-free life. Our clinic was built with a single
            purpose: to provide advanced physiotherapy care that helps patients
            recover faster, move better, and live without pain.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We combine evidence-based physiotherapy techniques, manual therapy,
            and personalized rehabilitation programs to treat a wide range of
            musculoskeletal and neurological conditions. Every treatment plan is
            carefully designed according to the patient&apos;s condition,
            lifestyle, and recovery goals, not a one-size-fits-all approach.
          </p>
        </div>

        {/* Clinic photo gallery. */}
        <div data-reveal className="order-first lg:order-none">
          {/* Desktop (md+): three equal landscape photos side by side. */}
          <div className="hidden gap-4 sm:grid-cols-3 md:grid">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
              <Image
                src="/images/clinic-treatment-room.png"
                alt="Elavive Physio treatment room with physiotherapy equipment, Jaipur"
                fill
                sizes="(max-width: 1024px) 33vw, 17vw"
                className="object-cover object-center"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
              <Image
                src="/images/clinic-reception.png"
                alt="Elavive Physio reception and front desk, Milap Nagar Jaipur"
                fill
                sizes="(max-width: 1024px) 33vw, 17vw"
                className="object-cover object-center"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
              <Image
                src="/images/clinic-office.png"
                alt="Elavive Physio consultation area, Jaipur"
                fill
                sizes="(max-width: 1024px) 33vw, 17vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Mobile (below md): first photo + tap-to-expand accordion for the rest. */}
          <div className="md:hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-soft">
              <Image
                src="/images/clinic-treatment-room.png"
                alt="Elavive Physio treatment room with physiotherapy equipment, Jaipur"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div
              className={`overflow-hidden motion-safe:transition-[max-height] motion-safe:duration-[400ms] motion-safe:ease-smooth ${
                expanded ? "max-h-[1400px]" : "max-h-0"
              }`}
            >
              <div className="space-y-4 pt-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-soft">
                  <Image
                    src="/images/clinic-reception.png"
                    alt="Elavive Physio reception and front desk, Milap Nagar Jaipur"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-soft">
                  <Image
                    src="/images/clinic-office.png"
                    alt="Elavive Physio consultation area, Jaipur"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal"
            >
              {expanded ? "Show less" : "See all 3 photos"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`motion-safe:transition-transform motion-safe:duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
