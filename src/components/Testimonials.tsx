"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TESTIMONIALS } from "@/lib/data";
import { truncateReview } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ChevronLeft, ChevronRight, Star } from "./Icons";
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

// Sticky deck geometry (mobile). Each card rests this far below the viewport
// top, with a small per-card offset so the card beneath peeks out.
const STACK_TOP = 104; // px clearance below the fixed header
const PEEK = 16; // px each successive card is nudged down

// Clinic's Google Business Profile — used by the per-card and section-level
// "read reviews on Google" links.
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/Elavive+Physio+Spine+and+Knee+Clinic+Jaipur";

type Testimonial = (typeof TESTIMONIALS)[number];

// Small inline external-link arrow (↗).
function ExternalArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

// Shared card contents — identical between the mobile stack and desktop carousel.
function CardBody({ t }: { t: Testimonial }) {
  return (
    <>
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star
            key={s}
            filled={s < t.rating}
            width={16}
            height={16}
            className={s < t.rating ? "text-coral" : "text-muted/30"}
          />
        ))}
      </div>
      <blockquote className="flex-1 text-lg leading-relaxed text-charcoal/85">
        &ldquo;{truncateReview(t.quote)}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-teal/10 pt-4">
        <span className="block font-medium text-charcoal">{t.name}</span>
        <span className="block text-sm text-muted">{t.condition}</span>
      </figcaption>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-coral"
      >
        Read on Google <ExternalArrow />
      </a>
    </>
  );
}

export default function Testimonials() {
  const reducedMotion = useReducedMotion();

  /* ---------- Mobile: sticky card-stack ---------- */
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      // Only drive the deck on mobile widths; matchMedia auto-reverts elsewhere.
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const wrappers = gsap.utils.toArray<HTMLElement>("[data-stack-item]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        wrappers.forEach((wrapper, i) => {
          if (i === wrappers.length - 1) return;
          const restTopOfNext = STACK_TOP + (i + 1) * PEEK;
          gsap.fromTo(
            cards[i],
            { scale: 1, opacity: 1 },
            {
              scale: 0.92,
              opacity: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: wrappers[i + 1],
                start: "top bottom",
                end: `top ${restTopOfNext}px`,
                scrub: true,
              },
            }
          );
        });
      });
    },
    { scope: stackRef, dependencies: [reducedMotion] }
  );

  /* ---------- Desktop (md+): user-controlled carousel ---------- */
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const count = TESTIMONIALS.length;
      const next = (i + count) % count; // wrap at the ends
      const card = track.children[next] as HTMLElement | undefined;
      if (!card) return;
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      setIndex(next);
    },
    [reducedMotion]
  );

  // Keep the active dot in sync when the user swipes/drags the track manually.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const mid = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let dist = Infinity;
        children.forEach((c, i) => {
          const center = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(center - mid);
          if (d < dist) {
            dist = d;
            closest = i;
          }
        });
        setIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section-padding">
      <div className="container-content" ref={stackRef}>
        {/* Dev-only reminder that testimonials are placeholders. Not rendered in production. */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded-lg border border-yellow-400 bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900">
            ⚠️ USING REAL GOOGLE REVIEWS — Verify patient consent before launch
          </div>
        )}
        <div className="mb-10 max-w-xl">
          <p className="eyebrow mb-3">In their words</p>
          <BlurText
            as="h2"
            text="Trusted by thousands across Jaipur"
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
          />
        </div>

        {/* Mobile: sticky deck. Hidden at md+. */}
        <div className="relative mx-auto max-w-3xl md:hidden">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              data-stack-item
              className={reducedMotion ? "mb-4" : "sticky"}
              style={reducedMotion ? undefined : { top: STACK_TOP + i * PEEK }}
            >
              <figure
                data-stack-card
                className="flex flex-col rounded-2xl border border-teal/10 bg-surface p-7 shadow-soft"
                style={{ transformOrigin: "center top", willChange: "transform" }}
              >
                <CardBody t={t} />
              </figure>
            </div>
          ))}
        </div>

        {/* Desktop: swipeable carousel with arrow + dot navigation. Hidden below md. */}
        <div className="hidden md:block">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          >
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.id}
                className="flex shrink-0 snap-center flex-col rounded-2xl border border-teal/10 bg-surface p-7 md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
              >
                <CardBody t={t} />
              </figure>
            ))}
          </div>

          {/* Controls: arrows flanking the position dots. */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToIndex(index - 1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-teal/20 text-teal transition-all duration-300 ease-smooth hover:scale-105 hover:border-teal hover:bg-teal hover:text-white active:scale-95"
            >
              <ChevronLeft />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-teal" : "w-2 bg-teal/25 hover:bg-teal/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(index + 1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-teal/20 text-teal transition-all duration-300 ease-smooth hover:scale-105 hover:border-teal hover:bg-teal hover:text-white active:scale-95"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Section-level CTA to the full Google Business Profile */}
        <div className="mt-12 flex justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            See All Google Reviews <ExternalArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
