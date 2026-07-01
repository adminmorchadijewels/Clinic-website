"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Icon, ArrowRight } from "../Icons";
import Typewriter from "./Typewriter";
import ClipReveal from "./ClipReveal";

// Spine & back leads — it's the clinic's core positioning (Leading Spine & Knee
// Clinic) and the first, featured card in the explorer.
const FEATURED_SLUG = "spine-back";

// Shared teal gradient icon chip — kept identical to the homepage tiles.
const iconChipBase =
  "grid place-items-center rounded-2xl bg-gradient-to-br from-teal-bright to-teal text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3";

// Slim credibility strip shown between the heading and the explorer.
const STATS = [
  { lead: "6", sub: "Specialisations" },
  { lead: "4,000+", sub: "Patients Treated" },
  { lead: "Evidence-Based", sub: "Treatment" },
  { lead: "Jaipur's", sub: "Spine & Knee Specialists" },
] as const;

type Service = (typeof SERVICES)[number];

// -----------------------------------------------------------------------------
// Card — icon chip + heading + one-sentence blurb, with a conditions drawer that
// slides up on hover (desktop) / tap (mobile), and an always-visible explore
// link pinned to the bottom.
// -----------------------------------------------------------------------------
function ServiceCard({ service, featured }: { service: Service; featured: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = `conditions-${service.slug}`;

  return (
    <article
      data-card
      className={`group relative h-[440px] w-full shrink-0 overflow-hidden rounded-3xl border transition-[transform,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-lift md:h-[480px] md:w-[380px] md:snap-start ${
        featured
          ? "border-teal/30 bg-[#F0F3EF] hover:border-teal/50"
          : "border-teal/12 bg-white hover:border-teal/40"
      }`}
    >
      {/* Featured-only: subtle "alive" radial tint pulse behind the content. */}
      {featured && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-soft-pulse bg-[radial-gradient(120%_120%_at_30%_15%,#E8F0EC,transparent_70%)]"
        />
      )}

      {/* Top content doubles as the mobile tap-to-reveal disclosure button. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative z-10 flex h-full w-full flex-col p-7 pb-24 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        {featured && (
          <span className="mb-4 inline-flex w-fit items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
            Our Specialty
          </span>
        )}
        <span className={`mb-6 ${featured ? "h-16 w-16" : "h-14 w-14"} ${iconChipBase}`}>
          <Icon name={service.icon} width={featured ? 34 : 28} height={featured ? 34 : 28} />
        </span>
        <h3
          className={`font-heading font-medium text-charcoal ${
            featured ? "text-3xl" : "text-2xl"
          }`}
        >
          {service.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {service.blurbFull}
        </p>
      </button>

      {/* Conditions drawer — hidden below, slides up on hover / focus / tap. */}
      <div
        id={panelId}
        className={`pointer-events-none absolute inset-x-0 bottom-16 z-20 px-7 transition-all duration-300 ease-smooth md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 ${
          open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
          Conditions we treat
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {service.conditions.map((c) => (
            <li
              key={c}
              className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Always-visible footer link, pinned above the drawer. */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex h-16 items-center border-t border-teal/10 bg-inherit px-7">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          Explore full treatment
          <ArrowRight
            width={16}
            height={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
// Explorer — hero heading, stats bar, and the horizontal drag/scroll rail.
// -----------------------------------------------------------------------------
export default function ServicesExplorer() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Order the featured card first, the rest following in source order.
  const featured = SERVICES.find((s) => s.slug === FEATURED_SLUG)!;
  const ordered = [featured, ...SERVICES.filter((s) => s.slug !== FEATURED_SLUG)];

  // --- Progress bar: reflects horizontal scroll position of the rail. --------
  const updateProgress = () => {
    const el = trackRef.current;
    const bar = progressRef.current;
    if (!el || !bar) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? el.scrollLeft / max : 0;
    bar.style.transform = `scaleX(${pct})`;
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, []);

  // --- Mouse drag-to-scroll (touch uses native momentum scrolling). ----------
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // let touch scroll natively
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    try {
      trackRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  // Swallow the click that follows a real drag so cards don't navigate.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  // --- Entrance: cards slide in from the right, staggered, once in view. -----
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      if (!cards.length) return;
      if (reduced) {
        gsap.set(cards, { opacity: 1, x: 0 });
        return;
      }
      gsap.fromTo(
        cards,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: trackRef.current, start: "top 80%", once: true },
          onComplete: updateProgress,
        }
      );
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section ref={sectionRef}>
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-background px-5 pb-10 pt-32 sm:px-8 sm:pt-40 lg:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
        />
        <div className="container-content relative max-w-3xl">
          <Typewriter text="What We Treat" className="eyebrow mb-4" />
          <ClipReveal
            as="h1"
            text="Specialised care for every kind of movement"
            className="font-heading text-4xl font-light leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
          />
          <p
            className="mt-5 max-w-2xl animate-fade-in text-lg leading-relaxed text-muted"
            style={{ animationDelay: "0.5s" }}
          >
            Drag to explore each specialty, from a stubborn spine to a post-op
            knee, our physiotherapists build a plan around your body and your
            goals.
          </p>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="px-5 sm:px-8">
        <div className="container-content">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-teal/10 bg-teal/10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.sub} className="bg-background px-4 py-5 text-center">
                <dt className="font-heading text-lg font-medium text-teal sm:text-xl">
                  {s.lead}
                </dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                  {s.sub}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* EXPLORER RAIL */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container-content">
          <h2 className="sr-only">Our physiotherapy specialisations</h2>
          <div
            ref={trackRef}
            onScroll={updateProgress}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            className="no-scrollbar flex select-none flex-col gap-5 px-5 sm:px-8 md:flex-row md:snap-x md:snap-proximity md:overflow-x-auto md:scroll-px-8 md:pb-2 md:cursor-grab md:active:cursor-grabbing"
          >
            {ordered.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                featured={service.slug === FEATURED_SLUG}
              />
            ))}
          </div>

          {/* Progress bar (desktop rail only). */}
          <div className="mt-6 hidden px-5 sm:px-8 md:block">
            <div
              className="h-1 w-full overflow-hidden rounded-full bg-teal/10"
              role="presentation"
            >
              <div
                ref={progressRef}
                className="h-full origin-left scale-x-0 rounded-full bg-teal transition-transform duration-150 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
