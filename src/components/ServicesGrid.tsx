"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Icon, ArrowRight } from "./Icons";
import BlurText from "./BlurText";

// One card is featured (larger) to break the grid's symmetry. Spine & back is
// the "hero" tile — it's the clinic's core positioning (Leading Spine & Knee
// Clinic) and the most common reason patients visit.
const FEATURED_SLUG = "spine-back";

// Consistent across every card: teal link, coral only as a hover accent.
const exploreClasses =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors group-hover:text-coral";

// Gradient icon chip — branded teal, white glyph — shared by all cards.
const iconChipBase =
  "grid place-items-center rounded-xl bg-gradient-to-br from-teal-bright to-teal text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3";

export default function ServicesGrid() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-service]",
    variant: "fade-up",
    stagger: 0.1,
  });

  const featured = SERVICES.find((s) => s.slug === FEATURED_SLUG)!;
  const rest = SERVICES.filter((s) => s.slug !== FEATURED_SLUG);

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-content" ref={ref}>
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">What we treat</p>
          <BlurText
            as="h2"
            text="Specialised care for every kind of movement"
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl lg:text-5xl"
          />
          <p className="mt-4 text-muted">
            From a stubborn back to a post-op knee, our physiotherapists build a
            plan around your body and your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
          {/* Featured card — spans 2×2 on desktop, full width on tablet, plain
              single column on mobile (no fragile spanning at small sizes). */}
          <Link
            href={`/services/${featured.slug}`}
            data-service
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-teal/25 bg-gradient-to-br from-[#eef4f0] to-[#e2ede6] p-7 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-teal/50 hover:shadow-lift active:translate-y-0 active:scale-[0.98] sm:col-span-2 sm:p-8 lg:row-span-2"
          >
            {/* soft branded glow, clipped to the card */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-teal/10 blur-2xl"
            />
            <div className="relative">
              <span className="mb-4 inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                Most treated
              </span>
              <span className={`mb-5 h-16 w-16 rounded-2xl ${iconChipBase}`}>
                <Icon name={featured.icon} width={34} height={34} />
              </span>
              <h3 className="font-heading text-2xl font-medium text-charcoal lg:text-3xl">
                {featured.name}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                {featured.blurb}
              </p>
            </div>
            <span className={`relative mt-6 ${exploreClasses}`}>
              Explore
              <ArrowRight
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>

          {/* Standard cards — alternating sage / warm off-white tones so the set
              reads intentional rather than flat. */}
          {rest.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              data-service
              className={`group relative flex flex-col rounded-2xl border border-teal/10 p-6 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-lift active:translate-y-0 active:scale-[0.98] ${
                i % 2 === 0 ? "bg-surface" : "bg-background"
              }`}
            >
              <span className={`mb-5 h-14 w-14 ${iconChipBase}`}>
                <Icon name={service.icon} width={28} height={28} />
              </span>
              <h3 className="font-heading text-xl font-medium text-charcoal">
                {service.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {service.blurb}
              </p>
              <span className={`mt-5 ${exploreClasses}`}>
                Explore
                <ArrowRight
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
