"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

// Each credential rendered as its own teal-outlined pill.
const CREDENTIALS = [
  "BPT",
  "MPT (Neurology)",
  "MBA",
  "MIAFT",
  "MJPN",
  "COMT",
  "CDNT",
] as const;

const STATS = [
  { value: "4+", label: "Years" },
  { value: "4,000+", label: "Patients" },
  { value: "5+", label: "Countries" },
] as const;

/**
 * SECTION 5 — Doctor full profile. Photo left, profile right. Uses the local
 * doctor placeholder until a real portrait of Dr. Ajay Agarwal is supplied.
 */
export default function FounderProfile() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.1,
  });

  return (
    <section id="founder" className="section-padding bg-white">
      <div
        ref={ref}
        className="container-content grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
      >
        {/* Founder portrait — full-height column with name/title overlaid on a
            teal gradient at the bottom of the photo. */}
        <div data-reveal className="order-first">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-surface shadow-soft">
            <Image
              src="/images/dr-ajay-agarwal.png"
              alt="Dr. Ajay Agarwal, Founder and Director of Elavive Physio, Jaipur"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal via-teal/70 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
              <p className="font-heading text-2xl font-medium text-white sm:text-3xl">
                Dr. Ajay Agarwal (PT)
              </p>
              <p className="mt-1 text-sm text-white/85">
                Founder &amp; Director, Elavive Physio Spine &amp; Knee Clinic
              </p>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div data-reveal>
          <p className="eyebrow mb-3">Meet the Founder</p>
          <h2 className="font-heading text-3xl font-light text-charcoal sm:text-4xl">
            Dr. Ajay Agarwal (PT)
          </h2>

          {/* Stat strip */}
          <dl className="mt-6 flex flex-wrap items-stretch gap-px overflow-hidden rounded-2xl border border-teal/15 bg-teal/15">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex-1 bg-teal px-4 py-4 text-center">
                <dt className="font-heading text-2xl font-medium text-white sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/80">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* Credential pills */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {CREDENTIALS.map((cred) => (
              <li
                key={cred}
                className="rounded-full border border-teal/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal"
              >
                {cred}
              </li>
            ))}
          </ul>

          {/* Bio */}
          <div className="mt-6 space-y-4 text-lg leading-loose text-muted">
            <p>
              Dr. Ajay Agarwal is a dedicated and highly skilled physiotherapist
              with extensive experience in treating musculoskeletal and
              neurological conditions. As the Founder and Director of Elavive
              Physio, he is committed to delivering patient-centered
              physiotherapy care with a focus on long-term recovery and
              functional independence.
            </p>
            <p>
              With over 4 years of clinical experience and 4,000+ successfully
              treated patients, he has helped individuals overcome pain, restore
              movement, and return to their daily activities through
              evidence-based rehabilitation programs.
            </p>
            <p>
              He completed his Bachelor of Physiotherapy from JNU Institute of
              Medical Sciences and Research Center, an MPT (Neurology) from
              Janardan Rai Nagar Rajasthan Vidyapeeth (JRNRVU), Udaipur, and an
              MBA in Hospital and Healthcare Management. He holds multiple
              national and international certifications, including advanced
              training from Johns Hopkins University and Imperial College London.
            </p>
          </div>

          <Link href="/contact#booking" className="btn-primary mt-8">
            Book a consultation with Dr. Agarwal
          </Link>
        </div>
      </div>
    </section>
  );
}
