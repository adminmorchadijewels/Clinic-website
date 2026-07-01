// =============================================================================
// CalendlyEmbed — isolated booking widget mount point.
//
// To go live, the client only needs to do TWO things:
//   1. Set CALENDLY_URL below to the clinic's real scheduling link.
//   2. Replace the placeholder <div> in the return with Calendly's inline embed
//      (either their <script> widget or the @calendly/react package), passing
//      CALENDLY_URL through. The wrapper's sizing (min-h / rounded / shadow) can
//      stay exactly as-is so the surrounding layout doesn't shift.
//
// Nothing else on the Contact page references Calendly — this file is the single
// swap point.
// =============================================================================

// TODO: replace with the clinic's real Calendly scheduling URL.
export const CALENDLY_URL = "https://calendly.com/your-clinic/appointment";

export default function CalendlyEmbed() {
  return (
    // TODO: Replace this div with Calendly inline widget
    // e.g. <InlineWidget url={CALENDLY_URL} styles={{ minHeight: 600 }} />
    <div
      className="flex min-h-[600px] flex-col items-center justify-center rounded-2xl bg-teal px-6 py-16 text-center text-white shadow-lift"
      data-calendly-url={CALENDLY_URL}
    >
      <p className="font-heading text-2xl font-light sm:text-3xl">
        📅 Booking Calendar
      </p>
      <p className="mt-2 text-base text-white/80">Calendly embed goes here</p>
    </div>
  );
}
