"use client";

import Image from "next/image";
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

        {/* Clinic photo gallery: one tall image left, two stacked right on
            desktop; all three stacked on mobile. */}
        <div data-reveal className="order-first lg:order-none">
          <div className="grid grid-cols-1 gap-4 sm:h-[480px] sm:grid-cols-2 sm:grid-rows-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft sm:aspect-auto sm:row-span-2 sm:h-full">
              <Image
                src="/images/clinic-treatment-room.png"
                alt="Elavive Physio treatment room with physiotherapy equipment, Jaipur"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft sm:aspect-auto sm:h-full">
              <Image
                src="/images/clinic-reception.png"
                alt="Elavive Physio reception and front desk, Milap Nagar Jaipur"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 12vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft sm:aspect-auto sm:h-full">
              <Image
                src="/images/clinic-office.png"
                alt="Elavive Physio consultation area, Jaipur"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 12vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
