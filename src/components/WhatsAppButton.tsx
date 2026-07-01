import { whatsappLink } from "@/lib/data";
import { WhatsApp } from "./Icons";

/**
 * Persistent floating WhatsApp button (bottom-right) with a slow breathing
 * pulse. The breathe animation is disabled under prefers-reduced-motion via the
 * global CSS rule in globals.css.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Elavive Physio on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 animate-breathe place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <WhatsApp width={28} height={28} />
      {/* Desktop hover label */}
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  );
}
