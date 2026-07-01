"use client";

import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { ChevronRight } from "../Icons";
import BlurText from "../BlurText";

type Cert = { name: string; org?: string };
type Group = { label: string; international?: boolean; items: Cert[] };

const GROUPS: Group[] = [
  {
    label: "Orthopedic & Manual Therapy",
    items: [
      {
        name: "Certified Orthopedic and Manual Therapist",
        org: "Capri Spine Institute, New Delhi",
      },
      {
        name: "Certified Instrument Assisted Soft Tissue Mobilization Therapist",
        org: "CSTA, Delhi",
      },
    ],
  },
  {
    label: "Specialized Techniques",
    items: [
      { name: "Certified Diversified Dry Needling Therapist", org: "CSTA" },
      { name: "Certified Diversified Cupping Therapist" },
      { name: "Certified Hydrotherapy Therapist", org: "SPARC, Goa" },
      { name: "Certified Electrodiagnostic Evaluator (EMG)", org: "AAED" },
    ],
  },
  {
    label: "Sports & Rehabilitation",
    items: [
      { name: "Certified Sports On-Field Therapist", org: "CSTA, Dehradun" },
      {
        name: "Certified Pediatric Special Case Handler",
        org: "DISHA Foundation, Jaipur",
      },
      { name: "Certified Basic Life Support Provider (BLS)" },
      { name: "Certified Emergency Patient Care (ICU Management)" },
    ],
  },
  {
    label: "Health, Fitness & Rehabilitation",
    items: [
      { name: "Certified Diet and Nutrition Expert", org: "IAFT, Mangalore" },
      { name: "Certified Aerobics Instructor", org: "IAFT, Mangalore" },
      { name: "Certified Posture & Ergonomics Therapist" },
    ],
  },
  {
    label: "Global Healthcare",
    international: true,
    items: [
      {
        name: "Certificate in Community Change in Public Health",
        org: "Johns Hopkins University",
      },
      {
        name: "Healthcare Entrepreneurship: Taking Ideas to Market",
        org: "Imperial College London",
      },
      {
        name: "Evaluation of Digital Health Interventions",
        org: "Imperial College London",
      },
      {
        name: "Social & Technical Context of Health Informatics",
        org: "Johns Hopkins University",
      },
      {
        name: "Foundations of Public Health Practice",
        org: "Imperial College London",
      },
    ],
  },
];

/**
 * SECTION 6 — Certifications. Expandable accordion, one panel per group. The
 * international "Global Healthcare" group is visually distinguished with an
 * amber badge and opens by default.
 */
export default function Certifications() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.08,
  });

  // Open the international (last) group by default so it reads most prominent.
  const [open, setOpen] = useState<number | null>(GROUPS.length - 1);

  return (
    <section className="section-padding">
      <div className="container-content" ref={ref}>
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Internationally Certified</p>
          <BlurText
            as="h2"
            text="A qualification for every condition we treat"
            className="font-heading text-3xl font-light text-charcoal sm:text-4xl"
          />
          <p data-reveal className="mt-4 text-base leading-relaxed text-muted">
            Dr. Agarwal&apos;s certifications span orthopedics, neurology, sports
            rehabilitation, public health, and healthcare innovation.
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {GROUPS.map((group, i) => {
            const isOpen = open === i;
            const panelId = `cert-panel-${i}`;
            return (
              <div
                key={group.label}
                data-reveal
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  group.international
                    ? "border-amber-300/70 bg-amber-50/60"
                    : "border-teal/15 bg-white"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="font-heading text-lg font-medium text-charcoal">
                        {group.label}
                      </span>
                      {group.international && (
                        <span className="inline-flex items-center rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
                          International
                        </span>
                      )}
                      <span className="text-xs font-medium text-muted">
                        {group.items.length}{" "}
                        {group.items.length === 1 ? "certification" : "certifications"}
                      </span>
                    </span>
                    <ChevronRight
                      width={20}
                      height={20}
                      className={`shrink-0 text-teal transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </h3>

                {/* CSS grid trick for a smooth height transition. */}
                <div
                  id={panelId}
                  className={`grid transition-all duration-300 ease-smooth ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-1 px-5 pb-5 sm:px-6">
                      {group.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex gap-3 border-t border-charcoal/5 py-3 first:border-t-0"
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                              group.international ? "bg-amber-500" : "bg-teal"
                            }`}
                          />
                          <span className="text-sm leading-relaxed">
                            <span className="font-medium text-charcoal">
                              {item.name}
                            </span>
                            {item.org && (
                              <span className="text-muted">, {item.org}</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
