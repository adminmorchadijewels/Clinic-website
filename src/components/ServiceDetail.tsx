"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  SERVICE_DETAILS,
  SERVICE_JOURNEY,
  getServiceTestimonials,
  type ServiceSlug,
} from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Icon, ArrowRight, Check, Star, ChevronLeft } from "./Icons";
import BlurText from "./BlurText";
import CtaBanner from "./CtaBanner";
import BreadcrumbSchema from "./BreadcrumbSchema";

export default function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const detail = SERVICE_DETAILS[slug];
  const testimonials = getServiceTestimonials(slug);

  const treatRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    variant: "fade-up",
    stagger: 0.06,
  });
  const approachRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    variant: "fade-up",
    stagger: 0.08,
  });
  const journeyRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    variant: "fade-up",
    stagger: 0.12,
  });
  const storyRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    variant: "fade-up",
    stagger: 0.1,
  });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.elavivephysio.com" },
          { name: "Services", url: "https://www.elavivephysio.com/services" },
          {
            name: detail.name,
            url: `https://www.elavivephysio.com/services/${slug}`,
          },
        ]}
      />

      {/* 1. PAGE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-background px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
        />
        <div className="container-content relative">
          <Link
            href="/services"
            className="mb-6 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-coral"
          >
            <ChevronLeft width={16} height={16} />
            All Services
          </Link>

          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-bright to-teal text-white shadow-soft">
                <Icon name={detail.icon} width={30} height={30} />
              </span>
              <p className="eyebrow">{detail.name} Physiotherapy</p>
            </div>

            <BlurText
              as="h1"
              text={detail.headline}
              className="font-heading text-4xl font-light leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
            />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {detail.outcome}
            </p>

            <div className="mt-8">
              <Link href="/contact#booking" className="btn-primary">
                Book an Assessment
                <ArrowRight width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE TREAT */}
      <section className="section-padding bg-white">
        <div className="container-content" ref={treatRef}>
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow mb-3">What we treat</p>
            <BlurText
              as="h2"
              text="Conditions we help you recover from"
              className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
            />
            <p data-reveal className="mt-4 leading-relaxed text-muted">
              {detail.description}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {detail.conditions.map((condition) => (
              <li
                key={condition}
                data-reveal
                className="flex items-center gap-3 rounded-xl border border-teal/10 bg-surface px-4 py-3.5"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
                  <Check width={16} height={16} />
                </span>
                <span className="text-sm font-medium text-charcoal">
                  {condition}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. OUR APPROACH */}
      <section className="section-padding bg-surface">
        <div className="container-content" ref={approachRef}>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Our approach</p>
            <BlurText
              as="h2"
              text="How we build your recovery"
              className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {detail.approach.map((point, i) => (
              <div
                key={point}
                data-reveal
                className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-teal/10 bg-white p-6"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-4xl font-light leading-none text-teal/25"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-base font-medium leading-relaxed text-charcoal">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT TO EXPECT */}
      <section className="section-padding bg-white">
        <div className="container-content" ref={journeyRef}>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">What to expect</p>
            <BlurText
              as="h2"
              text="Your recovery journey, step by step"
              className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {SERVICE_JOURNEY.map((stage, i) => (
              <Fragment key={stage.step}>
                <div
                  data-reveal
                  className="flex-1 rounded-2xl border border-teal/15 bg-gradient-to-br from-[#eef4f0] to-[#e2ede6] p-7"
                >
                  <span className="font-heading text-3xl font-light text-teal">
                    {stage.step}
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-medium text-charcoal">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {stage.body}
                  </p>
                </div>
                {i < SERVICE_JOURNEY.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden items-center text-teal/40 lg:flex"
                  >
                    <ArrowRight width={24} height={24} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RELATED TESTIMONIAL */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-content" ref={storyRef}>
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow mb-3">Patient stories</p>
              <BlurText
                as="h2"
                text="Recoveries like yours"
                className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
              />
            </div>

            <div
              className={`grid grid-cols-1 gap-5 ${
                testimonials.length > 1 ? "md:grid-cols-2" : "max-w-2xl"
              }`}
            >
              {testimonials.map((t) => (
                <figure
                  key={t.id}
                  data-reveal
                  className="flex flex-col rounded-2xl border border-teal/10 bg-white p-7 shadow-soft"
                >
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
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-teal/10 pt-4">
                    <span className="block font-medium text-charcoal">
                      {t.name}
                    </span>
                    <span className="block text-sm text-muted">
                      {t.condition}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA SECTION */}
      <CtaBanner
        heading="Ready to get started?"
        subheading="Book your assessment with Dr. Ajay Agarwal and start a recovery plan built around you."
      />
    </>
  );
}
