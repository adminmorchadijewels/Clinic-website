import Link from "next/link";
import { CONTACT } from "@/lib/data";

const FOOTER_NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
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
              {/* TODO: replace with real clinic blurb + address. */}
              Jaipur&apos;s modern physiotherapy clinic. Evidence-based,
              personal care for lasting recovery.
            </p>
            <p className="mt-4 text-sm text-muted">
              {/* TODO: replace placeholder address. */}
              C-Scheme, Jaipur, Rajasthan
            </p>
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
                    className="text-sm text-muted transition-colors hover:text-teal"
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
                {/* TODO: replace placeholder phone. */}
                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-teal"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <Link
                  href="/contact#booking"
                  className="transition-colors hover:text-teal"
                >
                  Book an appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-teal/10 pt-6 text-xs text-muted">
          {/* TODO: confirm legal entity name / year. */}
          © {new Date().getFullYear()} Elavivephysio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
