import { createClient } from 'next-sanity';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: '2021-10-21',
  perspective: 'published',
  stega: false,
});

// Create a separate client for authentication (no CDN, with write token)
export const authSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // Always false for auth operations
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_STUDIO_TOKEN, // Prioritize write token
  apiVersion: '2021-10-21',
  perspective: 'published',
  stega: false,
});

export default sanityClient;

//* this sanity client is always needed when connecting with sanity.
// we need it in next-auth config authOption object.
