import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextAuthProvider } from '@/components/AuthProvider/authProvider';
import ThemeProvider from '@/app/themeProvider/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import PerformanceMonitor from '@/components/PerformanceMonitor/PerformanceMonitor';
import { AccessibilityProvider } from '@/components/Accessibility/AccessibilityProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'HotelMT - Luxury Hotel Booking & Management',
    template: '%s | HotelMT',
  },
  description:
    'Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.',
  keywords: [
    'hotel booking',
    'luxury hotel',
    'Cameroon hotel',
    'hotel management',
    'accommodation',
    'travel',
    'vacation',
    'resort',
    'spa',
    'dining',
  ],
  authors: [{ name: 'HotelMT Team' }],
  creator: 'HotelMT',
  publisher: 'HotelMT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hotel-mgt.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hotel-mgt.vercel.app',
    siteName: 'HotelMT',
    title: 'HotelMT - Luxury Hotel Booking & Management',
    description:
      'Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HotelMT - Luxury Hotel Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HotelMT - Luxury Hotel Booking & Management',
    description:
      'Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.',
    images: ['/og-image.jpg'],
    creator: '@hotelmt',
    site: '@hotelmt',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
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
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />
        <link
          rel='preload'
          href='/fonts/inter-var.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <meta name='application-name' content='HotelMT' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='HotelMT' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#000000' />
        <meta name='theme-color' content='#000000' />
        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#000000'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://hotel-mgt.vercel.app' />
        <meta name='twitter:title' content='HotelMT' />
        <meta
          name='twitter:description'
          content='Luxury Hotel Booking & Management'
        />
        <meta
          name='twitter:image'
          content='https://hotel-mgt.vercel.app/icons/android-chrome-192x192.png'
        />
        <meta name='twitter:creator' content='@hotelmt' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='HotelMT' />
        <meta
          property='og:description'
          content='Luxury Hotel Booking & Management'
        />
        <meta property='og:site_name' content='HotelMT' />
        <meta property='og:url' content='https://hotel-mgt.vercel.app' />
        <meta
          property='og:image'
          content='https://hotel-mgt.vercel.app/icons/android-chrome-192x192.png'
        />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#000000'
        />
        <meta name='msapplication-TileColor' content='#000000' />
        <meta name='theme-color' content='#000000' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
          crossOrigin='anonymous'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'HotelMT',
              description:
                'Luxury hotel offering world-class amenities and exceptional service in Cameroon',
              url: 'https://hotel-mgt.vercel.app',
              logo: '/assets/icons/icon-512x512.png',
              image: '/assets/icons/icon-512x512.png',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Road, Avom',
                addressLocality: 'Cameroon',
                addressCountry: 'CM',
              },
              telephone: '+237-674-852-304',
              email: 'info@hotelmt.com',
              priceRange: '$$$',
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Free WiFi',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Swimming Pool',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Spa',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Restaurant',
                  value: true,
                },
              ],
              sameAs: [
                'https://facebook.com/hotelmt',
                'https://twitter.com/hotelmt',
                'https://instagram.com/hotelmt',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div id='__next'>
          <NextAuthProvider>
            <ThemeProvider>
              <AccessibilityProvider>
                <div className='min-h-screen flex flex-col'>
                  <main className='flex-1' role='main'>
                    {children}
                  </main>
                </div>
                <Toaster position='top-left' reverseOrder={false} />
                <PerformanceMonitor />
              </AccessibilityProvider>
            </ThemeProvider>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
