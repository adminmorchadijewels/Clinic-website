"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { VIDEO_SECTION, VIDEO_TESTIMONIALS } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Play, Close } from "./Icons";
import BlurText from "./BlurText";

type VideoItem = (typeof VIDEO_TESTIMONIALS)[number];

export default function VideoTestimonials() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<VideoItem | null>(null);
  // Touch pause (CSS :hover covers desktop; touch needs an explicit toggle).
  const [touchPaused, setTouchPaused] = useState(false);

  // Close on Escape + lock scroll while the lightbox is open.
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  // One card. `duplicate` copies are decorative — hidden from AT and not
  // focusable so the seamless loop doesn't create double tab stops.
  const renderCard = (item: VideoItem, duplicate = false) => (
    <button
      key={duplicate ? `dup-${item.id}` : item.id}
      type="button"
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      onClick={() => setActive(item)}
      className="group/card relative mr-4 aspect-[3/4] w-64 shrink-0 overflow-hidden rounded-2xl bg-surface shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift active:translate-y-0 active:scale-[0.98] sm:w-72"
      aria-label={`Play ${item.name}'s story, ${item.condition}`}
    >
      {/* TODO: placeholder thumbnail — see VIDEO_TESTIMONIALS in data.ts. */}
      <Image
        src={item.thumb}
        alt=""
        fill
        sizes="288px"
        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        unoptimized
      />
      <span className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />

      {/* Play button with soft pulse on hover. */}
      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-teal shadow-soft transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-white group-hover/card:shadow-[0_0_0_12px_rgba(255,255,255,0.18)]">
        <Play width={26} height={26} className="ml-1" />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-5 text-left">
        <span className="block font-heading text-lg font-medium text-white">
          {item.name}
        </span>
        <span className="block text-sm text-white/80">{item.condition}</span>
      </span>
    </button>
  );

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="container-content mb-10 px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">Patient success stories</p>
          <BlurText
            as="h2"
            text={VIDEO_SECTION.heading}
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl lg:text-5xl"
          />
          <p className="mt-4 text-muted">{VIDEO_SECTION.subheading}</p>
        </div>
      </div>

      {reducedMotion ? (
        // Reduced motion: a plain, manually-scrollable row (no auto-animation).
        <div className="no-scrollbar flex overflow-x-auto px-5 sm:px-8">
          {VIDEO_TESTIMONIALS.map((item) => renderCard(item))}
        </div>
      ) : (
        // Marquee: render the list twice and translate by exactly one copy.
        // Edges fade out via a mask so cards enter/leave softly.
        <div
          className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          onTouchStart={() => setTouchPaused(true)}
          onTouchEnd={() => setTouchPaused(false)}
          onTouchCancel={() => setTouchPaused(false)}
        >
          <div
            className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] ${
              touchPaused ? "[animation-play-state:paused]" : ""
            }`}
          >
            {VIDEO_TESTIMONIALS.map((item) => renderCard(item))}
            {VIDEO_TESTIMONIALS.map((item) => renderCard(item, true))}
          </div>
        </div>
      )}

      {/* Lightbox modal */}
      {active && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name}'s recovery story`}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-charcoal shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 active:scale-95"
            >
              <Close />
            </button>

            <div className="aspect-video w-full">
              {/* TODO: real video file not yet available — placeholder player.
                  When videoSrc is set, this renders a real <video> element. */}
              {active.videoSrc ? (
                <video
                  src={active.videoSrc}
                  controls
                  autoPlay
                  className="h-full w-full bg-black"
                  poster={active.thumb}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-teal to-teal-bright text-center text-white">
                  <Play width={40} height={40} />
                  <p className="font-heading text-xl font-light">
                    {active.name}, {active.condition}
                  </p>
                  <p className="text-sm text-white/70">
                    {/* TODO: drop in the real testimonial video file */}
                    Video coming soon
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
