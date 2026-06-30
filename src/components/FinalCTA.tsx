"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { whatsappLink } from "@/lib/data";
import { ArrowRight, WhatsApp } from "./Icons";
import BlurText from "./BlurText";

export default function FinalCTA() {
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
            text="Ready to move without pain?"
            className="font-heading text-3xl font-light leading-tight text-white sm:text-5xl"
          />
          <p data-cta-reveal className="mt-4 text-lg text-white/80">
            Book your assessment today — most patients feel a difference within
            the first few sessions.
          </p>
          <div
            data-cta-reveal
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/contact#booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-8 py-4 text-sm font-semibold text-white shadow-soft transition-all duration-300 ease-smooth hover:scale-[1.04] hover:bg-[#c34d27] active:scale-[0.97]"
            >
              Book Appointment
              <ArrowRight width={18} height={18} />
            </Link>
            {/* TODO: replace WhatsApp number in src/lib/data.ts */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 ease-smooth hover:scale-[1.04] hover:bg-white/20 active:scale-[0.97]"
            >
              <WhatsApp width={20} height={20} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
