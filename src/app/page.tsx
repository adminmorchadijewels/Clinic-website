import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

// Below-the-fold sections are code-split so their JS/images don't block the
// initial load. (ssr stays on, so the text content is still server-rendered &
// crawlable.)
const VideoTestimonials = dynamic(
  () => import("@/components/VideoTestimonials"),
  { loading: () => <SectionSkeleton /> }
);
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return <div className="min-h-[60vh] w-full" aria-hidden="true" />;
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ServicesGrid />
        <WhyChooseUs />
        <DoctorSpotlight />
        <VideoTestimonials />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
