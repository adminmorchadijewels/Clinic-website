"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Close, ArrowRight } from "./Icons";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle solid header background once scrolled off the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
          scrolled
            ? "bg-background/90 shadow-soft backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8"
        >
          <Link
            href="/"
            className="font-heading text-xl font-medium tracking-tight text-charcoal transition-opacity hover:opacity-80"
          >
            Elaviv<span className="text-teal">ephysio</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-charcoal/80 transition-colors duration-300 hover:text-teal after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-teal after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact#booking"
              className="btn-primary hidden !px-5 !py-3 sm:inline-flex"
            >
              Book Appointment
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-11 w-11 place-items-center rounded-full text-charcoal transition-colors hover:bg-surface active:scale-95 md:hidden"
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay (fade + slide, not an instant toggle). */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-charcoal/30 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-background shadow-soft transition-transform duration-300 ease-smooth ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-heading text-lg font-medium">
              Elaviv<span className="text-teal">ephysio</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full text-charcoal transition-colors hover:bg-surface active:scale-95"
            >
              <Close />
            </button>
          </div>

          <ul className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3.5 text-lg font-medium text-charcoal transition-colors hover:bg-surface hover:text-teal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-6">
            <Link
              href="/contact#booking"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full"
            >
              Book Appointment
              <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
