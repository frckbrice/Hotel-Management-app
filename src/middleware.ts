export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/users/:path*',
    '/api/((?!sanity/signUp|test-env|contact|stripe|webhook).*)',
  ],
};
