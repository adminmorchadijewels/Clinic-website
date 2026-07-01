import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { SERVICE_DETAILS } from "@/lib/data";

const detail = SERVICE_DETAILS["spine-back"];

export const metadata: Metadata = {
  title: { absolute: detail.seoTitle },
  description: detail.seoDescription,
  alternates: { canonical: "/services/spine-back" },
  openGraph: {
    title: detail.seoTitle,
    description: detail.seoDescription,
    url: "https://www.elavivephysio.com/services/spine-back",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: detail.seoTitle,
    description: detail.seoDescription,
  },
};

export default function SpineBackPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail slug="spine-back" />
      </main>
      <Footer />
    </>
  );
}
