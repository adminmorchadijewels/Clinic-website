"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DOCTOR } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowRight } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export default function DoctorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set("[data-reveal]", { opacity: 1, clearProps: "all" });
        return;
      }

      // Image: soft clip-path wipe + scale reveal.
      gsap.fromTo(
        "[data-doc-image]",
        { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        }
      );

      // Text: staggered fade-up.
      gsap.fromTo(
        "[data-doc-copy] > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section id="founder" className="section-padding">
      <div
        ref={ref}
        className="container-content grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        {/* Photo */}
        <div className="order-1 lg:order-none">
          <div
            data-doc-image
            data-reveal
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface shadow-soft will-change-transform"
          >
            <Image
              src={DOCTOR.photo}
              alt="Dr. Ajay Agarwal, Founder and Director of Elavive Physio, Jaipur"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal/20 to-transparent" />
          </div>
        </div>

        {/* Copy */}
        <div data-doc-copy>
          <p data-reveal className="eyebrow mb-3">
            Meet the founder
          </p>
          <h2
            data-reveal
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
          >
            {DOCTOR.name}
          </h2>
          <p data-reveal className="mt-1 text-sm font-medium uppercase tracking-wider text-teal">
            {DOCTOR.qualification}
          </p>
          <p data-reveal className="mt-5 text-base leading-relaxed text-muted">
            {DOCTOR.bioTeaser}
          </p>
          <Link
            data-reveal
            href="/about"
            className="mt-7 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-[#b8481f]"
          >
            Read full story
            <ArrowRight width={16} height={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
