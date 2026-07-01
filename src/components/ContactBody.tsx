"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { CONTACT, whatsappLink } from "@/lib/data";
import { MapPin, Phone, Clock, WhatsApp } from "./Icons";
import ClipReveal from "./ClipReveal";
import CalendlyEmbed from "./CalendlyEmbed";
import ContactForm from "./ContactForm";

// Google Maps embed centered on Jaipur, Rajasthan.
// TODO: Update map embed URL with exact clinic address once confirmed.
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3824845585!2d75.61358039999999!3d26.8861111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1234567890";

const WHY_POINTS = [
  "Evidence-based treatment, not guesswork",
  "Personalized plans for your specific condition",
  "Internationally certified physiotherapist",
  "4,000+ patients successfully treated",
  "4.9★ Google Rating",
];

// Small monospace TODO note, matching the placeholder style used elsewhere.
function TodoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 font-mono text-xs text-muted/70">{"// "}{children}</p>
  );
}

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
            <p className="eyebrow mb-3">Book Your Appointment</p>
            <h2 className="font-heading text-3xl font-light text-charcoal sm:text-4xl">
              Choose a time that works for you
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Dr. Agarwal&apos;s calendar is available online. Pick a slot and
              we&apos;ll confirm within 24 hours.
            </p>
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
              <p className="mt-1 text-muted">Jaipur, Rajasthan</p>
              <TodoNote>TODO: Add full street address</TodoNote>
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
                  href={CONTACT.phoneHref}
                  className="font-medium text-charcoal transition-colors hover:text-teal"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-teal"
                >
                  <WhatsApp width={18} height={18} className="text-[#25D366]" />
                  Message us on WhatsApp
                </a>
              </p>
              <TodoNote>TODO: Replace with real clinic number</TodoNote>
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
                Monday to Saturday: 9:00 AM to 7:00 PM
              </p>
              <p className="mt-1 text-muted">Sunday: By appointment only</p>
              <TodoNote>TODO: Confirm real hours with Dr. Agarwal</TodoNote>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAP */}
      <section className="section-padding bg-white">
        <div className="container-content" ref={mapRef}>
          <div data-reveal className="mb-6 max-w-2xl">
            <p className="eyebrow mb-3">Find Our Clinic</p>
            <TodoNote>
              TODO: Update map embed URL with exact clinic address once confirmed
            </TodoNote>
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
