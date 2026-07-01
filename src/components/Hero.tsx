"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HERO } from "@/lib/data";
import { CLINIC_CONFIG } from "@/lib/config";
import { ArrowRight, Phone, WhatsApp } from "./Icons";
import HeroParticles from "./HeroParticles";
import BlurText from "./BlurText";

// NOTE: the previous Three.js 3D body hero (scenes/HeroCanvas + BodyModel) has
// been retired in favour of a lighter, reliable image-based hero. The scene
// component files are kept in src/components/scenes/ in case we revisit the 3D
// treatment later — they are simply no longer rendered here.

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-surface via-background to-background"
    >
      {/* Ambient particle field — plain Canvas 2D, sits behind everything. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroParticles reducedMotion={reducedMotion} />
      </div>

      {/* Hero illustration — flat illustration with a transparent background, so
          it blends straight into the page (no edge mask needed). Centered and
          smaller on mobile (above the copy); larger on the right on desktop.
          Particles drift behind/around it. */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 z-0 h-[46%] w-full sm:inset-y-0 sm:h-full sm:w-[58%] lg:w-[54%]"
      >
        {/* TODO: replace with the final brand illustration / clinic photo. */}
        <Image
          src="/placeholders/hero-illustration.png"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 54vw"
          className="object-contain object-center sm:object-right"
        />
      </div>

      {/* Legibility scrim — stronger on the left where the copy sits. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background/85 via-background/30 to-transparent sm:from-background/70 sm:via-background/10"
        aria-hidden="true"
      />

      {/* Copy overlay. */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-content flex-col justify-end px-5 pb-16 pt-28 sm:justify-center sm:px-8 sm:pb-0 lg:pt-24">
        <div className="max-w-xl">
          {/* Real, crawlable H1. */}
          <h1 className="sr-only-seo">
            Elavive Physio, Spine &amp; Knee Clinic in Jaipur. Advanced
            physiotherapy for spine, knee, sports injuries, and post-surgical
            recovery.
          </h1>

          <p className="eyebrow pointer-events-auto mb-4">{HERO.eyebrow}</p>

          {/* Visible display headline (aria-hidden so SR users hear the H1 once).
              Word-by-word blur-up reveal; line 2 chains after line 1's words. */}
          <p
            aria-hidden="true"
            className="font-heading text-4xl font-light leading-[1.05] tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <BlurText as="span" text={HERO.headlineLine1} />
            <br />
            <BlurText
              as="span"
              text={HERO.headlineLine2}
              className="text-teal"
              delay={0.16}
            />
          </p>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {HERO.subheading}
          </p>

          {/* CTAs */}
          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <Link href={HERO.primaryCta.href} className="btn-primary">
              {HERO.primaryCta.label}
              <ArrowRight width={18} height={18} />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={CLINIC_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="btn-secondary !px-4"
              >
                <WhatsApp width={20} height={20} />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href={CLINIC_CONFIG.contact.phoneTel}
                aria-label="Call the clinic"
                className="btn-secondary !px-4"
              >
                <Phone width={18} height={18} />
                <span className="hidden sm:inline">Call</span>
              </a>
            </div>

            {/* Cashless / TPA trust pill */}
            <span className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3.5 py-1.5 text-sm font-semibold text-teal">
              ✓ Cashless / TPA Accepted
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em]">Scroll</span>
        <span className="h-9 w-5 rounded-full border border-muted/40 p-1">
          <span className="block h-2 w-full animate-[breathe_2.4s_ease-in-out_infinite] rounded-full bg-teal/60" />
        </span>
      </div>
    </section>
  );
}
