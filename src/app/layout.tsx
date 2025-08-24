import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import AccessibilityProvider from "@/context/accessibility-provider";
import AccessibilityButton from "@/components/global/Accessibility-button";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import NextAuthProvider from "../context/AuthProvider/auth-provider";
import SWRProvider from "@/context/SWRProvider";
// Optimize font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "HotelMT - Luxury Hotel Booking & Management",
  description:
    "Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.",
  authors: [{ name: "HotelMT Team" }],
  keywords: [
    "hotel booking",
    "luxury hotel",
    "Cameroon hotel",
    "hotel management",
    "accommodation",
    "travel",
    "vacation",
    "resort",
    "spa",
    "dining",
  ],
  creator: "HotelMT",
  publisher: "HotelMT",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  metadataBase: new URL("https://hotel-mgt.vercel.app"),
  alternates: {
    canonical: "https://hotel-mgt.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hotel-mgt.vercel.app",
    siteName: "HotelMT",
    title: "HotelMT - Luxury Hotel Booking & Management",
    description:
      "Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.",
    images: [
      {
        url: "https://hotel-mgt.vercel.app/images/seo/og-image-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "HotelMT - Luxury Hotel Experience in Cameroon",
        type: "image/jpeg",
      },
      {
        url: "https://hotel-mgt.vercel.app/images/seo/og-image-800x420.jpg",
        width: 800,
        height: 420,
        alt: "HotelMT - Luxury Hotel Experience in Cameroon",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hotelmt",
    creator: "@hotelmt",
    title: "HotelMT - Luxury Hotel Booking & Management",
    description:
      "Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.",
    images: [
      {
        url: "https://hotel-mgt.vercel.app/images/seo/twitter-image-1200x600.jpg",
        width: 1200,
        height: 600,
        alt: "HotelMT - Luxury Hotel Experience in Cameroon",
      },
    ],
  },
  other: {
    "geo.region": "CM",
    "geo.placename": "Cameroon",
    "geo.position": "3.848033;-11.502075",
    ICBM: "3.848033, -11.502075",
    "DC.title": "HotelMT - Luxury Hotel Booking & Management",
    "DC.creator": "HotelMT Team",
    "DC.subject": "Luxury Hotel, Hotel Booking, Cameroon Hotels",
    "DC.description":
      "Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.",
    "DC.publisher": "HotelMT",
    "DC.contributor": "HotelMT Team",
    "DC.date": "2025-01-01",
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.identifier": "https://hotel-mgt.vercel.app",
    "DC.language": "en",
    "DC.coverage": "Cameroon",
    "DC.rights": "Copyright 2025 HotelMT",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#ffffff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000000"
        />

        {/* Preload critical resources */}
        {/* Removed large image preload for performance */}

        {/* Optimized favicon and icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icons/icon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />

        {/* Load Font Awesome synchronously to avoid hydration issues */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "HotelMT",
              description:
                "Luxury hotel offering world-class amenities and exceptional service in Cameroon",
              url: "https://hotel-mgt.vercel.app",
              logo: "/assets/icons/icon-512x512.png",
              image: "/assets/icons/icon-512x512.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Road, Avom",
                addressLocality: "Cameroon",
                addressCountry: "CM",
              },
              telephone: "+237-674-852-304",
              email: "info@hotelmt.com",
              priceRange: "$$$",
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Free WiFi",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Swimming Pool",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Spa",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Restaurant",
                  value: true,
                },
              ],
              sameAs: [
                "https://facebook.com/hotelmt",
                "https://twitter.com/hotelmt",
                "https://instagram.com/hotelmt",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div id="__next">
          <NextAuthProvider>
            <AccessibilityProvider>
              <ThemeProvider>
                <SWRProvider>
                  <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-1" role="main">
                      {children}
                    </main>
                    <Footer />
                    <AccessibilityButton />
                  </div>
                  <Toaster position="bottom-right" theme="system" richColors />
                </SWRProvider>
              </ThemeProvider>
            </AccessibilityProvider>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
