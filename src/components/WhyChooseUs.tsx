"use client";

import { PILLARS } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Icon } from "./Icons";
import BlurText from "./BlurText";

export default function WhyChooseUs() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-pillar]",
    variant: "fade-up",
    stagger: 0.08,
    duration: 0.6,
  });

  return (
    <section className="section-padding bg-white">
      <div className="container-content" ref={ref}>
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Why Elavive Physio</p>
          <BlurText
            as="h2"
            text="Care that's measured, personal, and built to last"
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} data-pillar className="flex flex-col">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                <Icon name={pillar.icon} width={24} height={24} />
              </span>
              <h3 className="font-heading text-lg font-medium text-charcoal">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
