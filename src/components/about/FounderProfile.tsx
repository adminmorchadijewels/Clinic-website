"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const CREDENTIALS =
  "BPT, MPT (Neurology), MHA, MIAFT, MJPN, COMT, CDNT";

const STATS = [
  { value: "4+", label: "Years Experience" },
  { value: "4,000+", label: "Patients Treated" },
  { value: "25+", label: "Conditions Treated" },
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
        {/* Photo — TODO: replace with real portrait of Dr. Ajay Agarwal. */}
        <div data-reveal className="order-first">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface shadow-soft">
            <Image
              src="/placeholders/doctor.svg"
              alt="Dr. Ajay Agarwal, Founder & Director of Elavive Physio"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal/20 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              TODO: replace with real portrait
            </span>
          </div>
        </div>

        {/* Profile */}
        <div data-reveal>
          <p className="eyebrow mb-3">Meet the Founder</p>
          <h2 className="font-heading text-3xl font-light text-charcoal sm:text-4xl">
            Dr. Ajay Agarwal (PT)
          </h2>
          <p className="mt-2 break-words text-sm font-medium uppercase tracking-wider text-teal">
            {CREDENTIALS}
          </p>
          <p className="mt-3 text-base text-muted">
            Founder &amp; Director, Elavive Physio Spine &amp; Knee Clinic
          </p>

          {/* Stats row */}
          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-y border-teal/10 py-5">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl font-medium text-teal">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* Bio */}
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
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
              Medical Sciences and Research Center, and holds multiple national
              and international certifications, including advanced training from
              Johns Hopkins University and Imperial College London.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
