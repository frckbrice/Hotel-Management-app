import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/users/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: 'https://hotel-mgt.vercel.app/sitemap.xml',
    host: 'https://hotel-mgt.vercel.app',
  };
}
