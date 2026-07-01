import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesExplorer from "@/components/services/ServicesExplorer";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: {
    absolute: "Physiotherapy Services in Jaipur | Elavive Physio",
  },
  description:
    "Specialized physiotherapy for spine, knee, shoulder, sports injuries, post-surgical recovery and neurological conditions in Jaipur by Dr. Ajay Agarwal.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Physiotherapy Services in Jaipur | Elavive Physio",
    description:
      "Specialized physiotherapy for spine, knee, shoulder, sports injuries, post-surgical recovery and neurological conditions in Jaipur by Dr. Ajay Agarwal.",
    url: "https://www.elavivephysio.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Physiotherapy Services in Jaipur | Elavive Physio",
    description:
      "Specialized physiotherapy for spine, knee, shoulder, sports injuries, post-surgical recovery and neurological conditions in Jaipur by Dr. Ajay Agarwal.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesExplorer />
        <CtaBanner
          heading="Ready to start your recovery?"
          subheading="Book an appointment with Dr. Ajay Agarwal today. Same-week appointments available."
        />
      </main>
      <Footer />
    </>
  );
}
