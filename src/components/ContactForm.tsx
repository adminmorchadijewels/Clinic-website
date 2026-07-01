"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "./Icons";
import { SERVICES } from "@/lib/data";
import { CLINIC_CONFIG } from "@/lib/config";

type FieldName = "firstName" | "phone" | "message";

const CALL_TIMES = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 8pm)",
] as const;

// Shared input styling — note the smooth border-color transition to teal on
// focus (not an instant snap), per the brief's focus-state requirement.
const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-charcoal placeholder:text-muted/60 outline-none transition-colors duration-300 ease-smooth focus:border-teal focus:ring-2 focus:ring-teal/15";

export default function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!(data.get("firstName") as string)?.trim())
      nextErrors.firstName = "Please enter your first name.";
    if (!(data.get("phone") as string)?.trim())
      nextErrors.phone = "Please enter a phone number we can reach you on.";
    if (!(data.get("message") as string)?.trim())
      nextErrors.message = "Tell us briefly what brings you in.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      firstName: (data.get("firstName") as string)?.trim(),
      lastName: (data.get("lastName") as string)?.trim(),
      phone: (data.get("phone") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      service: (data.get("service") as string)?.trim(),
      preferredDate: (data.get("preferredDate") as string)?.trim(),
      preferredTime: (data.get("preferredTime") as string)?.trim(),
      message: (data.get("message") as string)?.trim(),
    };

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({ success: false }));
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          `Message could not be sent. Please call us directly at ${CLINIC_CONFIG.contact.phone}`
        );
      }
    } catch {
      setSubmitError(
        "Message could not be sent. Please call us directly at +91-8955032437"
      );
    } finally {
      setSubmitting(false);
    }
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
      {/* SUCCESS STATE — fades in once the form is submitted. */}
      <div
        aria-hidden={!submitted}
        className={`transition-opacity duration-500 ease-smooth ${
          submitted
            ? "opacity-100"
            : "pointer-events-none absolute inset-0 opacity-0"
        }`}
      >
        {submitted && (
          <div
            role="status"
            className="flex h-full flex-col items-center justify-center rounded-2xl border border-teal/15 bg-surface px-6 py-16 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-teal text-white shadow-soft">
              <Check width={32} height={32} />
            </span>
            <h3 className="mt-6 font-heading text-2xl font-light text-charcoal">
              Message sent
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Thank you for reaching out. We&apos;ve received your message and
              will be in touch within 24 hours. For urgent enquiries, please
              WhatsApp or call us directly.
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
        {/* Name row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              First Name <span className="text-coral">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              onChange={() => clearError("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={`${fieldBase} ${
                errors.firstName ? "border-coral" : "border-teal/15"
              }`}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1.5 text-sm text-coral">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              className={`${fieldBase} border-teal/15`}
            />
          </div>
        </div>

        {/* Phone + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
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

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`${fieldBase} border-teal/15`}
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="service"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Service of interest
          </label>
          <select
            id="service"
            name="service"
            defaultValue="General enquiry"
            className={`${fieldBase} border-teal/15`}
          >
            <option value="General enquiry">General enquiry</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred date + time */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="preferredDate"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Preferred date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              className={`${fieldBase} border-teal/15`}
            />
          </div>

          <div>
            <label
              htmlFor="preferredTime"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Preferred time to call
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
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
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Condition / What brings you in?{" "}
            <span className="text-coral">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Briefly describe your condition or what you'd like help with."
            onChange={() => clearError("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${fieldBase} resize-y ${
              errors.message ? "border-coral" : "border-teal/15"
            }`}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm text-coral">
              {errors.message}
            </p>
          )}
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-coral">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Sending…" : "Send Message"}
          <ArrowRight width={18} height={18} />
        </button>
      </form>
    </div>
  );
}
