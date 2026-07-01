"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { CLINIC_CONFIG } from "@/lib/config";
import { MapPin, Phone, Clock, WhatsApp } from "./Icons";
import ClipReveal from "./ClipReveal";
import CalendlyEmbed from "./CalendlyEmbed";
import ContactForm from "./ContactForm";

// Map embed + "Get Directions" link come from CLINIC_CONFIG (src/lib/config.ts).
// TODO: Update iframe src with exact embed URL from Google Maps > Share > Embed a map once clinic verifies the pin
const MAP_SRC = CLINIC_CONFIG.address.googleMapsEmbed;
const DIRECTIONS_URL = CLINIC_CONFIG.address.googleMapsLink;

const WHY_POINTS = [
  "Evidence-based treatment, not guesswork",
  "Personalized plans for your specific condition",
  "Internationally certified physiotherapist",
  "4,000+ patients successfully treated",
  "5.0★ Google Rating",
];

export default function ContactBody() {
  const cardsRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-card]",
    variant: "fade-up",
    stagger: 0.06,
  });
  const mapRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    variant: "fade-up",
    stagger: 0,
  });
  const formRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    variant: "fade-up",
    stagger: 0.1,
  });

  return (
    <>
      {/* 1. PAGE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-background px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
        />
        <div className="container-content relative">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Get In Touch</p>
            <ClipReveal
              as="h1"
              text="Let's get you moving again"
              className="font-heading text-4xl font-light leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
            />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Book an appointment, ask a question, or find out where we are.
            </p>
          </div>
        </div>
      </section>

      {/* 2. BOOKING — anchor target for every "Book Appointment" CTA. */}
      <section id="booking" className="scroll-mt-24 section-padding bg-white">
        <div className="container-content">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Booking</p>
            <h2 className="font-heading text-3xl font-light text-charcoal sm:text-4xl">
              Book Your Appointment
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Choose a time that works for you. Dr. Agarwal&apos;s calendar is
              live — pick a slot and you will receive instant confirmation.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3.5 py-1.5 text-sm font-semibold text-teal">
              ✓ Cashless / TPA Accepted
            </span>
          </div>
          <CalendlyEmbed />
        </div>
      </section>

      {/* 3. CONTACT DETAIL CARDS */}
      <section className="section-padding bg-surface">
        <div className="container-content">
          <div
            ref={cardsRef}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {/* Card 1 — Location */}
            <div
              data-card
              className="rounded-2xl bg-white p-7 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                <MapPin width={24} height={24} />
              </span>
              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-teal">
                Find Us
              </h3>
              <p className="mt-3 font-medium text-charcoal">
                Elavive Physio — Spine &amp; Knee Clinic
              </p>
              <p className="mt-1 break-words leading-relaxed text-muted">
                {CLINIC_CONFIG.address.line1},<br />
                {CLINIC_CONFIG.address.line2},<br />
                {CLINIC_CONFIG.address.area}, {CLINIC_CONFIG.address.city},{" "}
                {CLINIC_CONFIG.address.state} {CLINIC_CONFIG.address.pinCode}
              </p>
            </div>

            {/* Card 2 — Phone & WhatsApp */}
            <div
              data-card
              className="rounded-2xl bg-white p-7 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                <Phone width={24} height={24} />
              </span>
              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-teal">
                Call or WhatsApp
              </h3>
              <p className="mt-3">
                <a
                  href={CLINIC_CONFIG.contact.phoneTel}
                  className="font-medium text-charcoal transition-colors hover:text-teal"
                >
                  {CLINIC_CONFIG.contact.phone}
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={CLINIC_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-teal"
                >
                  <WhatsApp width={18} height={18} className="text-[#25D366]" />
                  Message us on WhatsApp
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={`mailto:${CLINIC_CONFIG.contact.email}`}
                  className="break-words text-muted transition-colors hover:text-teal"
                >
                  {CLINIC_CONFIG.contact.email}
                </a>
              </p>
            </div>

            {/* Card 3 — Hours */}
            <div
              data-card
              className="rounded-2xl bg-white p-7 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                <Clock width={24} height={24} />
              </span>
              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-teal">
                Clinic Hours
              </h3>
              <p className="mt-3 font-medium text-charcoal">
                {CLINIC_CONFIG.hours.weekdays}
              </p>
              <p className="mt-1 text-muted">{CLINIC_CONFIG.hours.sunday}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAP */}
      <section className="section-padding bg-white">
        <div className="container-content" ref={mapRef}>
          <div data-reveal className="mb-6 max-w-2xl">
            <p className="eyebrow mb-3">Find Our Clinic</p>
          </div>
          <div
            data-reveal
            className="overflow-hidden rounded-2xl shadow-soft"
          >
            <iframe
              src={MAP_SRC}
              title="Map to Elavive Physio, Jaipur"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              allowFullScreen
              className="h-[280px] w-full border-0 sm:h-[420px]"
            />
          </div>
          <div data-reveal className="mt-4">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-teal/70"
            >
              <MapPin width={18} height={18} />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* 5. INQUIRY FORM */}
      <section className="section-padding bg-surface">
        <div className="container-content" ref={formRef}>
          <div data-reveal className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Have a question first?</p>
            <h2 className="font-heading text-3xl font-light text-charcoal sm:text-4xl">
              We&apos;ll get back to you within 24 hours
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Prefer to talk first? Leave your details and Dr. Agarwal&apos;s
              team will call you back.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Form (left on desktop) */}
            <div data-reveal className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
              <ContactForm />
            </div>

            {/* Info panel (right on desktop) */}
            <div
              data-reveal
              className="rounded-2xl border border-teal/15 bg-gradient-to-br from-[#eef4f0] to-[#e2ede6] p-7 sm:p-8"
            >
              <h3 className="font-heading text-2xl font-light text-charcoal">
                Why patients choose Elavive Physio
              </h3>
              <ul className="mt-6 space-y-4">
                {WHY_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    <span className="leading-relaxed text-charcoal/85">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
