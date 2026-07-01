import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { SERVICE_DETAILS } from "@/lib/data";

const detail = SERVICE_DETAILS["shoulder"];

export const metadata: Metadata = {
  title: { absolute: detail.seoTitle },
  description: detail.seoDescription,
  alternates: { canonical: "/services/shoulder" },
  openGraph: {
    title: detail.seoTitle,
    description: detail.seoDescription,
    url: "https://www.elavivephysio.com/services/shoulder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: detail.seoTitle,
    description: detail.seoDescription,
  },
};

export default function ShoulderPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail slug="shoulder" />
      </main>
      <Footer />
    </>
  );
}
