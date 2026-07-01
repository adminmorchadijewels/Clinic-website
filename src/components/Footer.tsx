import Link from "next/link";
import { CLINIC_CONFIG } from "@/lib/config";
import {
  Instagram,
  Facebook,
  LinkedIn,
  YouTube,
  WhatsApp,
} from "./Icons";

const FOOTER_NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: CLINIC_CONFIG.social.instagram, Icon: Instagram },
  { label: "Facebook", href: CLINIC_CONFIG.social.facebook, Icon: Facebook },
  { label: "LinkedIn", href: CLINIC_CONFIG.social.linkedin, Icon: LinkedIn },
  { label: "YouTube", href: CLINIC_CONFIG.social.youtube, Icon: YouTube },
  { label: "WhatsApp", href: CLINIC_CONFIG.social.whatsapp, Icon: WhatsApp },
];

export default function Footer() {
  return (
    <footer className="border-t border-teal/10 bg-surface">
      <div className="container-content px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="font-heading text-2xl font-medium text-charcoal">
              Elaviv<span className="text-teal">ephysio</span>
            </span>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Jaipur&apos;s leading spine &amp; knee clinic. Evidence-based
              physiotherapy for spine, knee, sports injuries and post-surgical
              recovery.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {CLINIC_CONFIG.address.line1}, {CLINIC_CONFIG.address.line2},
              <br />
              {CLINIC_CONFIG.address.area}, {CLINIC_CONFIG.address.city},{" "}
              {CLINIC_CONFIG.address.state} {CLINIC_CONFIG.address.pinCode}
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Elavive Physio on ${label}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-teal/20 text-teal transition-colors hover:bg-teal hover:text-white"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex py-2 text-sm text-muted transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={CLINIC_CONFIG.contact.phoneTel}
                  className="inline-flex py-2 transition-colors hover:text-teal"
                >
                  {CLINIC_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CLINIC_CONFIG.contact.email}`}
                  className="inline-flex py-2 transition-colors hover:text-teal"
                >
                  {CLINIC_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact#booking"
                  className="inline-flex py-2 transition-colors hover:text-teal"
                >
                  Book an appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-teal/10 pt-6 text-xs text-muted">
          {/* TODO: confirm legal entity name / year. */}
          © {new Date().getFullYear()} Elavive Physio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
