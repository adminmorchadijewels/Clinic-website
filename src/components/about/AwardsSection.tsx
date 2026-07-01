"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useSnapCarousel } from "@/lib/useSnapCarousel";
import { Check } from "../Icons";
import BlurText from "../BlurText";

type Award = { src: string; caption: string };

const AWARDS: Award[] = [
  {
    src: "/images/award 1.jpg",
    caption:
      "Clinical Excellence Award, 7th Elite Ortho Physician 2024, SMS Medical College Jaipur",
  },
  {
    src: "/images/award 2.jpg",
    caption: "World Physiotherapy Day, JPN Annual Summit 2023",
  },
  {
    src: "/images/award 3.jpg",
    caption: "Physio Cricket League (PCL) 2024, Pre-Launch Ceremony, Jaipur",
  },
  {
    src: "/images/award 4.jpg",
    caption: "Ortho Physiocon 2024, New Delhi",
  },
  {
    src: "/images/award 5.jpg",
    caption: "Excellence Award, Fortis Jaipur Sports Med 2025",
  },
  {
    src: "/images/award 6.jpg",
    caption:
      "Rajasthan Orthopedic and Rehabilitation Summit 2025, Birla Auditorium Jaipur",
  },
];

const ACHIEVEMENTS = [
  "Proud member of the Organising team of National Physiotherapy Conferences including FEMCON",
  "Organising member of the Physio Cricket League (PCL) held every year in Jaipur",
  "1st Position in Diet and Nutritionist course at IAFT",
  "Presented a poster at ICPT Mumbai conference and received 3rd Position",
  "Selected in Super 30 at JNU College of Physiotherapy",
  "Aarambh — An initiative recognised by the Health Ministry and awarded by the Rajasthan Education Minister Shree Bhanwar Singh Bhati",
  "Aarambh Rural Physiotherapy Camp in Barmer — Awarded by MLA Ravinder Singh Bhati",
  "Certificate of Dedication awarded by AIPHS (FIT INDIA movement)",
  "Clinical Excellence Award at 7th Elite Ortho Physician 2024, SMS Medical College Jaipur",
  "Organizing Member at Rajasthan Orthopedic and Rehabilitation Summit 2025, Birla Auditorium Jaipur",
  "Excellence Award by Fortis Jaipur Sports Med 2025",
];

/**
 * SECTION 8 — Awards & recognition. A photo grid (3 / 2 / 1) of award moments
 * followed by a teal-checkmark list of achievements. Both parts share the
 * container's staggered scroll-in.
 */
export default function AwardsSection() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.06,
  });
  const { containerRef, activeIndex } = useSnapCarousel<HTMLDivElement>();

  return (
    <section className="section-padding bg-[#F0F3EF]">
      <div className="container-content" ref={ref}>
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Recognition</p>
          <BlurText
            as="h2"
            text="Awards & Achievements"
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
          />
          <p data-reveal className="mt-4 text-base leading-relaxed text-muted">
            Recognised by government bodies, medical institutions, and the
            physiotherapy community across India.
          </p>
        </div>

        {/* PART 1 — award photos. Desktop (md+): 3-column grid. */}
        <div className="hidden gap-5 sm:grid-cols-2 md:grid lg:grid-cols-3">
          {AWARDS.map((award) => (
            <figure
              key={award.src}
              data-reveal
              className="group overflow-hidden rounded-xl bg-white shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={award.src}
                  alt={award.caption}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-300 ease-smooth group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="px-4 py-4 text-center text-sm italic text-muted">
                {award.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Mobile (below md): horizontal snap-scroll carousel + dots. */}
        <div className="md:hidden">
          <div
            ref={containerRef}
            className="scrollbar-hide -mx-5 flex snap-x snap-mandatory flex-row gap-4 overflow-x-auto px-5"
          >
            {AWARDS.map((award) => (
              <figure
                key={award.src}
                className="relative aspect-[4/3] w-[80vw] shrink-0 snap-center overflow-hidden rounded-xl"
              >
                <Image
                  src={award.src}
                  alt={award.caption}
                  fill
                  sizes="80vw"
                  className="object-cover object-top"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-sm text-white">
                  {award.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {AWARDS.map((award, i) => (
              <span
                key={award.src}
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  activeIndex === i ? "bg-teal" : "bg-teal/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* PART 2 — achievements list */}
        <ul data-reveal className="mx-auto mt-14 max-w-3xl">
          {ACHIEVEMENTS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-t border-charcoal/10 py-3 first:border-t-0"
            >
              <Check
                width={16}
                height={16}
                aria-hidden="true"
                className="mt-1 shrink-0 text-teal"
              />
              <span className="text-sm leading-relaxed text-charcoal">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
