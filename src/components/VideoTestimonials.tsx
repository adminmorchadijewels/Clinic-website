"use client";

import { VIDEO_SECTION } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";
import BlurText from "./BlurText";

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

        <div data-reveal className="mx-auto max-w-3xl">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-soft">
            <video
              src="/images/video.mp4"
              controls
              autoPlay={false}
              muted={false}
              playsInline
              poster="/images/clinic-treatment-room.png"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted">
            Real patient recovery at Elavive Physio, Jaipur
          </p>
        </div>
      </div>
    </section>
  );
}
