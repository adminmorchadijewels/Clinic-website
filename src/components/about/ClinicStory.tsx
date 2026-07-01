"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { Icon } from "../Icons";

/**
 * SECTION 2 — Clinic story. Two-column on desktop (copy left, image right),
 * single column on mobile. The image is a styled placeholder until a real
 * clinic photo is supplied.
 */
export default function ClinicStory() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.12,
  });

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

        {/* Image — TODO: replace with real clinic photo. */}
        <div data-reveal className="order-first lg:order-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#eef4f0] to-[#e2ede6] shadow-soft">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/10 blur-2xl"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-2xl bg-white/70 text-teal shadow-soft backdrop-blur">
                <Icon name="rehab" width={38} height={38} />
              </span>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              TODO: replace with real clinic photo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
