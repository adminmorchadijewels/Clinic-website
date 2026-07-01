import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { SERVICE_DETAILS } from "@/lib/data";

const detail = SERVICE_DETAILS["sports-injury"];

export const metadata: Metadata = {
  title: { absolute: detail.seoTitle },
  description: detail.seoDescription,
  alternates: { canonical: "/services/sports-injury" },
  openGraph: {
    title: detail.seoTitle,
    description: detail.seoDescription,
    url: "https://www.elavivephysio.com/services/sports-injury",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: detail.seoTitle,
    description: detail.seoDescription,
  },
};

export default function SportsInjuryPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail slug="sports-injury" />
      </main>
      <Footer />
    </>
  );
}
