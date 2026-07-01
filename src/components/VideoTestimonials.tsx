"use client";

import { VIDEO_SECTION } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";
import BlurText from "./BlurText";

type VideoCard = { name: string; condition: string };

// Real patient names/conditions from the testimonials data.
const VIDEO_CARDS: VideoCard[] = [
  { name: "Kavita Sharma", condition: "Slipped disc" },
  { name: "Fenni Italia", condition: "Back pain" },
  { name: "Ashok Kumar Sharma", condition: "Back pain" },
  { name: "Preeti Saini", condition: "Cervical spine" },
  { name: "Manju Agarwal", condition: "Knee pain" },
];

// Duplicate the 5 cards so the -50% marquee shift loops seamlessly (10 total).
const LOOP_CARDS = [...VIDEO_CARDS, ...VIDEO_CARDS];

export default function VideoTestimonials() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.1,
  });

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="container-content px-5 sm:px-8" ref={ref}>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow mb-3">Patient success stories</p>
          <BlurText
            as="h2"
            text={VIDEO_SECTION.heading}
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl lg:text-5xl"
          />
          <p data-reveal className="mt-4 text-muted">
            {VIDEO_SECTION.subheading}
          </p>
        </div>
      </div>

      {/*
        Full-bleed marquee. The track holds a doubled list of cards and shifts
        by -50% (one full copy) on a linear infinite loop, so the seam is
        invisible. Hovering the container pauses the scroll. Under
        prefers-reduced-motion the site-wide CSS reset (globals.css) freezes the
        animation, leaving a static row of cards.
      */}
      <div
        data-reveal
        className="group/marquee mt-2 w-full overflow-hidden"
        aria-label="Patient recovery videos"
      >
        <ul className="flex w-max animate-marquee gap-4 sm:gap-5 [animation-duration:60s] group-hover/marquee:[animation-play-state:paused]">
          {LOOP_CARDS.map((card, i) => (
            <li
              key={i}
              className="w-[220px] shrink-0 sm:w-[280px]"
              aria-hidden={i >= VIDEO_CARDS.length ? true : undefined}
            >
              <figure className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-soft">
                <video
                  src="/images/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
                {/* Bottom gradient overlay for caption legibility. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="font-heading text-base font-medium leading-tight text-white">
                    {card.name}
                  </p>
                  <p className="mt-0.5 text-sm text-white/80">
                    {card.condition}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
