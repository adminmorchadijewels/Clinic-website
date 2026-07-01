import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactBody from "@/components/ContactBody";

export const metadata: Metadata = {
  title: {
    absolute: "Book a Physiotherapy Appointment in Jaipur | Elavive Physio",
  },
  description:
    "Book an appointment with Dr. Ajay Agarwal at Elavive Physio, Jaipur's specialist spine and knee physiotherapy clinic. Online booking available.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a Physiotherapy Appointment in Jaipur | Elavive Physio",
    description:
      "Book an appointment with Dr. Ajay Agarwal at Elavive Physio, Jaipur's specialist spine and knee physiotherapy clinic. Online booking available.",
    url: "https://www.elavivephysio.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Physiotherapy Appointment in Jaipur | Elavive Physio",
    description:
      "Book an appointment with Dr. Ajay Agarwal at Elavive Physio, Jaipur's specialist spine and knee physiotherapy clinic. Online booking available.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactBody />
      </main>
      <Footer />
    </>
  );
}
