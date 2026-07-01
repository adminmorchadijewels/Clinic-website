import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Elavive Physio",
  },
  description:
    "The page you're looking for doesn't exist or may have moved. Return home or book an appointment with Elavive Physio.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] items-center">
        <div className="container-content section-padding text-center">
          <p
            aria-hidden="true"
            className="font-heading text-[6rem] font-light leading-none text-teal sm:text-[9rem]"
          >
            404
          </p>
          <h1 className="mt-2 font-heading text-3xl font-light text-charcoal sm:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              Go Home
            </Link>
            <Link href="/contact#booking" className="btn-secondary">
              Book Appointment
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
