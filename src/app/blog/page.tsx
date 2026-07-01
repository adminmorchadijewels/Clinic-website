import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogListing from "@/components/blog/BlogListing";

export const metadata: Metadata = {
  // `absolute` bypasses the "%s | Elavive Physio" template so the suffix
  // isn't duplicated (the title already ends in the brand).
  title: {
    absolute: "Physio Blog | Spine, Knee & Recovery Tips | Jaipur",
  },
  description:
    "Evidence-based physiotherapy advice on spine health, knee care, sports recovery, and pain management from the team at Elavive Physio, Jaipur.",
  alternates: { canonical: "/blog" },
  // TODO: Remove robots noindex once real blog content replaces the placeholder article bodies
  robots: { index: false, follow: true },
  openGraph: {
    title: "Physio Blog | Spine, Knee & Recovery Tips | Jaipur",
    description:
      "Evidence-based physiotherapy advice on spine health, knee care, sports recovery, and pain management from the team at Elavive Physio, Jaipur.",
    url: "https://www.elavivephysio.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Physio Blog | Spine, Knee & Recovery Tips | Jaipur",
    description:
      "Evidence-based physiotherapy advice on spine health, knee care, sports recovery, and pain management from the team at Elavive Physio, Jaipur.",
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogListing />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
