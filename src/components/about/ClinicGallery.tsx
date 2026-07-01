"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";
import BlurText from "../BlurText";

type Photo = { src: string; alt: string };

const PHOTOS: Photo[] = [
  {
    src: "/images/clinic-treatment-room.png",
    alt: "Elavive Physio treatment room with physiotherapy beds, Jaipur",
  },
  {
    src: "/images/clinic-reception.png",
    alt: "Elavive Physio reception area, Milap Nagar Jaipur",
  },
  {
    src: "/images/clinic-office.png",
    alt: "Elavive Physio consultation room, Jaipur",
  },
];

/**
 * SECTION 7 — Clinic gallery. Masonry-style column layout (3 / 2 / 1) with a
 * staggered scroll-in and a subtle hover zoom on each photo.
 */
export default function ClinicGallery() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.08,
  });

  return (
    <section className="section-padding bg-[#FAF8F3]">
      <div className="container-content" ref={ref}>
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Our Clinic</p>
          <BlurText
            as="h2"
            text="A modern space built for your recovery"
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
          />
          <p data-reveal className="mt-4 text-base leading-relaxed text-muted">
            Clean, comfortable, and fully equipped for advanced physiotherapy and
            rehabilitation.
          </p>
        </div>

        {/* CSS columns give a natural masonry flow; break-inside keeps each
            photo whole across column breaks. */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              data-reveal
              className="group relative overflow-hidden rounded-xl shadow-soft break-inside-avoid"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
