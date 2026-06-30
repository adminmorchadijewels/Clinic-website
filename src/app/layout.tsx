import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

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
    default: "Elavivephysio — Modern Physiotherapy Clinic in Jaipur",
    template: "%s | Elavivephysio",
  },
  description:
    "Elavivephysio is Jaipur's modern physiotherapy clinic. Evidence-based treatment for back pain, knee & joint pain, sports injuries, and post-surgical rehab. 12+ years of care, 8,000+ patients treated.",
  keywords: [
    "physiotherapy Jaipur",
    "physiotherapist Jaipur",
    "back pain treatment Jaipur",
    "knee pain physiotherapy",
    "sports injury rehab Jaipur",
    "post-surgical rehabilitation",
    "Elavivephysio",
  ],
  authors: [{ name: "Elavivephysio" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Elavivephysio",
    title: "Elavivephysio — Modern Physiotherapy Clinic in Jaipur",
    description:
      "Move better, live fully. Evidence-based physiotherapy in Jaipur for back, knee, shoulder, sports injuries and post-surgical recovery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elavivephysio — Modern Physiotherapy Clinic in Jaipur",
    description:
      "Move better, live fully. Evidence-based physiotherapy in Jaipur.",
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
