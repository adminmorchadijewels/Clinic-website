import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListing from "@/components/blog/BlogListing";

export const metadata: Metadata = {
  // `absolute` bypasses the "%s | Elavive Physio" template so the suffix
  // isn't duplicated (the title already ends in the brand).
  title: {
    absolute: "Physio Blog | Spine, Knee & Recovery Tips | Jaipur",
  },
  description:
    "Evidence-based physiotherapy advice on spine health, knee care, shoulder recovery, and neurological rehabilitation from the team at Elavive Physio, Jaipur.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Physio Blog | Spine, Knee & Recovery Tips | Jaipur",
    description:
      "Evidence-based physiotherapy advice on spine health, knee care, shoulder recovery, and neurological rehabilitation from the team at Elavive Physio, Jaipur.",
    url: "https://www.elavivephysio.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Physio Blog | Spine, Knee & Recovery Tips | Jaipur",
    description:
      "Evidence-based physiotherapy advice on spine health, knee care, shoulder recovery, and neurological rehabilitation from the team at Elavive Physio, Jaipur.",
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
    </>
  );
}
