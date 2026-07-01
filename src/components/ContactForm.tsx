"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "./Icons";

type FieldName = "name" | "phone" | "condition";

const CALL_TIMES = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 7pm)",
] as const;

// Shared input styling — note the smooth border-color transition to teal on
// focus (not an instant snap), per the brief's focus-state requirement.
const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-charcoal placeholder:text-muted/60 outline-none transition-colors duration-300 ease-smooth focus:border-teal focus:ring-2 focus:ring-teal/15";

export default function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!(data.get("name") as string)?.trim())
      nextErrors.name = "Please enter your full name.";
    if (!(data.get("phone") as string)?.trim())
      nextErrors.phone = "Please enter a phone number we can reach you on.";
    if (!(data.get("condition") as string)?.trim())
      nextErrors.condition = "Tell us briefly what brings you in.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: Wire form to real backend (Formspree, Supabase, or email handler).
    setSubmitted(true);
  };

  // Clear a field's error as soon as the user starts correcting it.
  const clearError = (field: FieldName) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  return (
    <div className="relative">
      {/* SUCCESS STATE — fades in once the form is dismissed. */}
      <div
        aria-hidden={!submitted}
        className={`transition-opacity duration-500 ease-smooth ${
          submitted
            ? "opacity-100"
            : "pointer-events-none absolute inset-0 opacity-0"
        }`}
      >
        {/* TODO: Update this message once real form backend (Formspree/Supabase/email) is wired — change to "We've received your message and will call you within 24 hours." */}
        {submitted && (
          <div
            role="status"
            className="flex h-full flex-col items-center justify-center rounded-2xl border border-teal/15 bg-surface px-6 py-16 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-teal text-white shadow-soft">
              <Check width={32} height={32} />
            </span>
            <h3 className="mt-6 font-heading text-2xl font-light text-charcoal">
              Message saved
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Thank you for reaching out. Once our booking system is live,
              we&apos;ll be in touch within 24 hours. For urgent enquiries,
              please WhatsApp or call us directly.
            </p>
            {/* TODO: Wire form to real backend (Formspree, Supabase, or email handler). */}
            <p className="mt-4 font-mono text-xs text-muted/70">
              {"// TODO: Wire form to real backend (Formspree, Supabase, or email handler)"}
            </p>
          </div>
        )}
      </div>

      {/* FORM — fades out on successful submit. */}
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-hidden={submitted}
        className={`space-y-5 transition-opacity duration-500 ease-smooth ${
          submitted ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* Full name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Full Name <span className="text-coral">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            onChange={() => clearError("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${fieldBase} ${
              errors.name ? "border-coral" : "border-teal/15"
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-coral">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Phone Number <span className="text-coral">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 XXXXX XXXXX"
            onChange={() => clearError("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${fieldBase} ${
              errors.phone ? "border-coral" : "border-teal/15"
            }`}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-sm text-coral">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Condition */}
        <div>
          <label
            htmlFor="condition"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Condition / What brings you in?{" "}
            <span className="text-coral">*</span>
          </label>
          <textarea
            id="condition"
            name="condition"
            rows={4}
            placeholder="Briefly describe your condition or what you'd like help with."
            onChange={() => clearError("condition")}
            aria-invalid={!!errors.condition}
            aria-describedby={errors.condition ? "condition-error" : undefined}
            className={`${fieldBase} resize-y ${
              errors.condition ? "border-coral" : "border-teal/15"
            }`}
          />
          {errors.condition && (
            <p id="condition-error" className="mt-1.5 text-sm text-coral">
              {errors.condition}
            </p>
          )}
        </div>

        {/* Preferred call time */}
        <div>
          <label
            htmlFor="callTime"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Preferred time to call
          </label>
          <select
            id="callTime"
            name="callTime"
            defaultValue={CALL_TIMES[0]}
            className={`${fieldBase} border-teal/15`}
          >
            {CALL_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn-primary w-full sm:w-auto"
        >
          Send Message
          <ArrowRight width={18} height={18} />
        </button>
      </form>
    </div>
  );
}
