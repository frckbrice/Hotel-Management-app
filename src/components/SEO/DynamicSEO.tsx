'use client';

import Head from 'next/head';

interface DynamicSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

const DynamicSEO: React.FC<DynamicSEOProps> = ({
  title = 'HotelMT - Luxury Hotel Booking & Management',
  description = 'Experience luxury and comfort at HotelMT. Book your perfect stay with world-class amenities, exceptional service, and unforgettable experiences in Cameroon.',
  keywords = [
    'hotel booking',
    'luxury hotel',
    'Cameroon hotel',
    'accommodation',
  ],
  image = '/assets/icons/icon-512x512.png',
  url = 'https://hotel-mgt.vercel.app',
  type = 'website',
  structuredData,
}) => {
  const fullTitle = title.includes('HotelMT') ? title : `${title} | HotelMT`;
  const fullUrl = url.startsWith('http')
    ? url
    : `https://hotel-mgt.vercel.app${url}`;
  const fullImage = image.startsWith('http')
    ? image
    : `https://hotel-mgt.vercel.app`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords.join(', ')} />
      <link rel='canonical' href={fullUrl} />

      {/* Open Graph */}
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:image' content={fullImage} />
      <meta property='og:site_name' content='HotelMT' />
      <meta property='og:locale' content='en_US' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImage} />
      <meta name='twitter:site' content='@hotelmt' />
      <meta name='twitter:creator' content='@hotelmt' />

      {/* Structured Data */}
      {structuredData && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Additional Meta Tags */}
      <meta name='robots' content='index, follow' />
      <meta name='author' content='HotelMT Team' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      {/* Preconnect for performance */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />

      {/* DNS prefetch for external domains */}
      <link rel='dns-prefetch' href='//fonts.googleapis.com' />
      <link rel='dns-prefetch' href='//fonts.gstatic.com' />
    </Head>
  );
};

export default DynamicSEO;
