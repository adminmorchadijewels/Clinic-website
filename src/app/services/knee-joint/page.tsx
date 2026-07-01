import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import { SERVICE_DETAILS } from "@/lib/data";

const detail = SERVICE_DETAILS["knee-joint"];

export const metadata: Metadata = {
  title: { absolute: detail.seoTitle },
  description: detail.seoDescription,
  alternates: { canonical: "/services/knee-joint" },
  openGraph: {
    title: detail.seoTitle,
    description: detail.seoDescription,
    url: "https://www.elavivephysio.com/services/knee-joint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: detail.seoTitle,
    description: detail.seoDescription,
  },
};

export default function KneeJointPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail slug="knee-joint" />
      </main>
      <Footer />
    </>
  );
}
