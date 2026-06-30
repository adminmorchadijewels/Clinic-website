"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STATS } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Icon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>("[data-counter]");
      nums.forEach((el) => {
        const target = Number(el.dataset.counter);
        const decimals = Number(el.dataset.decimals ?? 0);

        if (reducedMotion) {
          el.textContent = target.toFixed(decimals);
          return;
        }

        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section
      aria-label="Clinic at a glance"
      className="relative z-10 border-y border-teal/10 bg-surface"
    >
      <div
        ref={ref}
        className="mx-auto grid max-w-content grid-cols-2 gap-x-4 gap-y-8 px-5 py-10 sm:px-8 md:grid-cols-4 md:py-12"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center md:flex-row md:gap-4 md:text-left"
          >
            <span className="mb-2 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal/10 text-teal md:mb-0">
              <Icon name={stat.icon} width={22} height={22} />
            </span>
            <span>
              <span className="font-heading text-3xl font-light text-charcoal sm:text-4xl">
                {/* TODO: placeholder stat — see STATS in src/lib/data.ts */}
                <span
                  data-counter={stat.value}
                  data-decimals={"decimals" in stat ? stat.decimals : 0}
                >
                  0
                </span>
                {stat.suffix}
              </span>
              <span className="mt-0.5 block text-xs font-medium uppercase tracking-wider text-muted sm:text-sm">
                {stat.label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
