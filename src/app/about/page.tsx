import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import ClinicStory from "@/components/about/ClinicStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import FounderProfile from "@/components/about/FounderProfile";
import Certifications from "@/components/about/Certifications";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: { absolute: "About Elavive Physio | Physiotherapist in Jaipur" },
  description:
    "Meet Dr. Ajay Agarwal, Founder of Elavive Physio, internationally certified physiotherapist specializing in spine and knee rehabilitation in Jaipur, Rajasthan.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Elavive Physio | Dr. Ajay Agarwal, Physiotherapist Jaipur",
    description:
      "Meet Dr. Ajay Agarwal, founder of Elavive Physio. Internationally certified physiotherapist specializing in spine and knee rehabilitation in Jaipur.",
    url: "https://www.elavivephysio.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Elavive Physio | Dr. Ajay Agarwal, Physiotherapist Jaipur",
    description:
      "Meet Dr. Ajay Agarwal, founder of Elavive Physio. Internationally certified physiotherapist specializing in spine and knee rehabilitation in Jaipur.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <ClinicStory />
        <MissionVision />
        <CoreValues />
        <FounderProfile />
        <Certifications />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
