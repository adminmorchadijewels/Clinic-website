import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ChatBot from "@/components/ChatBot";

// Editorial humanist serif for headings (light weights), Inter for body readability.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// TODO: replace canonical/base URL with the real production domain.
const SITE_URL = "https://www.elavivephysio.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elavive Physio | Spine & Knee Physiotherapy Clinic in Jaipur",
    template: "%s | Elavive Physio",
  },
  description:
    "Jaipur's leading spine and knee physiotherapy clinic. Evidence-based treatment by Dr. Ajay Agarwal (MPT, COMT). 4,000+ patients treated.",
  keywords: [
    "spine clinic Jaipur",
    "knee physiotherapy Jaipur",
    "physiotherapy Jaipur",
    "physiotherapist Jaipur",
    "back pain treatment Jaipur",
    "sports injury rehab Jaipur",
    "post-surgical rehabilitation",
    "Elavive Physio",
  ],
  authors: [{ name: "Elavive Physio" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Elavive Physio",
    title: "Elavive Physio | Spine & Knee Physiotherapy Clinic in Jaipur",
    description:
      "Jaipur's leading spine and knee physiotherapy clinic. Evidence-based treatment by Dr. Ajay Agarwal (MPT, COMT). 4,000+ patients treated.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elavive Physio | Spine & Knee Physiotherapy Clinic in Jaipur",
    description:
      "Jaipur's leading spine and knee physiotherapy clinic. Evidence-based treatment by Dr. Ajay Agarwal. 4,000+ patients treated.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <StructuredData />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
